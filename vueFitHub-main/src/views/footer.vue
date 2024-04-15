<template>

    <footer class="text-center text-lg-start "  style="background-color:rgb(204, 195, 195);">
      <!-- Section: Social media -->
      <section class="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <!-- Left -->
        <div class="me-5 d-none d-lg-block">
          <span>Get connected with us on social networks:</span>
        </div>
        <!-- Left -->
    
        <!-- Right -->
        <div>
          <a href="" class="me-4 text-reset">
            <i class="fab fa-facebook-f"></i>
          </a>
          <a href="" class="me-4 text-reset">
            <i class="fab fa-google"></i>
          </a>
          <a href="" class="me-4 text-reset">
            <i class="fab fa-instagram"></i>
          </a>
          <a href="https://www.linkedin.com/in/torien/"  target="blank" class="me-4 text-reset">
            <i class="fab fa-linkedin"></i>
          </a>
          <a href="https://github.com/Torien-TORIEN/" target="blank" class="me-4 text-reset">
            <i class="fab fa-github"></i>
          </a>
        </div>
        <!-- Right -->
      </section>
      <!-- Section: Social media -->
    
      <!-- Section: Links  -->
      <section class="">
        <div class="container text-center text-md-start mt-5">
          <!-- Grid row -->
          <div class="row mt-3">
            <!-- Grid column -->
            <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <!-- Content -->
              <h6 class="text-uppercase fw-bold mb-4">
                <i class="fas fa-gem me-3"></i>FIT HUB 
              </h6>
              <p>
                Fit Hub is a website for the gym that offers many activities.
                 This site is developed as part of the 2023-2024 project by Mr. Torien, Miss Siwar, and Miss Nour.
              </p>
            </div>
            <!-- Grid column -->
    
            <!-- Grid column -->
            <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              <!-- Links -->
              <h6 class="text-uppercase fw-bold mb-4">
                Pages
              </h6>
              <p>
                <router-link to="/" class="text-reset">Home</router-link >
              </p>
              <p>
                <router-link to="/activities" class="text-reset">Activities</router-link >
              </p>
              <p>
                <router-link  to="/offers" class="text-reset">Offers</router-link >
              </p>
            </div>
            <!-- Grid column -->
    
            <!-- Grid column -->
            <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <!-- Links -->
              <h6 class="text-uppercase fw-bold mb-4">Contact</h6>
              <p><i class="fas fa-home me-3"></i> Angers, 49000, FR</p>
              <p>
                <i class="fas fa-envelope me-3"></i>
                torien1227@gmail.com
              </p>
              <p><i class="fas fa-phone me-3"></i> + 00 00 00 00 00 </p>
            </div>
            <!-- Grid column -->
          </div>
          <!-- Grid row -->
        </div>
      </section>
      <!-- Section: Links  -->
    
      <!-- Copyright -->
      <div class="text-center p-4" style="background-color: rgba(0, 0, 0, 0.05);">
        © 2024 Copyright:
        <a class="text-reset fw-bold" href="https://polytech-angers.fr/fr/index.html">Polytech Angers</a>
      </div>
      <!-- Copyright -->
    </footer>
    <!-- Footer -->
    </template>
    
    <script>
    export default {
        name:"FooterComponent",
    
    }
    </script>
    
    <style scoped>
    
    </style>
    