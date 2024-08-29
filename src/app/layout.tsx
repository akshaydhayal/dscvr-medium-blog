import React from "react";
import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";
import AppWalletProvider from "./components/AppWalletProvider";
import { CanvasWalletProvider } from "./components/CanvasWalletProvider";
import Container from "./components/container";
import { Provider, useSelector } from "react-redux";
import { RootState, store } from "@/store/store";
import ReduxProvider from "@/store/ReduxProvider";
import Navbar from "@/component/Navbar";
import LoginModal from "@/component/LoginModal";
import SignupModal from "@/component/SignupModal";

const inter = Inter({ subsets: ["latin"] });
const syne = Syne({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DAO",
  description: "Create DAO Voting",
  openGraph: {
    title: "DAO",
    description: "Create DAO Voting - Powered by Solana",
    type: "website",
    url: "https://dao-frontend-beta.vercel.app/",
    images: "https://news.miami.edu/_assets/images-stories/2023/02/dao-web3-hero-940x529.jpg"
  },
  other: {
    'dscvr:canvas:version': "vNext",
  }
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // const signMethod = useSelector((store: RootState) => store.signMethod.value);
  // console.log("signMethod : ", signMethod);

  return (
    <html lang="en">
      <body className="m-0 p-0 w-screen h-screen">
        {/* <Provider store={store}> */}
        <AppWalletProvider>
          <CanvasWalletProvider>
            <Container>
              <ReduxProvider>
                <div className="w-screen h-screen">
                  <div className="w-screen h-[10vh]">
                    <Navbar />
                  </div>
                  <div className="w-screen h-[90vh]">
                    {children}
                  </div>
                </div>
                {/* {signMethod == "signin" && <LoginModal />} */}
                {/* {signMethod == "signup" && <SignupModal />} */}
              </ReduxProvider>
            </Container>
          </CanvasWalletProvider>
        </AppWalletProvider>
        {/* </Provider> */}
      </body>
    </html>
  );
}


