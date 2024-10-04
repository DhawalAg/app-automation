import React from 'react'
import Header from '~/app/components/Header'
import JobApplicationForm from '~/app/components/JobApplicationForm'

export const dynamic = "force-dynamic";


export default function Home() {
  return (
    <>
      <Header/>
      <main className="flex-grow flex">
        <div className="max-w-2xl mx-auto px-4 py-8 w-full">
          <JobApplicationForm />
        </div>
      </main>
    </>
  )
}
