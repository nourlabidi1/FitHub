<template>
  <div  >
      <div class="row">     
           <videoHome/>
      </div> 
      <div class="row"> 
        
                 
      </div>
      <div class="row">  
            <div class="col-sm-6">
                  <diaporama/>
            </div>
            <div class="col-sm-6">
              <br><br><h1 class="p1" style="color: #0082cb; font-family: montserrat; font-size: 45px;">An objective to achieve?</h1>
              <br><br><br><br>
              <h4 style="font-weight: 400; font-size: 20px!important;" > No matter your background, training goal, or level of experience, you'll find activities here that will help you reach your goal! </h4>
              <router-link to="/activities"><sloganComponent /></router-link>
            </div>
       </div>

       <div class="row"> 
        <tarifComponent/>
       </div> 
       <br><br><br><br>
     <div class="row"> 
      <contactComponent />
    </div>


 </div>
</template>

<script>


import sloganComponent from '@/components/homeComponents/slogan.vue';
import contactComponent from '@/components/homeComponents/contact.vue';
import videoHome from '@/components/homeComponents/videohome.vue';
import diaporama from '@/components/homeComponents/diaporama.vue';

export default {
  name: "HomeComponent",
  
  components: {
   
    videoHome,
    diaporama,
    
    contactComponent,
    sloganComponent,

  },
  methods: {

  }
};
</script>

<style>

</style>
