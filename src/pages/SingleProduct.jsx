import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import loading from "../assets/loading.mp4"
import Breadcrums from '../components/Breadcrums';
import { IoCartOutline } from 'react-icons/io5';
import { useCart } from '../context/CartContext';

const SingleProduct = () => {
    const params = useParams()
    const [singleProduct, setSingleProduct] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const { addToCart } = useCart()

    const getSingleProduct = async () => {
        try {
            // BUG FIX: missing "/" before params.id was hitting /products2 instead of /products/2
            const res = await axios.get(`https://fakestoreapi.com/products/${params.id}`)
            // BUG FIX: fakestoreapi returns the product object directly as res.data, not res.data.product
            const product = res.data
            setSingleProduct(product)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        setSingleProduct(null)
        setQuantity(1)
        getSingleProduct()
        window.scrollTo(0, 0)
        // BUG FIX: added params.id so navigating between two product pages directly refetches
    }, [params.id])

    const hasDiscount = singleProduct?.discount > 0
    const originalPrice = hasDiscount
        ? Math.round(singleProduct.price + (singleProduct.price * singleProduct.discount / 100))
        : null

    const handleQuantityChange = (delta) => {
        setQuantity((prev) => Math.max(1, prev + delta))
    }

    const handleAddToCart = () => {
        addToCart({ ...singleProduct, quantity })
    }

    return (
        <>
            {
                singleProduct ? (
                    <div className='px-4 pb-10 md:px-0'>
                        <Breadcrums title={singleProduct.title} />
                        <div className='max-w-6xl mx-auto md:p-6 grid grid-cols-1 md:grid-cols-2 gap-10'>
                            {/* product image */}
                            <div className='w-full bg-gray-50 rounded-2xl flex items-center justify-center p-6 md:p-10'>
                                <img
                                    src={singleProduct.image}
                                    alt={singleProduct.title}
                                    className='max-h-100 w-full object-contain'
                                />
                            </div>

                            {/* product details */}
                            <div className='flex flex-col gap-5'>
                                <h1 className='md:text-3xl text-xl font-bold text-gray-800 leading-snug'>
                                    {singleProduct.title}
                                </h1>

                                {(singleProduct.brand || singleProduct.category || singleProduct.model) && (
                                    <div className='text-sm text-gray-500 tracking-wide uppercase'>
                                        {[singleProduct.brand, singleProduct.category, singleProduct.model]
                                            .filter(Boolean)
                                            .join(' / ')}
                                    </div>
                                )}

                                <div className='flex flex-wrap items-center gap-3'>
                                    <span className='text-3xl text-pink-500 font-bold'>
                                        ${singleProduct.price}
                                    </span>
                                    {hasDiscount && (
                                        <>
                                            <span className='line-through text-gray-400 text-lg'>
                                                ${originalPrice}
                                            </span>
                                            <span className='bg-pink-500 text-white text-sm font-semibold px-3 py-1 rounded-full'>
                                                {singleProduct.discount}% OFF
                                            </span>
                                        </>
                                    )}
                                </div>

                                <p className='text-gray-600 leading-relaxed'>
                                    {singleProduct.description}
                                </p>

                                <hr className='text-gray-200' />

                                {/* quantity selector */}
                                <div className='flex items-center gap-4'>
                                    <label className='text-sm font-medium text-gray-700'>Quantity:</label>
                                    <div className='flex items-center border border-gray-300 rounded-lg overflow-hidden'>
                                        <button
                                            onClick={() => handleQuantityChange(-1)}
                                            className='px-3 py-2 text-lg font-semibold text-gray-600 hover:bg-gray-100 cursor-pointer transition-colors'
                                        >
                                            −
                                        </button>
                                        <span className='w-10 text-center font-medium'>{quantity}</span>
                                        <button
                                            onClick={() => handleQuantityChange(1)}
                                            className='px-3 py-2 text-lg font-semibold text-gray-600 hover:bg-gray-100 cursor-pointer transition-colors'
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                <div className='flex gap-4 mt-2'>
                                    <button
                                        onClick={handleAddToCart}
                                        className='px-6 flex gap-2 items-center justify-center py-3 text-lg bg-pink-500 hover:bg-pink-600 active:scale-95 text-white font-semibold rounded-md w-full md:w-auto transition-all duration-200 cursor-pointer'
                                    >
                                        <IoCartOutline className='w-6 h-6' />
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='flex items-center justify-center h-screen'>
                        <video muted autoPlay loop>
                            <source src={loading} type='video/mp4' />
                        </video>
                    </div>
                )
            }
        </>
    )
}

export default SingleProduct