import React from "react";

const PlacesToVisit = ({ trip }) => {
  console.log("PlacesToVisit component - trip data:", trip);
  console.log("Itinerary:", trip?.Itinerary);

  const itinerary = trip?.Itinerary || {};
  const days = Object.keys(itinerary);

  return (
    <div className="p-4">
      <h2 className="font-bold text-xl mb-6">Places to Visit</h2>

      {days.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No itinerary available
        </div>
      ) : (
        <div className="space-y-10">
          {days.map((day) => (
            <div key={day}>
              {/* Day heading */}
              <h3 className="font-bold text-lg mb-6 text-gray-800">{day}</h3>

              {/* Places in grid (2 per row) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {itinerary[day].map((place, index) => (
                  <div key={index} className="space-y-2">
                    {/* Time on top */}
                    <div className="text-red-500 font-semibold text-sm">
                      {place.time || "Time not specified"}
                    </div>

                    {/* Card */}
                    <div className="border rounded-lg shadow bg-white p-4 flex gap-4">
                      <img
                        src={place.imageUrl || place.PlaceImageUrl || "/tra.jpg"}
                        alt={place.placeName || place.PlaceName || "Place"}
                        className="w-[100px] h-[100px] object-cover rounded-lg"
                        onError={(e) => {
                          e.target.src = "/tra.jpg";
                        }}
                      />
                      <div className="space-y-1">
                        <h2 className="font-semibold text-lg">
                          {place.placeName || place.PlaceName || "Place Name"}
                        </h2>
                        <p className="text-gray-600 text-sm">
                          {place.description || place.PlaceDetails || "No details available"}
                        </p>
                        <div className="flex flex-col sm:flex-row sm:justify-between text-sm text-gray-500 gap-1">
                          <span>⏱️ {place.duration || "Duration not specified"}</span>
                          <span>💰 {place.cost || place.TicketPricing || "Cost not specified"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlacesToVisit;
