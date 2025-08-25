import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { AI_PROMPT, SelectBugetOption, SelectTravel } from "@/constant/options";
import { toast } from "sonner";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
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
import axios from "axios";

// 🔥 Firestore imports (make sure you have a firebase.js that exports db)
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebase";

function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [tripPlan, setTripPlan] = useState(null);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [token, setToken] = useState(localStorage.getItem("token") || null);
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

  // ✅ Fetch Google Profile
  const GetUserProfile = async (tokenInfo) => {
    try {
      const res = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo.access_token}`,
            Accept: "application/json",
          },
        }
      );
      console.log("User Profile:", res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
      localStorage.setItem("token", tokenInfo.access_token);
      setUser(res.data);
      setToken(tokenInfo.access_token);
      return res.data;
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };

  // ✅ Google Login
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const profile = await GetUserProfile(tokenResponse);
      if (profile) {
        setOpenDialog(false);
        toast.success(`Welcome ${profile.name}!`);
      }
    },
    onError: (error) => console.log("Login Failed:", error),
    redirectUri: "http://localhost:5173", // must match Google console
  });

  // ✅ Logout + revoke
  const handleLogout = async () => {
    try {
      if (token) {
        await axios.get(
          `https://accounts.google.com/o/oauth2/revoke?token=${token}`
        );
        console.log("Google access revoked");
      }
    } catch (err) {
      console.error("Error revoking token:", err);
    } finally {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setUser(null);
      setToken(null);
      setTripPlan(null);
      toast.success("You have been logged out.");
    }
  };

  // ✅ Save Trip to Firestore
  const SaveAiTrip = async (TripData) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const docId = Date.now().toString();
      await setDoc(doc(db, "AiTrips", docId), {
        userSelection: formData,
        tripData: TripData,
        userEmail: user?.email,
        id: docId,
      });
    } catch (error) {
      console.error("Error saving trip:", error);
    }
  };

  // ✅ Generate Trip Plan
  const OnGenerateTrip = async () => {
    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (loading) return; // prevent spamming
    setLoading(true);

    if (
      !formData?.destination ||
      !formData?.noOfDays ||
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

    try {
      const result = await model.generateContent(Final_Prompt);
      const response = await result.response.text();
      await SaveAiTrip(response);
      setTripPlan(response);
      console.log("Gemini response:", response);
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
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-3xl">
          Customize your travel experience 🏕️🌴
        </h2>
      </div>

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
      <div className="mt-10 mb-10 justify-end flex gap-x-4">
        <Button
          onClick={OnGenerateTrip}
          disabled={loading}
          className={`bg-[#f56551] text-white ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? (
            <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
          ) : (
            "Generate Trip"
          )}
        </Button>

        {user && (
          <Button
            onClick={handleLogout}
            className="bg-gray-600 text-white hover:bg-gray-700"
          >
            Logout
          </Button>
        )}
      </div>

      {/* Show result */}
      {tripPlan && (
        <div className="mt-10 p-5 border rounded-lg shadow-md bg-white">
          <h2 className="font-bold text-2xl mb-3">Your Trip Plan ✈️</h2>
          <pre className="whitespace-pre-wrap text-gray-700">{tripPlan}</pre>
        </div>
      )}

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
              disabled={loading}
              onClick={login}
              className="w-full mt-5 flex gap-4 items-center"
            >
              <FcGoogle className="h-7 w-7" /> Sign In With Google
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;
