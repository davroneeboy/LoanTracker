import type { Metadata } from "next";
import StyledComponentsRegistry from "../../lib/AntdRegistry";
import TopMenu from "@/components/TopMenu";
import { UserContextProvider } from "@/context/user.context";
import { LoanContextProvider } from "@/context/loan.context";

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
      <body>
        <UserContextProvider>
          <LoanContextProvider>
            <StyledComponentsRegistry>
              <TopMenu />
              {children}
            </StyledComponentsRegistry>
          </LoanContextProvider>
        </UserContextProvider>
      </body>
    </html>
  );
}
