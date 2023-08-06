"use client"
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function FormCreateUser() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  });

  const router = useRouter();

  const validateForm = () => {
    const { email, password } = user;
    console.log(email, password);
    
    const isValid = email.length > 2 && password.length > 2;
    return isValid;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = validateForm();
    if (result) {
      await fetch(`${process.env.API_HOST}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      return router.push("/list");
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col items-center justify-center">

      <form onSubmit={ handleSubmit } className="flex flex-col gap-5 items-center justify-center w-5">
        <fieldset className="flex flex-col gap-5">

          <legend>Cadastro</legend>

          <label htmlFor="name">
            Name:
            <input id="name" name="name" type="name" onChange={ handleChange }></input>
          </label>

          <label htmlFor="email">
            Email:
            <input id="email" name="email" type="email" onChange={ handleChange }></input>
          </label>

          <label htmlFor="password">
            Senha:
            <input id="password" name="password" type="password" onChange={ handleChange }></input>
          </label>

        </fieldset>

        <button type="submit">Cadastrar</button>

      </form>

    </div>
  )
}
