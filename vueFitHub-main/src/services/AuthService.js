// services/AuthService.js

// Importer Axios
import axios from 'axios';

const apiUrl = process.env.API_URL; // Importez la variable API_URL de votre fichier .env
const token = localStorage.getItem('token');

class AuthService {
  async login(credentials) {
    try{
      // Effectuer la requête de connexion et récupérer la réponse
      const response = await axios.post(`${apiUrl}/users/login`, credentials ,{
        headers: {
        'Content-Type': 'application/json',
        }
      });

      if( response.data && response.data.success){
        // Stocker le jeton d'authentification dans le localStorage ou dans un autre endroit sûr
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));

        // Rafraîchir la page après le login
        window.location.reload();
        // Retourner les données utilisateur ou une indication de succès

        // Retourner les données utilisateur ou une indication de succès
        return response.data.user;
      }else{
        throw new Error(response.data.error);
      }
      
    }catch(error){
      if( error.response && error.response.data.error)
        throw new Error(error.response.data.error);
      else
        throw new Error(error.message);
    }
  }

  async logout(id) {
    try {
        if (!token) {
          console.log("No token found")
          throw new Error('You are not connected ');
        }

        // Effectuer la requête de déconnexion avec le token en tant qu'en-tête d'autorisation
        await axios.put(`${apiUrl}/users/disconnect/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Ajouter le token dans l'en-tête Authorization
            }
        });
        // Effacer le token et les informations de l'utilisateur du localStorage après déconnexion réussie
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        // Rafraîchir la page après le login
        window.location.reload();
        // Retourner les données utilisateur ou une indication de succès

    } catch (error) {
      // Effacer le token et les informations de l'utilisateur du localStorage après déconnexion réussie
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Rafraîchir la page après le login
      window.location.reload();
      if(error.response && error.response.data.error)
        throw new Error(error.response.data.error);
      else
        throw new Error("Failed to logout: " + error.message);
    }
}


  isAuthenticated() {

    // Rafraîchir la page après le login
    //window.location.reload();
    // Retourner les données utilisateur ou une indication de succès

    // Vérifier si l'utilisateur est authentifié en vérifiant la présence du jeton dans le localStorage ou dans l'endroit où il est stocké
    return localStorage.getItem('token') !== null;
  }

  getConnectedUser() {
    try {
        // Récupérer les données de l'utilisateur depuis le localStorage
        const user = localStorage.getItem('user');

        // Vérifier si les données de l'utilisateur existent
        if (!user) {
            throw new Error("User data not found in localStorage");
        }
        // Convertir les données de l'utilisateur en objet JavaScript
        return JSON.parse(user);
    } catch (error) {
        throw new Error("Failed to get connected user: " + error.message);
    }
  }

  setUserConnected(user){
    localStorage.setItem('user', JSON.stringify(user));
  }

  async getUserByEmail(email){
    try{
      // Effectuer la requête de connexion et récupérer la réponse
      const response = await axios.get(`${apiUrl}/users/email/${email}` ,{
        headers: {
        'Content-Type': 'application/json',
        }
      });

      if( response.data && response.data.success){
        return response.data.data;
      }else{
        throw new Error(response.data.error);
      }
      
    }catch(error){
      if( error.response && error.response.data.error)
        throw new Error(error.response.data.error);
      else
        throw new Error(error.message);
    }
  }

  async sendEmail(mailOptions){
    try{
      // Effectuer la requête de connexion et récupérer la réponse
      const response = await axios.post(`${apiUrl}/email/send-email` ,mailOptions,{
        headers: {
        'Content-Type': 'application/json',
        }
      });

      if( response.data && response.data.success){
        return response.data.data;
      }else{
        throw new Error(response.data.error);
      }
      
    }catch(error){
      if( error.response && error.response.data.error)
        throw new Error(error.response.data.error);
      else
        throw new Error(error.message);
    }
  }

  async getUserByPWD(hashPWD){
    try{
      // Effectuer la requête de connexion et récupérer la réponse
      console.log(hashPWD)
      const response = await axios.post(`${apiUrl}/users/hashpassword-user`,hashPWD ,{
        headers: {
        'Content-Type': 'application/json',
        }
      });

      if( response.data && response.data.success){
        return response.data.data;
      }else{
        throw new Error(response.data.error);
      }
      
    }catch(error){
      if( error.response && error.response.data.error)
        throw new Error(error.response.data.error);
      else
        throw new Error(error.message);
    }
  }

  async updateUserPassword(id,password){
    try{
      // Effectuer la requête de connexion et récupérer la réponse
      const response = await axios.put(`${apiUrl}/users/update-password/${id}`, {password} ,{
        headers: {
        'Content-Type': 'application/json',
        }
      });

      return response.data;
      
    }catch(error){
      if( error.response && error.response.data.error)
        throw new Error(error.response.data.error);
      else
        throw new Error(error.message);
    }
  }


  

}

export default new AuthService();

  