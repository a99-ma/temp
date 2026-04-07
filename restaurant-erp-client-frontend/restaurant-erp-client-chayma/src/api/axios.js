import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000/api',
  timeout: 10000,
  withCredentials: true, // ✅ Accepte les cookies et en-têtes CORS
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest', // ✅ Identifie les requêtes AJAX
  },
});

export default instance;


