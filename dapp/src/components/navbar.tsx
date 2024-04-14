"use client";

import { EthersContext } from "@/context/wallet";
import Link from "next/link";
import { useContext } from "react";

export default function Navbar() {
  const { address } = useContext(EthersContext);

  return (
    <div className="bg-black text-white p-3 flex justify-between h-[6vh]">
      <div className="flex gap-5 items-center">
        <Link href={"/portfolio"}>Portfolio</Link>
        <Link href={"/discover"}>Discover</Link>
      </div>
      <div>
        {!address && <p>Connecting Wallet...</p>}
        {address && (
          <pre className="bg-green-400 p-1 px-2 rounded">Wallet Connected</pre>
        )}
      </div>
    </div>
  );
}
