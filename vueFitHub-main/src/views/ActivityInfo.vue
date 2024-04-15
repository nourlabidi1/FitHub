<template>
  <div v-if="activity !=null">
    <!-- Partie haute -->
    <div class="jumbotron jumbotron-fluid bg-light text-dark position-relative">
      <div class="container-fluid" >
          <div class="row align-items-center" style="background-color:#fff; ">
            <div class="col-sm-5 content-text"  style="background-color:#fff;">
              <h1 >Activities</h1>
              <h5 v-if="activity != null"><router-link to="/"> Home</router-link> > <router-link to="/activities"> activities</router-link> > <router-link :to="'/activities/category/'+activity.category"> {{activity.category}}</router-link> > {{ activity.title }}</h5>
            </div>
            
            <div class="col-sm-7" >
              
              <img v-if="activity != null" :src="getImagePath(activity.category)" :alt="activity.category" class="img-fluid" >
              <div class="blur-gradient"></div>
            </div>


          </div>
      </div>
    </div>


    <!-- Ici details element -->
    <ActivityDetailsComponent :Activity=activity />

    <!-- Autre -->
    <div class="bg-grey" v-if="activity!=null">
      <div class="row">
        <!-- Left part :FOR WHOM -->
        <div class="col-md-6 content-text">
            <div class="mb-4">
                <p class="fw-bold">For whom?</p>
                <p>{{ activity.ageMin }}-{{ activity.ageMax }} years old</p>
                <p :key="kindOfperson" v-for="kindOfperson in activity.whoelse">{{kindOfperson }}.</p>
                
            </div>
            <div>
                <p class="fw-bold">Frequency:</p>
                <p>{{ activity.frequencyMin }} to {{ activity.frequencyMax }} times a week.</p>
            </div>
        </div>
      
        <!-- Right part  BENEFITS-->
        <div class="col-md-6 content-text">
            <div>
                <p class="fw-bold">Benefits:</p>
                <ul class="list-benefits">
                    <li :key="benefit" v-for="benefit in activity.advantages">{{ benefit }}</li>
                </ul>
            </div>
        </div>
      </div>

      <hr class="dashed-hr">

      <div class="content-text">
          <p><strong>ALL OUR GROUP CLASSES ARE ADAPTED TO ALL LEVELS AND THEREFORE ACCESSIBLE TO EVERYONE.</strong></p>
          <ul class="list-unstyled">
              <li>However, if you have never exercised before, or are returning after a period of inactivity, it is advisable to engage in a cardio activity such as treadmill or elliptical for a duration of 2 weeks.</li>
              <li>Afterwards, you will be able to participate in group classes, while informing the coach at the beginning of the session so that he can guide and supervise you.</li>
              <li>You have the option to only do the first songs of the class, then gradually add one more song each time.</li>
          </ul>
      </div>

      
    </div>


  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router'; // Importez useRouter
import ActivityDetailsComponent from '../components/activityComponents/activityDetailsComponent.vue';
import activityService from '../services/activityService';

export default {
    name: "ActivityInfoComponent",
    components: {
        ActivityDetailsComponent,
    },
    setup() {
        const router = useRouter(); // Utilisez useRouter pour accéder à l'instance du routeur
        const currentRoute = useRoute();

        const activity = ref({});

        async function getActivity() {
            try {
                const title = currentRoute.params.title;
                const res = await activityService.getActivityByTitle(title);
                if (res.success) {
                    if (res.data.length > 0) {
                        activity.value = res.data[0];
                        console.log("Activity :", activity.value)
                    } else {
                        // Effectuer une redirection vers la page '/activities' en utilisant le routeur
                        router.push('/activities');
                    }
                } else {
                    console.log("Error: ", res.error);
                }
            } catch (error) {
                console.error('Failed to fetch activities:', error);
            }
        }

        onMounted(getActivity);

         //retoune l'url de l'image dans l'assets selon la categorie d'activité
        function getImagePath(category) {
          try{
              return require(`@/assets/${category}.jpg`);
          }catch(error){
              return require(`@/assets/workout.jpg`);
          }
        }

        return {
            activity,
            getActivity,
            getImagePath
        };
    },
};

</script>


<style>
  .background-image{
    font-family: 'montserrat' ;
  }

  .list-unstyled,
  .content-text{
    text-align: left;
    font-family: 'montserrat' ;
  }

  /* Overlay gradient pour l'effet de flou progressif */
  .blur-gradient {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%; /* Pleine largeur */
      height: 100%;
      background: linear-gradient(to left, rgba(156, 156, 156, 0) 0%, rgba(156, 156, 156, 0.999) 50%, rgba(160, 160, 160, 0.999) 55%, rgba(179, 179, 179, 0.999) 60%, rgba(156, 156, 156, 0) 100%); /* Gradient transparent à flou opaque de gauche à droite */
      pointer-events: none; /* Permet aux éléments de cliquer à travers */
  }

  .bg-grey{
    font-family: 'montserrat' ;
    background-color: rgba(179, 179, 179, 0.1);
    padding: 10px 50px ;
  }
  li{
    text-decoration-style: none;
  }

  .dashed-hr {
      border: none;
      border-top: 1px dashed #ccc;
      margin: 20px 0; /* Ajustez la marge selon vos besoins */
  }


</style>