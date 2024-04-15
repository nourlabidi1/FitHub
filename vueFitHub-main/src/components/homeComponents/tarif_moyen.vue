<template>

        <section>
          <div class="container">
            <div class="background-img">
              <div class="box">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <div class="content">
                  <div class="offer-description">
                    <h2 class="offer-title">Blue Pass</h2><br>
                    <p class="offer-benefit">Description: The Blue Pass includes all the features of the Yellow Pass, plus additional personalized services.</p>
                    <p class="offer-benefit">Benefits: Access to all activities, personalized training sessions with a private coach, and regular follow-ups with a dietitian.</p>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </section>
          
  </template>
  
  <script>
  


  export default {
    name: "tarif_faibleComponent",
    components: {
       
    },
    methods: {
    
     
    }
  };
  </script>
  
  <style scoped>
   *{
  margin:0;
  padding:0;
}
.offer-description {
  font-family: Arial, sans-serif;
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 20px;
}

.offer-title {
  font-size: 24px;
  font-weight: bold;
  color: #ffffff;
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

.container{  padding-top: 20px;
  padding-bottom: 20px;}
body{
  background-color: #032da9;
}

.background-img{
  background-image: url("https://www.muskokapaint.com/cdn/shop/products/A3C1E3_800x.png?v=1607561815");
height: 500px;
  width: 400px;
  background-repeat: no-repeat;
  background-size: cover;
  margin: 5% auto;
  padding:20px;
  border: 1px solid #042fba;
  border-radius: 4px;
  box-shadow: 0px 0px 5px #858cb5;
  position: relative;
}

.content h2{ font-size:19px;}

.box{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 350px;
  height: 330px;
  background: #111845a6;
  box-sizing: border-box;
  overflow: hidden;
  box-shadow: 0 20px 50px rgb(23, 32, 90);
  border: 2px solid #2a3cad;
  color: white;
  padding: 20px;
}

.box:before{
  content: '';
  position:absolute;
  top:0;
  left:-100%;
  width:100%;
  height:100%;
  background: rgba(255,255,255,0.1);
  transition:0.5s;
  pointer-events: none;
}

.box:hover:before{
  left:-50%;
  transform: skewX(-5deg);
}


.box .content{
  position:absolute;
  top:15px;
  left:15px;
  right:15px;
  bottom:15px;
  border:1px solid #b1b4da;
  padding:20px;
  text-align:center;
  box-shadow: 0 5px 10px rgba(9,0,0,0.5);
  
}

.box span{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
  box-sizing: border-box;
  
}

.box span:nth-child(1)
{
  transform:rotate(0deg);
}

.box span:nth-child(2)
{
  transform:rotate(90deg);
}

.box span:nth-child(3)
{
  transform:rotate(180deg);
}

.box span:nth-child(4)
{
  transform:rotate(270deg);
}

.box span:before
{
  content: '';
  position: absolute;
  width:100%;
  height: 2px;
  background: #8483bf;
  animation: animate 4s linear infinite;
}

@keyframes animate {
  0% {
  transform:scaleX(0);
  transform-origin: left;
  }
  50%
  {
    transform:scaleX(1);
  transform-origin: left;
  }
  50.1%
  {
    transform:scaleX(1);
  transform-origin: right;
    
  }
  
  100%
  {
    transform:scaleX(0);
  transform-origin: right;
    
  }
  
  
} 



   </style>