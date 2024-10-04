// import { NextResponse } from 'next/server'

// export async function POST(request: Request) {
//   const data = await request.json()
  
//   // Process the data here
//   // This is where you'd implement your job application automation logic
  
//   // For now, we'll just echo back the received data
//   const output = `Received data:\n${JSON.stringify(data, null, 2)}`

//   return NextResponse.json({ output })
// }

import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

// Define the structure of the job details
interface JobDetails {
  roleName: string;
  roleLink: string;
  companyName: string;
  companyJobBoardLink: string;
  resumeType: string;
  jobDescription: string;
}

export async function POST(request: NextRequest) {
  try {
    // Parse the incoming request body
    const jobDetails: JobDetails = await request.json();

    // Make a POST request to the FastAPI backend
    const response = await axios.post('http://localhost:8000/create-app-entry', {
      role_name: jobDetails.roleName,
      role_link: jobDetails.roleLink,
      company_name: jobDetails.companyName,
      company_job_board_link: jobDetails.companyJobBoardLink,
      resume_type: jobDetails.resumeType,
      job_description: jobDetails.jobDescription
    });

    // Return the response from the FastAPI backend
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error forwarding request to FastAPI:', error);
    
    // If axios error, get the response data
    if (axios.isAxiosError(error) && error.response) {
      return NextResponse.json(
        { error: 'Error from FastAPI', details: error.response.data },
        { status: error.response.status }
      );
    }

    // For other types of errors
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}