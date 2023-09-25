import "./globals.css";
import type { Metadata } from "next";
import StyledComponentsRegistry from "../../lib/AntdRegistry";
import TopMenu from "@/components/TopMenu";

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
        <StyledComponentsRegistry>
          <TopMenu />
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
