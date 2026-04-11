import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-fashion-white border-t border-fashion-border pt-16 pb-8 px-5 lg:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-[13px] uppercase tracking-widest text-fashion-grey">
        
        {/* Brand Info */}
        <div className="flex flex-col gap-4">
          <h2 className="text-fashion-black font-bold text-lg mb-2">FASHION STORE</h2>
          <p className="leading-relaxed">
            ELEVATING MINIMALIST STYLE WITH CURATED DESIGNS. 
            <br className="hidden lg:block"/> EVERY PIECE CRAFTED FOR EXCELLENCE.
          </p>
          <p className="mt-4">
            INFO@FASHIONSTORE.COM<br/>
            +1 234 567 890
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-4">
          <h3 className="text-fashion-black font-bold mb-2">QUICK LINKS</h3>
          <ul className="flex flex-col gap-2">
            <li><a href="#" className="hover:text-fashion-black transition-colors">SHOP ALL</a></li>
            <li><a href="#" className="hover:text-fashion-black transition-colors">NEW ARRIVALS</a></li>
            <li><a href="#" className="hover:text-fashion-black transition-colors">OUR STORY</a></li>
            <li><a href="#" className="hover:text-fashion-black transition-colors">SHIPPING & RETURNS</a></li>
            <li><a href="#" className="hover:text-fashion-black transition-colors">FAQ</a></li>
          </ul>
        </div>

        {/* Newsletter Signup */}
        <div className="flex flex-col gap-4">
          <h3 className="text-fashion-black font-bold mb-2">JOIN OUR MAILING LIST</h3>
          <p>STAY UPDATED WITH OUR LATEST COLLECTIONS AND EXCLUSIVE OFFERS.</p>
          
          <form className="mt-2 flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="ENTER YOUR EMAIL" 
              className="w-full border border-fashion-border p-3 outline-none focus:border-fashion-black bg-transparent object-none rounded-none placeholder:text-fashion-grey text-fashion-black"
              required
            />
            <button 
              type="submit" 
              className="w-full bg-fashion-black text-fashion-white p-3 font-bold hover:bg-[#575757] transition-colors rounded-none"
            >
              SUBSCRIBE
            </button>
          </form>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-fashion-border flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] uppercase tracking-widest text-fashion-grey">
        <p>&copy; {new Date().getFullYear()} FASHION STORE. ALL RIGHTS RESERVED.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-fashion-black">TERMS OF SERVICE</a>
          <a href="#" className="hover:text-fashion-black">PRIVACY POLICY</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
