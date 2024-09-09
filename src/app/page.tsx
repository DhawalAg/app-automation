import Link from "next/link";

const imageUrls = [
  "https://utfs.io/f/71838526-8f9e-4b22-a9c4-387153fc469a-804au.jpg",
  "https://utfs.io/f/3ca4859e-2479-4916-8697-999e5afe12ae-u7fics.jpg",
  "https://utfs.io/f/ea911bf0-4c43-4f44-891b-efdd6e18763f-ggoo0p.co-vs32-htc-abstract-art-paint-pattern-pink-36-3840x2400-4k-wallpaper.jpg",
  "https://utfs.io/f/c353a801-9237-4110-b6cd-bbda5b727f01-976sb3.webp",
];

const mockImages = imageUrls.map((url, index) => ({
  id: index + 1,
  url,
}));


export default function HomePage() {
  return (
    <main className="">
      <div className="flex flex-wrap gap-4"> 
        {[...mockImages, ...mockImages, ...mockImages].map((image) => (
          <div key={image.id} className="w-48 h-48">
            <img src={image.url}/>  
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
