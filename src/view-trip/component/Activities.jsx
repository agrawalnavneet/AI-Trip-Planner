import React from "react";

const Activities = ({ trip }) => {
  console.log("Activities component - trip data:", trip);
  console.log("Activities:", trip?.Activities);

  const activities = trip?.Activities || trip?.activities || [];

  return (
    <div className="p-6">
      <h2 className="font-bold text-2xl mb-6 text-gray-800 text-center">
        Activities to Do 🎯
      </h2>

      {activities.length === 0 ? (
        <div className="text-center py-10 text-gray-500 bg-gray-50 rounded-xl shadow-sm">
          <p className="text-lg">No activities available</p>
          <p className="text-sm mt-2">
            Debug: Found {activities.length} activities
          </p>
          <p className="text-xs mt-1">
            Available keys: {Object.keys(trip || {}).join(", ")}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative">
                <img
                  src={
                    activity.ActivityImageUrl ||
                    activity.activityImageUrl ||
                    activity.image ||
                    "/tra.jpg"
                  }
                  alt={
                    activity.ActivityName ||
                    activity.activityName ||
                    activity.name ||
                    "Activity"
                  }
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.src = "/tra.jpg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <h3 className="absolute bottom-3 left-3 text-white font-semibold text-lg drop-shadow-lg">
                  {activity.ActivityName ||
                    activity.activityName ||
                    activity.name ||
                    "Activity Name"}
                </h3>
              </div>
              <div className="p-4">
                <p className="text-gray-600 text-sm leading-relaxed">
                  {activity.ActivityDescription ||
                    activity.activityDescription ||
                    activity.description ||
                    "No description available"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Activities;
