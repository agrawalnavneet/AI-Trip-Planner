export const SelectTravel = [
  {
    id: 1,
    title: 'Just Me',
    desc: 'A soul in search of adventure',
    icon: '🧍',
    people: '1'
  },
  {
    id: 2,
    title: 'A Couple',
    desc: 'Two travelers in tandem',
    icon: '👫',
    people: '2 People'
  },
  {
    id: 3,
    title: 'Small Group',
    desc: 'Fun with friends or family',
    icon: '👨‍👩‍👧‍👦',
    people: '3-5 People'
  },
  {
    id: 4,
    title: 'Large Group',
    desc: 'Group travel vibes',
    icon: '🧑‍🤝‍🧑',
    people: '6+ People'
  }
];

export const SelectBugetOption = [
  {
    id: 1,
    title: 'Cheap',
    desc: 'Stay conscious of costs',
    icon: '💰'
  },
  {
    id: 2,
    title: 'Moderate',
    desc: 'Keep costs on the average side',
    icon: '💵'
  },
  {
    id: 3,
    title: 'Luxury',
    desc: 'Premium experiences and fine dining',
    icon: '💎'
  }
]

export const AI_PROMPT = `Generate a comprehensive travel plan in the following JSON format:

{
  "HotelOptions": [
    {
      "HotelName": "Hotel Name",
      "HotelAddress": "Full address",
      "Price": "₹1500-₹3000 per night",
      "HotelImageUrl": "https://example.com/image.jpg",
      "GeoCoordinates": {
        "latitude": 27.1751,
        "longitude": 78.0421
      },
      "Rating": "4.5",
      "Description": "Hotel description"
    }
  ],
  "Itinerary": {
    "Day1": [
      {
        "time": "9:00 AM - 12:00 PM",
        "placeName": "Place Name",
        "description": "Place description",
        "duration": "2 hours",
        "cost": "₹20 per person",
        "imageUrl": "https://example.com/image.jpg"
      }
    ],
    "Day2": [
      {
        "time": "9:00 AM - 11:00 AM",
        "placeName": "Place Name",
        "description": "Place description",
        "duration": "2 hours",
        "cost": "₹20 per person",
        "imageUrl": "https://example.com/image.jpg"
      }
    ]
  },
  "Activities": [
    {
      "ActivityName": "Activity Name",
      "ActivityDescription": "Activity description",
      "ActivityImageUrl": "https://example.com/image.jpg"
    }
  ]
}

IMPORTANT REQUIREMENTS Give me Accurate:
- Generate correct 5-7 different hotel options with varying price ranges (budget, mid-range, luxury)
- Include hotels with different ratings (3.5 to 5.0 stars)
- Provide diverse locations within the destination
- Generate detailed daily itinerary with specific time slots
- Include duration and cost for each place
- Generate 6-10 activities to do

Location: {location}, Days: {totalDays}, Traveller: {traveller}, Budget: {budget}.`;