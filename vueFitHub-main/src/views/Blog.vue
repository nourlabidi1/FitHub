<template>
    <div>
      <!-- Jumbotron -->
      <div class="jumbotron jumbotron-fluid bg-light text-dark position-relative mt-4">
        <!-- Contenu du Jumbotron -->
        <div class="container-fluid">
          <div class="row align-items-center" style="background-color: white;">
            <div class="col-sm-6">
              <h1 class="text-center">Blogs</h1>
              <h5 class="text-center"><router-link to="/"> Home</router-link> > Blogs</h5>
            </div>
            <div class="col-sm-6 position-relative">
              <img src="https://www.california-gym.com/tn/blog/wp-content/uploads/2021/10/blog-banner.jpg" alt="Workout" class="img-fluid">
              <div class="blur-gradient"></div>
            </div>
          </div>
        </div>
      </div>
  
      <div class="w3-light-grey">
        <br><br><br>
        <div class="w3-content" style="max-width: 1600px">
          <div class="w3-row w3-padding w3-border">
            <div class="w3-col l8 s12">
              <div class="w3-container w3-white w3-margin w3-padding-large">
                <div class="w3-center">
                  <h1>Why Choose FitHub?</h1>
                  <h5>Description, <span class="w3-opacity">April 12, 2024</span></h5><br>
                </div>
                <br><br>
                <div class="row">
                  <div class="col-sm-6" style="padding-left: 100px;">
                    <div class="slider-container">
                      <div class="menu">
                        <label for="slide-dot-1"></label>
                        <label for="slide-dot-2"></label>
                        <label for="slide-dot-3"></label>
                      </div>
  
                      <input class="slide-input" id="slide-dot-1" type="radio" name="slides" checked>
                      <img class="slide-img" src="https://formagym.com/wp-content/uploads/2019/03/shutterstock_1065905168-1.jpg" alt="Fashion Blog">
  
                      <input class="slide-input" id="slide-dot-2" type="radio" name="slides">
                      <img class="slide-img" src="https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1240w,f_auto,q_auto:best/newscms/2017_36/2144546/170905-working-out-group-ac-512p.jpg">
  
                      <input class="slide-input" id="slide-dot-3" type="radio" name="slides">
                      <img class="slide-img" src="https://thekickhouse.com/wp-content/uploads/2022/01/267116686_454036486279857_1065282728213462812_n-768x509.jpeg">
                    </div>
                  </div>
                  <div class="col-sm-6" style="padding-right: 100px;">
                    <br><br><h1 class="p1" style="color: #0082cb; font-family: montserrat; font-size: 45px;">Join Our Fitness Community!</h1>
                    <br>
                    <h4 style="font-weight: 400; font-size: 20px!important;">Whether you're a beginner or a seasoned gym-goer, FitHub offers everything you need to reach your fitness goals. Our state-of-the-art facilities, experienced trainers, and diverse range of classes ensure that there's something for everyone. At FitHub, we believe in the power of community and support. Our team of dedicated trainers is here to guide and motivate you every step of the way. From group classes to personalized training sessions, we're committed to helping you achieve your best self.</h4>
                    <sloganComponent />
                  </div>
                </div>
                <br><br>
                <h1>Articles to Read</h1>
                <br><br><br><br>
                <div class="row">
                  <div class="col-sm-4">
                    <a href="https://www.medicalnewstoday.com/articles/215100#faq" target="_blank">
                    <section>
                      <h1 style="color: #0082cb; font-family: montserrat; font-size: 45px;">Weight loss</h1>
                      <div class="container">
                        <div class="background-img">
                          <div class="box">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <div class="content1"></div>
                          </div>
                        </div>
                      </div>
                    </section></a>
                  </div>
  
                  <div class="col-sm-4">
                    <a href="https://www.medicalnewstoday.com/articles/319151" target="_blank">
                    <section>
                      <h1 style="color: #0082cb; font-family: montserrat; font-size: 45px;">Building muscle</h1>
                      <div class="container">
                        <div class="background-img">
                          <div class="box">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <div class="content2"></div>
                          </div>
                        </div>
                      </div>
                    </section></a>
                  </div>
  
                  <div class="col-sm-4">
                    <a href="https://www.everydayhealth.com/fitness/how-become-more-flexible-because-yes-its-important/" target="_blank">
                    <section>
                      <h1 style="color: #0082cb; font-family: montserrat; font-size: 45px;">Become flexible</h1>
                      <div class="container">
                        <div class="background-img">
                          <div class="box">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <div class="content3"></div>
                          </div>
                        </div>
                      </div>
                    </section></a>
                  </div>
                </div><br><br><br>
                <h2 style="color: #082536;">-&nbsp;-&nbsp;-&nbsp;-&nbsp;-&nbsp;-&nbsp;-&nbsp;-&nbsp;-&nbsp;-&nbsp;-&nbsp;-&nbsp;-&nbsp;-&nbsp;-&nbsp;-&nbsp;-&nbsp;-&nbsp;-&nbsp;-&nbsp;-&nbsp;-&nbsp;-&nbsp;-&nbsp;-&nbsp;-&nbsp;-&nbsp;-&nbsp;-&nbsp;-&nbsp;-&nbsp;-&nbsp;-&nbsp;-&nbsp;-&nbsp;-&nbsp;-&nbsp;-&nbsp;-&nbsp;-&nbsp;-&nbsp;-&nbsp;-&nbsp;-&nbsp;-&nbsp;-&nbsp;-&nbsp;-&nbsp;-&nbsp;-&nbsp;-&nbsp;-&nbsp;</h2>
                <br><br> <br><br>
                <div class="row">
                  <div class="col-sm-4">
                    <a href="https://www.medicalnewstoday.com/articles/321982#how-to-gain-weight-healthily" target="_blank">
                    <section>
                      <h1 style="color: #0082cb; font-family: montserrat; font-size: 45px;">Weight gain</h1>
                      <div class="container">
                        <div class="background-img">
                          <div class="box">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <div class="content4"></div>
                          </div>
                        </div>
                      </div>
                    </section>
                    </a>
                  </div>
  
                  <div class="col-sm-4">
                    <a href="https://www.sci-sport.com/en/articles/Impact-of-training-frequency-on-muscle-strength-and-hypertrophy-189.php" target="_blank">
                    <section>
                      <h1 style="color: #0082cb; font-family: montserrat; font-size: 45px;">Gym frequency</h1>
                      <div class="container">
                        <div class="background-img">
                          <div class="box">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <div class="content5"></div>
                          </div>
                        </div>
                      </div>
                    </section>
                    </a>
                  </div>
  
                  <div class="col-sm-4">
                    <a href="https://www.casayoga-paris.fr/articles-yoga.html" target="_blank">
                    <section>
                      <h1 style="color: #0082cb; font-family: montserrat; font-size: 45px;">Yoga</h1>
                      <div class="container">
                        <div class="background-img">
                          <div class="box">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <div class="content6"></div>
                          </div>
                        </div>
                      </div>
                    </section></a>
                  </div>
                </div>
                <br><br><br><br><br>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "BlogComponent",
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
    img {
      max-width: 100%;
    }
    .slider-container {
      max-width: 600px;
      position: relative;
      margin: 0px;
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
    .menu label:hover, .menu label:focus {
      background: #1c87c9;
    }
    .slide-input {
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
    .container {
      padding-top: 20px;
      padding-bottom: 20px;
    }
    body {
      background-color: #a90303;
    }
    .background-img {
      height: 400px;
      width: 400px;
      background-repeat: no-repeat;
      background-size: cover;
      margin: 5% auto;
      padding: 20px;
      border: 1px solid #ddccdd;
      border-radius: 4px;
      box-shadow: 0px 0px 5px #eff1e7;
      position: relative;
    }
    .content h2 {
      font-size: 19px;
    }
    .box {
      position: absolute;
      top: 50%;
      left: 50%;
      background-image: url("https://static.toiimg.com/photo/105721384.cms");
      transform: translate(-50%, -50%);
      width: 350px;
      height: 330px;
      background: #dcdde3a6;
      box-sizing: border-box;
      overflow: hidden;
      box-shadow: 0 20px 50px rgb(78, 110, 145);
      border: 2px solid #e3e3db;
      color: white;
      padding: 20px;
    }
    .box:before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: rgba(176, 166, 166, 0.1);
      transition: 0.5s;
      pointer-events: none;
    }
    .box:hover:before {
      left: -50%;
      transform: skewX(-5deg);
    }
    .box .content1 {
      position: absolute;
      background-image: url("https://www.california-gym.com/tn/blog/wp-content/uploads/2021/06/Mincir-Blog-1500x1000-1.png");
      background-size: cover; /* Ajoutez cette ligne pour que l'image de fond soit couverte entièrement */
      top: 15px;
      left: 15px;
      right: 15px;
      bottom: 15px;
      border: 1px solid #b5b59f;
      padding: 20px;
      text-align: center;
      box-shadow: 0 5px 10px rgba(179, 163, 163, 0.5);
    }
    .box .content2 {
      position: absolute;
      background-image: url("https://img.mensxp.com/media/content/2018/Jun/muscle-gain-is-not-just-about-stuffing-your-face-with-food1-1530096169.jpg");
      background-size: cover; /* Ajoutez cette ligne pour que l'image de fond soit couverte entièrement */
      top: 15px;
      left: 15px;
      right: 15px;
      bottom: 15px;
      border: 1px solid #c0c0a8;
      padding: 20px;
      text-align: center;
      box-shadow: 0 5px 10px rgba(9, 0, 0, 0.5);
    }
    .box .content3 {
      position: absolute;
      background-image: url("https://artimg.gympik.com/articles/wp-content/uploads/2017/04/Low-Lunge.jpg");     
      background-size: cover; /* Ajoutez cette ligne pour que l'image de fond soit couverte entièrement */
      top: 15px;
      left: 15px;
      right: 15px;
      bottom: 15px;
      border: 1px solid #a3a388;
      padding: 20px;
      text-align: center;
      box-shadow: 0 5px 10px rgba(9, 0, 0, 0.5);
    }
    .box .content4 {
      position: absolute;
      background-image: url("https://st2.depositphotos.com/3662505/9707/i/950/depositphotos_97071952-stock-photo-very-thin-girl.jpg");
      background-size: cover; /* Ajoutez cette ligne pour que l'image de fond soit couverte entièrement */

      top: 15px;
      left: 15px;
      right: 15px;
      bottom: 15px;
      border: 1px solid #bdbd99;
      padding: 20px;
      text-align: center;
      box-shadow: 0 5px 10px rgba(9, 0, 0, 0.5);
    }
    .box .content5 {
      position: absolute;
      background-image: url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf26yZE9ZOTzlDzoF2rNtmr1COC3imObUlf_c_qyzjzA&s");
      background-size: cover; /* Ajoutez cette ligne pour que l'image de fond soit couverte entièrement */
      top: 15px;
      left: 15px;
      right: 15px;
      bottom: 15px;
      border: 1px solid #c2c2a9;
      padding: 20px;
      text-align: center;
      box-shadow: 0 5px 10px rgba(9, 0, 0, 0.5);
    }
    .box .content6 {
      position: absolute;
      background-image: url("https://img.passeportsante.net/1200x675/2021-05-03/i105659-yoga-th.jpg");
      background-size: cover; /* Ajoutez cette ligne pour que l'image de fond soit couverte entièrement */
      top: 15px;
      left: 15px;
      right: 15px;
      bottom: 15px;
      border: 1px solid #d4d4ba;
      padding: 20px;
      text-align: center;
      box-shadow: 0 5px 10px rgba(9, 0, 0, 0.5);
    }
    .box span {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: block;
      box-sizing: border-box;
    }
    .box span:nth-child(1) {
      transform: rotate(0deg);
    }
    .box span:nth-child(2) {
      transform: rotate(90deg);
    }
    .box span:nth-child(3) {
      transform: rotate(180deg);
    }
    .box span:nth-child(4) {
      transform: rotate(270deg);
    }
    .box span:before {
      content: '';
      position: absolute;
      width: 100%;
      height: 2px;
      background: #c8c9c1;
      animation: animate 4s linear infinite;
    }
    @keyframes animate {
      0% {
        transform: scaleX(0);
        transform-origin: left;
      }
      50% {
        transform: scaleX(1);
        transform-origin: left;
      }
      50.1% {
        transform: scaleX(1);
        transform-origin: right;
      }
      100% {
        transform: scaleX(0);
        transform-origin: right;
      }
    }
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
      background-color: #d3d2ce;
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
      margin-top: 50px;
      /* Augmentez l'espace en haut du texte et de l'image sélectionnés */
      margin-bottom: 50px;
      /* Augmentez l'espace en bas du texte et de l'image sélectionnés */
    }
  </style>
  