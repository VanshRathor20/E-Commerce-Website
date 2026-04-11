import { useState } from "react";
import { Link } from "react-router-dom";
import { faqData } from "./faqData";

const FAQ = () => {
  const [openItem, setOpenItem] = useState(null);

  const toggleItem = (categoryIndex, itemIndex) => {
    const key = `${categoryIndex}-${itemIndex}`;
    setOpenItem((current) => (current === key ? null : key));
  };

  return (
    <div className="bg-[#FFFFFF] text-[#000000]">
      <section className="bg-[#000000] text-[#FFFFFF] h-[200px] flex items-center justify-center px-6 text-center">
        <div>
          <h1 className="text-[clamp(40px,6vw,72px)] font-bold uppercase tracking-[0.15em] leading-none">
            FAQ
          </h1>
          <p className="text-[12px] uppercase tracking-[0.3em] text-white/60 mt-3">
            FREQUENTLY ASKED QUESTIONS
          </p>
        </div>
      </section>

      <section className="max-w-[800px] mx-auto px-6 pb-[80px]">
        {faqData.map((group, categoryIndex) => (
          <div key={group.category}>
            <h2 className="text-[13px] uppercase tracking-[0.2em] text-[#757575] mb-4 mt-12">
              {group.icon} {group.category}
            </h2>

            {group.items.map((item, itemIndex) => {
              const key = `${categoryIndex}-${itemIndex}`;
              const isOpen = openItem === key;

              return (
                <div key={item.q}>
                  <button
                    type="button"
                    onClick={() => toggleItem(categoryIndex, itemIndex)}
                    className="w-full flex items-center justify-between gap-6 text-left py-[18px] border-b border-[#E1E1E1] cursor-pointer hover:bg-[#FAFAFA]"
                  >
                    <span className="font-medium text-[15px] text-[#000000] uppercase tracking-[0.05em] leading-[1.6]">
                      {item.q}
                    </span>
                    <span className="text-[20px] text-[#000000] font-light leading-none flex-shrink-0">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out border-b border-[#E1E1E1] ${
                      isOpen ? "max-h-[240px]" : "max-h-0"
                    }`}
                  >
                    <div className="py-[16px] pb-[24px] text-[14px] text-[#757575] leading-[1.8]">
                      {item.a}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}

        <div className="mt-16 border border-[#E1E1E1] p-12 text-center">
          <h3 className="text-[20px] font-bold uppercase tracking-[0.1em] text-[#000000]">
            STILL HAVE QUESTIONS?
          </h3>
          <p className="text-[#757575] mt-3 mb-8">Our team is here to help</p>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center bg-[#000000] text-[#FFFFFF] px-10 py-[14px] uppercase tracking-[0.1em] text-[13px] font-bold hover:bg-[#575757] transition-colors"
          >
            CONTACT US
          </Link>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
