"use client";

import { motion } from "framer-motion";
import { Users, LineChart, Shield, Coins } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";

export function UcchainProjects() {
  const projects = [
    {
      title: "Virtual Land NFT",
      description: "Immersive virtual world where you can buy, sell, and trade land as NFTs.",
      src: "/images/ic1.svg"
    },
    {
      title: "Utility App",
      description: "A comprehensive app for mobile recharge, bill payments, and booking flights and hotels.",
      src: "/images/ic2.svg"
    },
    {
      title: "Hardware Wallet",
      description: "Secure wallet for your digital assets.",
      src: "/images/ic3.svg"
    },
    {
      title: "Crypto Wallet with Exchange",
      description: "Integrated exchange for your cryptocurrencies and seamless trade.",
      src: "/images/ic4.svg"
    }
  ];

  return (
    <section id="projects" className="py-20 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(240,185,11,0.15),transparent_70%)]" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#F0B90B]/10 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-xl md:text-4xl font-bold mb-4">
            <span className="gradient-text"> Ucchain </span>Projects
          </h2>
          <p className="text-muted/80 max-w-md md:max-w-2xl text-xs md:text-sm text-center mx-auto">
          Discover the innovative initiatives that are shaping the future of Ucchain.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-4 gap-8 relative">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="glass-card flex flex-col  justify-start items-start p-4 rounded-xl relative"
            >
                <Image width={40} height={40} src={project.src} alt="" className="w-12 h-12 mb-2" />
              <h3 className="text-lg text-muted font-semibold mb-2">{project.title}</h3>
              <p className="text-muted/80 text-sm">{project.description}</p>
              
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
         
        </motion.div>
      </div>
    </section>
  );
}