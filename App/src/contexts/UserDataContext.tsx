import React, { createContext, useState, ReactNode } from "react";
import { GetUserDataByUsername } from "../hooks/UserApi";

interface Movie {
  IMDBid: string;
  Title: string;
  UserRating: number;
  MoviePosterURL: string;
}

interface Friend {
  Username: string;
  Recommendations: Array<Movie>;
}

interface User {
  Username: string;
  Password: string;
  MyList: Array<Movie>;
  MyFavorites: Array<Movie>;
  ToWatch: Array<Movie>;
  Friends: Array<Friend>;
}

interface UserContextProps {
  user: User | null;
  fetchUserData: (username: string) => void;
  refreshUserData: () => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const fetchUserData = async (username: string) => {
    try {
      const response = await GetUserDataByUsername(username);
      setUser(response);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const refreshUserData = async () => {
    if (user?.Username) {
      try {
        const response = await GetUserDataByUsername(user.Username);
        setUser(response);
      } catch (error) {
        console.error("Error refreshing user data:", error);
      }
    }
  };

  return (
    <UserContext.Provider value={{ user, fetchUserData, refreshUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
