import React, { useState } from "react";
//TODO: send request to a server for user authentication

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value)
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Credentials: " + email + password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        login:
        <input type="text" value={email} onChange={handleEmail} />
      </label>
      <label>
        password:
        <input type="password" value={password} onChange={handlePassword} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}
