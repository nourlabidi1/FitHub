<template>
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">{{ title }}</div>
            <div class="card-body">
              <form @submit.prevent="Authenticate">
                <div class="mb-3">
                  <label for="email" class="form-label">Email address</label>
                  <input type="email" class="form-control" id="email" v-model="email" required>
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">Password</label>
                  <input type="password" class="form-control" id="password" v-model="password" required>
                </div>
                <button type="submit" class="btn btn-primary">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import AuthService from '../services/AuthService';
  export default {
    name:"LoginComponent",
    data() {
      return {
        email: '',
        password: '',
        title: 'Login Form'
      };
    },
    methods: {
      login() {
        // Appel de la méthode de connexion
        const credentials = { email: this.email, motdepasse: this.password };
        this.$emit('login', credentials);
      },
      async Authenticate(){
        const credentials = { email: this.email, motdepasse: this.password };
        try {
        // Appel de la méthode de connexion du service AuthService
        const user =await AuthService.login(credentials);
        console.log('User:', user);

        // Redirection vers la page d'accueil ou une autre page sécurisée
        this.$router.push('/');
      } catch (error) {
        // Gérer les erreurs de connexion
        console.error('Login failed:', error.message);
      }
      }
    }
  };
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  /* Ajoutez ici votre propre style ou des classes Bootstrap supplémentaires si nécessaire */
  </style>
  