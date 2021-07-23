
import React from 'react';
import logo from './logo.svg';
import './App.css';
import './api';
import axios from 'axios';
import { setAuthorization } from './api';

function App() {

  const [formData, setFormData] = React.useState({
    email: '',
    password: ''
  })

  let token = localStorage.getItem('authToken');

  if (token) {
    setAuthorization(token)
  }

  const handleGetDataAsyncAwait = async () => {
    try {
      let response = await axios.get('url');
    } catch (error) {
      let data = error.response.data
      console.log(error)
    }
  }

  const login = async (payload) => {
    try {
      let { data } = await axios.post('/login', payload);

      setAuthorization(data)
    } catch (error) {
      console.log(error)
    }
  }

  const getUserProfile = async () => {
    try {
      let { data } = await axios.get('/profile/23');
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (event) => {
    let value = event.target.value
    let name = event.target.name

    setFormData({
      ...formData,
      [name] : value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    login(formData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" type="text" required value={formData.email} onChange={e => handleChange(e.target.value)}/>
      <input name="password" type="password" required value={formData.email} onChange={e => handleChange(e.target.value)}/>
      <button type="submit" onClick={() => login(formData)}>Login</button>

      <span>{formData}</span>
    </form>
  );
}

export default App;
