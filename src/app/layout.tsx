import type { Metadata } from "next";
import StyledComponentsRegistry from "../../lib/AntdRegistry";
import TopMenu from "@/components/TopMenu";
import { UserContextProvider } from "@/context/user.context";
import { LoanContextProvider } from "@/context/loan.context";
import { Suspense } from "react";
import Loading from "./loading";
import "./globals.css";

export const metadata: Metadata = {
  title: "Greystone Labs Frontend Code Challenge",
  description: "Submission by Andy Wong",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <UserContextProvider>
          <LoanContextProvider>
            <StyledComponentsRegistry>
              <div className="flex flex-col min-h-screen">
                <TopMenu />
                <main className="flex-1 container mx-auto px-4 py-8 max-w-7xl">
                  <Suspense fallback={<Loading />}>{children}</Suspense>
                </main>
              </div>
            </StyledComponentsRegistry>
          </LoanContextProvider>
        </UserContextProvider>
      </body>
    </html>
  );
}
