import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import loading from "../assets/loading.mp4"
import { ChevronLeft } from 'lucide-react'
import ProductListView from '../components/ProductListView'

const CategoryProduct = () => {
  const [searchData, setSearchData] = useState([])
  const params = useParams()
  const category = params.category
  const navigate = useNavigate()

  const getFilterData = async () => {
    try {
      // BUG FIX: was a literal string "{categoryName}" — now an actual template literal using `category`
      const res = await axios.get(`https://fakestoreapi.com/products/category/${category}`)
      // BUG FIX: fakestoreapi returns the array directly as res.data, not res.data.products
      const data = res.data
      setSearchData(data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setSearchData([]) // reset so the loading state shows while the new category fetches
    getFilterData()
    window.scrollTo(0, 0)
    // BUG FIX: added `category` so switching categories (e.g. via a link, without unmount) refetches
  }, [category])

  return (
    <div>
      {
        searchData.length > 0 ? (
          <div className='max-w-6xl mx-auto mt-10 mb-10 px-4'>
            <button onClick={() => navigate('/')} className='bg-gray-800 mb-5 text-white px-3 py-1 rounded-md cursor-pointer flex gap-1 items-center'><ChevronLeft /> Back</button>
            {
              searchData.map((product) => {
                // BUG FIX: key was `index`, now `product.id` for stable identity
                return <ProductListView key={product.id} product={product} />
              })
            }
          </div>
        ) : (
          <div className='flex items-center justify-center h-100'>
            <video muted autoPlay loop>
              <source src={loading} type='video/mp4' />
            </video>
          </div>
        )
      }
    </div>
  )
}

export default CategoryProduct