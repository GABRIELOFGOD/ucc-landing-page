"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { X, Menu, ArrowLeft, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { shortenAddress } from "@/lib/utils";
import { usePresale } from "@/providers/provider";

import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { initWallet, userAddress, disconnectWallet } = usePresale();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  return (
    <nav className="fixed top-3 w-full z-50">
      <div className="w-[95%] relative mx-auto px-4 bg-background backdrop-blur-smx rounded-xl">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo Section */}
          <div className="hidden md:block items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image src='/ucc-logo.svg' width={40} height={40} alt="ucc Logo" className="w-14 shadow-sm rounded-full shadow-yellow-500 h-14 " />
              <span className="text-2xl font-normal">Universe Chain</span>
            </Link>
          </div>
          <div className="md:hidden  flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image src='/ucc-logo.svg' width={40} height={40} alt="ucc Logo" className="w-12 shadow-sm rounded-full shadow-yellow-500 h-12 " />
              {/* <span className="text-xl font-bold">Universal Chain</span> */}
            </Link>
          </div>





          {/* Mobile Buttons */}
          <div className="md:flex flex items-center  gap-1">
            <ArrowLeft className="md:w-4 md:h-4 w-3 h-3 text-yellow-500" />
            <Link href="https://ucchain.org" className="text-[#A6A9A8] text-[8px] md:text-base hover:text-white transition-colors">
              Back to Home
            </Link>

          </div>
          <div className="relative">
              <Button
                className="bg-primary !rounded-xl hover:bg-secondary hover:text-white hover:border hover:border-primary h-10 text-sm text-black flex items-center gap-2"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {userAddress ? "Disconnect Wallet" : "Connect Wallet"}
                <ChevronDown className="h-4 w-4" />
              </Button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-lg py-2 text-black">
                  {userAddress ? (
                    <button
                      className="block px-4 py-2 text-left hover:bg-gray-100 w-full"
                      onClick={() => {
                        disconnectWallet();
                        setDropdownOpen(false);
                      }}
                    >
                      Disconnect
                    </button>
                  ) : (
                    <button
                      className="block px-4 py-2 text-left hover:bg-gray-100 w-full"
                      onClick={() => {
                        initWallet();
                        setDropdownOpen(false);
                      }}
                    >
                      Connect Wallet
                    </button>
                  )}
                </div>
              )}
            </div>
          {/* Hamburger Menu for Mobile */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(true)}
              className="text-white"
            >
              <Menu className="h-6 w-6" />
            </Button>

            {/* Mobile Menu */}
            <div
              className={`fixed inset-0 bg-black bg-opacity-90 z-50 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
            >
              <div className="p-4 relative bg-dark flex flex-col h-full">
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center space-x-2">
                    <Image
                      src="/ucc-logo.svg"
                      alt="ucc-logo"
                      width={24}
                      height={24}
                      className="w-10 h-10"
                    />
                    <span className="text-white text-lg font-normal">Universe Chain</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="text-white"
                  >
                    <X className="h-6 w-6" />
                  </Button>
                </div>
                <div className="flex hidden flex-col justify-start gap-8 items-centerx px-4">
                  <Link href="#why-us" className="text-[#A6A9A8] hover:text-white transition-colors">
                    About us
                  </Link>
                  <Link href="#blockchain" className="text-[#A6A9A8] hover:text-white transition-colors">
                    Blockchain
                  </Link>
                  <Link href="#tokenomics" className="text-[#A6A9A8] hover:text-white transition-colors">
                    Tokenomics
                  </Link>
                  <Link href="#roadmap" className="text-[#A6A9A8] hover:text-white transition-colors">
                    Roadmap
                  </Link>
                  <Link href="#projects" className="text-[#A6A9A8] hover:text-white transition-colors">
                    Projects
                  </Link>
                  <Link href="#faqs" className="text-[#A6A9A8] hover:text-white transition-colors">
                    FAQs
                  </Link>
                </div>




                {/* Buttons in Mobile Menu */}
                <div className="mt-auto space-y-6">
                  <div className="flex flex-col items-center space-y-4">
                    <Link href="https://ucchain.org" className="text-[#A6A9A8] hover:text-white transition-colors">
                      Back to Home
                    </Link>
                    <div className="social flex gap-4 items-center">
                      <Link
                        href='https://x.com/ucchainofficial'
                        className="text-muted-foreground flex items-center hover:text-foreground transition-colors font-light"
                      >

                        <Image
                          src="/images/x.svg"
                          alt="ucc-logo"
                          width={24}
                          height={24}
                          priority
                        />
                      </Link>
                      <Link
                        href='https://t.me/universecryptochain'
                        className="text-muted-foreground flex gap-1 items-center hover:text-foreground transition-colors font-light"
                      >
                        <Image
                          src="/images/telegram.svg"
                          alt="telegram-logo"
                          width={18}
                          height={18}
                          priority
                        />
                        <span>Chat</span>

                      </Link>
                      <Link
                        href='https://t.me/ucchaincommunity'
                        className="text-muted-foreground gap-1 flex items-center hover:text-foreground transition-colors font-light"
                      >
                        <Image
                          src="/images/telegram.svg"
                          alt="telegram-logo"
                          width={18}
                          height={18}
                          priority
                        />
                        <span>Channel</span>

                      </Link>
                    </div>

                    <Button
                      className="bg-primary !rounded-xl hover:bg-secondary hover:text-white hover:border hover:border-primary h-10 text-sm text-black inset-0"
                      onClick={initWallet}
                    >
                      {userAddress === "" ? "Connect Wallet" : shortenAddress(userAddress)}
                    </Button>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav >
  );
}