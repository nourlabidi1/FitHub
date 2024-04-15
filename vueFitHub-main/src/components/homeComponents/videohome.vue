<template>

 
   
  
    <video id="video" autoplay loop muted>
        <source src="https://web.keepcool.fr/wp-content/uploads/2024/02/keepcool-2024.mp4" type="video/mp4">
        Your browser does not support the video tag.
    </video>


  <div class="content">
    <!-- Votre contenu HTML pour la première partie de la page ici -->
    <h1 class="video-title">Welcome to fitHub </h1>
    <h1 style="color:#fdfdfd;">Sweat your way to success !</h1>
  </div>

</template>

<script>
//import AuthService from '../services/AuthService';

export default {
  name: "videoHome",
  methods: {
    // Le code de votre composant se trouve ici
    
  }
};
</script>

<style scoped>

.content {
  position: absolute;
  top: 50%;
  left: 70%;
  transform: translate(-50%, -50%);
}

.video-title {
  font-size: 6em;
  background: linear-gradient(to right, #282f5f, #070331);
  text-shadow: 3px 2px #f7f7f7;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

</style>
