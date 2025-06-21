"use client";

import { Progress } from "@/components/ui/progress";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { SUPPORTED_TOKENS } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";
import { AmountInput } from "./amount-input";
import { PurchaseButton } from "./purchase-button";
import { ReferralStats } from "./referral-stats";
import { ActivitiesTable, Activity } from "@/components/ui/activities-table";
import { b2f, usePresale } from "@/hooks/usePresale";

interface TokenProgressProps {
    tokenUSDTPrice: number;
    tokenBNBPrice: number;
    tokensSold: number;
    totalTokens: number;
    userInfo: any;
    userId: number;
    userDepositsUSDT: number;
    userDepositsBNB: number;
    userEarningsBNB: number;
    userEarningsUSDT: number;
    userTokens: number;
    activities: Activity[];
    activitiesLength: number;
    progress: number;
}

export function TokenProgress({
    tokenUSDTPrice,
    tokenBNBPrice,
    tokensSold,
    totalTokens,
    userId,
    userDepositsUSDT,
    userDepositsBNB,
    progress,
    userEarningsBNB,
    userEarningsUSDT,
    userTokens,
    activities,
    activitiesLength,
}: TokenProgressProps) {
    // const progress = (tokensSold / totalTokens) * 100;
    const [selectedToken, setSelectedToken] = useState("USDT");
    const [amount, setAmount] = useState("");
    const { status, buyWithUSDT, buyWithBNB } = usePresale();
    const [showActivities, setShowActivities] = useState(false);
    // const params = new URLSearchParams(window.location.search);
    // const ref = parseInt(params.get("ref") || "0") || 0;
    // console.log(status);
    const handleAmountChange = (value: string) => {
        if (value === "" || /^\d*\.?\d*$/.test(value)) {
            setAmount(value);
        }
    };

    const [ref, setRef] = useState(0);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const params = new URLSearchParams(window.location.search);
            setRef(parseInt(params.get("ref") || "0") || 0);
        }
    }, []);
    // console.log(  `{tokenUSDTPrice}: ${tokenUSDTPrice},
    //   {tokenBNBPrice}: ${tokenBNBPrice},
    //   {tokensSold}: ${tokensSold},
    //   {totalTokens}: ${totalTokens},
    //   {userId}: ${userId},kenUSDTPrice}: 0,
    //   {userDepositsUSDT}: ${userDepositsUSDT},
    //   {userDepositsBNB}: ${userDepositsBNB},
    //   {progress}: ${progress},
    //   {userEarningsBNB}: ${userEarningsBNB},
    //   {userEarningsUSDT}: ${userEarningsUSDT},
    //   {userTokens}: ${userTokens},
    //   {activities}: ${activities},
    //   {activitiesLength}: ${activitiesLength}`);
    const calculateTokenAmount = useCallback(
        (inputAmount: string) => {
            const numAmount = parseFloat(inputAmount) || 0;
            return formatCurrency(
                numAmount /
                (selectedToken === "USDT" ? tokenUSDTPrice : tokenBNBPrice),
            );
        },
        [selectedToken, tokenUSDTPrice, tokenBNBPrice],
    );

    const handlePurchase = async () => {
        if (!amount) return;

        if (selectedToken === "USDT") {
            await buyWithUSDT(amount, ref);
        } else if (selectedToken === "BNB") {
            await buyWithBNB(amount, ref);
        }
    };

    return (
        <div className="space-y-6 backdrop-blur-xl bg-input rounded-3xl p-6 md:p-8 overflow-x-auto">
            <div className="flex md:flex-row justify-between md:justify-between items-centers md:items-center gap-4">
                <div className="flex items-start gap-2 flex-col">
                    <span className="py-1 px-3 text-[8px] md:text-sm glass-card">
                        Current price
                    </span>
                    <div className="flex items-center justify-center gap-1">
                        <Image
                            src="/images/icon.png"
                            alt="ucc-logo"
                            width={12}
                            height={12}
                            className="md:w-5 md:h-5 w-3 h-3"
                        />
                        <span className="text-gray-200 md:text-sm text-[8px]">
                            1 UCC =
                        </span>
                        <div className="flex items-center gap-2">
                            <img
                                src="/images/tether.svg"
                                alt="USDT"
                                className="w-5 h-5"
                            />
                            <span className="text-[#F0B90B] md:text-sm text-[8px] font-semibold">
                                {formatCurrency(tokenUSDTPrice, 3)} USDT
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex items-end gap-2 flex-col">
                    <span className="py-1 px-3 glass-card text-[8px] md:text-sm">
                        Next price
                    </span>
                    <div className="flex items-center justify-center gap-1">
                        <Image
                            src="/images/icon.png"
                            alt="ucc-logo"
                            width={12}
                            height={12}
                            className="md:w-5 md:h-5 w-3 h-3"
                        />
                        <span className="text-gray-200 md:text-sm text-[8px]">
                            1 UCC =
                        </span>
                        <div className="flex items-center gap-2">
                            <img
                                src="/images/tether.svg"
                                alt="USDT"
                                className="w-3 h-3 md:w-5 md:h-5"
                            />
                            <span className="text-[#F0B90B] md:text-sm text-[8px] font-semibold ">
                                0.15 USDT
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <Progress
                value={progress}
                tokensSold={tokensSold}
                totalTokens={totalTokens}
                className="h-4 rounded-xl bg-secondary"
                indicatorClassName="bg-gradient-to-r from-[#F0B90B] to-[#FCD435]"
            />

            <div className="pt-10 p-1 md:p-8">
                <h2 className="text-sm md:text-xl mb-8 text-white ">
                    Step 1 -{" "}
                    <span className=" text-gray-400">
                        Select the Payment Method (BEP20)
                    </span>{" "}
                </h2>

                <div className="flex w-full md:w-[40%] mx-auto items-center justify-center p-1 bg-card glass-card gap-4 mb-8">
                    {Object.entries(SUPPORTED_TOKENS).map(
                        ([symbol, details]) => (
                            <Button
                                key={symbol}
                                // disabled
                                variant={
                                    selectedToken === symbol
                                        ? "secondary"
                                        : "ghost"
                                }
                                onClick={() => setSelectedToken(symbol)}
                                className="flex items-center gap-1 w-full"
                            >
                                <img
                                    src={details.icon}
                                    alt={symbol}
                                    className="w-6 h-6"
                                />
                                {symbol}
                            </Button>
                        ),
                    )}
                </div>

                <h2 className="text-sm md:text-xl mb-8 text-white ">
                    Step 2 -{" "}
                    <span className=" text-gray-400">
                        Enter the Amount of Token You Would Like to Purchase
                    </span>{" "}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-4">
                    {selectedToken === "BNB" ? (
                        <div className="col-span-2 mb-8 rounded-full p-3 glass-card w-fit mx-auto text-center text-gray-400 text-lg md:text-xl font-semibold">
                            Coming Soon
                        </div>
                    ) : (
                        <>
                            <AmountInput
                                value={amount}
                                onChange={handleAmountChange}
                                token={selectedToken}
                                tokenIcon={SUPPORTED_TOKENS[selectedToken].icon}
                            />
                            <AmountInput
                                value={
                                    amount ? calculateTokenAmount(amount) : ""
                                }
                                onChange={() => { }}
                                token="UCC"
                                tokenIcon="/images/icon.png"
                                readOnly
                            />
                        </>
                    )}
                </div>

                <PurchaseButton
                    status={status}
                    onClick={handlePurchase}
                    disabled={
                        !amount ||
                        parseFloat(amount) <= 0 ||
                        status == "APPROVING" ||
                        status == "APPROVED" ||
                        status == "PURCHASING"
                    }
                />
                <span className="mt-2 text-[#F0B90B]/90 text-sm">SPONSORED ID: {ref}</span>

            </div>

            <div className="border-t border-[#F0B90B]/20 pt-6">
                <Button
                    variant="secondary"
                    onClick={() => setShowActivities(!showActivities)}
                    className="w-full flex items-center justify-between text-left hover:bg-[#F0B90B]/50 hover:text-white"
                >
                    <span className="text-lg font-medium">
                        Recent Activities & Referrals
                    </span>
                    {showActivities ? (
                        <ChevronUp className="w-5 h-5" />
                    ) : (
                        <ChevronDown className="w-5 h-5" />
                    )}
                </Button>

                {showActivities && (
                    <div className="mt-6 space-y-6">
                        <ReferralStats
                            // referralLink={"https://ucchain.org/?ref=" + userId}
                            referralLink={`${window.location.origin}?ref=${userId}`}
                            usdtprice={(
                                tokenUSDTPrice * b2f(userTokens)
                            ).toFixed(2)}
                            totalEarningsUSDT={b2f(userEarningsUSDT).toFixed(2)}
                            totalEarningsucc={b2f(userTokens).toFixed(2)}
                            totalEarningsBNB={b2f(userEarningsBNB).toFixed(2)}
                            totalDepositBNB={b2f(userDepositsBNB).toFixed(2)}
                            totalDepositUSDT={b2f(userDepositsUSDT).toFixed(2)}
                        />

                        <div>
                            <h3 className="text-lg font-medium mb-4">
                                Recent Activities
                            </h3>
                            <ActivitiesTable
                                activities={activities}
                                length={activitiesLength}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
