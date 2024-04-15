<template>
    <div class="container mt-5">
      <h2>Profil de l'utilisateur</h2>
      <div>
        <p><strong>Nom:</strong> {{ user.name }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import UserService from '../../services/UserService';
  
  export default {
    name:"ProfileComponent",
    setup() {
      const user = ref({
        name: '',
        email: ''
      });
  
      // Fonction pour charger les données de l'utilisateur lors du montage du composant
      onMounted(async () => {
        try {
          // Appel de la méthode pour obtenir le profil de l'utilisateur du service UserService
          const userData = await UserService.getUserProfile();
          user.value = userData;
        } catch (error) {
          console.error('Erreur lors du chargement du profil de l\'utilisateur :', error.message);
        }
      });
  
      return {
        user
      };
    }
  };
  </script>
  
  <style>
  /* Ajoutez vos styles CSS si nécessaire */
  </style>
  