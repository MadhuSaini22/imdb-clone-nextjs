import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import Header from "../src/components/Header";
import { AuthUserProvider } from '../src/contexts/AuthUserProvider';
import Footer from "../src/components/Footer";
function MyApp({ Component, pageProps }) {
  return (
    <AuthUserProvider>
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
    </AuthUserProvider>
  );
}

export default MyApp;
