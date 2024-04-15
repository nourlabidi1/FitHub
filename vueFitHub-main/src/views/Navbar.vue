<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <router-link to="/">
            <img src="@/assets/fithub_logo.jpeg" alt="FIT HUB Logo" class="navbar-logo">
        </router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link to="/" class="nav-link">Clubs</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/activities" class="nav-link">Activities</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/login" class="nav-link">Login</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/profile" class="nav-link">
                <img src="@/assets/login.png" alt="Profile" class="profile-icon" @click="showProfileModal">
              </router-link>
            </li>
            <li class="nav-item">
              <form class="d-flex">
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success" type="submit">Search</button>
              </form>
            </li>
          </ul>
        </div>
        <div class="d-flex align-items-center">
          <button class="btn btn-primary me-2">Sign In</button>
          <button class="btn btn-primary">Sign Up</button>
        </div>
      </div>
    </nav>
  
    <!-- Popup pour afficher l'image du profil -->
    <div class="modal fade" id="profileModal" ref="profileModal" tabindex="-1" aria-labelledby="profileModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body text-center">
            <img src="@/assets/login.png" alt="Profile" class="rounded-circle profile-image">
            <p>My Name here</p>
            <button class="btn btn-danger mt-3" @click="logout">Logout</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "NavbarComponent",
    methods: {
      showProfileModal() {
         // Récupérer la référence de la modal
        const profileModal = document.getElementById('profileModal');
        if (profileModal) {
            // Afficher la modal
            profileModal.classList.add('show');
            profileModal.style.display = 'block';
        }
      },
      logout() {
        // Ajoutez le code pour gérer la déconnexion de l'utilisateur ici
        // Par exemple : this.$router.push('/logout');
        const profileModal = document.getElementById('profileModal');
        profileModal.classList.add('show');
        profileModal.style.display = 'none';
      }
    }
  }
  </script>
  
  <style scoped>
  /* Styles spécifiques à la barre de navigation */
  .navbar-logo {
      width: 120px; /* Largeur de l'image */
      height: 50px; /* Hauteur automatique pour maintenir les proportions */
  }
  
  /* Styles pour l'icône de profil */
  .profile-icon {
    width: 30px;
    height: auto;
    cursor: pointer;
  }
  
  /* Styles pour l'image de profil dans la popup */
  .profile-image {
    width: 150px;
    height: 150px;
  }
  
  /* Pour centrer verticalement et horizontalement le contenu de la popup */
  .modal-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  </style>
  