import React from 'react'
import { Button } from '../ui/button'

function Hero() {
  return (
    <div className='flex flex-col items-center mx-56 gap-9'>
     <h1 className='font-extrabold text-[40px] text-center mt-16'>
      <span className=' text-[#f56551]'>Discover Your Next Adventure with Al:</span> Personalized Itineraries at Your Fingertips</h1>


<p className='text-xl text-gray-500 text-center'> It is your personal travel companion, designed to help you plan, organize, and enjoy your journeys with ease. From creating custom itineraries and tracking destinations to budgeting and storing travel memories, it puts everything in one place. </p>
<Button> Get Started, It's free</Button>


    </div>
  )
}

export default Hero
