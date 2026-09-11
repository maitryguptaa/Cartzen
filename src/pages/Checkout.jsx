import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { toast } from 'react-toastify'

const Checkout = () => {
  const { state } = useLocation()
  const navigate = useNavigate()
  const { cartItem, setCartItem } = useCart()
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [placing, setPlacing] = useState(false)

  // Guard: if someone lands here directly without going through Cart
  if (!state || cartItem.length === 0) {
    return (
      <div className='flex flex-col gap-4 items-center justify-center h-100 max-w-6xl mx-auto'>
        <h1 className='text-xl font-semibold text-gray-700'>No checkout in progress.</h1>
        <button
          onClick={() => navigate('/cart')}
          className='bg-pink-500 text-white px-4 py-2 rounded-md cursor-pointer'
        >
          Back to Cart
        </button>
      </div>
    )
  }

  const { deliveryInfo, totalPrice, grandTotal } = state

  const handlePlaceOrder = () => {
    setPlacing(true)

    // Simulated order placement — swap this block for a real API call
    // to your backend/payment provider when ready.
    setTimeout(() => {
      const orderId = `ORD-${Date.now()}`

      navigate('/order-confirmation', {
        state: {
          orderId,
          deliveryInfo,
          items: cartItem,
          grandTotal,
        }
      })

      setCartItem([]) // empty the cart after order is placed
      toast.success("Order placed successfully!")
      setPlacing(false)
    }, 1200)
  }

  return (
    <div className='mt-10 max-w-4xl mx-auto mb-10 px-4'>
      <h1 className='font-bold text-2xl mb-6'>Checkout</h1>

      <div className='bg-gray-100 rounded-md p-6 mb-6'>
        <h2 className='font-semibold text-lg mb-3'>Delivering to</h2>
        <p className='text-gray-700'>{deliveryInfo.fullName}</p>
        <p className='text-gray-700'>{deliveryInfo.address}, {deliveryInfo.state} - {deliveryInfo.postcode}</p>
        <p className='text-gray-700'>{deliveryInfo.country}</p>
        <p className='text-gray-700'>Phone: {deliveryInfo.phone}</p>
      </div>

      <div className='bg-white border border-gray-100 shadow-xl rounded-md p-6 mb-6'>
        <h2 className='font-semibold text-lg mb-3'>Payment Method</h2>
        <div className='flex flex-col gap-2'>
          {['card', 'upi', 'cod'].map((method) => (
            <label key={method} className='flex items-center gap-2 cursor-pointer'>
              <input
                type="radio"
                name="payment"
                value={method}
                checked={paymentMethod === method}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              {method === 'card' && 'Credit / Debit Card'}
              {method === 'upi' && 'UPI'}
              {method === 'cod' && 'Cash on Delivery'}
            </label>
          ))}
        </div>
      </div>

      <div className='bg-gray-100 rounded-md p-6 mb-6 flex justify-between items-center'>
        <h2 className='font-semibold text-lg'>Grand Total</h2>
        <p className='font-bold text-xl text-pink-500'>${grandTotal}</p>
      </div>

      <button
        onClick={handlePlaceOrder}
        disabled={placing}
        className='bg-pink-500 text-white px-4 py-3 rounded-md w-full cursor-pointer disabled:opacity-60'
      >
        {placing ? 'Placing Order...' : 'Place Order'}
      </button>
    </div>
  )
}

export default Checkout