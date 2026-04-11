import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      setSubmitted(true);
    }
  };

  return (
    <div className="w-full bg-[#FFFFFF]">
      {/* Hero Banner */}
      <div className="w-full h-[300px] bg-[#000000] flex flex-col items-center justify-center text-center">
        <div className="w-[60px] h-[1px] bg-[#FFFFFF] mb-6"></div>
        <h1 className="text-[#FFFFFF] uppercase tracking-[0.12em] text-[clamp(40px,6vw,80px)] font-bold">
          CONTACT US
        </h1>
        <p className="text-[13px] tracking-[0.25em] text-[rgba(255,255,255,0.6)] mt-4 uppercase font-[500]">
          WE'D LOVE TO HEAR FROM YOU
        </p>
      </div>

      <div className="section-wrapper w-full max-w-[1280px] mx-auto min-h-[80vh]">
        <div className="section-heading-container" data-aos="fade-up">
           <span className="section-label">GET IN TOUCH</span>
           <h2 className="section-title">SEND US A MESSAGE</h2>
           <div className="section-underline"></div>
        </div>

        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-16 lg:gap-24 mt-8">
          
          {/* Left Side Info */}
          <div className="flex-1 flex flex-col" data-aos="fade-up">
            <p className="text-[#757575] leading-[1.8] text-[15px] mb-12 pr-4">
              Whether you have a question about our collections, need styling advice, or simply want to say hello, our team follows up on all inquiries within 24 hours.
            </p>
            
            <div className="flex flex-col gap-10 text-[#757575] text-[14px]">
              <div>
                <p className="text-[#000000] font-bold mb-2 uppercase tracking-[0.1em] text-[13px]">GENERAL INQUIRIES</p>
                <p className="uppercase tracking-widest">INFO@FASHIONSTORE.COM</p>
              </div>
              <div>
                <p className="text-[#000000] font-bold mb-2 uppercase tracking-[0.1em] text-[13px]">PRESS & MEDIA</p>
                <p className="uppercase tracking-widest">PRESS@FASHIONSTORE.COM</p>
              </div>
              <div>
                <p className="text-[#000000] font-bold mb-2 uppercase tracking-[0.1em] text-[13px]">HEADQUARTERS</p>
                <p className="uppercase tracking-widest">123 MINIMALIST AVE, SUITE 400<br/>NEW YORK, NY 10012</p>
              </div>
            </div>
          </div>

          {/* Right Side Form */}
          <div className="flex-1" data-aos="fade-up" data-aos-delay="200">
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full min-h-[300px] border border-[#E1E1E1] bg-[#F9F9F9] p-8 text-center animate-fade-in-up">
                <h3 className="text-[#000000] font-bold uppercase tracking-[0.1em] text-[18px] mb-4">
                  THANK YOU — WE'LL BE IN TOUCH SOON
                </h3>
              </div>
            ) : (
              <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2 relative">
                  <input 
                    type="text" 
                    placeholder="YOUR NAME" 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full border ${errors.name ? 'border-red-500' : 'border-[#E1E1E1]'} p-[16px] bg-transparent outline-none focus:border-[#000000] focus:ring-0 rounded-none text-[#000000] text-[13px] uppercase tracking-widest placeholder:text-[#757575] transition-colors duration-300`}
                  />
                  {errors.name && <span className="text-[#000000] italic text-[12px] absolute -bottom-5 left-0">{errors.name}</span>}
                </div>
                <div className="flex flex-col gap-2 relative">
                  <input 
                    type="email" 
                    placeholder="YOUR EMAIL" 
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full border ${errors.email ? 'border-red-500' : 'border-[#E1E1E1]'} p-[16px] bg-transparent outline-none focus:border-[#000000] focus:ring-0 rounded-none text-[#000000] text-[13px] uppercase tracking-widest placeholder:text-[#757575] transition-colors duration-300 ${errors.name ? 'mt-4' : ''}`}
                  />
                  {errors.email && <span className="text-[#000000] italic text-[12px] absolute -bottom-5 left-0">{errors.email}</span>}
                </div>
                <div className="flex flex-col gap-2 relative">
                  <textarea 
                    placeholder="YOUR MESSAGE" 
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full border ${errors.message ? 'border-red-500' : 'border-[#E1E1E1]'} p-[16px] bg-transparent outline-none focus:border-[#000000] focus:ring-0 rounded-none text-[#000000] text-[13px] uppercase tracking-widest placeholder:text-[#757575] min-h-[200px] resize-y transition-colors duration-300 ${errors.email ? 'mt-4' : ''}`}
                  ></textarea>
                  {errors.message && <span className="text-[#000000] italic text-[12px] absolute -bottom-5 left-0">{errors.message}</span>}
                </div>
                <button 
                  type="submit"
                  className={`bg-[#000000] text-[#FFFFFF] py-[18px] rounded-none uppercase font-bold tracking-[0.1em] text-[13px] hover:bg-[#575757] transition-all duration-300 w-full cursor-pointer ${errors.message ? 'mt-8' : 'mt-4'}`}
                >
                  SEND MESSAGE
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
