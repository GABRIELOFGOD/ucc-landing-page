"use client";

import { motion } from "framer-motion";
import { Lock, Coins, Users } from "lucide-react";
import Image from "next/image";

const PieChart = () => {
  const data = [
    { name: "Public PreSale", value: 50, color: "#FF6969" },
    { name: "Marketing", value: 30, color: "#Ffd166" },
    { name: "Team", value: 10, color: "#38BDF8" },
    { name: "Development", value: 10, color: "#4ADE80" }
  ];

  const total = data.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = 0;

  return (
    <div className="flex flex-col items-center p-6 bg-black/40  max-w-xl mx-auto">
      <svg
        viewBox="0 0 100 100"
        className="w-40 h-40 sm:w-60 sm:h-60 transform -rotate-90"
      >
        {data.map((item, i) => {
          const angle = (item.value / total) * 360;
          const x1 = 50 + 40 * Math.cos((currentAngle * Math.PI) / 180);
          const y1 = 50 + 40 * Math.sin((currentAngle * Math.PI) / 180);
          const x2 = 50 + 40 * Math.cos(((currentAngle + angle) * Math.PI) / 180);
          const y2 = 50 + 40 * Math.sin(((currentAngle + angle) * Math.PI) / 180);
          const largeArcFlag = angle > 180 ? 1 : 0;
          const pathData = `
            M 50 50
            L ${x1} ${y1}
            A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2}
            Z
          `;
          currentAngle += angle;

          return (
            <path
              key={item.name}
              d={pathData}
              fill={item.color}
              className="transition-all duration-300 hover:opacity-90"
            >
              <title>{`${item.name}: ${item.value}%`}</title>
            </path>
          );
        })}
        <circle cx="50" cy="50" r="25" fill="black" />
      </svg>
      <div className="mt-4 grid grid-cols-1 gap-2 justify-center w-full text-xs text-muted/80 ">
        {data.map((item, i) => (
          <div key={i} className="flex items-center space-x-2">
            <span
              className="w-4 h-4 inline-block rounded-full"
              style={{ backgroundColor: item.color }}
            ></span>
            <span className="  text-muted/80">{`${item.name}: ${item.value}%`}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const features = [
  {
    icon: Lock,
    title: "Limited supply",
    description: "A limited supply model enhances scarcity, boosting its long-term value."
  },
  {
    icon: Coins,
    title: "Sustainability",
    description: "Ucchain boasts a limited supply of 20 million UCC Coins, ensuring scarcity and sustainable growth!"
  },
  {
    icon: Users,
    title: "Strategic allocation",
    description: "Allocation is strategically divided among seed sales, staking rewards, ecosystem development, and partnerships to ensure balanced growth."
  }
];

export function Tokenomics() {
  return (
    <section id="tokenomics" className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-xl md:text-4xl font-bold mb-4">
            Ucchain <span className="gradient-text">Tokenomics</span>
          </h2>
          <p className="text-muted/80 max-w-md md:max-w-2xl text-xs md:text-sm mx-auto">
            Ucchain has designed its tokenomics to ensure sustainable growth
            and value appreciation for UCC Coin.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 w-full items-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-square flex flex-col py-5 w-full glass-card rounded-xl mx-auto"
          >
            <div className="flex items-center justify-center z-10">
              <div className="text-center">
                <div className="text-2xl font-bold">180 Million</div>
                <div className="text-sm text-gray-400">Total Supply</div>
              </div>
            </div>
            <PieChart />
            {/* <div className="relative">
              <Image width={40} height={40} src="/teko.png" alt="" className="w-[60%] mx-auto mt-10" />
            </div> */}
            {/* <ul className="flex flex-col mx-auto py-4 text-muted/80">
              <li className="text-xs text-left">Team (5%)</li>
              <li className="text-xs text-left">Airdrop (5%)</li>
              <li className="text-xs text-left">Presale (35%)</li>
              <li className="text-xs text-left">Marketing (10%)</li>
              <li className="text-xs text-left">further Listing (20%)</li>
              <li className="text-xs text-left">Staking rewards (25%)</li>

            </ul> */}
          </motion.div>

          <div className="space-y-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-black/40 p-6 rounded-xl glass-card backdrop-blur-sm"
              >
                {/* <feature.icon className="w-8 h-8 text-yellow-500 mb-4" /> */}
                <h3 className="text-sm font-medium mb-2">{feature.title}</h3>
                <p className="text-muted/80">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}