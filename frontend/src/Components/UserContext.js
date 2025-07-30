import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [error, setError] = useState(null);
  const [leveledUp, setLeveledUp] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const API_URL = process.env.REACT_APP_API_URL || "";

  // Load user data from backend
 const loadUser = useCallback(async () => {
  if (!token) {
    setUser(null);
    setError("User not authenticated");
    setLoadingUser(false);
    return;
  }
  setLoadingUser(true);
  setError(null);
  try {
    const res = await axios.get(`${API_URL}/api/users/me/intern`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUser(res.data.intern);
  } catch (err) {
    setUser(null);
    setError(err.response?.data?.message || "Failed to fetch user");
  } finally {
    setLoadingUser(false);
  }
}, [token, API_URL]);


  // ✅ This block ensures re-sync on login/logout
  useEffect(() => {
    if (token) {
      loadUser();
    } else {
      setUser(null);
      setLoadingUser(false);
    }
  }, [token, loadUser]);

  // Update XP and streak
  const updateUserXpAndStreak = async (xpChange, streakChange = 0) => {
    if (!token) return;

    try {
      await axios.patch(
        `${API_URL}/api/users/me/xp-level`,
        { xpChange, streakChange },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const res = await axios.get(`${API_URL}/api/users/me/intern`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const updatedUser = res.data.intern;

      setUser((prev) => {
        const didLevelUp = (updatedUser.level || 1) > (prev?.level || 1);
        if (didLevelUp) {
          setLeveledUp(true);
          setTimeout(() => setLeveledUp(false), 3000);
        }
        return updatedUser;
      });
    } catch (err) {
      console.error("Failed to update XP/streak:", err);
    }
  };

  // On login
    const login = (newToken) => {
      localStorage.setItem("token", newToken);
      setToken(newToken);
      loadUser();  // Explicitly refresh user data immediately on login
    };

  // On logout
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setError(null);
    setLoadingUser(false);
    setLeveledUp(false);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loadingUser,
        error,
        updateUserXpAndStreak,
        leveledUp,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
