import React, { useRef, useState, useEffect } from 'react'; // Importez les fonctions useRef, useState et useEffect de 'react'
import axios from '../api/axios';

const USER_REGEX = /^[A-Za-z][A-Za-z0-9-_]{3,23}$/; // Modifiez la regex pour inclure les lettres majuscules et minuscules
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = 'http://localhost:3000/auth/register';

function Register() {
  const userRef = useRef(null); // Utilisez null au lieu de undefined
  const errRef = useRef(null);

  const [role, setRole] = useState('candidate');
  const [name, setName] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);
  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(name));
  }, [name]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    setErrMsg('');
  }, [name, email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ name, email, password, role }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      console.log(response.data);
      console.log(response.accessToken); // Correction de la propriété "accesstoken" en "accessToken"
    } catch (err) {
      console.error("Erreur :", err)
      console.log({ name, email, password, role });

    }
    setSuccess(true); // Cette ligne était en dehors de la fonction handleSubmit, donc je l'ai corrigée pour qu'elle soit à l'intérieur
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="p-4 bg-white rounded shadow-lg">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label>Name:</label>
            <input
              type="text"
              id="name"
              ref={userRef}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="w-full p-2 mt-1 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mt-1 border rounded"
            />
          </div>
          <div className="mb-4">
            <label>Password</label>
            <input
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mt-1 border rounded"
            />
          </div>
          <div className="mb-4">
            <label>Qui êtes-vous?</label>
            <select
              className="w-full p-2 mt-1 border rounded"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="recruiter">Recruteur</option>
              <option value="candidate">Candidat</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-green-600 rounded"
          >
            Submit
          </button>
        </form>
        <p>
          Déjà enregistré ? <br />
          <a href="#">SIGN IN</a>
        </p>
      </div>
    </div>
  );
}

export default Register;