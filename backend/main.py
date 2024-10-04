from fastapi import FastAPI, HTTPException
from jobDetails import JobDetails
from notion_entry import create_application_entry, create_company_entry
from fastapi.middleware.cors import CORSMiddleware

origins = [
    "http://localhost:3000",  # Next.js default port
    # Add other origins if necessary
]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/create-app-entry")
async def create_app_entry(job_details: JobDetails):
    try:
        # Create company entry and get its page ID
        company_page_id = create_company_entry(
            job_details.company_name,
            job_details.company_job_board_link
        )

        # Create application entry
        create_application_entry(
            job_description=job_details.job_description,
            role_name=job_details.role_name,
            role_link=job_details.role_link,
            resume_type=job_details.resume_type,
            company_name=job_details.company_name,
            company_page_id=company_page_id
        )
        
        return {"message": "Application entry created successfully!"}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))