import React from 'react'
import ImageCarousel from '../components/Carousal'

const Login = () => {
  return (
    <div className='flex h-screen '>
      <div className='w-1/2'>
      <ImageCarousel
       images={[
    'https://images.pexels.com/photos/27781542/pexels-photo-27781542/free-photo-of-a-clock-tower-with-a-dome-and-a-clock-on-it.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/30654948/pexels-photo-30654948/free-photo-of-skyscrapers-and-urban-landscape-in-black-and-white.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/27781542/pexels-photo-27781542/free-photo-of-a-clock-tower-with-a-dome-and-a-clock-on-it.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/30654948/pexels-photo-30654948/free-photo-of-skyscrapers-and-urban-landscape-in-black-and-white.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
     ]}
      />

      </div>
      <div>

      </div>
  
    </div>
  )
}

export default Login
