import React, { useState, useEffect } from "react";
import axios from "axios";

const GoldRate = () => {
  const [goldRate, setGoldRate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [date, setDate] = useState(""); // To store the date of the gold rate

  useEffect(() => {
    const fetchGoldRate = async () => {
      try {
        const response = await axios.get("https://www.goldapi.io/api/XAU/INR", {
          headers: {
            "x-access-token": "goldapi-3p08qsm4ckwd78-io",
            "Content-Type": "application/json",
          },
        });

        // Get the price per gram for 22K gold
        const pricePerGram22k = response.data.price_gram_22k;

        // Set the gold rate and the current date
        const currentDate = new Date().toLocaleDateString(); // Get the current date
        setGoldRate(pricePerGram22k * 10); // Show price for 10 grams
        setDate(currentDate); // Set the current date
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchGoldRate();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Live Gold Rate for Surat</h1>
      <p>Date: {date}</p>
      <p>22K Gold Rate: ₹{goldRate ? goldRate.toFixed(2) : "N/A"} for 10 grams</p>
    </div>
  );
};

export default GoldRate;
