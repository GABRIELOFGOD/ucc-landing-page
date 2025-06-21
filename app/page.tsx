import { Suspense } from 'react';
// import Navbar from '@/components/layout/Navbar';
// import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import { WhyUcchain } from '@/components/sections/WhyUcchain';
import { Blockchain } from '@/components/sections/Blockchain';
import { UcchainProjects } from '@/components/sections/UcchainProject';
import { FAQ } from '@/components/sections/FAQ';
import { Roadmap } from '@/components/sections/Roadmap';
// import { Footer } from '@/components/sections/Footer';
import { Tokenomics } from '@/components/sections/Tokenomics';
import Footer from '@/components/layout/Footer';


export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <div className="container mx-auto px-0 md:px-4 space-y-20x">
        <Hero />
        {/* <WhyUcchain />
        <Blockchain />
        <Tokenomics />
        <Roadmap />
        <UcchainProjects />
        <FAQ /> */}

      </div>
      {/* <Footer /> */}
      {/* <Footer /> */}
    </main>
  );
}