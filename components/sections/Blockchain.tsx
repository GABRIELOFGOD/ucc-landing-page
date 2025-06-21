"use client";

import { motion } from "framer-motion";
import { Shield, Zap, Coins, Users } from "lucide-react";
import Image from "next/image";

const features = [
  {
    icon: Shield,
    title: "Security First",
    description: "Advanced cryptographic protocols and consensus mechanisms ensure maximum security for all transactions."
  },
  {
    icon: Zap,
    title: "High Performance",
    description: "Process thousands of transactions per second with minimal latency and energy consumption."
  },
  {
    icon: Coins,
    title: "Low Transaction Fees",
    description: "Cost-efficient transactions with predictable gas fees that remain affordable regardless of network activity."
  },
  {
    icon: Users,
    title: "Community Governed",
    description: "Decentralized governance allows UCC holders to participate in key protocol decisions."
  }
];

const BlockchainNode = ({ delay = 0, x = 0, y = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.5 }}
    className="absolute w-12 h-12 md:w-16 md:h-16 animate-spin"
    style={{ transform: `translate(${x}%, ${y}%)` }}
  >
    <div className="w-full h-full rounded-full bg-yellow-500/20 animate-ping backdrop-blur-sm flex items-center justify-center">
      <div className="w-2/3 h-2/3 rounded-full bg-yellow-500/30" />
    </div>
  </motion.div>
);

const ConnectingLine = ({ start = { x: 0, y: 0 }, end = { x: 0, y: 0 }, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay, duration: 0.5 }}
    className="absolute h-px bg-gradient-to-r from-yellow-500/50 to-yellow-500/0 animate-pulse"
    style={{
      width: "100px",
      transform: `translate(${start.x}%, ${start.y}%) rotate(${Math.atan2(end.y - start.y, end.x - start.x) * (180 / Math.PI)}deg)`,
      transformOrigin: "left center"
    }}
  />
);

export function Blockchain() {
  return (
    <section id="blockcahin" className="py-t overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(240,185,11,0.15),transparent_70%)]" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#F0B90B]/10 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Blockchain</span> Architecture
          </h2>
          <p className="text-muted/80 max-w-md md:max-w-2xl text-xs md:text-sm mx-auto">
          Ucchain is built on a robust and innovative architecture designed to address the inefficiencies of traditional blockchains, offering a platform that is scalable, secure, and efficient.
          </p>
        </motion.div>

        <div className="relative">
          <Image width={40} height={40} src="/blockchain.png" alt="" className="w-[80%] mx-auto mt-10" />
        </div>
        <div className="relative">
          {/* <Image width={40} height={40} src="/images/blockchain2.svg" alt="" className="w-[80%] mx-auto mt-10" /> */}
          <p className="text-center md:text-2xl text-muted/80">After achieving consensus, the block is added to the chain</p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative mb-16"
        >
          {/* Central Node */}
          <div className="absolute top-1 right-10 transform -translate-x-1/2 -translate-y-1/2 animate-pulse">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-yellow-500/30 backdrop-blur-sm flex items-center justify-center"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full gradient-btn flex items-center justify-center">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-yellow-500/50" />
              </div>
            </motion.div>
          </div>

          {/* Surrounding Nodes */}
          <BlockchainNode delay={0.7} x={-80} y={-50} />
          <BlockchainNode delay={0.8} x={80} y={-50} />
          <BlockchainNode delay={0.9} x={-80} y={50} />
          <BlockchainNode delay={1.0} x={80} y={50} />

          {/* Connecting Lines */}
          <ConnectingLine start={{ x: -80, y: -50 }} end={{ x: 0, y: 0 }} delay={1.1} />
          <ConnectingLine start={{ x: 80, y: -50 }} end={{ x: 0, y: 0 }} delay={1.2} />
          <ConnectingLine start={{ x: -80, y: 50 }} end={{ x: 0, y: 0 }} delay={1.3} />
          <ConnectingLine start={{ x: 80, y: 50 }} end={{ x: 0, y: 0 }} delay={1.4} />
        </motion.div>
      </div>
    </section>
  );
}