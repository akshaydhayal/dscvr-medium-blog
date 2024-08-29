"use client"
import Dashboard from "@/components/Dashboard";
import Proposals from "@/components/Proposals";
import Image from "next/image";
import { useWallet } from '@solana/wallet-adapter-react';
import { Buffer } from 'buffer';
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Navbar from "@/components/Navbar";
import CreateProposal from "@/components/create";
import useCanvasWallet from '@/app/components/CanvasWalletProvider';
import { Button } from "@/components/ui/Button";
import { PublicKey } from "@solana/web3.js";
import Head from "next/head";
import HomePage from "./home/page";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import LoginModal from "@/component/LoginModal";
// import { CanvasClient } from "@dscvr-one/canvas-client-sdk";

if (typeof window !== 'undefined') {
  window.Buffer = Buffer;
}

export default function Home() {
  let { publicKey } = useWallet();
  const { connectWallet, walletAddress, iframe } = useCanvasWallet();

 const signMethod = useSelector((store: RootState) => store.signMethod.value);
 console.log("signMethod : ", signMethod);

  return (
    < div className="w-screen h-[90vh]">
      <HomePage />
      {signMethod == "signin" && 
        <div className="w-screen h-[90vh] fixed inset-0 backdrop-blur-md">
          <LoginModal />
        </div>
      }
      {/* {signMethod == "signup" && <SignupModal />} */}

      {/* {(publicKey || walletAddress) ?
          (
            <>
              <Navbar />
              <CreateProposal />
            </>
          ) : (
            <div className="flex items-center justify-center min-h-screen">
              <div className="border hover:border-slate-900 rounded">
                {iframe ? <Button onClick={connectWallet}>Connect Wallet</Button> : <WalletMultiButton style={{}} />}
              </div>
            </div>
          )
        } */}
    </div>
  );
}
