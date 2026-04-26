import "bootstrap/dist/css/bootstrap.min.css";
import "../src/style.css";
import "../src/App.css";
import Navbar from "../src/components/Navbar";
import Footer from "../src/components/Footer";
import ScrollToTop from "../src/components/ScrollToTop";

export const metadata = {
  title: "Eddie Phung | Portfolio",
  description: "Fintech Researcher, Crypto Writer & Automation Builder. Turning emerging tech into real solutions.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700&family=Exo+2:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet" />
      </head>
      <body>
        <div className="App">
          <Navbar />
          <ScrollToTop />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
