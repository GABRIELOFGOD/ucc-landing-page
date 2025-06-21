"use client";

import { useEffect, useState } from "react";
import { CountdownTimer } from "../ui/countdown-timer";
import { TokenProgress } from "@/components/ui/token-progress";
import { usePresale } from "@/providers/provider";
import { calculateTimeLeft } from "@/lib/utils";
import { CountdownTime } from "@/lib/types";

interface PhaseIndicatorProps {
  currentPhase: number;
  totalPhases: number;
}

const PhaseIndicator: React.FC<PhaseIndicatorProps> = ({ currentPhase, totalPhases }) => {
  return (
    <h1 className="relative md:text-5xl text-3xl font-bold mb-2 w-fit mx-auto text-white bg-clip-text text-transparent backdrop-blur-lg shadow-inner">
    <span className="absolute inset-0 shadow-inner bg-white/30 blur-lg"></span>
    <span className="relative z-10">
      Phase {currentPhase}
    <sup className="text-sm align-super text-gray-400">/{totalPhases}</sup>
    </span>
    </h1>


  );
};

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState<CountdownTime>({
    days: 2,
    hours: 1,
    minutes: 18,
    seconds: 44,
  });

  const { uccInfo, userUCCInfo, totalTokens } = usePresale();

  useEffect(() => {
    const targetDate = new Date("2025-03-12T00:00:00");
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // console.log(userUCCInfo.usersInfo[3])
  return (
    <section className="relative min-h-screen pt-20 flex mb-10 flex-col items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(240,185,11,0.15),transparent_70%)]" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#F0B90B]/10 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 mt-10 text-center">
        <PhaseIndicator currentPhase={4} totalPhases={10} />
        <p className="md:text-md text-xs text-gray-400 mb-12">ENDS IN</p>

        <CountdownTimer targetDate={new Date("2025-06-24")} />

        {/* Stats Bar */}
        <div className="w-full mt-24 max-w-4xl mx-auto backdrop-blur-xl bg-black/40 rounded-3xl border border-[#F0B90B]/20 overflow-hidden">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#F0B90B]/10 rounded-full blur-3xl" />

          <div className="grid grid-cols-3 p-6">
            <div className="text-left">
              <div className="text-xs md:text-sm text-gray-400 mb-1">
                USDT RAISED
              </div>
              <div className="text-xs md:text-lg font-bold text-[#F0B90B]">
                {uccInfo.totalInvestmentsUSDT} USDT
              </div>
              <div className="text-xs md:text-sm text-gray-400 mb-1">
                BNB RAISED
              </div>
              <div className="text-xs md:text-lg font-bold text-[#F0B90B]">
                {uccInfo.totalInvestmentsBNB.toFixed(4)} BNB
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs md:text-sm text-gray-400 mb-">
                LISTING DATE
              </div>
              <div className="text-xs md:text-xl font-bold">
                Announced soon
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs md:text-sm text-gray-400 mb-1">
                HOLDERS
              </div>
              <div className="text-xs md:text-xl font-bold text-[#F0B90B]">
                {parseInt(uccInfo.totalUsers.toString())}
              </div>
            </div>
          </div>

          <div className="">
            <TokenProgress
              tokenBNBPrice={uccInfo.priceBNB}
              tokenUSDTPrice={uccInfo.priceUSDT}
              userInfo={userUCCInfo.usersInfo}
              userDepositsUSDT={userUCCInfo.usersInfo?.[3] ?? 0}
              userDepositsBNB={userUCCInfo.usersInfo?.[4] ?? 0}
              userEarningsBNB={userUCCInfo.usersInfo?.[6] ?? 0}
              userEarningsUSDT={userUCCInfo.usersInfo?.[5] ?? 0}
              userId={userUCCInfo.userId}
              userTokens={userUCCInfo.usersInfo?.[7] ?? 0}
              progress={
                uccInfo.totalTokensToBEDistributed &&
                (uccInfo.totalTokensToBEDistributed * 100) / 10000000
              }
              tokensSold={uccInfo.totalTokensToBEDistributed}
              totalTokens={10000000}
              activities={userUCCInfo.recentActivities}
              activitiesLength={userUCCInfo.activityLength}
            />
            {}
          </div>
        </div>
      </div>
    </section>
  );
}