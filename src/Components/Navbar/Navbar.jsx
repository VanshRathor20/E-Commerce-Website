import React from 'react'
import logo from '../../assets/logo.png'
import { IoSearchSharp } from "react-icons/io5";
import { GoHeartFill } from 'react-icons/go';
import { HiShoppingBag } from "react-icons/hi2";
const Navbar = () => {
  return (
    <div>
        <div>
          <header className='bg-white top-0 fixed left-0 right-0'>
            <nav className=' h-auto py-8 flex flex-wrap items-center justify-between max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-12'>

              {/* logo */}
              <a href="#" className='flex flex-wrap w-15 h-15 bg-zinc-100 rounded-full p-2 '>
                <img src={logo} alt="logo" className='w-full h-full object-contain' />
              </a>

              {/* Nav Action */}
              <div className='flex justify-center gap-x-5 items-center'>

                {/* Search bar */}
                <div className='p-1 rounded-full border-2 border-blue-600 flex items-center justify-center'>
                  <input type="text" name='search' id='search' autoComplete='off' placeholder='Search'  className='h-[5vh] flex-1 focus:outline-none p-1 rounded-full'/>
                  <button className='w-10 h-10 rounded-full bg-blue-600 text-white text-xl flex items-center justify-center'><IoSearchSharp /></button>
                </div>

                {/* Icons */}
                <button className='flex text-[1.7rem] text-zinc-800 ' >
                  <GoHeartFill className=''/>
                  <span className='bg-red-600 rounded-full w-5 h-5 text-white flex justify-center items-center text-xl border-white border-2 ml-[-7px]'>1</span>
                  <HiShoppingBag/>
                  <span className='bg-red-600 rounded-full w-5 h-5 text-white flex justify-center items-center text-xl border-white border-2 ml-[-7px]'>1</span>
                </button>
              </div>
            
            </nav>
          </header>
        </div>
    </div>
  )
}

export default Navbar