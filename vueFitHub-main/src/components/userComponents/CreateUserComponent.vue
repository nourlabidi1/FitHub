<template>
  <div class="modal-dialog modal-md">
      <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header bg-gris d-flex justify-content-between align-items-center" >
              <h4 class="modal-title text-center m-0">Create account</h4>
              <button type="button" class="close" data-dismiss="modal" @click="closeModal">&times;</button>
          </div>

          <!-- Modal Body -->
          <div class="modal-body" style="padding: 20px;">
              <!-- Modal content -->
              <form role="form" @submit="createAccount">
                <div class="row">
                    <!-- Partie gauche -->
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <img v-if="userToCreate.picture==''" src="@/assets/profile.png"  alt="avatar" class="rounded-circle img-fluid" style="width: 150px;height:150px">
                            <img v-else :src="userToCreate.picture"  alt="avatar" class="rounded-circle img-fluid" style="width: 150px;height:150px">
                            <input type="file" class="form-control" id="image" @change="handleFileInputChange">
                        </div>
                        <div class="mb-3">
                            <label for="firstname" class="form-label d-block"><i class="fas fa-user"></i> Firstname</label>
                            <input type="text" class="form-control" id="firstname" placeholder="Enter firstname" v-model="userToCreate.firstname">
                        </div>
                        <div class="mb-3">
                            <label for="lastname" class="form-label d-block"><i class="fas fa-user"></i> Lastname</label>
                            <input type="text" class="form-control" id="lastname" placeholder="Enter lastname" v-model="userToCreate.lastname">
                        </div>
                        <div class="mb-3">
                            <label for="dateofbirth" class="form-label d-block"><i class="fas fa-cake-candles"></i> Date of birth</label>
                            <input type="date" class="form-control" id="dateofbirth" v-model="userToCreate.dateofbirth">
                        </div>
                        
                    </div>
                    <!-- /Partie gauche -->

                    <!-- Partie droite -->
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="email" class="form-label d-block"><i class="fa-regular fa-envelope"></i> Email</label>
                            <input type="text" class="form-control" id="email" placeholder="Enter email" v-model="userToCreate.email">
                        </div>
                        <div class="mb-3">
                            <label for="psw" class="form-label d-block"><i :class="showPWD?'fas fa-eye-slash' : 'fas fa-eye' " @click="show_hide_pwd"></i> Password</label>
                            <input :type="showPWD? 'text' : 'password' " class="form-control" id="psw" placeholder="Enter password" v-model="userToCreate.password">
                        </div>
                        <div class="mb-3">
                            <label for="gender" class="form-label d-block"><i class="fa-solid fa-venus-mars"></i> Gender</label>
                            <select name="gender" id="gender" class="form-select" v-model="userToCreate.gender">
                                <option value="MALE">Male</option>
                                <option value="FEMALE">Female</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="height" class="form-label d-block"><i class="fa-solid fa-arrows-up-down"></i> Height(cm)</label>
                            <input type="number" class="form-control" id="height" placeholder="Enter height" v-model="userToCreate.height">
                        </div>
                        <div class="mb-3">
                            <label for="weight" class="form-label d-block"><i class="fas fa-weight"></i> Weight(kg)</label>
                            <input type="number" class="form-control" id="weight" placeholder="Enter your weight" v-model="userToCreate.weight">
                        </div>
                        
                    </div>
                    <!-- /Partie droite -->
                    <div class="mb-3">
                        <label for="address" class="form-label d-block"><i class="fas fa-location-dot"></i> Address</label>
                        <textarea type="text" class="form-control" id="address" placeholder="Enter your address" v-model="userToCreate.address"></textarea>
                    </div>

                    <div class="mb-3" v-if="UserConnected && UserConnected.role =='ADMIN'">
                        <label for="role" class="form-label d-block"><i class="fa-solid fa-venus-mars"></i> Role</label>
                        <select name="gender" id="role" class="form-select" v-model="userToCreate.role" >
                            <option value="CLIENT" selected>CLIENT</option>
                            <option value="ADMIN">ADMIN</option>
                            <option value="COACH">COACH</option>
                        </select>
                    </div>

                    <!-- Error section -->
                    <div class="mb-3" v-if="errorForm.isError">
                        <p class="form-label d-block" style="color:red;">{{ errorForm.message }}</p>
                    </div>

                </div>
                
                  <button type="button" class="btn btn-success btn-block" @click="createAccount"><i class="fas fa-sign-in-alt"></i> Register</button>
              </form>
          </div>

          <!-- Modal Footer -->
          <div class="modal-footer bg-gris">
              <button type="submit" class="btn btn-danger" data-dismiss="modal" @click="closeModal"><i class="fas fa-times"></i> Cancel</button>
              <p>Already a member? <a href="#" @click="showLoginModal">Sign In</a></p>
          </div>
      </div>
  </div>
</template>

<script>
import UserService from '@/services/UserService';
import AuthService from '@/services/AuthService';
import {getCurrentInstance,ref} from 'vue';
export default {
  name :"CreateUserComponent",
  setup(){

      const instance = getCurrentInstance();

      const UserConnected=ref(null)
      const showPWD=ref(false);
      
      const userToCreate=ref({
        address:"",
        picture:"",//ici picture
        firstname:"",
        lastname:"",
        email:"",
        password:"",
        gender:"",
        role:"CLIENT",
        dateofbirth:null,
        height:null,
        weight:null,
      })

      const errorForm=ref({
        isError:false,
        message:""
      })

      function validatorForm(){
            // Réinitialiser les erreurs du formulaire
            errorForm.value = {
                isError: false,
                message: ""
            };

            // Vérifier si un fichier est sélectionné
            const fileInput = document.getElementById('image');
            //console.log("image : ",userToCreate.value.picture)
            if (fileInput.files.length > 0) {
                // Récupérer le type du fichier
                const fileType = fileInput.files[0].type;
                // Vérifier si le type de fichier est une image
                if (!fileType.startsWith('image/')) {
                    errorForm.value.isError = true;
                    errorForm.value.message = "Please select an image file.";
                    return false;
                }

                // Vérifier la taille de l'image sélectionnée
                const fileSize = fileInput.files[0].size; // Taille du fichier en octets
                const maxSize = 100 * 1024; // 100 ko en octets
                if (fileSize > maxSize) {
                    errorForm.value.isError = true;
                    errorForm.value.message = "Image size must be less than 100 KB.";
                    return false;
                }
            }


            // Vérifier si le champ firstname est vide
            if (!userToCreate.value.firstname) {
                errorForm.value.isError = true;
                errorForm.value.message = "Please enter your firstname.";
                return false;
            }

            // Vérifier si le champ lastname est vide
            if (!userToCreate.value.lastname) {
                errorForm.value.isError = true;
                errorForm.value.message = "Please enter your lastname.";
                return false;
            }

            // Vérifier si le champ email est vide
            if (!userToCreate.value.email) {
                errorForm.value.isError = true;
                errorForm.value.message = "Please enter your email address.";
                return false;
            }

            // Vérifier si l'email est au bon format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(userToCreate.value.email)) {
                errorForm.value.isError = true;
                errorForm.value.message = "Please enter a valid email address.";
                return false;
            }

            // Vérifier si le champ password est vide
            if (!userToCreate.value.password) {
                errorForm.value.isError = true;
                errorForm.value.message = "Please enter your password.";
                return false;
            }

            // Vérifier si le champ password a au moins 3 caractères
            if (userToCreate.value.password.length < 3) {
                errorForm.value.isError = true;
                errorForm.value.message = "Password must be at least 3 characters long.";
                return false;
            }

            // Vérifier si le champ gender est vide
            if (!userToCreate.value.gender) {
                errorForm.value.isError = true;
                errorForm.value.message = "Please select your gender.";
                return false;
            }

            // Vérifier si le champ dateofbirth est vide
            if (!userToCreate.value.dateofbirth) {
                errorForm.value.isError = true;
                errorForm.value.message = "Please enter your date of birth.";
                return false;
            }

            // Vérifier si l'utilisateur a au moins 8 ans
            const today = new Date();
            const birthDate = new Date(userToCreate.value.dateofbirth);
            const age = today.getFullYear() - birthDate.getFullYear();
            if (age < 8) {
                errorForm.value.isError = true;
                errorForm.value.message = "You must be at least 8 years old to register.";
                return false;
            }

            // Vérifier si le champ height est vide
            if (!userToCreate.value.height) {
                errorForm.value.isError = true;
                errorForm.value.message = "Please enter your height.";
                return false;
            }

            // Vérifier si la taille est comprise entre 90 et 300 cm
            if (userToCreate.value.height < 90 || userToCreate.value.height > 300) {
                errorForm.value.isError = true;
                errorForm.value.message = "Height must be between 90 and 300 cm.";
                return false;
            }

            // Vérifier si le champ weight est vide
            if (!userToCreate.value.weight) {
                errorForm.value.isError = true;
                errorForm.value.message = "Please enter your weight.";
                return false;
            }

            // Vérifier si le poids est compris entre 20 et 500 kg
            if (userToCreate.value.weight < 20 || userToCreate.value.weight > 500) {
                errorForm.value.isError = true;
                errorForm.value.message = "Weight must be between 20 and 500 kg.";
                return false;
            }

            // Vérifier si le champ addresse est vide
            if (!userToCreate.value.address) {
                errorForm.value.isError = true;
                errorForm.value.message = "Please enter your adrress.";
                return false;
            }

            // Si toutes les validations passent, le formulaire est valide
            return true;
      }


      function resetForm(){
        // Réinitialisez les valeurs du formulaire à leur état initial
        userToCreate.value = {
            address:"",
            picture: "",
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            gender: "",
            role: "CLIENT",
            dateofbirth: null,
            height: null,
            weight: null
        };
        // Réinitialisez les éventuelles erreurs du formulaire
        errorForm.value = {
            isError: false,
            message: ""
        };
      }

      function handleFileInputChange(event) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = function (e) {
                // Vérifier si le fichier est une image
                if (file.type.startsWith('image/')) {
                    userToCreate.value.picture = e.target.result; // Afficher l'image sélectionnée sur le profil
                } else {
                    // Réinitialiser la valeur de l'image si le fichier n'est pas une image
                    userToCreate.value.picture = "";
                    // Afficher un message d'erreur ou ignorer simplement le fichier non-image
                }
            };
            reader.readAsDataURL(file);
      }

      async function createAccount(){
        try{
            if(validatorForm()){
                //console.log(userToCreate.value)
                const res=await UserService.addUser(userToCreate.value);
                console.log(res.data.message)
                showLoginModal();
            }
        }catch(error){
            console.log(error.message)
            errorForm.value.isError=true;
            errorForm.value.message=error.message;
        }
      }

      function closeModal() {
        resetForm();
        instance.emit('closeModal');
      }

      function showLoginModal() {
        resetForm();
        instance.emit('showLoginModal');
      }

      function getCurrentUserConnected(){
        try{
            const user=AuthService.getConnectedUser();
            UserConnected.value=user;
        }catch(error){
            UserConnected.value=null;
        }
      }
      
      function show_hide_pwd(){
        showPWD.value=!showPWD.value;
      }
      
      return {
          closeModal,
          showLoginModal,
          userToCreate,
          errorForm,
          createAccount,
          resetForm,
          validatorForm,
          handleFileInputChange,
          UserConnected,
          getCurrentUserConnected,
          showPWD,
          show_hide_pwd,
      }
  }

}
</script>

<style scoped>
    .mb-3{
        text-align: left;
    }
</style>