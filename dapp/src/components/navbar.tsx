"use client";

import { EthersContext } from "@/context/wallet";
import Link from "next/link";
import { useContext } from "react";

export default function Navbar() {
  const { address } = useContext(EthersContext);

  return (
    <div className="bg-slate-800 text-white p-3 flex justify-between h-[5vh]">
      <div className="flex gap-5">
        <Link href={"/portfolio"}>Portfolio</Link>
        <Link href={"/discover"}>Discover</Link>
      </div>
      <div>
        {!address && <p>Connecting Wallet...</p>}
        {address && <pre>Connected Wallet: {address}</pre>}
      </div>
    </div>
  );
}
