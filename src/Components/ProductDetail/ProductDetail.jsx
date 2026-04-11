import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GoHeartFill, GoHeart } from "react-icons/go";
import { AiFillStar } from "react-icons/ai";
import { useStore } from '../../context/StoreContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useStore();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

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
        <h2 className="text-[#000000] font-bold uppercase text-[24px] tracking-[0.1em] mb-4">PRODUCT NOT FOUND</h2>
        <button 
          onClick={() => navigate('/')} 
          className="text-[#000000] text-[13px] uppercase tracking-[0.1em] font-bold border-b-2 border-[#000000] pb-1 hover:text-[#757575] hover:border-[#757575] transition-colors cursor-pointer bg-transparent"
        >
          ← BACK TO SHOP
        </button>
      </div>
    );
  }

  const normalizedProduct = { ...product, name: product.title, image: product.thumbnail };
  const isInWishlist = state.wishlist.some((p) => p.id === product.id);
  const oldPrice = product.price / (1 - product.discountPercentage / 100);

  const handleAddToCart = () => {
    dispatch({ type: "ADD_TO_CART", payload: { ...normalizedProduct, quantity } });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="section-wrapper w-full max-w-[1280px] mx-auto min-h-screen">
      <div className="flex flex-col md:flex-row gap-12 lg:gap-20">
        
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
                  className={`flex-shrink-0 w-[80px] h-[80px] border transition-colors ${mainImage === img ? 'border-[#000000]' : 'border-[#E1E1E1] hover:border-[#757575]'} bg-[#F5F5F5] overflow-hidden cursor-pointer`}
                >
                  <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover mix-blend-multiply" />
                </button>
              ))}
            </div>
          )}
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
              <AiFillStar key={i} className={i < Math.round(product.rating) ? "text-[#000000]" : "text-[#E1E1E1]"} />
            ))}
            <span className="text-[#757575] text-[12px] ml-3 uppercase tracking-widest">({product.reviews?.length || 0} reviews)</span>
          </div>

          <div className="flex items-end gap-4 mb-8">
            <span className="text-[#000000] font-bold text-[28px] leading-none">₹{product.price.toFixed(2)}</span>
            {product.discountPercentage > 0 && (
              <div className="flex items-center gap-3 mb-1">
                 <span className="text-[#757575] text-[16px] line-through">₹{oldPrice.toFixed(2)}</span>
                 <span className="bg-[#000000] text-[#FFFFFF] text-[10px] uppercase font-bold tracking-[0.1em] px-[8px] py-[4px] rounded-none">
                   SAVE {Math.round(product.discountPercentage)}%
                 </span>
              </div>
            )}
          </div>

          <div className="w-full h-[1px] bg-[#E1E1E1] mb-8"></div>

          <p className="text-[#757575] leading-[1.8] text-[15px] mb-8">
            {product.description}
          </p>

          <div className="flex flex-col gap-3 mb-10">
            <p className="text-[#757575] text-[13px] uppercase tracking-widest">
              IN STOCK: <span className="text-[#000000] font-bold">{product.stock} UNITS</span>
            </p>
            <p className="text-[#757575] text-[13px] uppercase tracking-widest">
              BRAND: <span className="text-[#000000] font-bold">{product.brand || 'FASHION STORE'}</span>
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
                >−</button>
                <div className="w-1/3 flex items-center justify-center text-[#000000] text-[14px] font-bold border-l border-r border-[#E1E1E1]">
                  {quantity}
                </div>
                <button 
                  className="w-1/3 text-[#000000] flex items-center justify-center hover:bg-[#F9F9F9] cursor-pointer transition-colors"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                >+</button>
              </div>

              {/* Add to Cart */}
              <button 
                className={`flex-1 bg-[#000000] border border-[#000000] text-[#FFFFFF] text-[13px] font-bold uppercase tracking-[0.1em] rounded-none transition-all duration-300 cursor-pointer flex items-center justify-center ${added ? 'bg-[#575757]' : 'hover:bg-[#575757]'}`}
                onClick={handleAddToCart}
              >
                {added ? "✓ ADDED" : "ADD TO CART"}
              </button>
            </div>

            {/* Add to Wishlist */}
            <button 
              className="w-full h-[56px] border border-[#000000] bg-[#FFFFFF] text-[#000000] text-[13px] font-bold uppercase tracking-[0.1em] hover:bg-[#000000] hover:text-[#FFFFFF] transition-all duration-300 rounded-none flex items-center justify-center gap-3 cursor-pointer"
              onClick={() => dispatch({ type: 'TOGGLE_WISHLIST', payload: normalizedProduct })}
            >
              {isInWishlist ? <GoHeartFill className="text-[20px]" /> : <GoHeart className="text-[20px]" />}
              {isInWishlist ? "REMOVE FROM WISHLIST" : "ADD TO WISHLIST"}
            </button>
          </div>
          
          <div className="w-full h-[1px] bg-[#E1E1E1] mt-12 mb-8"></div>
          
          <div className="flex flex-col gap-4">
             <h4 className="text-[#000000] text-[13px] font-bold uppercase tracking-widest mb-1">PRODUCT DETAILS</h4>
             <ul className="text-[#757575] text-[14px] flex flex-col gap-3">
                <li>• SKU: <span className="text-[#000000]">{product.sku}</span></li>
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
