import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../service/firebase";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import InfoSection from "../component/InfoSection";
import Hotels from "../component/Hotels";
import PlacesToVisit from "../component/PlacesToVisit";
import Activities from "../component/Activities";

function ViewTrip() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (tripId) {
      GetTripData();
    }
  }, [tripId]);

  const GetTripData = async () => {
    try {
      setLoading(true);
      const docRef = doc(db, "AiTrips", tripId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const tripData = docSnap.data();
        console.log("Raw Firebase data:", tripData);
        
        let processedTrip = { ...tripData };
        
        if (tripData.travelPlan) {
          processedTrip = {
            ...tripData,
            ...tripData.travelPlan
          };
        } else if (tripData.tripData) {
          processedTrip = {
            ...tripData,
            ...tripData.tripData
          };
        }
        
        console.log("Processed trip data:", processedTrip);
        console.log("Available keys after processing:", Object.keys(processedTrip));
        setTrip(processedTrip);
      } else {
        console.log("No such document!");
        toast("No trip found!");
      }
    } catch (error) {
      console.error("Error fetching trip:", error);
      toast("Failed to load trip data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl">Loading trip data...</div>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl">No trip data found</div>
      </div>
    );
  }

  return (
    <div className="p-10 md:px-20 lg:px-44 xl:px-56">
      <InfoSection trip={trip} />
      <Hotels trip={trip}/>
      <PlacesToVisit trip={trip}/>
      <Activities trip={trip}/>
    </div>
  );
}

export default ViewTrip;
