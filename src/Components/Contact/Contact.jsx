import React from 'react';

const Contact = () => {
  return (
    <div className="w-full bg-[#FFFFFF] min-h-screen py-20 px-5 lg:px-10">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-16 lg:gap-24">
        
        {/* Left Side Info */}
        <div className="flex-1 flex flex-col">
          <h1 className="text-[#000000] font-bold uppercase tracking-[0.1em] text-3xl md:text-4xl mb-8">
            GET IN TOUCH
          </h1>
          <p className="text-[#757575] leading-[1.8] text-[15px] mb-8 pr-4">
            Whether you have a question about our collections, need styling advice, or simply want to say hello, our team follows up on all inquiries within 24 hours.
          </p>
          
          <div className="flex flex-col gap-6 text-[#757575] text-[14px] uppercase tracking-widest">
            <div>
              <p className="text-[#000000] font-bold mb-1">GENERAL INQUIRIES</p>
              <p>INFO@FASHIONSTORE.COM</p>
            </div>
            <div>
              <p className="text-[#000000] font-bold mb-1">PRESS & MEDIA</p>
              <p>PRESS@FASHIONSTORE.COM</p>
            </div>
            <div>
              <p className="text-[#000000] font-bold mb-1">HEADQUARTERS</p>
              <p>123 MINIMALIST AVE, SUITE 400<br/>NEW YORK, NY 10012</p>
            </div>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="flex-1">
          <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col gap-2">
              <input 
                type="text" 
                placeholder="YOUR NAME" 
                className="w-full border border-[#E1E1E1] p-[14px] bg-transparent outline-none focus:border-[#000000] rounded-none text-[#000000] text-[13px] uppercase tracking-widest placeholder:text-[#757575]"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <input 
                type="email" 
                placeholder="YOUR EMAIL" 
                className="w-full border border-[#E1E1E1] p-[14px] bg-transparent outline-none focus:border-[#000000] rounded-none text-[#000000] text-[13px] uppercase tracking-widest placeholder:text-[#757575]"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <textarea 
                placeholder="YOUR MESSAGE" 
                className="w-full border border-[#E1E1E1] p-[14px] bg-transparent outline-none focus:border-[#000000] rounded-none text-[#000000] text-[13px] uppercase tracking-widest placeholder:text-[#757575] min-h-[200px] resize-y"
                required
              ></textarea>
            </div>
            <button 
              type="submit"
              className="bg-[#000000] text-[#FFFFFF] py-[16px] rounded-none uppercase font-bold tracking-[0.1em] text-[13px] hover:bg-[#575757] transition-colors w-full cursor-pointer mt-2"
            >
              SEND MESSAGE
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Contact;
