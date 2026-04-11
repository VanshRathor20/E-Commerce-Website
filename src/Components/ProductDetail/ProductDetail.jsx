import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GoHeartFill, GoHeart } from "react-icons/go";
import { AiFillStar } from "react-icons/ai";

const ProductDetail = ({ AddToCart, addToWishlist, wishlist }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    window.scrollTo({ top: 0 }); // reset scroll on nav
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        if (!response.ok) throw new Error("Failed to fetch product");
        const data = await response.json();
        setProduct(data);
        setMainImage(data.images && data.images.length > 0 ? data.images[0] : data.thumbnail);
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
      <div className="w-full min-h-[60vh] flex justify-center items-center bg-[#FFFFFF]">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-fashion-grey border-t-fashion-black"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col justify-center items-center bg-[#FFFFFF]">
        <p className="text-red-600 mb-4 uppercase tracking-widest">{error || "Product Not Found"}</p>
      </div>
    );
  }

  const isInWishlist = wishlist && wishlist.some((p) => p.id === product.id);
  const oldPrice = product.price / (1 - product.discountPercentage / 100);

  return (
    <div className="w-full bg-[#FFFFFF] min-h-screen py-10 px-5 lg:px-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 lg:gap-16">
        
        {/* Left Col: Images */}
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <div className="w-full aspect-[3/4] border border-[#E1E1E1] bg-[#F5F5F5] flex items-center justify-center overflow-hidden">
            <img src={mainImage} alt={product.title} className="w-full h-full object-cover mix-blend-multiply" />
          </div>
          {product.images && product.images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto scroll pb-2">
              {product.images.map((img, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setMainImage(img)}
                  className={`flex-shrink-0 w-[80px] h-[80px] border ${mainImage === img ? 'border-[#000000]' : 'border-[#E1E1E1]'} bg-[#F5F5F5] overflow-hidden`}
                >
                  <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover mix-blend-multiply" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Col: Details */}
        <div className="w-full md:w-1/2 flex flex-col py-2">
          <p className="text-[#757575] text-[12px] uppercase tracking-[0.15em] mb-3">
            {product.category}
          </p>
          <h1 className="text-[#000000] font-bold text-[28px] uppercase tracking-[0.1em] mb-4 leading-tight">
            {product.title}
          </h1>
          
          <div className="flex items-center gap-1 text-[#000000] text-[14px] mb-6">
            {[...Array(5)].map((_, i) => (
              <AiFillStar key={i} className={i < Math.round(product.rating) ? "text-[#000000]" : "text-[#E1E1E1]"} />
            ))}
            <span className="text-[#757575] text-[12px] ml-2">({product.reviews?.length || 0} reviews)</span>
          </div>

          <div className="flex items-center gap-4 mb-8">
            <span className="text-[#000000] font-bold text-[24px]">₹{product.price.toFixed(2)}</span>
            {product.discountPercentage > 0 && (
              <>
                <span className="text-[#757575] text-[16px] line-through">₹{oldPrice.toFixed(2)}</span>
                <span className="bg-[#000000] text-[#FFFFFF] text-[10px] uppercase tracking-widest px-[8px] py-[4px] rounded-none">
                  SAVE {Math.round(product.discountPercentage)}%
                </span>
              </>
            )}
          </div>

          <div className="w-full h-[1px] bg-[#E1E1E1] mb-8"></div>

          <p className="text-[#757575] leading-[1.8] text-[15px] mb-8">
            {product.description}
          </p>

          <div className="flex flex-col gap-3 mb-10">
            <p className="text-[#757575] text-[13px] uppercase tracking-widest">
              IN STOCK: <span className="text-[#000000] font-semibold">{product.stock} UNITS</span>
            </p>
            <p className="text-[#757575] text-[13px] uppercase tracking-widest">
              BRAND: <span className="text-[#000000] font-semibold">{product.brand || 'FASHION STORE'}</span>
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-4">
            <div className="flex gap-4 h-[54px]">
              {/* Quantity */}
              <div className="flex w-[120px] border border-[#E1E1E1]">
                <button 
                  className="w-1/3 text-[#000000] flex items-center justify-center hover:bg-[#F9F9F9]"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >−</button>
                <div className="w-1/3 flex items-center justify-center text-[#000000] text-[13px] font-bold">
                  {quantity}
                </div>
                <button 
                  className="w-1/3 text-[#000000] flex items-center justify-center hover:bg-[#F9F9F9]"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                >+</button>
              </div>

              {/* Add to Cart */}
              <button 
                className="flex-1 bg-[#000000] text-[#FFFFFF] text-[13px] font-bold uppercase tracking-[0.15em] hover:bg-[#575757] transition-colors rounded-none"
                onClick={() => {
                  let p = { ...product, name: product.title, image: product.thumbnail };
                  // Add requested quantity handling if app supports it, else loop AddToCart or modify App.jsx AddToCart to accept multiplier
                  // For dummy implementation, standard App.jsx AddToCart increments by 1. We will push it N times or adjust object.
                  // Since AddToCart just checks ID and adds 1, adding multiple here is tricky without refactoring AddToCart. 
                  // I'll call AddToCart N times iteratively for simplicity since we don't have access to rewrite App.js AddToCart to take qty param right now without full refactor safely.
                  for(let i=0; i<quantity; i++) {
                    AddToCart && AddToCart(p);
                  }
                }}
              >
                ADD TO CART
              </button>
            </div>

            {/* Add to Wishlist */}
            <button 
              className="w-full h-[54px] border border-[#000000] bg-transparent text-[#000000] text-[13px] font-bold uppercase tracking-[0.15em] hover:bg-[#000000] hover:text-[#FFFFFF] transition-colors rounded-none flex items-center justify-center gap-3"
              onClick={() => addToWishlist && addToWishlist({ ...product, name: product.title, image: product.thumbnail })}
            >
              {isInWishlist ? <GoHeartFill className="text-xl" /> : <GoHeart className="text-xl" />}
              {isInWishlist ? "REMOVE FROM WISHLIST" : "ADD TO WISHLIST"}
            </button>
          </div>
          
          <div className="w-full h-[1px] bg-[#E1E1E1] mt-12 mb-8"></div>
          
          <div className="flex flex-col gap-4">
             <h4 className="text-[#000000] text-[13px] font-bold uppercase tracking-widest">PRODUCT DETAILS</h4>
             <ul className="text-[#757575] text-[13px] flex flex-col gap-2">
                <li>• SKU: {product.sku}</li>
                <li>• {product.warrantyInformation}</li>
                <li>• {product.shippingInformation}</li>
                <li>• {product.returnPolicy}</li>
             </ul>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
