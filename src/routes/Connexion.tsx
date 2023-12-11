import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Connexion() {
  const navigate = useNavigate()
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const changeLogin = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setIdentifier(event.target.value);
  }, []);

  const changePassword = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }, []);

  const handleConnexion = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/local", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: identifier,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.jwtToken);
        navigate("/home");
      } else {
        setError("Identifiants invalides. Veuillez réessayer.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("Une erreur s'est produite. Veuillez réessayer.");
    }
  }, [identifier, password]);

  return (
    <div>
      <h1>Connexion</h1>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <div className="form-field">
        <label htmlFor="identifier">Entrez votre identifiant :</label>
        <input type="text" name="identifier" value={identifier} onChange={changeLogin} />
      </div>
      <div className="form-field">
        <label htmlFor="password">Entrez votre mot de passe : </label>
        <input type="password" name="password" value={password} onChange={changePassword} />
      </div>
      <button onClick={handleConnexion}>Connexion</button>
    </div>
  );
}
