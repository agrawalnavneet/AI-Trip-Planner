import React, { useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

function CreateTrip() {
  const [place, setPlace] = useState();

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>Customize your travel experience</h2>
      <p className='mt-3 text-gray-500 text-xl'>
        Just provide some basic information, and our trip planner will create a personalized travel plan for you—tailored to your interests, budget, and schedule.
      </p>

      <div className='mt-20'>
        <h2 className='text-xl my-2 font-medium'>What is your destination of choice?</h2>
        <GooglePlacesAutocomplete
          apiKey={import.meta.env.VITE_GOOGLE_API_KEY}
          selectProps={{
            value: place,
            onChange: (v) => {
              setPlace(v);
              console.log(v);
            },
          }}
        />
      </div>
    </div>
  );
}

export default CreateTrip;
