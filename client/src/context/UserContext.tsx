import { createContext, useContext, useEffect, useState } from "react";
import { User, CreateUserData } from "../types/userType";
import useLocalStorage from "../hooks/useLocalStorage";

type UserContextValueType = {
  user: User | null;
  createUser: (data: CreateUserData) => void;
};

const UserContext = createContext<UserContextValueType>({
  user: null,
  createUser: (data: CreateUserData) => {},
});

const useUserContext = () => {
  return useContext(UserContext);
};

function UserContextProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const { getItem } = useLocalStorage();

  const createUser = async (data: CreateUserData) => {
    try {
      const response = await fetch("", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseResolved = await response.json();
      setUser(responseResolved);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const user = getItem("user");
    setUser(user);
  }, []);
  return (
    <UserContext.Provider value={{ user, createUser }}>
      {children}
    </UserContext.Provider>
  );
}

export { useUserContext, UserContextProvider };
