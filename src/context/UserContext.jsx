import { createContext, useContext, useEffect, useState } from "react";
import { account, OAuthProvider, ID } from "../appwrite.js";

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider(props) {

  const [userLoading, setUserLoading] = useState(true);
  const [user, setUser] = useState(null);

  async function login() {
    if (user === null) {
      const redirectUrl = window.location.origin;
      await account.createOAuth2Session({
          provider: OAuthProvider.Discord,
          success: redirectUrl + "/success", 
          failure: redirectUrl + "/failure",
          scopes: ['identify'] // optional
        }
      );
    }
  }

  async function logout() {
    try {
      setUserLoading(true);
      await account.deleteSession({sessionId: 'current'});
      setUser(null);
    } catch (err) {
      console.error(err);
    }
    finally {
      setUserLoading(false);
    }
  }

  async function init() {
    try {
     const loggedIn = await account.get();
     setUser(loggedIn);
    } catch (error) {
      setUser(null);
    }
    finally {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUserLoading(false);
    }
  }
    
  
  useEffect(() => {
    init();
  }, []);

  return (
    <UserContext.Provider value={{ 
      userLoading,
      user,
      login,
      logout
    }}>
      {props.children}
    </UserContext.Provider>
  );
}