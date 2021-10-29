import React, { useEffect, useState } from "react";
import { User } from "../domain/user";

export function CurrentUser() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  //TODO: component dont need to know about \user => extract to a function into application folder
  useEffect(() => {
    const getCurrentUser = async () => {
      const response = await fetch(`${SITE_PROTOCOL}${SITE_DOMAIN}${SITE_SERVER_PORT}/user`);

      const parsedResponse = await response.json();

      const user: User = parsedResponse.user;

      setFirstName(user.firstName);
      setLastName(user.lastName);
      console.log(user.firstName);
    };

    getCurrentUser();
  }, []);
  return (
    <div>
      {firstName}, {lastName}
    </div>
  );
}
