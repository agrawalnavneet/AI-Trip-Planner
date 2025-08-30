import React from 'react'
import { IoIosSend } from "react-icons/io";
const InfoSection = ({ trip }) => {
  return (
    <div>
      <img
        src='/tra.jpg'
        className='h-[300px] w-full object-cover rounded-lg'
        alt='trip image'
      />
      <div  className='flex justify-between items-center'>
      <div className='my-5 flex flex-col gap-2'>
        <h2 className='font-bold text-2xl'>{trip?.userSelection?.destination}</h2>
        <div className='flex gap-5'>
        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md: text-md'>📅 {trip?.userSelection?.noOfDays} Days</h2>
        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md: text-md'>💰 {trip?.userSelection?.budget} Budget</h2>
        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md: text-md'>🥂  No. Of Traveler: {trip?.userSelection?.traveller} </h2>
      </div></div>
      <button className='bg-blue-600 text-white px-5 py-2 rounded-lg'><IoIosSend /></button>
    </div></div>
  )
}

export default InfoSection
