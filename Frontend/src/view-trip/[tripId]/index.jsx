import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/service/firebase";
import { toast } from "sonner";
import { useEffect, useState } from "react";

function ViewTrip() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState([]);
  const [tripData, setTripData] = useState(null);

  useEffect(() => {
    if (tripId) {
      GetTripData();
    }
  }, [tripId]);

  /** Fetch trip info from Firestore */
  const GetTripData = async () => {
    try {
      const docRef = doc(db, "AiTrips", tripId); // ✅ correct collection name + variable
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document:", docSnap.data());

        setTrip(docSnap.data());
      } else {
        console.log("No such document!");
        toast("No trip found!");
      }
    } catch (error) {
      console.error("Error fetching trip:", error);
      toast("Failed to load trip data");
    }
  };

  return (
    <div className="p-10 md: px-20 lg:px-44 xl:px-56 ">
     Information
    </div>
  );
}

export default ViewTrip;
