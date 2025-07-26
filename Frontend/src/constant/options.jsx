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


export const AI_PROMPT = `Generate Travel Plan for Location: {location}, for {totalDays} days for {traveller} with a {budget} budget.
Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions.
Suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing.
Also give a list of activities to do in the location with activity name, activity description, activity image url.
Time travel each of the location for {totalDays}, with best time to visit in JSON format.`;

// export const AI_PROMPT = `Generate Travel Plan for Location: {location}, for {totalDays} for {traveller}}with a {budget} budget,
// Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url,geo coordinates, rating, descriptions,
// Suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing,
// and a list of activities to do in the location with activity name, activity description, activity image url, Time travel  each of the location for {totalDays}, with best time to visit in JSON format.`;