from pydantic import BaseModel, HttpUrl

class JobDetails(BaseModel):
    role_name: str
    role_link: str
    company_name: str
    company_job_board_link: str
    resume_type: str
    job_description: str