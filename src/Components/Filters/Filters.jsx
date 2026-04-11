import React, { useEffect, useState } from "react";

const tabs = ["all", "beauty", "grooming"];

const Filters = ({
  activeCategory,
  setActiveCategory,
  sortBy,
  setSortBy,
  onPriceChange,
}) => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500);

  useEffect(() => {
    onPriceChange({ min: minPrice, max: maxPrice });
  }, [minPrice, maxPrice, onPriceChange]);

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
        <div className="flex-1" style={{ marginBottom: "24px" }}>
          <p
            style={{
              fontSize: "11px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#757575",
              marginBottom: "12px",
            }}
          >
            PRICE RANGE: ₹{minPrice} — ₹{maxPrice}
          </p>

          <div style={{ position: "relative", padding: "0 8px" }}>
            <input
              type="range"
              min={0}
              max={500}
              step={5}
              value={minPrice}
              onChange={(e) => {
                const val = Math.min(Number(e.target.value), maxPrice - 10);
                setMinPrice(val);
                onPriceChange({ min: val, max: maxPrice });
              }}
              style={{
                width: "100%",
                appearance: "none",
                height: "2px",
                background: "#E1E1E1",
                outline: "none",
                cursor: "pointer",
                accentColor: "#000000",
              }}
            />
            <input
              type="range"
              min={0}
              max={500}
              step={5}
              value={maxPrice}
              onChange={(e) => {
                const val = Math.max(Number(e.target.value), minPrice + 10);
                setMaxPrice(val);
                onPriceChange({ min: minPrice, max: val });
              }}
              style={{
                width: "100%",
                appearance: "none",
                height: "2px",
                background: "#E1E1E1",
                outline: "none",
                cursor: "pointer",
                accentColor: "#000000",
                marginTop: "8px",
              }}
            />
          </div>
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
