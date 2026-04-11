import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaPinterest,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-[#FFFFFF] border-t border-[#E1E1E1] pt-[64px] pb-[32px] px-6 lg:px-12 mt-auto">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24 mb-[64px]">
        {/* Column 1 */}
        <div className="flex flex-col gap-6">
          <h2 className="text-[#000000] font-[900] uppercase text-[18px] tracking-[0.08em]">
            FASHION STORE
          </h2>
          <p className="text-[#757575] italic text-[14px] leading-[1.8] max-w-sm">
            Defining a lifestyle built around purposeful aesthetic choices and
            uncompromising quality.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center text-[#757575] hover:text-[#000000] transition-colors duration-300"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center text-[#757575] hover:text-[#000000] transition-colors duration-300"
            >
              <FaFacebook size={20} />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center text-[#757575] hover:text-[#000000] transition-colors duration-300"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="https://www.pinterest.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center text-[#757575] hover:text-[#000000] transition-colors duration-300"
            >
              <FaPinterest size={20} />
            </a>
          </div>
        </div>

        {/* Column 2 */}
        <div className="flex flex-col gap-6">
          <h3 className="text-[#000000] font-bold text-[13px] uppercase tracking-[0.1em]">
            QUICK LINKS
          </h3>
          <ul className="flex flex-col gap-4 text-[#757575] text-[13px] uppercase tracking-widest">
            {["SHOP", "COLLECTIONS", "ABOUT US", "CONTACT", "FAQ"].map(
              (link) => (
                <li key={link}>
                  <Link
                    to={
                      link === "SHOP"
                        ? "/"
                        : link === "FAQ"
                          ? "/faq"
                          : `/${link.replace(" US", "").toLowerCase()}`
                    }
                    className="hover:text-[#000000] transition-colors relative group w-fit inline-block"
                  >
                    {link}
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#000000] transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
              ),
            )}
          </ul>
        </div>

        {/* Column 3 */}
        <div className="flex flex-col gap-6">
          <h3 className="text-[#000000] font-bold text-[13px] uppercase tracking-[0.1em]">
            JOIN OUR MAILING LIST
          </h3>
          <p className="text-[#757575] text-[13px] leading-[1.6]">
            Subscribe to receive updates, access to exclusive deals, and more.
          </p>
          <form
            className="flex flex-col sm:flex-row gap-0 w-full mt-2"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="ENTER YOUR EMAIL"
              className="flex-1 border border-[#E1E1E1] p-[14px] outline-none focus:border-[#000000] text-[#000000] text-[12px] uppercase tracking-widest placeholder:text-[#757575] shadow-none rounded-none"
              required
            />
            <button
              type="submit"
              className="bg-[#000000] text-[#FFFFFF] px-6 py-[14px] font-bold uppercase tracking-[0.1em] text-[12px] hover:bg-[#575757] transition-colors border border-[#000000] min-w-[120px] rounded-none sm:ml-[-1px]"
            >
              SUBSCRIBE
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-[1280px] mx-auto border-t border-[#E1E1E1] pt-[32px] text-center flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[#757575] text-[12px] uppercase tracking-widest">
          &copy; {new Date().getFullYear()} FASHION STORE. ALL RIGHTS RESERVED.
        </p>
        <div className="flex gap-6 text-[#757575] text-[12px] uppercase tracking-widest">
          <a href="#" className="hover:text-[#000000] transition-colors">
            PRIVACY
          </a>
          <a href="#" className="hover:text-[#000000] transition-colors">
            TERMS
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
