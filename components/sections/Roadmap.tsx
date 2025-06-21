"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function Roadmap() {
  const milestones = [
    {
      quarter: "Q1 2025",
      items: [
        "Launch of Blockchain",
        "Launch of Wallet",
        "Introduction of staking features"
      ]
    },
    {
      quarter: "Q2 2025",
      items: [
        "Integration of Layer-2 compatibility",
        "Deployment of dApps and NFT projects"
      ]
    },
    {
      quarter: "Q3 2025",
      items: [
        "UCC Coin Listing"
      ]
    },
    {
      quarter: "Q4 2025",
      items: [
        "Ecosystem Expansion",
        "New features and updates",
        "Metaverse and gaming growth"
      ]
    }
  ];

  return (
    <section id="roadmap" className="py-20">
      <div className="max-w-6xlx mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-xl md:text-4xl font-bold mb-4">
            Our Journey: Ucchain <span className="gradient-text">Roadmap</span>
          </h2>
          <p className="text-muted/80 max-w-md md:max-w-2xl text-xs md:text-sm text-center mx-auto">
            The Ucchain roadmap outlines the project's vision for growth and innovation,
            focusing on key milestones and future developments.
          </p>
        </motion.div>
        <div className="relative">
          <Image width={40} height={40} src="/roadmap.png" alt="" className="w-[100%] mx-auto mt-10" />
        </div>

        {/* <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-yellow-500/20" />
          
          {milestones.map((milestone, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className={`flex items-center mb-12 ${
                index % 2 === 0 ? "justify-start" : "justify-end"
              }`}
            >
              <div className={`w-1/2 ${index % 2 === 0 ? "pr-8" : "pl-8"}`}>
                <div className="bg-black/40 p-6 rounded-xl">
                  <h3 className="text-yellow-500 font-bold mb-4">{milestone.quarter}</h3>
                  <ul className="space-y-2">
                    {milestone.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-gray-400">• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div> */}
      </div>
    </section>
  );
}