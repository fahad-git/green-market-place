/**
 * @description: This file contains sub-layout for the page. This layout uses the main layout stucture.
 */
import RootLayout from "../layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  // return <RootLayout>{children}</RootLayout>;
  return <div>{children}</div>;
}
