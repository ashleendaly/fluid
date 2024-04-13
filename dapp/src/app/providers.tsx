"use client";

import { ReactNode } from "react";
import WalletProvider from "../context/wallet";

export function Providers({ children }: { children: ReactNode }) {
  return <WalletProvider>{children}</WalletProvider>;
}
