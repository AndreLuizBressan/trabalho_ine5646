import React, { createContext, useContext, useState } from "react";

const ItineraryContext = createContext();

export const ItineraryProvider = ({ children }) => {
  const [itineraries, setItineraries] = useState([]);

  const addItinerary = (newItinerary) => {
    setItineraries((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        title: newItinerary.title,
        description: newItinerary.description,
      },
    ]);
  };

  const deleteItinerary = (id) => {
    setItineraries((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <ItineraryContext.Provider value={{ itineraries, addItinerary, deleteItinerary }}>
      {children}
    </ItineraryContext.Provider>
  );
};

//hook
export const useItinerary = () => useContext(ItineraryContext);
