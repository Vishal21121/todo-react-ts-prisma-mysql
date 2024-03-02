import { createContext, useContext, useEffect, useState } from "react";
import { User, loginUserData, CreateUserData } from "../types/userType";
import useLocalStorage from "../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

type UserContextValueType = {
  user: User | null;
  createUser: (data: CreateUserData) => void;
  loginUser: (data: loginUserData) => void;
  logoutUser: () => void;
};

const UserContext = createContext<UserContextValueType>({
  user: null,
  createUser: (data: CreateUserData) => {},
  loginUser: (data: loginUserData) => {},
  logoutUser: () => {},
});

const useUserContext = () => {
  return useContext(UserContext);
};

function UserContextProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const { getItem, setItem, deleteItem } = useLocalStorage();
  const navigate = useNavigate();

  const createUser = async (data: CreateUserData) => {
    try {
      const response = await fetch("/api/v1/user/create", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseResolved = await response.json();
      const statusCode = responseResolved.data.statusCode;
      if (statusCode == 201) {
        setUser(responseResolved.data.value);
        setItem("user", responseResolved.data.value);
        toast.success("Account created successfully", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
        navigate("/");
      } else if (statusCode == 400) {
        toast.error(responseResolved.data.message, {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      } else if (statusCode == 422) {
        toast.error(responseResolved.data.value[0]["field"], {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loginUser = async (data: loginUserData) => {
    try {
      const response = await fetch("/api/v1/user/login", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseResolved = await response.json();
      const statusCode = responseResolved.data.statusCode;
      if (statusCode == 200) {
        setUser(responseResolved.data.value);
        setItem("user", responseResolved.data.value);
        toast.success("Logged in successfully", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
        navigate("/");
      } else if (statusCode == 401) {
        toast.error(responseResolved.data.message, {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      } else if (statusCode == 422) {
        toast.error(responseResolved.data.value[0]["field"], {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logoutUser = () => {
    deleteItem("user");
    setUser(null);
  };

  useEffect(() => {
    const user = getItem("user");
    setUser(user);
  }, []);
  return (
    <UserContext.Provider value={{ user, createUser, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
}

export { useUserContext, UserContextProvider };
