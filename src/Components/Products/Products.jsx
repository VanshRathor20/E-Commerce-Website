import React, { useState } from 'react'
import ProductList from './Product.js'
const Products = () => {
    const categories=['All','Mens','Womens','Kids','New Arrivals','On Sale'];
    // activeTab stores the category string (match items in `categories`)
    const [activeTab,setActiveTab]=useState('All');

  return (
    <section className='w-full mx-auto my-20 flex justify-center items-center p-5'>
        <div className="flex flex-wrap gap-x-6 gap-y-3 items-center">
            {
                // Tabs
                categories.map((i)=>{
                    return (
                        <button key={i}
                        className={`cursor-pointer text-lg font-weight-700 rounded-full  px-8 py-2 
                        ${activeTab===i ? 'bg-blue-600 text-white':"bg-zinc-100 text-zinc-800"}`}
                        onClick={()=>setActiveTab(i)}>
                            {i}
                        </button>
                    )
                })
            }
        </div>

        {/* Product Listing */}
        <div>
        {ProductList}
        </div> 
   </section>
  )
}

export default Products