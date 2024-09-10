// import Link from "next/link";
import { db } from "~/server/db";
import React from 'react'
import Link from 'next/link'

export const dynamic = "force-dynamic";

const Home: React.FC = () => {
  return (
    <div>
      <h1>Welcome to Prompt Improver</h1>
      <Link href="/prompt-improver">Go to Prompt Improver</Link>
    </div>
  )
}

export default Home
