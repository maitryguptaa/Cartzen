import React, { useState, useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Products from './pages/Products'
import About from './pages/About'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import OrderConfirmation from './pages/OrderConfirmation'
import Navbar from './components/Navbar'
import axios from 'axios'
import Footer from './components/Footer'
import SingleProduct from './pages/SingleProduct'
import CategoryProduct from './pages/CategoryProduct'
import { useCart } from './context/CartContext'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => {
  const [location, setLocation] = useState()
  const [locationError, setLocationError] = useState(null)
  const [openDropdown, setOpenDropdown] = useState(false)
  const { cartItem, setCartItem } = useCart()
  const isFirstRender = useRef(true)

  const getLocation = () => {
    setLocationError(null)

    if (!navigator.geolocation) {
      console.log('Geolocation is not supported by this browser.')
      setLocationError('Geolocation is not supported by this browser.')
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords
        console.log('Got coords:', latitude, longitude)

        const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
        try {
          const response = await axios.get(url)
          console.log('Nominatim response:', response.data)
          const exactLocation = response.data.address
          setLocation(exactLocation)
          setOpenDropdown(false)
        } catch (error) {
          console.log('Reverse geocoding failed:', error)
          setLocationError('Could not fetch address for your location.')
        }
      },
      (err) => {
        console.log('Geolocation error:', err.code, err.message)
        if (err.code === err.PERMISSION_DENIED) {
          setLocationError('Location permission denied. Please allow location access in your browser settings.')
        } else if (err.code === err.TIMEOUT) {
          setLocationError('Location request timed out. Please try again.')
        } else {
          setLocationError('Unable to retrieve your location.')
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    )
  }

  useEffect(() => {
    getLocation()
  }, [])

  // Load cart from local storage on initial render
  useEffect(() => {
    const storedCart = localStorage.getItem('cartItem')
    if (storedCart) {
      setCartItem(JSON.parse(storedCart))
    }
  }, []);

  // Save cart to local storage whenever it changes — but skip the very first
  // run, so we never overwrite localStorage with the default/empty state
  // before the loaded cart has actually been applied.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    localStorage.setItem('cartItem', JSON.stringify(cartItem))
  }, [cartItem])

  return (
    <BrowserRouter>
      <Navbar
        location={location}
        getLocation={getLocation}
        openDropdown={openDropdown}
        setOpenDropdown={setOpenDropdown}
      />

      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/products/:id' element={<SingleProduct />}></Route>
        <Route path='/category/:category' element={<CategoryProduct />}></Route>
        <Route path='/contact' element={<Contact />}></Route>
        <Route path='/cart' element={
          <ProtectedRoute>
            <Cart location={location} getLocation={getLocation} locationError={locationError} />
          </ProtectedRoute>
        }></Route>
        <Route path='/checkout' element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }></Route>
        <Route path='/order-confirmation' element={
          <ProtectedRoute>
            <OrderConfirmation />
          </ProtectedRoute>
        }></Route>
        <Route path='/products' element={<Products />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App