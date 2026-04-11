import React from "react";

const tabs = ["all", "beauty", "grooming", "clothing"];

const Filters = ({
  activeCategory,
  setActiveCategory,
  sortBy,
  setSortBy,
  draftPriceRange,
  setDraftPriceRange,
  applyPriceRange,
}) => {
  return (
    <div className="flex flex-col gap-6 mb-10">
      <div className="overflow-x-auto scroll">
        <div className="inline-flex items-center min-w-max gap-6 border-b border-[#E1E1E1] pb-1">
          {tabs.map((tab) => {
            const isActive = activeCategory === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveCategory(tab)}
                className={`group relative pb-3 text-[12px] uppercase tracking-[0.12em] transition-colors cursor-pointer ${
                  isActive
                    ? "text-[#000000] font-bold border-b-2 border-[#000000]"
                    : "text-[#757575] hover:text-[#575757]"
                }`}
              >
                {tab}
                {!isActive && (
                  <span className="absolute left-0 -bottom-[2px] h-[2px] w-0 bg-[#000000] transition-all duration-300 group-hover:w-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 lg:items-end">
        <div className="flex flex-1 gap-3">
          <input
            type="number"
            min="0"
            value={draftPriceRange.min}
            onChange={(e) =>
              setDraftPriceRange((prev) => ({
                ...prev,
                min: Number(e.target.value || 0),
              }))
            }
            placeholder="Min ₹"
            className="border border-[#E1E1E1] px-4 py-[10px] text-[13px] uppercase tracking-[0.08em] text-[#000000] w-full focus:outline-none"
          />
          <input
            type="number"
            min="0"
            value={draftPriceRange.max}
            onChange={(e) =>
              setDraftPriceRange((prev) => ({
                ...prev,
                max: Number(e.target.value || 0),
              }))
            }
            placeholder="Max ₹"
            className="border border-[#E1E1E1] px-4 py-[10px] text-[13px] uppercase tracking-[0.08em] text-[#000000] w-full focus:outline-none"
          />
          <button
            onClick={applyPriceRange}
            className="bg-[#000000] text-[#FFFFFF] px-6 py-[10px] text-[13px] font-bold uppercase tracking-[0.1em] hover:bg-[#575757] transition-colors cursor-pointer"
          >
            Apply
          </button>
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border border-[#E1E1E1] px-4 py-[10px] text-[13px] uppercase tracking-[0.08em] text-[#000000] bg-[#FFFFFF] focus:outline-none"
        >
          <option value="default">Default</option>
          <option value="low-high">Price: Low to High</option>
          <option value="high-low">Price: High to Low</option>
          <option value="newest">Newest</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
