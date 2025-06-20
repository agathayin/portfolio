"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import logo from "./assets/logo.svg";
import iconBrandRecognition from "./assets/icon-brand-recognition.svg";
import iconDetailedRecords from "./assets/icon-detailed-records.svg";
import iconFullyCustomizable from "./assets/icon-fully-customizable.svg";
import iconShortenLink from "./assets/icon-shorten-link.svg";
import illustrationWorking from "./assets/illustration-working.svg";
import bgBoostDesktop from "./assets/bg-boost-desktop.svg";
import bgBoostMobile from "./assets/bg-boost-mobile.svg";
import bgShortenDesktop from "./assets/bg-shorten-desktop.svg";
import bgShortenMobile from "./assets/bg-shorten-mobile.svg";
import iconFacebook from "./assets/icon-facebook.svg";
import iconTwitter from "./assets/icon-twitter.svg";
import iconPinterest from "./assets/icon-pinterest.svg";
import iconInstagram from "./assets/icon-instagram.svg";

interface ShortenedLink {
  id: number;
  original: string;
  shortened: string;
  copied: boolean;
}

const STORAGE_KEY = "shortly_shortened_links";

export default function ShortlyLandingPage() {
  const [linkInput, setLinkInput] = useState("");
  const [shortenedLinks, setShortenedLinks] = useState<ShortenedLink[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Load shortened links from localStorage on component mount
  useEffect(() => {
    try {
      const savedLinks = localStorage.getItem(STORAGE_KEY);
      if (savedLinks) {
        const parsedLinks = JSON.parse(savedLinks);
        // Reset copied state for all links when loading from storage
        const linksWithResetCopied = parsedLinks.map((link: ShortenedLink) => ({
          ...link,
          copied: false,
        }));
        setShortenedLinks(linksWithResetCopied);
      }
    } catch (error) {
      console.error("Error loading shortened links from localStorage:", error);
    }
  }, []);

  // Save shortened links to localStorage whenever the list changes
  useEffect(() => {
    try {
      if (shortenedLinks.length > 0) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(shortenedLinks));
      }
    } catch (error) {
      console.error("Error saving shortened links to localStorage:", error);
    }
  }, [shortenedLinks]);

  // URL validation function
  const isValidUrl = (string: string) => {
    try {
      const url = new URL(string);
      // Check protocol
      if (!["http:", "https:"].includes(url.protocol)) {
        return false;
      }

      return true;
    } catch (_) {
      if (string.includes(".") && !string.includes("localhost") && string.length > 2) {
        return true;
      }
      return false;
    }
  };

  // URL shortening function using TinyURL API
  const shortenUrl = async (originalUrl: string) => {
    try {
      // Ensure URL has protocol
      let urlToShorten = originalUrl;
      if (!originalUrl.startsWith("http://") && !originalUrl.startsWith("https://")) {
        urlToShorten = "https://" + originalUrl;
      }

      const response = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(urlToShorten)}`);
      const shortUrl = await response.text();
      console.log("Shortened URL:", shortUrl);

      // Check if the response is a valid shortened URL
      if (shortUrl.includes("tinyurl.com")) {
        return shortUrl;
      } else {
        throw new Error("Failed to shorten URL");
      }
    } catch (error) {
      console.log("Shortened URL ERR:", error);
      // Fallback: create a mock shortened URL for demo purposes
      const randomId = Math.random().toString(36).substr(2, 8);
      return `https://short.ly/${randomId}`;
    }
  };

  const handleShortenLink = async () => {
    if (!linkInput.trim()) {
      setError("Please add a link");
      return;
    }

    if (!isValidUrl(linkInput.trim())) {
      setError("Please enter a valid URL");
      return;
    }

    if (shortenedLinks.some((link) => link.original === linkInput.trim())) {
      setError("This link has already been shortened");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const shortUrl = await shortenUrl(linkInput.trim());
      let originalUrl = linkInput.trim();
      if (!originalUrl.startsWith("http://") && !originalUrl.startsWith("https://")) {
        originalUrl = "https://" + originalUrl;
      }
      const newLink = {
        id: Date.now(),
        original: originalUrl,
        shortened: shortUrl,
        copied: false,
      };

      setShortenedLinks((prev) => [newLink, ...prev]);
      setLinkInput("");
    } catch (err) {
      setError("Failed to shorten URL. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async (shortUrl: string, id: number) => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setShortenedLinks((prev) =>
        prev.map((link) => (link.id === id ? { ...link, copied: true } : { ...link, copied: false }))
      );

      // Reset copied state after 3 seconds
      setTimeout(() => {
        setShortenedLinks((prev) => prev.map((link) => ({ ...link, copied: false })));
      }, 3000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleShortenLink();
    }
  };

  return (
    <div className="min-h-screen ">
      {/* Header */}
      <header className="bg-white shadow-sm relative z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <div className="text-2xl font-bold text-gray-800 hidden md:block">Shortly</div>
              <div className="text-2xl font-bold text-gray-800 md:hidden">Shortly</div>
              <nav className="hidden md:flex space-x-8">
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Features
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Pricing
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Resources
                </a>
              </nav>
            </div>

            {/* Desktop buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <button className="text-gray-600 hover:text-gray-900">Login</button>
              <button className="bg-cyan-400 hover:bg-cyan-300 text-white px-6 py-2 rounded-full font-medium transition-colors">
                Sign Up
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-gray-600 hover:text-gray-900 p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-50">
          <div className="bg-purple-900 h-full w-full pt-20 px-6">
            <nav className="flex flex-col space-y-8 text-center">
              <a href="#" className="text-white text-lg font-medium py-3" onClick={() => setIsMenuOpen(false)}>
                Features
              </a>
              <a href="#" className="text-white text-lg font-medium py-3" onClick={() => setIsMenuOpen(false)}>
                Pricing
              </a>
              <a href="#" className="text-white text-lg font-medium py-3" onClick={() => setIsMenuOpen(false)}>
                Resources
              </a>

              {/* Divider */}
              <div className="border-t border-purple-700 my-6"></div>

              {/* Mobile Login/Sign Up */}
              <div className="flex flex-col space-y-4">
                <button className="text-white text-lg font-medium py-3" onClick={() => setIsMenuOpen(false)}>
                  Login
                </button>
                <button
                  className="bg-cyan-400 hover:bg-cyan-300 text-white px-8 py-3 rounded-full font-medium text-lg transition-colors mx-4"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </button>
              </div>
            </nav>
          </div>
        </div>
      )}
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                More than just shorter links
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Build your brand&apos;s recognition and get detailed insights on how your links are performing.
              </p>
              <a
                className="bg-cyan-400 hover:bg-cyan-300 text-white px-8 py-4 rounded-full font-semibold text-lg transition-colors"
                href="#shorten-link"
              >
                Get Started
              </a>
            </div>
            <div className="relative">
              <Image src={illustrationWorking} alt="Working Illustration" className="w-full h-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Link Shortener Section */}
      <section className="bg-gradient-to-b from-white from-50% to-gray-50 to-50%" id="shorten-link">
        <div className="bg-[#38334f] rounded-2xl p-6 sm:p-8 relative overflow-hidden max-w-4xl mx-auto">
          <div
            className="absolute inset-0 bg-gradient-to-r from-purple-900 to-purple-800"
            style={{
              backgroundImage: `url(${isMobile ? bgShortenMobile.src : bgShortenDesktop.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Shorten a link here..."
                  value={linkInput}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLinkInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className={`w-full px-6 py-4 rounded-xl text-gray-900 placeholder-gray-500 border-0 focus:ring-2 focus:ring-cyan-400 focus:outline-none ${
                    error ? "ring-2 ring-red-400" : ""
                  }`}
                />
                {error && <p className="text-red-400 text-sm mt-2 italic">{error}</p>}
              </div>
              <button
                onClick={handleShortenLink}
                disabled={isLoading}
                className="bg-cyan-400 hover:bg-cyan-300 disabled:bg-cyan-300 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl font-semibold transition-colors whitespace-nowrap"
              >
                {isLoading ? "Shortening..." : "Shorten It!"}
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* Shortened Links List */}
      <section className=" py-3 bg-gray-50">
        <div className="max-w-4xl mx-auto ">
          {shortenedLinks.length > 0 && (
            <div className="mt-6 space-y-4 ">
              {shortenedLinks.map((link) => (
                <div key={link.id} className="bg-white rounded-lg p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-700 truncate text-sm sm:text-base">{link.original}</p>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                      <a
                        href={link.shortened}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-400 hover:text-cyan-300 font-medium text-sm sm:text-base"
                      >
                        {link.shortened}
                      </a>
                      <button
                        onClick={() => copyToClipboard(link.shortened, link.id)}
                        className={`px-6 py-2 rounded-lg font-bold text-sm transition-colors whitespace-nowrap ${
                          link.copied ? "bg-gray-700 text-white" : "bg-cyan-400 hover:bg-cyan-300 text-white"
                        }`}
                      >
                        {link.copied ? "Copied!" : "Copy"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center md:text-left">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">Advanced Statistics</h2>
          <p className="text-xl text-gray-600 mb-16 max-w-2xl mx-auto">
            Track how your links are performing across the web with our advanced statistics dashboard.
          </p>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-32 left-1/4 right-1/4 h-2 bg-cyan-400 rounded-full"></div>

            {/* Brand Recognition */}
            <div className="bg-white p-8 rounded-xl shadow-lg relative">
              <div className="w-16 h-16 bg-[#333b60] rounded-full flex items-center justify-center mb-6 relative -top-16 mx-auto md:mx-0">
                <Image src={iconBrandRecognition} alt="iconBrandRecognition" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 -mt-6">Brand Recognition</h3>
              <p className="text-gray-600 leading-relaxed">
                Boost your brand recognition with each click. Generic links don&apos;t mean a thing. Branded links help
                instil confidence in your content.
              </p>
            </div>

            {/* Detailed Records */}
            <div className="bg-white p-8 rounded-xl shadow-lg relative md:mt-8">
              <div className="w-16 h-16 bg-[#333b60] rounded-full flex items-center justify-center mb-6 relative -top-16 mx-auto md:mx-0">
                <Image src={iconDetailedRecords} alt="iconDetailedRecords" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 -mt-6">Detailed Records</h3>
              <p className="text-gray-600 leading-relaxed">
                Gain insights into who is clicking your links. Knowing when and where people engage with your content
                helps inform better decisions.
              </p>
            </div>

            {/* Fully Customizable */}
            <div className="bg-white p-8 rounded-xl shadow-lg relative md:mt-16">
              <div className="w-16 h-16 bg-[#333b60] rounded-full flex items-center justify-center mb-6 relative -top-16 mx-auto md:mx-0">
                <Image src={iconFullyCustomizable} alt="iconFullyCustomizable" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 -mt-6">Fully Customizable</h3>
              <p className="text-gray-600 leading-relaxed">
                Improve brand awareness and content discoverability through customizable links, supercharging audience
                engagement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-20 px-4 sm:px-6 lg:px-8 bg-[#38334f] relative overflow-hidden"
        style={{
          backgroundImage: `url(${isMobile ? bgBoostMobile.src : bgBoostDesktop.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-8">Boost your links today</h2>
          <button className="bg-cyan-400 hover:bg-cyan-300 text-white px-8 py-4 rounded-full font-semibold text-lg transition-colors">
            Get Started
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center md:text-left">
          <div className="grid md:grid-cols-5 gap-8">
            <div className="md:col-span-1">
              <div className="text-2xl font-bold mb-8">Shortly</div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Link Shortening
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Branded Links
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Analytics
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Developers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Support
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Our Team
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <div className="flex space-x-4 justify-center md:justify-start">
                <a href="#" className="w-6 h-6 text-gray-400 hover:text-white transition-colors">
                  <Image src={iconFacebook} alt="iconFacebook" />
                </a>
                <a href="#" className="w-6 h-6 text-gray-400 hover:text-white transition-colors">
                  <Image src={iconTwitter} alt="iconTwitter" />
                </a>
                <a href="#" className="w-6 h-6 text-gray-400 hover:text-white transition-colors">
                  <Image src={iconPinterest} alt="iconPinterest" />
                </a>
                <a href="#" className="w-6 h-6 text-gray-400 hover:text-white transition-colors">
                  <Image src={iconInstagram} alt="iconInstagram" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
