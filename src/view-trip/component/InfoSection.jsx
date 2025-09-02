import React from 'react'
import { IoIosSend } from "react-icons/io";

const InfoSection = ({ trip }) => {
  console.log("InfoSection component - trip data:", trip);
  console.log("userSelection:", trip?.userSelection);
  
  const userSelection = trip?.userSelection || {};
  
  return (
    <div>
      <img
        src='/tra.jpg'
        className='h-[300px] w-full object-cover rounded-lg'
        alt='trip image'
      />
      <div className='flex justify-between items-center'>
        <div className='my-5 flex flex-col gap-2'>
          <h2 className='font-bold text-2xl'>
            {userSelection.destination || "Destination not available"}
          </h2>
          <div className='flex gap-5'>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>
              📅 {userSelection.noOfDays || "N/A"} Days
            </h2>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>
              💰 {userSelection.budget || "N/A"} Budget
            </h2>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>
              🥂 No. Of Traveler: {userSelection.traveller || "N/A"}
            </h2>
          </div>
        </div>
        <button className='bg-blue-600 text-white px-5 py-2 rounded-lg'>
          <IoIosSend />
        </button>
      </div>
    </div>
  )
}

export default InfoSection
