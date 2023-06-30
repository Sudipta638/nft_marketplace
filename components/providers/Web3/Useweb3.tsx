"use client"
import { createContext, useContext } from "react";
interface Web3Api {
    test: string;
  }
  const Web3Context = createContext<Web3Api | null>(null);

export function UseWeb3(): Web3Api | null {
    return useContext(Web3Context);
  }
  