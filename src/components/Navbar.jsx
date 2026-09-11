import React, { useState } from 'react'
import {Link, NavLink} from 'react-router-dom'
import {MapPin} from 'lucide-react'
import { FaCaretDown } from 'react-icons/fa'
import { IoCartOutline } from 'react-icons/io5'
import { SignedOut, SignedIn, SignInButton, SignUpButton, UserButton } from "@clerk/clerk-react";
import { CgClose } from 'react-icons/cg'
import { useCart } from '../context/CartContext'
import { HiMenuAlt1, HiMenuAlt3 } from 'react-icons/hi'
import ResponsiveMenu from './ResponsiveMenu'


const Navbar = ({location, getLocation, openDropdown, setOpenDropdown}) => {
    const {cartItem} = useCart()
    const [openNav, setOpenNav] = useState(false)

    const toggleDropdown = () => {
        setOpenDropdown(!openDropdown)
    }

    return (
        <div className='bg-white py-3 shadow-2xl'>
            <div className='max-w-6xl mx-auto flex justify-between items-center px-4'>

                {/* logo section */}
                <div className='flex gap-8 items-center'>
                    <Link to={'/'}>
                        <h1 className="text-3xl md:text-4xl font-extrabold bg-linear-to-r from-orange-500 via-pink-500 to-red-500 text-transparent bg-clip-text tracking-wide">
                            Cartzen
                        </h1>
                    </Link>

                    <div className='hidden sm:flex gap-1 cursor-pointer text-pink-800 items-center'>
                        <MapPin className='text-pink-800'/>
                        <span className='font-semibold'>
                            {location ? (
                                <div className='-space-y-2'>
                                    <p>{location.city}</p>
                                    <p>{location.state}</p>
                                </div>
                            ) : "Add Address"}
                        </span>
                        <FaCaretDown onClick={toggleDropdown}/>
                    </div>

                    {
                        openDropdown ? (
                            <div className='w-62.5 h-max shadow-2xl z-50 bg-white fixed top-16 left-4 md:left-60 border-2 p-5 border-gray-100 rounded-md'>
                                <h1 className='font-semibold mb-4 text-xl flex justify-between text-pink-950'>
                                    Change Location
                                    <span onClick={toggleDropdown}><CgClose/></span>
                                </h1>
                                <button
                                    onClick={getLocation}
                                    className='bg-pink-800 text-white px-3 py-1 rounded-md cursor-pointer hover:bg-pink-700'
                                >
                                    Detect my location
                                </button>
                            </div>
                        ) : null
                    }
                </div>

                {/* right section: desktop nav links + cart + auth + hamburger */}
                <div className='flex gap-4 md:gap-7 items-center'>

                    {/* desktop-only nav links */}
                    <nav className='hidden md:flex gap-7 items-center'>
                        <ul className='flex gap-7 items-center text-xl font-bold text-pink-800'>
                            <NavLink to={'/'} className={({isActive}) => `${isActive ? "border-b-3 transition-all border-pink-500" : "text-pink-800"} cursor-pointer`}><li>Home</li></NavLink>
                            <NavLink to={"/products"} className={({isActive}) => `${isActive ? "border-b-3 transition-all border-pink-500" : "text-pink-800"} cursor-pointer`}><li>Products</li></NavLink>
                            <NavLink to={"/about"} className={({isActive}) => `${isActive ? "border-b-3 transition-all border-pink-500" : "text-pink-800"} cursor-pointer`}><li>About</li></NavLink>
                            <NavLink to={"/contact"} className={({isActive}) => `${isActive ? "border-b-3 transition-all border-pink-500" : "text-pink-800"} cursor-pointer`}><li>Contact</li></NavLink>
                        </ul>
                    </nav>

                    {/* cart icon — visible on ALL screen sizes */}
                    <Link to={'/cart'} className='relative'>
                        <IoCartOutline className='h-7 w-7'/>
                        <span className='bg-pink-800 px-2 rounded-full absolute -top-3 -right-3 text-white text-xs'>
                            {cartItem.length}
                        </span>
                    </Link>

                    {/* auth — visible on ALL screen sizes */}
                    <div>
                        <SignedOut>
                            <SignInButton className="bg-pink-800 text-white px-3 py-1 rounded-md cursor-pointer"/>
                        </SignedOut>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </div>

                    {/* hamburger — mobile only, sibling of nav, not trapped inside it */}
                    {
                        openNav
                            ? <HiMenuAlt3 onClick={() => setOpenNav(false)} className='h-7 w-7 md:hidden cursor-pointer'/>
                            : <HiMenuAlt1 onClick={() => setOpenNav(true)} className='h-7 w-7 md:hidden cursor-pointer'/>
                    }
                </div>
            </div>

            <ResponsiveMenu openNav={openNav} setOpenNav={setOpenNav}/>
        </div>
    )
}

export default Navbar