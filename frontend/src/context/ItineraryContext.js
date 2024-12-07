import React, {  createContext, useContext, useState, useEffect } from "react";


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

  //modal
  const searchItineraries = async () => {
    try {
      const response = await fetch("", { //endpoint
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error("Erro ao buscar itinerários.");
      }
  
      const data = await response.json();
      setItineraries(data);
    } catch (error) {
      console.error("Erro ao buscar itinerários:", error);
    }
  };

  const deleteItinerary = (id) => {
    setItineraries((prev) => prev.filter((item) => item.id !== id));
  }; //chamar endpoint

  useEffect(() => {
    searchItineraries();
  }, []);

  return (
    <ItineraryContext.Provider value={{ itineraries, addItinerary, searchItineraries, deleteItinerary }}>
      {children}
    </ItineraryContext.Provider>
  );
};

//hook
export const useItinerary = () => useContext(ItineraryContext);
