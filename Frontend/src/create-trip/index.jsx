import React, { useState,useEffect } from 'react';
import { Button } from "@/components/ui/Button"; // if file is Button.jsx
import { Input } from "@/components/ui/Input"; // if file is Input.
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { AI_PROMPT, SelectBugetOption, SelectTravel } from '@/constant/options';
import { toast } from "sonner";


// Assuming you have this component
function CreateTrip() {
  const [place, setPlace] = useState();
const[formData,setformData]=useState([]);
const handleInputChange =(name,value )=>{
  // if(name==='noOfDays' && value>5){
  //   console.log('You can only select a maximum of 5 days');
  //   return;
  // }
  
  setformData({
    ...formData,
    [name]:value
  })
}
useEffect(() => {
  console.log(formData);
}, [formData]);

// const OnGenerateTrip = () => {
//   if (formData?.noOfDays > 5 && !formData?.location || !formData?.budget || !formData?.traveller) {
//     alert("You can only select a maximum of 5 days");
//     toast("Please fill all the details.")
//     return;
//   }
//   console.log(formData);
// };
const OnGenerateTrip = async() => {
 if (
  formData?.noOfDays > 5 ||
  !formData?.destination ||  
  !formData?.budget ||
  !formData?.traveller
) {
  toast("Please fill all the details.");
  return;
}


  if (formData.noOfDays > 5) {
    alert("You can only select a maximum of 5 days.");
    return;
  }

  // console.log(formData);

  const Final_Prompt=AI_PROMPT
  .replace('{location}', formData?.location?.label)
  .replace('{totalDays}', formData?.noOfDays)
  .replace('{traveller}', formData?.traveller)
  .replace('{budget}', formData?.budget)
  .replace('{totalDays}', formData?.noOfDays);
  console.log(Final_Prompt);

const result=await chatSession.sendMessage(Final_Prompt);

console.log(result?.response?.text());


};


  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>Customize your travel experience 🏕️🌴</h2>
      <p className='mt-3 text-gray-500 text-xl'>
        Just provide some basic information, and our trip planner will create a personalized travel plan for you—tailored to your interests, budget, and schedule.
      </p>

      <div className='mt-20 flex flex-col gap-10'>
        <div>
          <h2 className='text-xl my-2 font-medium'>What is your destination of choice?</h2>
          {/* <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_API_KEY}
            selectProps={{
              value: place,
              onChange: (v) => {
                setPlace(v);
                console.log(v);
              },
            }}
          /> */}

          <GooglePlacesAutocomplete
  apiKey={import.meta.env.VITE_GOOGLE_API_KEY}
  selectProps={{
    value: place,
    onChange: (v) => {
      setPlace(v);
      handleInputChange('destination', v.label || v.value?.description); // ✅ this line adds location to formData
      console.log(v);
    },
  }}
/>
        </div>

        <div>
          <h2 className='text-xl my-2 font-medium'>How many days do you want to spend on this trip?</h2>
          <input placeholder={'Ex.3'} type="number" className='border-2 border-gray-300 rounded-md p-2 w-full' 
        
        onChange={(e) => handleInputChange('noOfDays', e.target.value)} />
        </div>

        <div>
          <h2 className='text-xl my-2 font-medium'>What is Your Budget? <br />
            <p>The budget is exclusively allocated for activities and dining purposes.</p>
          </h2>

          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectBugetOption.map((item, index) => (
              <div
                key={index} 
                onClick={() => handleInputChange('budget', item.title)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
                  
                ${formData?.budget==item.title&& 'shadow-lg border-black'}
                  
                  `}>
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className='text-xl my-2 font-medium'>Who do you plan on travelling with on your next adventure?</h2>

          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectTravel.map((item, index) => (
              <div
                key={index} 
                onClick={() => handleInputChange('traveller', item.people)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
                
                
                ${formData?.traveller==item.people && 'shadow-lg border-black'}
                
                `}>
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='mt-10 mb-10 justify-end flex'>
      <Button onClick={OnGenerateTrip} className='bg-[#f56551] text-white'> 
        Generate Trip</Button>
         </div>
    </div>
  );
}

export default CreateTrip;
