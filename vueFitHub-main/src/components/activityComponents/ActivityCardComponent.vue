<template>
    <div class="col-md-4 mb-3 card-list">
      <div class="card">
        <img v-if="Activity.image && Activity.image!=''" :src="Activity.image" class="card-img-top" :alt="Activity.title" height="150px">
        <img v-else :src="getImagePath(Activity.category)" class="card-img-top" :alt="Activity.title" height="150px">
        <div v-if="isAdmin()" class="icons">
          <i class="fa-solid fa-trash delete-icon" @click="deleteActivity"></i>&nbsp;&nbsp;
          <i class="fa-solid fa-pen-to-square" @click="updateActivity" ></i>
        </div>
        <div class="card-body-1">
          <h5 class="card-title">{{ Activity.title }}</h5>
          <router-link :to="`/activities/${Activity.title}/`" class="button product_type_simple" aria-label="En savoir plus sur {{ Activity.title }}" rel="nofollow">Lire la suite </router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import AuthService from '@/services/AuthService';
  import activityService from '../../services/activityService';
  import Swal from 'sweetalert2';
  
  export default {
    name: "ActivityCardComponent",
    props: {
      Activity: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        UserConnected: null,
      }
    },
    mounted() {
      // Appeler getCurrentUserConnected lorsque le composant est monté
      this.getCurrentUserConnected();
    },
    methods: {
      async deleteActivity() {
        try {
          // Demander confirmation à l'utilisateur avant de supprimer l'activité
          const confirmation = await Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to delete this activity?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
          });

          // Si l'utilisateur confirme la suppression
          if (confirmation.isConfirmed) {
            // Supprimer l'activité
            const res = await activityService.deleteActivity(this.Activity._id);
            // Émettre un événement pour indiquer la suppression de l'activité
            this.$emit('activityDeleted');
            // Afficher un message de succès
            await Swal.fire({
              title: 'Deleted!',
              text: 'Activity has been deleted.',
              icon: 'success',
              timer: 2000, // Afficher le message de succès pendant 2 secondes
              timerProgressBar: true
            });
            // Log de la suppression de l'activité
            console.log("Activity deleted :", res.message);
          }
        } catch (error) {
          // Afficher un message d'erreur en cas d'échec de la suppression
          await Swal.fire({
            title: 'Error!',
            text: 'Failed to delete activity: ' + error.message,
            icon: 'error',
            timer: 2000, // Afficher le message d'erreur pendant 2 secondes
            timerProgressBar: true
          });
          console.error('Failed to delete an activity:', error);
        }
      },

      updateActivity(){
        this.$emit('show-update-modal', this.Activity);
      },

      // Méthode pour récupérer l'utilisateur actuellement connecté
      getCurrentUserConnected() {
        try {
          const user = AuthService.getConnectedUser();
          this.UserConnected = user;
        } catch (error) {
          this.UserConnected = null;
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
        this.getCurrentUserConnected();
        return (this.UserConnected && (this.UserConnected.role== 'SUPER_ADMIN' || this.UserConnected.role== 'ADMIN'));
      },

      //is Client
      isClient(){
        this.getCurrentUserConnected();
        return (this.UserConnected && this.UserConnected.role== 'CLIENT' );
      },

      //is Coatch
      isCoatch(){
        this.getCurrentUserConnected();
        return (this.UserConnected && this.UserConnected.role== 'COATCH' );
      },
    },
  };
  </script>
  
  
  <style scoped>
  /* Styles spécifiques à la carte d'activité peuvent être ajoutés ici */
  

    .card-list .button {
        display: none;
    }

    .card-list:hover .button {
        display: inline-block;
    }
    .qodef-product-list-title a,
    .button.product_type_simple {
        text-transform: uppercase;
        text-decoration: none;
        color: inherit; /* Pour conserver la couleur par défaut des liens */
    }
    .card-title{
      text-transform: uppercase;
    }

    .icons {
      position: absolute;
      top: 5px;
      right: 5px;
      cursor: pointer;
      z-index: 1;
      
    }

    .delete-icon{
      color: red; /* Couleur de la croix */
    }

    .fa-pen-to-square{
      color:blue;
    }
  </style>
  