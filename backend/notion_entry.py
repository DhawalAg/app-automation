import os
from notion_client import Client
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize the Notion client
notion = Client(auth=os.environ["NOTION_TOKEN"])

# Database IDs
COMPANY_TRACKER_ID = os.environ["COMPANY_TRACKER_ID"]
APPLICATION_TRACKER_ID = os.environ["APPLICATION_TRACKER_ID"]


def get_company_page_id(company_name: str) -> str:
    """Check if a company entry already exists and return its page ID if found."""
    results = notion.databases.query(
        database_id=COMPANY_TRACKER_ID,
        filter={
            "property": "Company Name",
            "title": {
                "equals": company_name
            }
        }
    ).get("results")
    
    return results[0]["id"] if results else None

def create_company_entry(company_name: str, company_job_board_link: str) -> str:
    """Create a new entry in the Company Tracker database if it doesn't exist."""   
    existing_page_id = get_company_page_id(company_name)
    
    if existing_page_id:
        print(f"Company '{company_name}' already exists. Using existing entry.")
        return existing_page_id
    
    new_page = notion.pages.create(
        parent={"database_id": COMPANY_TRACKER_ID},
        properties={
            "Company Name": {"title": [{"text": {"content": company_name}}]},
            "Job Board Link": {"url": company_job_board_link}
        }
    )
    print(f"Created new entry for company '{company_name}'.")
    return new_page["id"]

def split_text(text: str, max_length: int = 2000):
    """Optimized: Split text into chunks at new lines or up to a maximum length."""
    paragraphs = text.split('\n')  # Split by new line characters
    current_chunk = []  # Use list to store paragraphs temporarily for efficiency
    current_length = 0

    for paragraph in paragraphs:
        paragraph_length = len(paragraph) + 1  # +1 for the newline character
        if current_length + paragraph_length > max_length:
            # Yield the current chunk as a single string when max_length is exceeded
            yield '\n'.join(current_chunk)
            current_chunk = [paragraph]  # Start new chunk with current paragraph
            current_length = paragraph_length
        else:
            current_chunk.append(paragraph)
            current_length += paragraph_length

    if current_chunk:
        yield '\n'.join(current_chunk) 

def get_cover_letter_prompt_blocks():
    intro = """I am writing to express my interest for the {role_name} position at {company_name}. I recently graduated with an MBA from Duke University and have over four years of experience in AI/ML product management, data science, and product development. Given my background, I am confident in my ability to drive {company_name}'s vision for ..."""

    bullet_intro = "With a proven track record in <<fill in with relevant words>>, my background aligns perfectly with the qualifications you seek:\n"
    point_1 = "1. Leadership Experience Developing AI/ML Solutions: At Vitrana, I was one of three founding Data Scientists tasked with automating regulatory drug safety reporting. While I enjoyed the R&D process of building models, I quickly expanded my responsibilities to also ideate and build web applications showcasing the capabilities of our NLP and ML classification solutions. Over the next two years, I engaged closely with clients and leadership, taking on the role of Product Owner. In this capacity, I prioritized feature delivery, led client demos, and drove Agile Scrum teams across data science, engineering, design, and QA. With these products, the company secured multiple six- and seven-figure deals, and the data science team successfully grew from three to over 15 employees. My experience leading AI/ML solution development from end-to-end would enable me to..."
    point_2 = "2. AI-Enabled SaaS Product Management Experience: Formally transitioning to a PM role by my third year at the firm, I led the strategy and development of an AI-powered pharmacovigilance SaaS platform, unlocking ~$20M in new revenue opportunities. Managing a cross-functional team of 20 members, this experience honed my ability to create a long-term product strategy, understand client requirements and set the product roadmap, while also leading teams through the SaaS development and deployment lifecycle. The platform improved client operational efficiencies, automating their drug safety pipelines to reduce process time for clients by 80%."
    point_3 = "3. Strong Analytical Skills and Technical Expertise: During my MBA internship at Dell Technologies, I designed a dashboard to analyze sales performance and forecast purchasing patterns, saving 2500+ operational hours. I leveraged the insights to craft strategies increasing customer upgrades and generated $XXM in revenue and cost-savings opportunities My technical skillset, including experience with SQL, Power BI, Python, Angular, and Agile methodologies, is complemented by my ability to work with diverse teams and synthesize complex data into actionable insights, and can prove helpful in tracking key product metrics, identifying patterns, and optimizing product strategies."
    point_4 = "4. GenAI Go-To-Market Experience: In addition to interning at Dell during my MBA, I worked with ShareThis Inc, a Martech firm, and managed an 11-member team to devise a go-to-market strategy for a GenAI product. Collaborating with leadership, external consultants, and product managers, I led multiple workstreams, including market analysis, customer persona deep-dives, journey mapping, and competitive landscaping. I identified six high-potential use cases across three markets, with an estimated annual revenue potential of ~$10M."

    task = """<TASK>
    You are an expert cover letter writer helping me find a Product Manager job by enabling me to craft high quality cover letters that convey my enthusiasm and fit for the role.
    Go through my resume and the provided job description to draft an appropriate cover letter to the recruiter for this role.
    Follow these guidelines:
    • Tone: Professional yet personable, showing enthusiasm for the role.
    • Structure: Leverage the provided template tag. Use your discretion to modify any parts of the content within the template - this is meant to be a guide for you. What I want is for you to start with an intro including a brief description of myself, my recent MBA experience, and highlight 2-3 key relevancies that I have for this role. Then use the bullet points I have provided to go into detail about why I am a good fit for the role. At the end of each bullet point, write 1-2 sentences about how the experience I have shared correlates and can add value to the role and company being discussed. Once you're done with the bullet points, write a brief closing statement, 1-2 sentences long, conveying my final enthusiasm for the role.
    Note: When you see the following tags: '<<why this opportunity excites me>>' and '<<closing>>', use your best judgement to write something specific that will add value.
    • Customization: Tailor the content to the specific company and role, using relevant industry terminology.
    • Specificity: Be as specific as you can be. You have my resume and sample bullet points as reference for my experiences, but you can ask me if you need more information. Please try to avoid being superflous and ambiguous. We don't want to come off as under-prepared.
    Please think through each step carefully before providing your final output. After drafting the cover letter, briefly explain your rationale for key choices made in the content and structure"
    </TASK>"""    
    
    prompt_chunks = ["<COVER LETTER TEMPLATE>", intro, "<<why this opportunity excites me>>\n", "<BULLET POINTS>", bullet_intro, point_1, point_2, point_3, point_4, "</BULLET POINTS>\n", "<<closing>>\n", "</COVER LETTER TEMPLATE>\n", task]
    prompt_blocks = [
        {
            "object": "block",
            "type": "paragraph",
            "paragraph": {
                "rich_text": [{"type": "text", "text": {"content": chunk}}]
            }
        } for chunk in prompt_chunks
    ]

    return prompt_blocks

def create_application_entry(job_description: str, role_name: str, role_link: str, 
                             resume_type: str, company_name: str, company_page_id: str) -> None:
    """Create a new entry in the Application Tracker database with job description as page content."""
    try:
        # Split job description into chunks
        job_description_chunks = split_text(job_description)

        # Create paragraph blocks for each chunk
        job_description_blocks = [
            {
                "object": "block",
                "type": "paragraph",
                "paragraph": {
                    "rich_text": [{"type": "text", "text": {"content": chunk}}]
                }
            } for chunk in job_description_chunks
        ]

        # cover_letter_page = create_page(company_name=company_name, role_name=role_name, page_type=page_type)

        new_page = notion.pages.create(
            parent={"database_id": APPLICATION_TRACKER_ID},
            properties={
                "Role Name": {"title": [{"text": {"content": role_name}}]},
                "Role Link": {"url": role_link},
                "Company": {"relation": [{"id": company_page_id}]},
                "Resume Type": {"select": {"name": resume_type}}
            },
            children=[
                # Job Description toggle block
                {
                    "object": "block",
                    "type": "toggle",
                    "toggle": {
                        "rich_text": [{"type": "text", "text": {"content": "Job Description"}}],
                        "children": job_description_blocks
                    }
                },
                # Cover Letter Prompt toggle block
                {
                    "object": "block",
                    "type": "child_page",
                    "type": "toggle",
                    "toggle": {
                        "rich_text": [{"type": "text", "text": {"content": "Cover Letter Prompt"}}],
                        "children": get_cover_letter_prompt_blocks() 
                    }
                }
            ]
        )
        print(f"Application entry created: {new_page['url']}")
    except Exception as e:
        print(f"Error creating application entry: {e}")
        raise

def get_user_input() -> dict:
    """Collect user input for job details."""
    return {
        "role_name": input("Enter role name: "),
        "role_link": input("Enter role link: "),
        "company_name": input("Enter company name: "),
        "company_job_board_link": input("Enter company job board link: "),
        "resume_type": input("Enter resume type (AI, general, healthcare): "),
        "job_description": input("Enter job description: ")
    }

def validate_database_ids():
    """Validate that the database IDs are correct."""
    try:
        notion.databases.retrieve(COMPANY_TRACKER_ID)
        notion.databases.retrieve(APPLICATION_TRACKER_ID)
    except Exception as e:
        print(f"Error validating database IDs: {e}")
        print("Please check your COMPANY_TRACKER_ID and APPLICATION_TRACKER_ID in the .env file.")
        return False
    return True

def main():
    if not validate_database_ids():
        return
    
    try:
        # Get user input
        job_details = get_user_input()

#         job_details = {
#             "job_description": """Introduction
# IBM Data and AI seeks a Senior Product Manager to join our US-based team and own initiatives across our product portfolio.
# In this role, you will be responsible for shaping the future of data and AI technology through the development and execution of our product roadmap. You will work closely with cross-functional teams to gather customer feedback, identify market opportunities, and develop innovative solutions. You’ll support sales and marketing initiatives to drive revenue growth.

# Your Role and Responsibilities
# You are a product manager with a history of successful product ownership and growth or experience in an adjacent role (development, technical sales). Your peers would say you are trusted to successfully weigh customer outcomes, business impacts, and functional tradeoffs. You communicate in a way that leaves them feeling respected, heard and understood. At the same time, the product features and experiences you deliver are crafted with the customer front of mind.

# Responsibilities
# – Define and execute the product strategy for our data and AI products
# – Work with engineering, business development, sales, and marketing to bring products to market
# – Gather customer feedback and identify market opportunities
# – Develop innovative solutions that solve customer problems
# – Manage the product lifecycle from discovery to launch
# – Track product performance and metrics
# – Stay up to date on industry trends and best practices

# Required Technical and Professional Expertise
# Bachelor’s or Master’s degree in Computer Science, Engineering, Artificial Intelligence, or a related field

# – 10+ years of experience successfully managing and leading product or technical teams
# – Track record of success in customer-driven product development
# – Passion for data-driven insights and innovation
# – Excellent communication and interpersonal skills
# – A deep understanding of AI, foundation models, and related technologies is a plus

# Preferred Technical and Professional Expertise
# Master’s degree in Computer Science, Engineering, Artificial Intelligence, or a related field

# – Background on data and AI strategy, concepts, key trends, and competitors
# – Product management experience driving considerable product growth for data and AI solutions
# – Knowledge about IBM Data and AI products, technology, and customers""",
#             "role_name": "Product Manager, Data and AI",
#             "role_link": "https://careers.ibm.com/job/21077145/product-manager-data-and-ai-remote/?codes=SN_LinkedIn&Codes=SN_LinkedIn",
#             "company_name": "IBM",
#             "company_job_board_link": "https://www.ibm.com/careers/search",
#             "resume_type": "AI",
#         }

        # Create company entry and get its page ID
        company_page_id = create_company_entry(job_details["company_name"], 
                                               job_details["company_job_board_link"])

        # Create application entry
        create_application_entry(job_details["job_description"], 
                                 job_details["role_name"],
                                 job_details["role_link"], 
                                 job_details["resume_type"],
                                 job_details["company_name"],
                                 company_page_id)

        print("Entries created successfully!")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    main()