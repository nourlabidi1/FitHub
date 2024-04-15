<template>
    <div class="container mt-5">
      <h2>Inscription</h2>
      <form @submit.prevent="registerUser">
        <div class="mb-3">
          <label for="name" class="form-label">Nom</label>
          <input type="text" class="form-control" id="name" v-model="userData.name" required>
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Adresse email</label>
          <input type="email" class="form-control" id="email" v-model="userData.email" required>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Mot de passe</label>
          <input type="password" class="form-control" id="password" v-model="userData.password" required>
        </div>
        <button type="submit" class="btn btn-primary">S'inscrire</button>
      </form>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import AuthService from '../services/AuthService';
  import { useRouter } from 'vue-router'; // Importez le routeur depuis vue-router
  
  export default {
    name: "RegisterComponent",
    setup() {
      const userData = ref({
        name: '',
        email: '',
        password: ''
      });
  
      const router = useRouter(); // Initialiser le routeur
  
      const registerUser = async () => {
        try {
          // Appel de la méthode d'inscription du service AuthService
          await AuthService.register(userData.value);
          // Redirection vers la page de connexion après l'inscription
          router.push('/login');
        } catch (error) {
          console.error('Erreur lors de l\'inscription :', error.message);
        }
      };
  
      return {
        userData,
        registerUser
      };
    }
  };
  </script>
  
  <style>
  /* Ajoutez vos styles CSS si nécessaire */
  </style>
  