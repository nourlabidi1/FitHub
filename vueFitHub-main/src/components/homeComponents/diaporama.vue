<template>


  
  <div class="slider-container">
    <div class="menu">
        <label for="slide-dot-1"></label>
        <label for="slide-dot-2"></label>
        <label for="slide-dot-3"></label>
    </div>

    <input class="slide-input" id="slide-dot-1" type="radio" name="slides" checked>
    <img class="slide-img" src="https://www.aqua-bulles.com/wp-content/uploads/2019/04/man-1282232_1920-1024x683.jpg">

    <input class="slide-input" id="slide-dot-2" type="radio" name="slides">
    <img class="slide-img" src="https://img.freepik.com/photos-premium/femme-qui-court-tapis-roulant-photo-femme-qui-court-tapis-roulant-dans-salle-sport_983424-298.jpg?w=900">

    <input class="slide-input" id="slide-dot-3" type="radio" name="slides">
    <img class="slide-img" src="https://www.wellness-sportclub.fr/wp-content/uploads/2021/04/fr1-wsc.jpg">

</div>

</template>

<script>
  export default {
    name: "DiaporamaComponent",
    mounted() {
      // Démarrez l'intervalle pour changer de slide automatiquement
      this.interval = setInterval(this.nextSlide, 4000);
    },
    methods: {
      // Méthode pour passer à la prochaine slide
      nextSlide() {
        const slides = document.querySelectorAll('.slide-input');
        const currentSlide = document.querySelector('.slide-input:checked');
        let nextIndex = (parseInt(currentSlide.id.replace('slide-dot-', '')) % slides.length) + 1;
        nextIndex = nextIndex > slides.length ? 1 : nextIndex;
        document.getElementById('slide-dot-' + nextIndex).checked = true;
      }
    },
    beforeUnmount() { // Utilisez beforeUnmount au lieu de beforeDestroy
      // Nettoyez l'intervalle lorsque le composant est démonté
      clearInterval(this.interval);
    }
  };
  </script>
  

<style scoped>
html, body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
}
img {
    max-width: 100%;
}
.slider-container {
    max-width: 600px;
    position: relative;
    margin: 0px ;
    height: 450px;
    overflow: hidden;
}
.menu {
    position: absolute;
    left: 0;
    z-index: 11;
    width: 100%;
    bottom: 0;
    text-align: center;
}
.menu label {
    cursor: pointer;
    display: inline-block;
    width: 10px;
    height: 10px;
    background: #ccc;
    border-radius: 0px;
    margin: 0 0.2em 1em;
}
.menu label:hover,.menu label:focus {
    background: #1c87c9;
}
.slide-input{
    opacity: 0;
}
.slide-img {
    width: 100%;
    height: 400px;
    position: absolute;
    top: 0;
    left: 100%;
    z-index: 10;
    transition: left 0s 0.75s;
}
[id^="slide"]:checked + .slide-img {
    left: 0;
    z-index: 100;
    transition: left 0.65s ease-out;
}

 
 </style>