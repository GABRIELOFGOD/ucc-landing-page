"use client";

import { b2f, b2i } from "@/hooks/usePresale";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import { formatDate, shortenAddress } from "@/lib/utils";
import { useEffect, useState } from "react";
import { usePresale } from "@/providers/provider";

export interface Activity {
  id: any;
  refId: any;
  tokenAmt: any;
  usdtAmt: any;
  bnbAmt: any;
  mode: any;
}

interface ActivitiesTableProps {
  activities: Activity[];
  length: number;
}

export function ActivitiesTable({ activities, length }: ActivitiesTableProps) {
  const rowsPerPage = 20; // Number of rows per page
  const { curPage, setCurPage } = usePresale();

  // Calculate total pages
  const totalPages = Math.ceil(length / rowsPerPage) == 0 ? 1 : Math.ceil(length / rowsPerPage);
  // console.log(totalPages, length, activities, " activities");

  // Pagination handlers
  const handlePreviousPage = () => setCurPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () =>
    setCurPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="rounded-xl border border-[#F0B90B]/20 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-[#F0B90B]/20">
            {/* <TableHead className="text-gray-400">Date</TableHead>
            <TableHead className="text-gray-400">Wallet</TableHead> */}
            <TableHead className="text-gray-400">User ID</TableHead>
            <TableHead className="text-gray-400">Type</TableHead>
            <TableHead className="text-right text-gray-400">Reward</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {activities.map((activity, id) => (
            <TableRow
              key={id}
              className="border-b text-left border-[#F0B90B]/20 bg-black/20 hover:bg-[#F0B90B]/5"
            >
              {/* <TableCell className="font-medium">{formatDate(activity.date)}</TableCell>
              <TableCell>
                <a 
                  href={`https://bscscan.com/address/${activity.walletAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#F0B90B] hover:underline"
                >
                  {shortenAddress(activity.walletAddress)}
                </a>
              </TableCell> */}
              <TableCell>
                {activity.mode == 1
                  ? parseInt(activity.refId.toString())
                  : parseInt(activity.id.toString())}
              </TableCell>
              <TableCell>
                <span className="capitalize">
                  {activity.mode == 0
                    ? "Investment"
                    : activity.mode == 1
                    ? `Referral`
                    : "Dividend"}
                </span>
              </TableCell>
              <TableCell className="text-right font-medium text-[#F0B90B]">
                {b2f(activity.tokenAmt).toFixed(2)} UCC{" "}
                {activity.mode == 1
                  ? b2f(activity.bnbAmt) == 0
                    ? `+ ${b2f(activity.usdtAmt).toFixed(2)} USDT`
                    : `+ ${b2f(activity.bnbAmt).toFixed(4)} BNB`
                  : ""}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={curPage === 1 || curPage === 0}
          className="px-4 py-2 bg-[#F0B90B] text-black rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-gray-400">
          Page {curPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={curPage === totalPages}
          className="px-4 py-2 bg-[#F0B90B] text-black rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
