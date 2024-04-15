<template>
    <div>
      <!-- Jumbotron -->
      <div class="jumbotron jumbotron-fluid bg-light text-dark position-relative mt-4">
        <!-- Contenu du Jumbotron -->
        <div class="container-fluid">
          <div class="row align-items-center" style="background-color:white">
            <div class="col-sm-6">
              <h1 class="text-center">Payments</h1>
              <h5 class="text-center"><router-link to="/"> Home</router-link> >Payments</h5>
            </div>
            <div class="col-sm-6 position-relative">
              <img src="https://www.healthdigest.com/img/gallery/things-your-gym-doesnt-want-you-to-know/intro-1633966377.jpg" alt="Workout" class="img-fluid">
              <div class="blur-gradient"></div>
            </div>
          </div>
        </div>
      </div> 
      <br>   
      <div class="modal-dialog modal-md">
          <div class="modal-content">
              <!-- Modal Header -->
              <div class="modal-header bg-gris d-flex justify-content-between align-items-center" >
                  <h4 class="modal-title text-center m-0">Pay by card </h4>

              </div>
  
              <!-- Modal Body -->
              <div class="modal-body" style="padding: 20px;">
                  <!-- Modal content -->
                  <form role="form">
                      <div class="mb-3" style="text-align:left">
                          <label for="usrname" class="form-label d-block"> Card Number</label>
                          <input type="text" class="form-control" id="usrname" placeholder="The 16-digit number on the front of your card">
                      </div>
                      <div class="mb-3" style="text-align:left">
                          <label for="psw" class="form-label d-block"> Card Verification Code (CVV) </label>
                          <input type="password" class="form-control" id="psw" placeholder="The date until which the card is valid">
                      </div>
                      <div class="mb-3" style="text-align:left">
                        <label for="psw" class="form-label d-block"> Expiration Date </label>
                        <input type="date" class="form-control" id="psw" placeholder="The exact name as it appears on the card">
                    </div>
                    <div class="mb-3" style="text-align:left">
                        <label for="psw" class="form-label d-block"> Cardholder Name </label>
                        <input type="text" class="form-control" id="psw" placeholder="The exact name as it appears on the card">
                    </div>
                      <button type="submit" class="btn btn-primary"><i class="fas fa-sign-in-alt"></i> PAY</button>
                  </form>
              </div>
          </div>
      </div>
    </div>
    <br>  <br>   <br>  <br> 
  </template>
  
  <script>
  export default {
    name: "payementComponent"
  };
  </script>
  
  <style scoped>
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
  