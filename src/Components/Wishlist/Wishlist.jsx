import React from 'react'
import sweater from '../../assets/sweater.png'
import { FaTrash } from 'react-icons/fa'
const Wishlist = ({activePanel,closePanel}) => {
  return (
    <div className={`flex flex-col justify-between gap-5 bg-zinc-100 fixed top-0 right-0 bottom-0 left-auto z-50 w-[400px] border border-zinc-300 py-7 transform transition-transform duration-300  ${activePanel==='wishlist'?'translate-x-0':'translate-x-full'}`}>
      {/* Heading */}
      <div>
        <h3 className="font-bold text-3xl text-zinc-800 text-center ">
          Your Wislist
        </h3>
      </div>

      {/* Cart Items */}
      <div className="flex-1">
        <div className="flex items-center gap-3  bg-white px-5 py-1 border-y border-zinc-300">
          {/* Cart Image */}
          <div className="w-20 h-20  ">
            <img
              src={sweater}
              alt="sweater image"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Product Details */}
          <div className="flex-1">
            <div className="flex justify-between">
              <h4 className="font-semibold text-zinc-800 text-lg">Sweater</h4>
              <button className="w-8 h-8 bg-red-600 rounded-full text-white flex justify-center items-center mr-6">
                <FaTrash />
              </button>
            </div>

            <div className="flex justify-between items-center">
              <span>₹0.00</span>
              <button className='bg-blue-600 active:bg-blue-700 text-sm text-white px-5 py-2 rounded-full cursor-pointer'>Add to Cart</button>
            </div>
          </div>
        </div>
      </div>

      

      {/* Buttons */}
      <div className="flex gap-x-2 px-10">
        <button className="bg-blue-600 text-white flex-1 h-[7vh] rounded-full cursor-pointer active:bg-blue-700" onClick={closePanel}>
          Close
        </button>
        <button className="bg-blue-600 text-white flex-1 h-[7vh] rounded-full cursor-pointer active:bg-blue-700">
          Clear All
        </button>
      </div>
    </div>
  )
}

export default Wishlist