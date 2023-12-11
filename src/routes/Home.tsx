import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Game {
  id: number;
  name: string;
  description: string;
}

export default function Home() {
  const [freeGames, setFreeGames] = useState<Game[]>([]);
  const [officialGames, setOfficialGames] = useState<Game[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setToken(localStorage.getItem('token'))
    const authenticateAndFetchGames = async () => {
      try {
        const authResponse = await fetch("http://localhost:3000/api/users/me", {          
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`

          },
        });
        console.log(authResponse);

        
        

        // if (authResponse.ok) {
        //   const authData = await authResponse.json();
        //   const authToken = authData.jwtToken;
        //   setToken(authToken);
        //   console.log(authToken, "prout");
          

        //   const [freeGamesResponse, officialGamesResponse] = await Promise.all([
        //     fetch("http://localhost:3000/api/freeGames"),
        //     fetch("http://localhost:3000/api/officialGames", {
        //       headers: {
        //         Authorization: `Bearer ${authToken}`,
        //       },
        //     }),
        //   ]);

        //   const freeGamesData = await freeGamesResponse.json();
        //   const officialGamesData = await officialGamesResponse.json();

        //   setFreeGames(freeGamesData);
        //   setOfficialGames(officialGamesData);
        // } else {
        //   console.error("Authentication failed");
        // }
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    authenticateAndFetchGames();
  }, []);

  const handleInscription = () => {
    navigate("/register");
  };

  const handleDeconnexion = async () => {
    try {
      console.log(token);
      const response = await fetch("http://localhost:3000/api/auth/local/logout", {
        method: "POST",
      });

      if (response.ok) {
        setToken(null);
        navigate("/home");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div>
      <h1>Bienvenue dans votre collection de jeux</h1>

      <div className="free-games">
        <h2>Jeux gratuits</h2>
        <div className="free-games-list-content">
          {freeGames.map((game) => (
            <div key={game.id}>
              <h3>{game.name}</h3>
              <p>{game.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="official-games">
        <h2>Jeux officiels</h2>
        <div className="official-games-list-content">
          {officialGames.map((game) => (
            <div key={game.id}>
              <h3>{game.name}</h3>
              <p>{game.description}</p>
            </div>
          ))}
        </div>
      </div>

      {token ? (
        <div>
          <button onClick={handleDeconnexion}>Déconnexion</button>
        </div>
      ) : (
        <div>
          <button onClick={handleInscription}>Inscription</button>
          <button onClick={() => navigate("/connexion")}>Connexion</button>
        </div>
      )}
    </div>
  );
}
