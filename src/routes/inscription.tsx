import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Inscription() {
  const [email, setEmail] = useState('');
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const changeUsername = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setusername(event.target.value);
  }, []);

  const changePassword = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }, []);

  const changeEmail = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  }, []);

  const handleInscription = useCallback(async () => {
    try {
        if (!email || !username || !password) {
            setError("Veuillez remplir tous les champs.");
            return;
          }
      const response = await fetch("http://localhost:3000/api/auth/local/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        
        body: JSON.stringify({
          email: email,
          username: username,
          password: password,
        }),
      });
      
      if (response.ok) {
        console.log("Inscription réussie!");
        setTimeout(() => {
            navigate("/home");
          }, 3000);
    } else {
        const data = await response.json();
        setError(data.error || "Une erreur s'est produite. Veuillez réessayer.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setError("Une erreur s'est produite. Veuillez réessayer.");
    }
  }, [email,username, password]);

  return (
    <div>
      <h1>Inscription</h1>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <div className="form-field">
        <label htmlFor="email">Entrez votre adresse e-mail :</label>
        <input type="text" name="email" value={email} onChange={changeEmail} />
      </div>
      <div className="form-field">
        <label htmlFor="username">Entrez votre nom d'utilisateur :</label>
        <input type="text" name="username" value={username} onChange={changeUsername} />
      </div>
      <div className="form-field">
        <label htmlFor="password">Entrez votre mot de passe : </label>
        <input type="password" name="password" value={password} onChange={changePassword} />
      </div>
      <button onClick={handleInscription}>Inscription</button>
    </div>
  );
}
