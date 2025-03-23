import About from "@/components/about";
import BestSellersCom from "./_components/BestSellersCom";
import Hero from "./_components/hero";
import Contact from "@/components/contact";


export default async function Home() {

  
  return (
    <main className="">
     
      <Hero />
      <BestSellersCom />
      <About />
      <Contact />
    </main>
  );
}
