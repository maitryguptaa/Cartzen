import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { FaCheckCircle } from 'react-icons/fa'

const OrderConfirmation = () => {
  const { state } = useLocation()
  const navigate = useNavigate()

  if (!state) {
    return (
      <div className='flex flex-col gap-4 items-center justify-center h-100 max-w-6xl mx-auto'>
        <h1 className='text-xl font-semibold text-gray-700'>No order found.</h1>
        <button
          onClick={() => navigate('/products')}
          className='bg-pink-500 text-white px-4 py-2 rounded-md cursor-pointer'
        >
          Continue Shopping
        </button>
      </div>
    )
  }

  const { orderId, deliveryInfo, items, grandTotal } = state

  return (
    <div className='mt-10 max-w-3xl mx-auto mb-10 px-4 text-center'>
      <FaCheckCircle className='text-green-500 text-6xl mx-auto mb-4' />
      <h1 className='font-bold text-2xl mb-2'>Order Placed Successfully!</h1>
      <p className='text-gray-600 mb-6'>Order ID: <span className='font-semibold'>{orderId}</span></p>

      <div className='bg-gray-100 rounded-md p-6 text-left mb-6'>
        <h2 className='font-semibold text-lg mb-3'>Items</h2>
        {items.map((item) => (
          <div key={item.id} className='flex justify-between py-1'>
            <span>{item.title} × {item.quantity}</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <hr className='my-3' />
        <div className='flex justify-between font-semibold text-lg'>
          <span>Grand Total</span>
          <span>${grandTotal}</span>
        </div>
      </div>

      <div className='bg-gray-100 rounded-md p-6 text-left mb-6'>
        <h2 className='font-semibold text-lg mb-2'>Shipping to</h2>
        <p>{deliveryInfo.fullName}</p>
        <p>{deliveryInfo.address}, {deliveryInfo.state} - {deliveryInfo.postcode}</p>
        <p>{deliveryInfo.country}</p>
      </div>

      <button
        onClick={() => navigate('/products')}
        className='bg-pink-500 text-white px-4 py-3 rounded-md cursor-pointer'
      >
        Continue Shopping
      </button>
    </div>
  )
}

export default OrderConfirmation