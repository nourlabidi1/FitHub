<template>
    <div class="container-fluid" v-if="Activity != null">
        <div class="row">
            <!-- Image -->
            <div class="col-md-6">
                <img v-if="Activity.image && Activity.image!=''" :src="Activity.image" alt="activity image" class="img-fluid" height="100%" width="100%">
                <img v-else :src="getImagePath(Activity.category)" alt="Workout" class="img-fluid">
                <button v-if="UserConnected && !isAdmin() && !isInMyActivities(Activity._id)" class="btn btn-primary" @click="addToMyActivities(Activity._id)"> Add to my activities</button>
                <button v-if="UserConnected && !isAdmin() && isInMyActivities(Activity._id)" class="btn btn-danger" @click="removeFromMyActivities(Activity._id)"> Remove from my activities</button>
            </div>
            <!-- Image -->

            <!-- Infos-->
            <div class="col-md-6 list-unstyled" >
                <div class="activity-list">
                    <p>Category: <router-link :to="'/activities/category/'+Activity.category"> {{Activity.category}}</router-link></p>
                    <h3 class="title">{{ Activity.title }}™</h3>

                    <div style="margin-top: 40px;">
                        <img style="margin: -6px;" src="https://www.california-gym.com/tn/wp-content/uploads/2019/09/time.png" width="25px;">
                        <strong style="margin-right: 15px; margin-left: 25px;">Duration of the course:</strong> 
                        {{ Activity.duration }} mins
                    </div>
                    <div style="margin-top: 10px;">
                        <img style="margin: -6px;" src="https://www.california-gym.com/tn/wp-content/uploads/2019/09/sport.png" width="25px;">
                        <strong style="margin-right: 15px; margin-left: 25px;">Equipment used:</strong>
                        {{ Activity.material }}
                    </div>
                    <div style="margin-top: 10px;">
                        <img style="margin: -6px;" src="https://www.california-gym.com/tn/wp-content/uploads/2020/03/intesnsité3.png" width="25px;">
                        <strong style="margin-right: 15px; margin-left: 25px;">Intensity:</strong>
                        {{ Activity.intensity }}
                    </div>
                    <div style="margin-top: 10px;">
                        <img style="margin: -6px; margin-left: -7px;" src="https://www.california-gym.com/tn/wp-content/uploads/2019/09/muscle.png" width="30px;">
                        <strong style="margin-right: 15px; margin-left: 21px;">Muscle groups targeted:</strong>
                        {{Activity.muscleTarget }} 
                    </div>
                    <div style="margin-top: 10px;">
                        <img style="margin: -6px; margin-left: -1px;" src="https://www.california-gym.com/tn/wp-content/uploads/2019/09/tenue.png" width="22px;">
                        <strong style="margin-right: 10px; margin-left: 25px;">Recommended attire:</strong> 
                        {{Activity.sportswear }}
                    </div>
                    <div style="margin-top: 10px;">
                        <img style="margin: -6px; margin-left: -3px;" src="https://www.california-gym.com/tn/wp-content/uploads/2019/09/recommendation.png" width="30px;">
                        <strong style="margin-right: 15px; margin-left: 22px;">Recommendations:</strong> 
                        {{ Activity.recommandations }}
                    </div>

                </div>
            </div>
            <!-- Infos-->

        </div>
    </div>
</template>


<script>
import UserService from '@/services/UserService';
import AuthService from '@/services/AuthService';
import Swal from 'sweetalert2';
//import activityService from '@/services/activityService';
export default {
    name:"ActivityDetailsComponent",
    props: {
      Activity: {
        type: Object,
        required: true
      }
    },

    data(){
        return {
            UserConnected:null,
        }
    },
    
    mounted(){
        this.getUserById();
    },
    
    methods:{
        async addToMyActivities(activityId){
            try{
                const user = AuthService.getConnectedUser();
                const res= await UserService.addActivyToUser(activityId,user._id);
                console.log(res)
                this.getUserById();// Mettre à jour UserConnected
                Swal.fire({
                  title: 'Super !',
                  text: 'Now, You can practise this activity !',
                  icon: 'success',
                  timer: 3000, // Durée en millisecondes (5000 ms = 5 secondes)
                  showConfirmButton: false, // Ne pas afficher le bouton de confirmation
              });
            }catch(error ){
                Swal.fire({
                  title: 'Failed!',
                  text: error.message,
                  icon: 'error',
                  timer: 2000, // Durée en millisecondes (5000 ms = 5 secondes)
                  showConfirmButton: true, // Ne pas afficher le bouton de confirmation
              });
            }
        },
        async removeFromMyActivities(activityId){
            try{
                const user = AuthService.getConnectedUser();
                const res= await UserService.removeActivyFromUser(activityId,user._id);
                console.log(res)
                this.getUserById();// Mettre à jour UserConnected
                Swal.fire({
                  title: 'Oups!',
                  text: 'You removed this activity from your activities !.',
                  icon: 'success',
                  timer: 3000, // Durée en millisecondes (5000 ms = 5 secondes)
                  showConfirmButton: false, // Ne pas afficher le bouton de confirmation
              });
            }catch(error ){
                Swal.fire({
                  title: 'Failed !',
                  text: error.message,
                  icon: 'error',
                  timer: 2000, // Durée en millisecondes (5000 ms = 5 secondes)
                  showConfirmButton: true, // Ne pas afficher le bouton de confirmation
              });
            }
        },

        //retourner user ds localstorage
        getCurrentUserConnected(){
            try{
                const user=AuthService.getConnectedUser();
                return user;
            }catch(error){
                this.UserConnected=null;
                throw new Error(error.message);
            }
        },

        isInMyActivities(activityId){
            if(this.UserConnected){
                return this.UserConnected.myActivities.includes(activityId);
            }else{
                return false;
            }
        },

        //Update UserConnected 
        async  getUserById(){
            try{
                const user = this.getCurrentUserConnected();
                const userFound = await UserService.getUserById(user._id);
                this.UserConnected=userFound;

                //Mettre à jour user dans local storage 
                AuthService.setUserConnected(userFound);
            }catch(error){
                //alert(error.message)
                this.UserConnected=null;
            }
            
        },

        //retoune l'url de l'image dans l'assets selon la categorie d'activité
        getImagePath(category) {
            try{
                return require(`@/assets/${category}.jpg`);
            }catch(error){
                return require(`@/assets/workout.jpg`);
            }
        },

        //isAdmin
        isAdmin(){
            //this.getUserById();
            return (this.UserConnected && (this.UserConnected.role== 'SUPER_ADMIN' || this.UserConnected.role== 'ADMIN'));
        },

        //is Client
        isClient(){
            //this.getUserById();
            return (this.UserConnected && this.UserConnected.role== 'CLIENT' );
        },

        //is Coatch
        isCoatch(){
            //this.getUserById();
            return (this.UserConnected && this.UserConnected.role== 'COATCH' );
        },

    
    }

}
</script>

<style scoped>
    .list-unstyled{
      text-align: left;
    }

    .attribute {
        font-weight: bold;
        color: black;
    }

    .title{
        color:#56a7d5;
        margin-top:0px ;
    }
    .row{
        margin-bottom: 20px;
        margin-top: 50px;
    }
    .activity-list{
        padding-left: 20px;
    }
    .img-fluid{
        padding: 25px 30px 20px 50px;
    }
</style>