import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import Header from "../src/components/Header";
function MyApp({ Component, pageProps }) {
  return (
    <div className="text-white bg-black">
      <div className="w-full bg-headerMain">
            <div className="container">
              <Header />
            </div>
          </div>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
