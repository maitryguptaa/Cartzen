import React from 'react'
import { IoCartOutline } from 'react-icons/io5';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const navigate = useNavigate()
  const { addToCart, cartItem, updateQuantity } = useCart()

  const itemInCart = cartItem.find((item) => item.id === product.id)

  return (
    <div className='group bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-full'>
      <div
        onClick={() => navigate(`/products/${product.id}`)}
        className='relative w-full aspect-square bg-gray-50 flex items-center justify-center p-6 cursor-pointer overflow-hidden'
      >
        <img
          src={product.image}
          alt={product.title}
          className='max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300'
        />
      </div>

      <div className='flex flex-col flex-1 p-4 gap-1'>
        <h1 className='line-clamp-2 font-semibold text-gray-800 min-h-[2.7rem] leading-snug'>
          {product.title}
        </h1>

        <p className='text-pink-500 text-lg font-bold mt-1'>
          ${product.price}
        </p>

        {itemInCart ? (
          <div className='mt-auto pt-3 w-full flex items-center justify-between bg-pink-50 rounded-md px-3 py-2'>
            <button
              onClick={() => updateQuantity(cartItem, product.id, "decrease")}
              className='bg-pink-500 hover:bg-pink-600 active:scale-95 text-white rounded-md p-1.5 transition-all duration-200 cursor-pointer'
            >
              <FiMinus className='w-4 h-4' />
            </button>

            <span className='font-semibold text-lg text-gray-800'>
              {itemInCart.quantity}
            </span>

            <button
              onClick={() => updateQuantity(cartItem, product.id, "increase")}
              className='bg-pink-500 hover:bg-pink-600 active:scale-95 text-white rounded-md p-1.5 transition-all duration-200 cursor-pointer'
            >
              <FiPlus className='w-4 h-4' />
            </button>
          </div>
        ) : (
          <button
            onClick={() => addToCart(product)}
            className='mt-auto pt-3 w-full flex gap-2 items-center justify-center bg-pink-500 hover:bg-pink-600 active:scale-95 text-white font-semibold text-lg rounded-md px-3 py-2 transition-all duration-200 cursor-pointer'
          >
            <IoCartOutline className='w-6 h-6' />
            Add to Cart
          </button>
        )}
      </div>
    </div>
  )
}

export default ProductCard