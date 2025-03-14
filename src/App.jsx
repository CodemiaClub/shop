import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

const App = () => {
  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState({});
  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "discord",
    });
    if (error) {
      console.error("Error al iniciar sesión con Discord:", error);
    }
  };

  useEffect(() => {
    async function getUserData() {
      await supabase.auth.getUser().then((value) => {
        if (value.data?.user) {
          console.log(value.data.user);
          setUser(value.data.user);
          setIsLogged(true);
        }
      });
    }
    getUserData();
  }, []);

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    setIsLogged(false);
    window.location.reload();
  }

  return (
    <>
      ;
      {isLogged == true ? (
        <button onClick={signOut}>Sign Out</button>
      ) : (
        <button onClick={handleLogin}>Iniciar sesión con Discord</button>
      )}
    </>
  );
};
export default App;
