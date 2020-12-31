import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("Dessert");
  const [isLoading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const url = `https://www.themealdb.com/api/json/v1/1/`;

    const {
      data: { meals },
    } = await axios.get(
      `${
        searchTerm
          ? `${url}/search.php?s=${searchTerm}`
          : `${url}/filter.php?c=${category}`
      }`
    );

    setLoading(false);

    meals ? setData(meals) : setData([]);
  };

  const handleSearchTerm = value => setSearchTerm(value);
  const handleCategory = value => {
    setSearchTerm("");
    setCategory(value);
  };

  useEffect(() => {
    fetchData();
  }, [searchTerm, category]);

  return (
    <DataContext.Provider
      value={{ data, isLoading, handleSearchTerm, handleCategory }}>
      {children}
    </DataContext.Provider>
  );
};
