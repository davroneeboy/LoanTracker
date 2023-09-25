import "./globals.css";
import type { Metadata } from "next";
import StyledComponentsRegistry from "../../lib/AntdRegistry";
import TopMenu from "@/components/TopMenu";
import { UserContextProvider } from "@/context/user.context";

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
          <StyledComponentsRegistry>
            <TopMenu />
            {children}
          </StyledComponentsRegistry>
        </UserContextProvider>
      </body>
    </html>
  );
}
