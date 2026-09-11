import React from 'react'
import { getData } from '../context/DataContext'
import { useNavigate } from 'react-router-dom'

const Category = () => {
  const navigate = useNavigate()
  const { data } = getData()

  const getUniqueCategory = (data, property) => {
    let newVal = data?.map((curElem) => {
      return curElem[property]
    })
    newVal = [...new Set(newVal)]
    return newVal
  }

  const categoryOnlyData = getUniqueCategory(data, "category")

  return (
    <div className='bg-[#0f0c29]'>
      <div className='max-w-7xl mx-auto flex flex-wrap gap-4 items-center justify-center py-7 px-4'>
        {
          categoryOnlyData?.map((item, index) => {
            return (
              <button
                key={index}
                onClick={() => navigate(`/category/${item}`)}
                className='uppercase text-sm md:text-base font-medium tracking-wide bg-linear-to-r from-pink-500 to-purple-500 text-white px-5 py-2 rounded-full shadow-md hover:shadow-[0_0_15px_rgba(236,72,153,0.5)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer'
              >
                {item}
              </button>
            )
          })
        }
      </div>
    </div>
  )
}

export default Category