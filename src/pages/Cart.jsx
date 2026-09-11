import React, { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'
import { FaRegTrashAlt } from 'react-icons/fa';
import { LuNotebookText } from 'react-icons/lu';
import { MdDeliveryDining } from 'react-icons/md';
import { GiShoppingBag } from 'react-icons/gi';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import cart from "../assets/cart.webp"

const Cart = ({ location, getLocation, locationError }) => {
  const { cartItem, updateQuantity, deleteItem } = useCart()
  const { user } = useUser()
  const navigate = useNavigate()

  const [fullName, setFullName] = useState(user?.fullName || '')
  const [address, setAddress] = useState(location?.county || '')
  const [state, setState] = useState(location?.state || '')
  const [postcode, setPostcode] = useState(location?.postcode || '')
  const [country, setCountry] = useState(location?.country || '')
  const [phone, setPhone] = useState('')
  const [promoCode, setPromoCode] = useState('')

  useEffect(() => {
    if (user?.fullName) setFullName(user.fullName)
  }, [user])

  useEffect(() => {
    if (location) {
      setAddress(location.county || '')
      setState(location.state || '')
      setPostcode(location.postcode || '')
      setCountry(location.country || '')
    }
  }, [location])

  const totalPrice = cartItem.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  const grandTotal = totalPrice + 5

  const handleSubmit = () => {
    if (!fullName || !address || !state || !postcode || !country || !phone) {
      toast.error("Please fill in all delivery details.")
      return
    }
    toast.success("Delivery info saved!")
    console.log('Submitting delivery info:', { fullName, address, state, postcode, country, phone })
  }

  const handleApplyPromo = () => {
    console.log('Applying promo code:', promoCode)
  }

  const handleDetectLocation = () => {
    if (typeof getLocation === 'function') {
      getLocation()
    } else {
      console.log('getLocation prop was not passed to Cart — check App.jsx route.')
    }
  }

  const handleProceedToCheckout = () => {
    if (!fullName || !address || !state || !postcode || !country || !phone) {
      toast.error("Please fill in all delivery details before checkout.")
      return
    }

    navigate('/checkout', {
      state: {
        deliveryInfo: { fullName, address, state, postcode, country, phone },
        totalPrice,
        grandTotal,
      }
    })
  }

  return (
    <div className='mt-10 max-w-6xl mx-auto mb-5 px-4 md:px-0'>
      {
        cartItem.length > 0 ? <div>
          <h1 className='font-bold text-2xl '>My Cart ({cartItem.length})</h1>
          <div>
            <div className='mt-10'>
              {cartItem.map((item) => {
                return <div key={item.id} className='bg-gray-100 p-5 rounded-md flex items-center justify-between mt-3 w-full'>
                  <div className='flex items-center gap-4'>
                    <img src={item.image} alt={item.title} className='w-20 h-20 rounded-md' />
                    <div>
                      <h1 className='md:w-75 line-clamp-2 '>{item.title}</h1>
                      <p className='text-pink-500 font-semibold text-lg'>${item.price}</p>
                    </div>
                  </div>
                  <div className='bg-pink-500 text-white flex gap-4 p-2 rounded-md font-bold text-xl'>
                    <button onClick={() => updateQuantity(cartItem, item.id, "decrease")} className='cursor-pointer'>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(cartItem, item.id, "increase")} className='cursor-pointer'>+</button>
                  </div>
                  <span onClick={() => deleteItem(item.id)} className='hover:bg-white/60 transition-all rounded-full p-3 hover:shadow-2xl'>
                    <FaRegTrashAlt className='text-pink-500 text-2xl cursor-pointer' />
                  </span>
                </div>
              })}
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 md:gap-20'>
              <div className='bg-gray-100 rounded-md p-7 mt-4 space-y-2'>
                <h1 className='text-gray-800 font-bold text-xl'>Delivery Info</h1>
                <div className='flex flex-col space-y-1'>
                  <label htmlFor="fullName">Full Name</label>
                  <input
                    id="fullName"
                    type="text"
                    placeholder='Enter your name'
                    className='p-2 rounded-md'
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div className='flex flex-col space-y-1'>
                  <label htmlFor="address">Address</label>
                  <input
                    id="address"
                    type="text"
                    placeholder='Enter your address'
                    className='p-2 rounded-md'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className='flex w-full gap-5'>
                  <div className='flex flex-col space-y-1 w-full'>
                    <label htmlFor="state">State</label>
                    <input
                      id="state"
                      type="text"
                      placeholder='Enter your state'
                      className='p-2 rounded-md w-full'
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    />
                  </div>
                  <div className='flex flex-col space-y-1 w-full'>
                    <label htmlFor="postcode">PostCode</label>
                    <input
                      id="postcode"
                      type="text"
                      placeholder='Enter your postcode'
                      className='p-2 rounded-md w-full'
                      value={postcode}
                      onChange={(e) => setPostcode(e.target.value)}
                    />
                  </div>
                </div>
                <div className='flex w-full gap-5'>
                  <div className='flex flex-col space-y-1 w-full'>
                    <label htmlFor="country">Country</label>
                    <input
                      id="country"
                      type="text"
                      placeholder='Enter your country'
                      className='p-2 rounded-md w-full'
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                    />
                  </div>
                  <div className='flex flex-col space-y-1 w-full'>
                    <label htmlFor="phone">Phone No</label>
                    <input
                      id="phone"
                      type="text"
                      placeholder='Enter your Number'
                      className='p-2 rounded-md w-full'
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>
                <button onClick={handleSubmit} className='bg-pink-500 text-white px-3 py-1 rounded-md mt-3 cursor-pointer'>Submit</button>
                <div className='flex items-center justify-center w-full text-gray-700'>
                  ---------OR-----------
                </div>
                <div className='flex flex-col items-center gap-2'>
                  <button onClick={handleDetectLocation} className='bg-pink-500 text-white px-3 py-2 rounded-md cursor-pointer'>Detect Location</button>
                  {locationError && (
                    <p className='text-pink-500 text-sm text-center'>{locationError}</p>
                  )}
                </div>
              </div>
              <div className='bg-white border border-gray-100 shadow-xl rounded-md p-7 mt-4 space-y-2 h-max'>
                <h1 className='text-gray-800 font-bold text-xl'>Bill details</h1>
                <div className='flex justify-between items-center'>
                  <h1 className='flex gap-1 items-center text-gray-700'><span><LuNotebookText /></span>Items total</h1>
                  <p>${totalPrice}</p>
                </div>
                <div className='flex justify-between items-center'>
                  <h1 className='flex gap-1 items-center text-gray-700'><span><MdDeliveryDining /></span>Delivery Charge</h1>
                  <p className='text-pink-500 font-semibold'><span className='text-gray-600 line-through'>$25</span> FREE</p>
                </div>
                <div className='flex justify-between items-center'>
                  <h1 className='flex gap-1 items-center text-gray-700'><span><GiShoppingBag /></span>Handling Charge</h1>
                  <p className='text-pink-500 font-semibold'>$5</p>
                </div>
                <hr className='text-gray-200 mt-2' />
                <div className='flex justify-between items-center'>
                  <h1 className='font-semibold text-lg'>Grand total</h1>
                  <p className='font-semibold text-lg'>${grandTotal}</p>
                </div>
                <div>
                  <h1 className='font-semibold text-gray-700 mb-3 mt-7'>Apply Promo Code</h1>
                  <div className='flex gap-3'>
                    <input
                      type="text"
                      placeholder='Enter code'
                      className='p-2 rounded-md w-full'
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <button onClick={handleApplyPromo} className='bg-white text-black border border-gray-200 px-4 cursor-pointer py-1 rounded-md'>Apply</button>
                  </div>
                </div>
                <button
                  onClick={handleProceedToCheckout}
                  className='bg-pink-500 text-white px-3 py-2 rounded-md w-full cursor-pointer mt-3'
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div> : <div className='flex flex-col gap-3 justify-center items-center h-150'>
          <h1 className='text-pink-500/80 font-bold text-5xl text-muted'>Oh no! Your cart is empty</h1>
          <img src={cart} alt="" className='w-100' />
          <button onClick={() => navigate('/products')} className='bg-pink-500 text-white px-3 py-2 rounded-md cursor-pointer '>Continue Shopping</button>
        </div>
      }
    </div>
  )
}

export default Cart