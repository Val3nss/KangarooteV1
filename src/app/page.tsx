
import CMSPlatformsSection from "@/Components/cmsplatform/Cmsplatform";
import Hero from "@/Components/Hero";
import InformationHero from "@/Components/InformationHero";
import Projects from "@/Components/Project/Projects";
import WebServices from "@/Components/Services/Webservices";

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex flex-col">
          {/* Hero Section */}
          <section className="relative h-[100vh] flex items-center justify-center">
            <Hero />
          </section>
       

        {/* Information Section */}
        <section className="relative ">
          <InformationHero />
        </section>

        {/* Featured Projects Section */}
        <section className="relative  bg-white">
          <Projects />
        </section>

        {/* Categories Section */}
        <section className="">
          <div className="w-full ">
           <WebServices />
          </div>
        </section>

        {/* New Products Section */}
        <section className="">
          <div className="">
            <CMSPlatformsSection/>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;