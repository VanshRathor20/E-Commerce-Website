import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GoHeartFill, GoHeart } from "react-icons/go";
import { AiFillStar } from "react-icons/ai";
import { useStore } from "../../context/StoreContext";
import { fetchUnifiedProducts } from "../../services/productService";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useStore();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0 }); // reset scroll on nav
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const products = await fetchUnifiedProducts();
        const data = products.find((item) => String(item.id) === String(id));
        if (!data) throw new Error("Failed to fetch product");
        setProduct(data);
        setActiveImage(0);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="section-wrapper w-full max-w-[1280px] mx-auto min-h-[60vh]">
        <div className="flex flex-col md:flex-row gap-12 lg:gap-16 items-start">
          <div className="w-full md:w-1/2 aspect-[3/4] skeleton-shimmer bg-[#F5F5F5]"></div>
          <div className="w-full md:w-1/2 flex flex-col gap-6 py-6 border border-transparent">
            <div className="w-1/4 h-[12px] skeleton-shimmer bg-[#F5F5F5]"></div>
            <div className="w-3/4 h-[32px] skeleton-shimmer bg-[#F5F5F5]"></div>
            <div className="w-1/3 h-[24px] skeleton-shimmer bg-[#F5F5F5]"></div>
            <div className="w-full h-[1px] bg-[#E1E1E1] my-2"></div>
            <div className="w-full h-[14px] skeleton-shimmer bg-[#F5F5F5]"></div>
            <div className="w-full h-[14px] skeleton-shimmer bg-[#F5F5F5]"></div>
            <div className="w-5/6 h-[14px] skeleton-shimmer bg-[#F5F5F5]"></div>
            <div className="w-1/2 h-[54px] skeleton-shimmer bg-[#F5F5F5] mt-6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col justify-center items-center bg-[#FFFFFF]">
        <h2 className="text-[#000000] font-bold uppercase text-[24px] tracking-[0.1em] mb-4">
          PRODUCT NOT FOUND
        </h2>
        <button
          onClick={() => navigate("/")}
          className="text-[#000000] text-[13px] uppercase tracking-[0.1em] font-bold border-b-2 border-[#000000] pb-1 hover:text-[#757575] hover:border-[#757575] transition-colors cursor-pointer bg-transparent"
        >
          ← BACK TO SHOP
        </button>
      </div>
    );
  }

  const normalizedProduct = {
    ...product,
    name: product.title,
    image: product.image,
  };
  const isInWishlist = state.wishlist.some((p) => p.id === product.id);
  const oldPrice = product.discountPercentage
    ? product.price / (1 - product.discountPercentage / 100)
    : product.price;
  const images =
    product.images?.length > 0
      ? (() => {
          const cleanedImages = product.images
            .map((img) => img.replace(/[\[\]"]/g, ""))
            .filter(Boolean);
          if (cleanedImages.length === 1) {
            return [cleanedImages[0], cleanedImages[0], cleanedImages[0]];
          }
          return cleanedImages;
        })()
      : [product.image, product.image, product.image].filter(Boolean);
  const activeImageSrc = images[activeImage] || product.image;

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: { ...normalizedProduct, quantity },
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="section-wrapper w-full max-w-[1280px] mx-auto min-h-screen">
      <div className="flex flex-col md:flex-row gap-12 lg:gap-20">
        {/* Left Col: Images */}
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <div
            style={{
              width: "100%",
              aspectRatio: "3/4",
              overflow: "hidden",
              border: "1px solid #E1E1E1",
            }}
          >
            <img
              src={activeImageSrc}
              alt={product.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) => {
                e.currentTarget.src =
                  "https://via.placeholder.com/400x500?text=NO+IMAGE";
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              gap: "8px",
              marginTop: "12px",
            }}
          >
            {images.map((img, index) => (
              <div
                key={index}
                onClick={() => setActiveImage(index)}
                style={{
                  width: "72px",
                  height: "72px",
                  border:
                    activeImage === index
                      ? "2px solid #000000"
                      : "1px solid #E1E1E1",
                  cursor: "pointer",
                  overflow: "hidden",
                  flexShrink: 0,
                }}
              >
                <img
                  src={img}
                  alt={`view ${index + 1}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://via.placeholder.com/72?text=?";
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Details */}
        <div className="w-full md:w-1/2 flex flex-col py-2">
          <p className="text-[#757575] text-[12px] uppercase tracking-[0.15em] mb-4">
            {product.category}
          </p>
          <h1 className="text-[#000000] font-bold text-[32px] md:text-[40px] uppercase tracking-[0.05em] mb-6 leading-[1.1]">
            {product.title}
          </h1>

          <div className="flex items-center gap-1 text-[#000000] text-[14px] mb-6">
            {[...Array(5)].map((_, i) => (
              <AiFillStar
                key={i}
                className={
                  i < Math.round(product.rating || 0)
                    ? "text-[#000000]"
                    : "text-[#E1E1E1]"
                }
              />
            ))}
            <span className="text-[#757575] text-[12px] ml-3 uppercase tracking-widest">
              ({Math.round((product.rating || 0) * 20)} rating)
            </span>
          </div>

          <div className="flex items-end gap-4 mb-8">
            <span className="text-[#000000] font-bold text-[28px] leading-none">
              ₹{product.price.toFixed(2)}
            </span>
            {product.discountPercentage > 0 && (
              <div className="flex items-center gap-3 mb-1">
                <span className="text-[#757575] text-[16px] line-through">
                  ₹{oldPrice.toFixed(2)}
                </span>
                <span className="bg-[#000000] text-[#FFFFFF] text-[10px] uppercase font-bold tracking-[0.1em] px-[8px] py-[4px] rounded-none">
                  SAVE {Math.round(product.discountPercentage)}%
                </span>
              </div>
            )}
          </div>

          <div className="w-full h-[1px] bg-[#E1E1E1] mb-8"></div>

          <p className="text-[#757575] leading-[1.8] text-[15px] mb-8">
            {product.description ||
              "Crafted for everyday style with premium comfort and timeless fashion-store detailing."}
          </p>

          <div className="flex flex-col gap-3 mb-10">
            <p className="text-[#757575] text-[13px] uppercase tracking-widest">
              IN STOCK:{" "}
              <span className="text-[#000000] font-bold">
                {product.stock || 12} UNITS
              </span>
            </p>
            <p className="text-[#757575] text-[13px] uppercase tracking-widest">
              BRAND:{" "}
              <span className="text-[#000000] font-bold">
                {product.brand ||
                  product.source?.toUpperCase() ||
                  "FASHION STORE"}
              </span>
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-4">
            <div className="flex gap-4 h-[56px]">
              {/* Quantity */}
              <div className="flex w-[140px] border border-[#E1E1E1]">
                <button
                  className="w-1/3 text-[#000000] flex items-center justify-center hover:bg-[#F9F9F9] cursor-pointer transition-colors"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  −
                </button>
                <div className="w-1/3 flex items-center justify-center text-[#000000] text-[14px] font-bold border-l border-r border-[#E1E1E1]">
                  {quantity}
                </div>
                <button
                  className="w-1/3 text-[#000000] flex items-center justify-center hover:bg-[#F9F9F9] cursor-pointer transition-colors"
                  onClick={() =>
                    setQuantity(Math.min(product.stock || 99, quantity + 1))
                  }
                >
                  +
                </button>
              </div>

              {/* Add to Cart */}
              <button
                className={`flex-1 bg-[#000000] border border-[#000000] text-[#FFFFFF] text-[13px] font-bold uppercase tracking-[0.1em] rounded-none transition-all duration-300 cursor-pointer flex items-center justify-center ${added ? "bg-[#575757]" : "hover:bg-[#575757]"}`}
                onClick={handleAddToCart}
              >
                {added ? "✓ ADDED" : "ADD TO CART"}
              </button>
            </div>

            {/* Add to Wishlist */}
            <button
              className="w-full h-[56px] border border-[#000000] bg-[#FFFFFF] text-[#000000] text-[13px] font-bold uppercase tracking-[0.1em] hover:bg-[#000000] hover:text-[#FFFFFF] transition-all duration-300 rounded-none flex items-center justify-center gap-3 cursor-pointer"
              onClick={() => {
                if (isInWishlist) {
                  dispatch({
                    type: "REMOVE_FROM_WISHLIST",
                    payload: normalizedProduct.id,
                  });
                } else {
                  dispatch({
                    type: "ADD_TO_WISHLIST",
                    payload: normalizedProduct,
                  });
                }
              }}
            >
              {isInWishlist ? (
                <GoHeartFill className="text-[20px]" />
              ) : (
                <GoHeart className="text-[20px]" />
              )}
              {isInWishlist ? "REMOVE FROM WISHLIST" : "ADD TO WISHLIST"}
            </button>
          </div>

          <div className="w-full h-[1px] bg-[#E1E1E1] mt-12 mb-8"></div>

          <div className="flex flex-col gap-4">
            <h4 className="text-[#000000] text-[13px] font-bold uppercase tracking-widest mb-1">
              PRODUCT DETAILS
            </h4>
            <ul className="text-[#757575] text-[14px] flex flex-col gap-3">
              <li>
                • SKU: <span className="text-[#000000]">{product.id}</span>
              </li>
              <li>• Standard warranty and quality assurance included.</li>
              <li>• Estimated shipping in 3-5 business days.</li>
              <li>• Easy returns available based on policy terms.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
