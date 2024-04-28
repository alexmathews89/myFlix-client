import React, { useState, useEffect } from "react";

const ProfileView = () => {
  // State to store user data
  const [userData, setUserData] = useState(null);
  // State to track loading state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to fetch user data from the /users endpoint
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          "https://myflixapp-495f4f3fbc03.herokuapp.com/users"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const userData = await response.json();
        setUserData(userData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    // Call the fetchUserData function
    fetchUserData();
  }, []); // Empty dependency array ensures the effect runs only once after the component mounts

  return (
    <div>
      <h1>User Profile</h1>
      {loading ? (
        <p>Loading...</p>
      ) : userData ? (
        <div>
          <p>Name: {userData.Username}</p>
          <p>Email: {userData.Email}</p>
          {/* Add more user information here */}
        </div>
      ) : (
        <p>No user data available</p>
      )}
    </div>
  );
};

export default ProfileView;
