<template>
    <div>
      <!-- Jumbotron avec une image de fond -->
      <div class="jumbotron jumbotron-fluid" style="background-image: url('@/assets/users.jpeg');">
        <div class="container text-center">
          <h1 class="display-4 text-dark">User List</h1>
        </div>
      </div>
      <!-- Tableau des utilisateurs -->
      <div class="container ">
        <table class="table table-striped">
          <thead class="thead-dark">
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Gender</th>
              <th>Created At</th>
              <th>Is Online</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in Users" :key="user._id">
              <td>{{ user.firstname }} {{ user.lastname }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.role }}</td>
              <td>{{ user.gender }}</td>
              <td>{{ formatDate(user.createdAt) }}</td>
              <td>{{ user.isOnline ? 'Yes' : 'No' }}</td>
              <td>
                 <!-- Bouton supprimer avec icône -->
              <button @click="deleteUser(user._id)" class="btn btn-danger">
                <i class="fas fa-trash-alt"></i>
              </button>
              <!-- Bouton activer/désactiver avec icône -->
              <!--<button @click="toggleActivation(user)" class="btn btn-primary">
                <i :class="user.isDeactivated ? 'fas fa-toggle-on' : 'fas fa-toggle-off'"></i>
              </button>-->
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import UserService from '@/services/UserService';
  import AuthService from '@/services/AuthService';
  import { useRouter } from 'vue-router'; // Importez useRouter
  import Swal from 'sweetalert2';
  
  export default {
    name: "UserListComponent",
    setup() {
      const Users = ref([]);
      const router = useRouter(); // Utilisez useRouter pour accéder à l'instance du routeur
  
      async function getAllUsers() {
        try {
          getUserConnected();
          const users = await UserService.getAllUsers();
          if (users) {
            Users.value = users;
          }
        } catch (err) {
          console.error("Error get all users :" , err);
        }
      }
  
      async function deleteUser(userId) {
        // Afficher une boîte de dialogue de confirmation
        const result = await Swal.fire({
          title: 'Are you sure?',
          text: 'You are about to delete this user. This action cannot be undone.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Yes, delete it!'
        });

        // Vérifier si l'utilisateur a confirmé la suppression
        if (result.isConfirmed) {
          try {
            // Supprimer l'utilisateur
            await UserService.deleteUser(userId);
            // Afficher une notification de succès
            Swal.fire({
              title: 'User deleted!',
              text: 'You have successfully deleted the user.',
              icon: 'success',
              timer: 3000,
              showConfirmButton: false,
              timerProgressBar: true
            });
            // Actualiser la liste des utilisateurs
            await getAllUsers();
          } catch (err) {
            // En cas d'erreur, afficher une notification d'erreur
            Swal.fire({
              title: 'Failed to delete user!',
              text: err.message,
              icon: 'error',
              timer: 3000,
              showConfirmButton: false,
              timerProgressBar: true
            });
          }
        }
      }

      async function toggleActivation(user) {
        // Déterminer le nouveau statut d'activation
        const newActivationStatus = !user.isDeactivated;

        // Afficher une boîte de dialogue de confirmation
        const result = await Swal.fire({
          title: 'Are you sure?',
          text: `You are about to ${newActivationStatus ? 'deactivate' : 'activate'} this user account .`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, toggle it!'
        });

        // Vérifier si l'utilisateur a confirmé l'action
        if (result.isConfirmed) {
          try {
            // Mettre à jour l'état d'activation de l'utilisateur
            await UserService.deactivateUserAccount(user._id);
            // Afficher une notification de succès
            Swal.fire({
              title: 'User deactivated !',
              text: `You have successfully 'deactivated' the user.`,
              icon: 'success',
              timer: 3000,
              showConfirmButton: false,
              timerProgressBar: true
            });
            // Actualiser la liste des utilisateurs
            await getAllUsers();
          } catch (err) {
            // En cas d'erreur, afficher une notification d'erreur
            Swal.fire({
              title: 'Failed to deactivate user !',
              text: err.message,
              icon: 'error',
              timer: 3000,
              showConfirmButton: false,
              timerProgressBar: true
            });
          }
        }
      }


      // Formater la date
      function formatDate(dateString) {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        return new Date(dateString).toLocaleString('fr-FR', options);
      }

      function getUserConnected(){
        try{
            const user=AuthService.getConnectedUser();
            if(user && (user.role==="ADMIN" || user.role==="SUPER_ADMIN") ){
              console.log("")
            }else{
              throw new Error("Not Admin")
            }
        }catch(error){
          router.push("/");
        }
      }
  
      // Appeler la fonction pour charger les utilisateurs lors de la création du composant
      onMounted(getAllUsers);
  
      return {
        Users,
        getAllUsers,
        deleteUser,
        toggleActivation,
        formatDate,
        getUserConnected
      };
    },
  };
  </script>
  
  <style>
  /* Ajoutez votre style CSS personnalisé ici */
  .text-center{
    padding-top: 10%;
  }
  </style>
  