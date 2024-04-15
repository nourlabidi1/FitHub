<template>
    <div class="container bg-light">
      <div class="content">
        <img style="width:420px;" src="https://www.california-gym.com/tn/wp-content/uploads/2020/03/404.png" alt="404 Title Image">
        <h3>Oops!</h3>
        <p>We couldn't find the page you're looking for.</p>
        <button  class="btn btn-primary"> <router-link to="/" class="router-link-unstylled">Back to Home</router-link></button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "NotFoundComponent",
    methods: {
      redirectToHome() {
        // Rediriger vers la page d'accueil
        window.location.href = "/";
      },
    },
  };
  </script>
  
  <style scoped>
  
 
  
  h1 {
    font-size: 5rem;
    margin-bottom: 0;
  }
  
  h2 {
    font-size: 2rem;
    margin-top: 0.5rem;
    margin-bottom: 2rem;
  }
  
  p {
    font-size: 1.2rem;
    font-style: normal;
    margin-bottom: 2rem;
  }
  
  button {
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  button:hover {
    background-color: #0056b3;
  }

  .router-link-unstylled {
    text-decoration: none; /* Supprime la décoration du lien */
    color: inherit; /* Assure que le lien a la même couleur que le texte parent */
  }

  .content{
    padding-bottom: 100px;
  }
  </style>
  