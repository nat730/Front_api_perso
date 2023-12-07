import { useEffect, useState } from "react";

interface Game {
  id: number;
  name: string;
  description: string;
}

export default function Home() {
  const [freeGames, setFreeGames] = useState<Game[]>([]);
  const [officialGames, setOfficialGames] = useState<Game[]>([]);
  const [_, setToken] = useState<string>();

  useEffect(() => {
    const authenticateAndFetchGames = async () => {
      try {
        const authResponse = await fetch("http://localhost:3000/api/auth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: "nat7303@hotmail.fr",
            password: "PasAdmin12",
          }),
        });

        if (authResponse.ok) {
          const authData = await authResponse.json();
          const authToken = authData.token;
          setToken(authToken);

          const [freeGamesResponse, officialGamesResponse] = await Promise.all([
            fetch("http://localhost:3000/api/freeGames"),
            fetch("http://localhost:3000/api/officialGames", {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            }),
          ]);

          const freeGamesData = await freeGamesResponse.json();
          const officialGamesData = await officialGamesResponse.json();

          setFreeGames(freeGamesData);
          setOfficialGames(officialGamesData);
        } else {
          console.error("Authentication failed");
        }
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    authenticateAndFetchGames();
  }, []);

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

      {officialGames.length > 0 && (
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
      )}
    </div>
  );
}
