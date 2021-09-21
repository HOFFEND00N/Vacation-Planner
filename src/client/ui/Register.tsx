import React, { useState } from "react";

export function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmedPassword = (e) => {
    setConfirmedPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`email: ${email}, password: ${password}, confirmed password: ${confirmedPassword}`);
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
      <label>
        confirm password:
        <input type="password" value={confirmedPassword} onChange={handleConfirmedPassword} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}
