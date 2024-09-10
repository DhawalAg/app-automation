// import Link from "next/link";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";



export default async function HomePage() {
  const images = await db.query.images.findMany({
    orderBy: (image, { desc }) => [desc(image.id)],
  });

  return (
    <main className="">
      <div className="flex flex-wrap gap-4"> 
        {[...images, ...images, ...images].map((image) => (
          <div key={image.id} className="w-48 flex flex-col">
            <img src={image.url}/>  
            <div> {image.name} </div>
          </div>
        ))}
      </div>
    </main>
    
    // <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
    //   <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
    //     Gallery in progress...
    //   </div>
    // </main>
  );
}
