<template>
    <div>
        <!-- Jumbotron -->
        <div class="jumbotron jumbotron-fluid bg-light text-dark position-relative mt-4">
          <!-- Contenu du Jumbotron -->
          <div class="container-fluid">
            <div class="row align-items-center" style="background-color:white">
              <div class="col-sm-6">
                <h1 class="text-center">Offers</h1>
                <h5 class="text-center"><router-link to="/"> Home</router-link> >Offers</h5>
              </div>
              <div class="col-sm-6 position-relative">
                <img src="https://www.europeanbusinessreview.com/wp-content/uploads/2022/04/iStock-679305286.jpg" alt="Workout" class="img-fluid">
                <div class="blur-gradient"></div>
              </div>
            </div>
          </div>
        </div>
        <br>
        <h1 class="w3-jumbo w3-text-white w3-hide-small"><b>OUR OFFERS</b></h1>
        <br>
     <div class="row"> 
        <div class="col-sm-4">
          <tarif_faibleComponent/>
          <div class="col-sm-6">
            <router-link to="/Pay"> <pluComponent /></router-link>
        </div>
        <div class="col-sm-6">
          <h1 style="color: #b7c81c;" >40 EUROS</h1>
         </div>
        </div>
        <div class="col-sm-4">
          <tarif_moyenComponent/>
          <router-link to="/Pay"> <pluComponent /></router-link>
          <h1 style="color: #4f5989;" >60 EUROS</h1>
        </div>
        <div class="col-sm-4">
          <tarif_hautComponent/>
          <router-link to="/Pay"> <pluComponent /></router-link>
          <h1 style="color: #3ea561;" >80 EUROS</h1>
        </div>
    </div>    <br>   <br></div>
</template>

<script>
import pluComponent from '@/components/homeComponents/plu.vue';
import tarif_faibleComponent from '@/components/homeComponents/tarif_faible.vue';
import tarif_moyenComponent from '@/components/homeComponents/tarif_moyen.vue';
import tarif_hautComponent from '@/components/homeComponents/tarif_haut.vue';

export default {
    name:"OffreComponent",
    components:{   
    tarif_faibleComponent,
    tarif_moyenComponent,
    tarif_hautComponent,
    pluComponent,},
}
</script>

<style scoped>
    .offer-description {
  font-family: Arial, sans-serif;
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 20px;
}

.offer-title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.offer-benefit {
  margin-bottom: 10px;
}

.offer-benefit::before {
  content: "\2022"; /* Bullet point */
  color: #007bff; /* Blue color */
  font-weight: bold;
  display: inline-block;
  width: 1em;
  margin-left: -1em;
}

/* Style Exemple */
.margin-up{
    margin: 100px 0px 0px 0px;
}

.rectangle-container {
    cursor: pointer;
  }
  .rectangle {
    width: 100%;
    height: 70px;
    background-color: #cba3a3;
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