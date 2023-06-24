import Head from "next/head";
import { AppBar, Body } from ".";

const Page = ({ pageTitle = "ONE Visibility", children }) => {
  
  return (
    <main>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <AppBar pageTitle={pageTitle} />
      <Body>{children}</Body>
    </main>
  );
};

export default Page;
