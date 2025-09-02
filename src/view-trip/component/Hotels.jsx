import React from "react";

const Hotels = ({ trip }) => {
  console.log("Hotels component - trip data:", trip);
  console.log("HotelOptions:", trip?.HotelOptions);
  
  const hotels = trip?.HotelOptions || trip?.Hotels || trip?.hotels || [];
  
  return (
    <div>
      <h2 className="font-bold text-xl mt-5">Hotel Recommendations 🏨</h2>
      
      {hotels.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No hotel recommendations available</p>
          <p className="text-sm">Debug: Found {hotels.length} hotels</p>
          <p className="text-xs">Available keys: {Object.keys(trip || {}).join(', ')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-4">
          {hotels.map((hotel, index) => (
            <div
              key={index}
              className="hover:scale-105 transition-all border rounded-xl overflow-hidden shadow-md bg-white"
            >
              <img
                src={hotel.HotelImageUrl || hotel.hotelImageUrl || hotel.image || "/tra.jpg"} 
                className="w-full h-40 object-cover"
                alt={hotel.HotelName || hotel.hotelName || hotel.name || "Hotel"}
                onError={(e) => {
                  e.target.src = "/tra.jpg";
                }}
              />

              <div className="p-3">
                <h2 className="font-medium text-lg mb-2">
                  {hotel.HotelName || hotel.hotelName || hotel.name || "Hotel Name"}
                </h2>
                <p className="text-xs text-gray-500 mb-2">
                  {hotel.HotelAddress || hotel.hotelAddress || hotel.address || "Address not available"}
                </p>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">💰 {hotel.Price || hotel.price || "N/A"}</span>
                  <span className="text-sm">⭐ {hotel.Rating || hotel.rating || "N/A"}</span>
                </div>
                <p className="text-xs text-gray-600">
                  {hotel.Description || hotel.description || "No description available"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {hotels.length > 0 && (
        <div className="text-center mt-4 text-sm text-gray-600">
         
        </div>
      )}
    </div>
  );
};

export default Hotels;
