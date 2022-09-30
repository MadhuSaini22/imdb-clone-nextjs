import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import Header from "../src/components/Header";
import { AuthUserProvider } from "../src/contexts/AuthUserProvider";
import Footer from "../src/components/Footer";
import { GlobalProvider } from "../src/contexts/GlobalState";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <AuthUserProvider>
        <GlobalProvider>
          <div className="text-white bg-black">
            <div className="w-full bg-headerMain">
              <div className="container">
                <Header />
              </div>
            </div>
            <Component {...pageProps} />
            <div className="w-full bg-black">
              <div className="container">
                <Footer />
              </div>
            </div>
          </div>
        </GlobalProvider>
      </AuthUserProvider>
    </SessionProvider>
  );
}

export default MyApp;
