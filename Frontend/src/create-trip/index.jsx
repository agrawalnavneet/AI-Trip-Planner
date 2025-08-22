import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"; // ✅ fixed lowercase import
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { AI_PROMPT, SelectBugetOption, SelectTravel } from "@/constant/options";
import { toast } from "sonner";
import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [tripPlan, setTripPlan] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Gemini setup (flash model)
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log("Form Data:", formData);
  }, [formData]);
const login=useGoogleLogin({
  onSuccess:(codeResp)=>console.log(codeResp),
  onError:(error)=>console.log(error)
})
  const OnGenerateTrip = async () => {
    const user = localStorage.removeItem("user")


    // ✅ Show login dialog if user not found
    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (loading) return; // ⛔ prevent spamming
    setLoading(true);

    if (
      formData?.noOfDays > 5 ||
      !formData?.destination ||
      !formData?.budget ||
      !formData?.traveller
    ) {
      toast("Please fill all the details.");
      setLoading(false);
      return;
    }

    if (formData.noOfDays > 5) {
      alert("You can only select a maximum of 5 days.");
      setLoading(false);
      return;
    }

    const Final_Prompt = AI_PROMPT
      .replace("{location}", formData?.destination)
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{traveller}", formData?.traveller)
      .replace("{budget}", formData?.budget);

    console.log("Prompt:", Final_Prompt);

    try {
      const result = await model.generateContent(Final_Prompt);
      const response = result.response.text();
      console.log("Gemini response:", response);
      setTripPlan(response);
    } catch (error) {
      console.error("Error generating trip:", error);

      if (error.message.includes("429")) {
        toast("⚠️ Quota exceeded. Please wait a bit or upgrade your plan.");
      } else {
        toast("Something went wrong while generating your trip.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
      <h2 className="font-bold text-3xl">Customize your travel experience 🏕️🌴</h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will create a
        personalized travel plan for you—tailored to your interests, budget, and
        schedule.
      </p>

      <div className="mt-20 flex flex-col gap-10">
        {/* Destination */}
        <div>
          <h2 className="text-xl my-2 font-medium">
            What is your destination of choice?
          </h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_API_KEY}
            selectProps={{
              value: place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange(
                  "destination",
                  v.label || v.value?.description
                );
                console.log(v);
              },
            }}
          />
        </div>

        {/* Days */}
        <div>
          <h2 className="text-xl my-2 font-medium">
            How many days do you want to spend on this trip?
          </h2>
          <input
            placeholder={"Ex.3"}
            type="number"
            className="border-2 border-gray-300 rounded-md p-2 w-full"
            onChange={(e) =>
              handleInputChange("noOfDays", parseInt(e.target.value))
            }
          />
        </div>

        {/* Budget */}
        <div>
          <h2 className="text-xl my-2 font-medium">
            What is Your Budget?
            <br />
            <p>The budget is exclusively allocated for activities and dining.</p>
          </h2>

          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectBugetOption.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("budget", item.title)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${
                  formData?.budget === item.title && "shadow-lg border-black"
                }`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        {/* Traveller */}
        <div>
          <h2 className="text-xl my-2 font-medium">
            Who do you plan on travelling with?
          </h2>

          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectTravel.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("traveller", item.people)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${
                  formData?.traveller === item.people &&
                  "shadow-lg border-black"
                }`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Generate button */}
      <div className="mt-10 mb-10 justify-end flex">
        <Button
          onClick={OnGenerateTrip}
          disabled={loading}
          className={`bg-[#f56551] text-white ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Generating..." : "Generate Trip"}
        </Button>
      </div>

      {/* Show result
      {tripPlan && (
        <div className="mt-10 p-5 border rounded-lg shadow-md bg-white">
          <h2 className="font-bold text-2xl mb-3">Your Trip Plan ✈️</h2>
          <pre className="whitespace-pre-wrap text-gray-700">{tripPlan}</pre>
        </div>
      )} */}

      {/* Login Required Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>

        <DialogContent>
        <DialogHeader>
  <DialogTitle>Login Required</DialogTitle>
  <DialogDescription>
 <img src="/logo.svg" alt="Logo" />
<h2 className="font-bold text-lg mt-7">Sign In with Google</h2>
    You need to log in before generating your trip plan.
  </DialogDescription>
</DialogHeader>
<DialogFooter>
  <Button 
  onClick={login}
  className="w-full mt-5 flex gap-4 items-center">
    <FcGoogle className='h-7 w-7' />Sign In With Google</Button>
</DialogFooter>
          
           
          
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;
