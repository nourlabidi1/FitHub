<template>
    <div>
      <!-- Jumbotron -->
      <div class="jumbotron jumbotron-fluid bg-light text-dark position-relative mt-4">
        <!-- Contenu du Jumbotron -->
        <div class="container-fluid">
          <div class="row align-items-center" style="background-color:white">
            <div class="col-sm-6">
              <h1 class="text-center">CareZone</h1>
              <h5 class="text-center"><router-link to="/"> Home</router-link> >CareZone</h5>
            </div>
            <div class="col-sm-6 position-relative">
              <img src="@/assets/carezone1.jpg" alt="Workout" class="img-fluid">
              <div class="blur-gradient"></div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Contenu principal -->
      <div class="container mt-5">
        <!-- Paragraphe 1 -->
        <div class="row">
          <div class="col">
            <p class="texte-costum" style="text-align : justify;">
              <span>La réhabilitation physique, la rééducation et la remise en forme seront au rendez-vous à CareZone. Nos kinésithérapeutes vous accompagneront avant et après vos séances d’entrainement afin de prévenir les blessures et vous assurez une récupération rapide.</span>
            </p>
          </div>
        </div>
  
        <!-- Paragraphe 2 -->
        <div class="row mt-4">
          <div class="col">
            <p class="texte-costum" style="text-align : justify;">
              <span>Aussi, en Utilisant les nouvelles techniques d’amincissement et de traitement de la cellulite associées à un accompagnement nutritionnel, CareZone vous propose des programmes spécialement conçus pour la perte de poids, pour raffermir et tonifier les muscles, mais aussi pour une réhabilitation physique. Pour couronner le tout, notre partenaire Payot, icône des soins basés sur des formules innovantes issues des dernières avancées scientifiques vous offre une expérience authentique et généreuse.</span>
            </p>
          </div>
        </div>
  
        <!-- Boutons -->
        <div class="row mt-5 justify-content-center">
          <div class="col-3" v-for="(paragraph, index) in paragraphs" :key="index">
            <div @click="selectParagraph(index)" :class="{ 'selected': selectedIndex === index }" class="rectangle-container">
              <div class="rectangle">
                <p class="text-center">{{ paragraph.title }}</p>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Texte et image sélectionnés -->
        <div class="row mt-5 selected-content" v-if="selectedText && selectedImage">
          <div class="col">
            <div class="d-flex align-items-center" style="animation: slideFromRight 1s ease;">
              <div class="text mr-3" style="text-align: justify;">
                <p class="animated fadeIn">{{ selectedText }}</p>
              </div>
              <div class="image" style="animation: slideFromRight 1s ease;">
                <img :src="selectedImage" alt="Photo" class="img-fluid animated fadeIn" style="margin-left: 60px;" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        paragraphs: [
          { title: "Kinésithérapie", text: "Nos kinésithérapeutes vous accompagneront également à mieux récupérer après vos séances d’entrainement en utilisant des nouvelles technologies tel que INDIBA. Cette méthode est utilisée comme outil de récupération musculaire mais aussi elle a un effet important sur la diminution des douleurs musculaires post-effort. C’est une technique très intéressante comme alternative au simple massage et levée de tension manuelle. ", image: require("@/assets/kinesi.jpg") },
          { title: "Nutrition", text: "Vous avez un objectif et vous avez du mal pour l’atteindre ! Vous souhaitez perdre du poids ou tout simplement prendre soin de votre santé corporelle ! Les nutritionnistes de CareZone sont là pour répondre à tous vos besoins.Avoir une variété d’aliments, manger des repas équilibrés associés à la pratique d’exercices est recommandé pour une bonne hygiène de vie.Notre équipe d’experts en nutrition vous accompagnera du diagnostic jusqu’à l’adoption d’un plan nutritionnel adéquat.", image: require("@/assets/nutri.jpg") },
          { title: "Soins & Bien etre", text: "Nous avons choisi pour vous l’expertise de soin Payot qui puise son savoir-faire dans l’héritage du Dr Nadia Payot. Une méthode de beauté résultant de l’alchimie unique de mouvements de modelages, d’actifs efficaces et de textures sensorielles. Un véritable savoir-faire pour des résultats inégalés et un plaisir Absolu.", image: require("@/assets/soin.jpg") }
        ],
        selectedIndex: 0,
        selectedText: "",
        selectedImage: ""
      };
    },
    mounted() {
      // Initialiser avec les données du premier élément
      this.selectParagraph(0);
    },
    methods: {
      selectParagraph(index) {
        // Mettre à jour l'index sélectionné
        this.selectedIndex = index;
        // Mettre à jour les données sélectionnées
        this.selectedText = this.paragraphs[index].text;
        this.selectedImage = this.paragraphs[index].image;
      }
    }
  };
  </script>
  
  <style scoped>
  .rectangle-container {
    cursor: pointer;
  }
  .rectangle {
    width: 100%;
    height: 70px;
    background-color: #fff;
    border: 1px solid #858181;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .rectangle:hover {
    background-color: #bdb9b9;
  }
  .selected {
    background-color: #ffc107;
  }
  .text {
    flex: 1;
  }
  .image img {
    max-width: 450px;
  }
  .blur-gradient {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to left, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 70%, rgba(255, 255, 255, 1) 100%);
    pointer-events: none;
  }
  
  @keyframes slideFromRight {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }
  
  .selected-content {
    margin-top: 50px; /* Augmentez l'espace en haut du texte et de l'image sélectionnés */
    margin-bottom: 50px; /* Augmentez l'espace en bas du texte et de l'image sélectionnés */
  }
  </style>
  