import { useEffect, useState } from 'react'

import { SendIcon } from './components/Icons';

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css';

import { ScaleLoader } from 'react-spinners'

const App = () => {
  const [value, setValue] = useState('')
  const [response, setResponse] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const analyzeImage = async () => {
    setResponse('')
    setLoading(true)
    try {
      const options = {
        method: 'POST',
        body: JSON.stringify({
          message: value
        }),
        headers: {
          'Content-type': 'application/json'
        }
      }
      const response = await fetch('http://localhost:8000/vision', options)
      const data = await response.text()
      setResponse(data)
    }
    catch (error) {
      console.error(error)
    }
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    clearExceptInput()
  }, [value])

  const clear = () => {
    setValue('')
    setResponse('')
    setError('')
  }

  const clearExceptInput = () => {
    setResponse('')
    setError('')
  }

  return (
    <div className='app'>
      <section className={`flex justify-center transform h-[250px]`}>
        <img src="logo.png" alt="Logo" />
      </section>
      <section className='search-section'>
        <h1 className='text-xl pl-6 text-gray-400 mb-2'>Armario: </h1>
        <div className='h-[320px] min-w-[320px] mx-auto px-6'>
          <Swiper
            modules={[Autoplay]}
            slidesPerView={1}
            autoplay={{ autoplay: 1000 }}
            loop
          >
            <SwiperSlide className='rounded-lg bg-[url("../public/wardrobe/remera1.png")] bg-cover bg-center max-h-[320px] min-w-[320px]'></SwiperSlide>
            <SwiperSlide className='rounded-lg bg-[url("../public/wardrobe/sudadera2.png")] bg-cover bg-center max-h-[320px] min-w-[320px]'></SwiperSlide>
            <SwiperSlide className='rounded-lg bg-[url("../public/wardrobe/blusa3.png")] bg-cover bg-center max-h-[320px] min-w-[320px]'></SwiperSlide>
            <SwiperSlide className='rounded-lg bg-[url("../public/wardrobe/pantalon4.png")] bg-cover bg-center max-h-[320px] min-w-[320px]'></SwiperSlide>
            <SwiperSlide className='rounded-lg bg-[url("../public/wardrobe/pantalon5.png")] bg-cover bg-center max-h-[320px] min-w-[320px]'></SwiperSlide>
          </Swiper>
        </div>
        <div className='flex w-full mx-auto p-6'>
          <input
            value={value}
            placeholder='Que outfit necesitas?'
            onChange={(e) => setValue(e.target.value)}
            className='w-full rounded-l-lg border border-r-0 py-4 pl-4 focus:pr-4 text-xl outline-none'
          />
          {loading &&
            <button className='w-[80px] flex justify-center items-center rounded-r-lg border px-2 text-xl'>
              <div style={{ transform: 'scale(.75)' }}>
                <ScaleLoader color='#ddd' />
              </div>
            </button>
          }
          {(!response && !error && !loading) && <button onClick={analyzeImage} className='w-[80px] flex justify-center items-center rounded-r-lg border px-2 text-xl'><SendIcon /></button>}
          {(response || error) && <button onClick={clear} className='w-[80px] flex justify-center items-center rounded-r-lg border px-2 text-xl'>Clear</button>}
        </div>
        {error && <p>{''}</p>}

        {!response && loading && (
          <div className='flex justify-center items-center mt-20'>
            <ScaleLoader color='#ddd' />
          </div>
        )}
        {response && <p className='p-6 text-lg mb-3'>{response}</p>}
      </section>
    </div>
  )
}

export default App
