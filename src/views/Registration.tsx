import React, { useState } from 'react';
import { register } from '../lib/apiWrapper';
import { UserFormType } from '../types';

type RegistrationProps = {};

export default function Registration({}: RegistrationProps) {
  const [userFormData, setUserFormData] = useState<UserFormType>({
    //i forgot they data differently typed
    email: '',
    first_name: '',
    last_name: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserFormData({ ...userFormData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let response = await register(userFormData);
    if (response.error) {
         console.error(response.error);
    } else {
        console.log(`Congrats!`);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          id="email"
          name="email"
          value={userFormData.email}
          onChange={handleInputChange}
          placeholder="Email"
          required
        />
        <input
          type="text"
          id="first_name"
          name="first_name"
          value={userFormData.first_name}
          onChange={handleInputChange}
          placeholder="First Name"
          required
        />
        <input
          type="text"
          id="last_name"
          name="last_name"
          value={userFormData.last_name}
          onChange={handleInputChange}
          placeholder="Last Name"
          required
        />
        <input
          type="password"
          id="password"
          name="password"
          value={userFormData.password}
          onChange={handleInputChange}
          placeholder="Password"
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};