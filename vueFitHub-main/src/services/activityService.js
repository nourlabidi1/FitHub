// src/services/activityService.js

import axios from 'axios';

const apiUrl = process.env.API_URL; // Importez la variable API_URL de votre fichier .env
const token = localStorage.getItem('token');

class ActivityService {

  async getAllActivities() {
    if (!token) {
      //throw new Error('No token found');
    }

    const response = await axios.get(`${apiUrl}/activities`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    //console.log("Service data :", response.data.data)
    return response.data;// data ici c'est le json reçue
  }

  async getActivityByTitle(title) {
    if (!token) {
      //throw new Error('No token found');
    }

    const response = await axios.get(`${apiUrl}/activities/title/${title}`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params:{"title":title}
    });
    //console.log("Service data :", response.data.data)
    return response.data;// data ici c'est le json reçue
  }

  async getAllActivitiesByFilter(categories, goals, ageGroup) {
    try {
      if (!token) {
        // Gérez l'absence de jeton d'authentification ici
      }

      const filterData = {
        category: categories,
        goals: goals,
        ageGroup: ageGroup
      };

      const response = await axios.post(`${apiUrl}/activities/filter`, filterData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      // Gérez les erreurs ici
      throw new Error('Failed to fetch activities by filter:', error);
    }
  }

  async createActivity(activity) {
    try {
      if (!token) {
        // Gérez l'absence de jeton d'authentification ici
      }

      const response = await axios.post(`${apiUrl}/activities/add`, activity, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      if(error.response && error.response.data.error)
        throw new Error(error.response.data.error)
      else
        throw new Error(error.message)
    }
  }

  async updateActivity(id,activity) {
    try {
      if (!token) {
        // Gérez l'absence de jeton d'authentification ici
      }

      const response = await axios.put(`${apiUrl}/activities/update/${id}`, activity, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      if(error.response && error.response.data.error)
        throw new Error(error.response.data.error)
      else
        throw new Error(error.message)
    }
  }

  async deleteActivity(id) {
    console.log("deleting service : ",id);
    try {
      if (!token) {
        // Gérez l'absence de jeton d'authentification ici
      }
      const response = await axios.delete(`${apiUrl}/activities/delete/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      // Gérez les erreurs ici
      throw new Error('Failed to delete an activity :', error);
    }
  }

  // Autres requêtes utilisateur...
}

export default new ActivityService();
