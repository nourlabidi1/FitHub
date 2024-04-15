

<template>
  <div id="app">
    <!-- Barre de navigation -->
    <!--<NavbarComponent />-->
    <Navbar2Component/>

    <!-- Contenu principal -->
    <router-view></router-view>

    <!-- Footer  -->
    <FooterComponent /> 


  </div>
</template>

<script>
//import LoginComponent from './views/Login.vue';
//import NavbarComponent from './views/Navbar.vue';
import Navbar2Component from './views/navbarComponent.vue';
import FooterComponent from './views/footer.vue';
import AuthService from './services/AuthService';
export default {
  name: 'App',
  components: {
    //NavbarComponent,
    FooterComponent,
    Navbar2Component,
  },
  methods: {
    async handleLogin(credentials) {
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
    },
    
  }
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
}
</style>
