<template>
    <div class="container">
        <div class="main-body" v-if="UserConnected">
    
          <!-- Breadcrumb -->
          <nav aria-label="breadcrumb" class="main-breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><router-link to="/">Home</router-link></li>
              <li class="breadcrumb-item active" aria-current="page">{{ UserConnected.firstname }}</li>
            </ol>
          </nav>
          <!-- /Breadcrumb -->
          
          <!-- My profile -->
          <div class="row gutters-sm">
            <!-- Picture left -->
            <div class="col-md-4 mb-3">
              <div class="card">
                <div class="card-body">
                  <div class="d-flex flex-column align-items-center text-center">
                    <img v-if="UserConnected!=null && UserConnected.picture && !isEditingImag" :src="UserConnected.picture" alt="Admin" class="rounded-circle" width="150">
                    <img v-else-if="userToUpdate!=null && userToUpdate.picture && isEditingImag" :src="userToUpdate.picture" alt="picture" class="rounded-circle" width="150">
                    <img v-else src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" class="rounded-circle" width="150">
                    <div class="mt-3">
                      <h4><span class="lastname"> {{ UserConnected.lastname }}</span> {{UserConnected.firstname }} </h4>
                      <p class="text-secondary mb-1">{{ UserConnected.email }}</p>
                      <p class="text-muted font-size-sm">{{UserConnected.address}}</p>
                      <p v-if="errorForm.isError && isEditingImag" style="color:red;">{{ errorForm.message }}</p>

                      <button class="btn btn-primary" @click="onUpdateImage" v-if="isEditingImag && !errorForm.isError">Save</button>
                      <button class="btn btn-outline-warning" @click="cancelEditingImag" v-if="isEditingImag">Cancel</button>
                      
                      <input type="file" id="image" accept="image/*" style="display: none" ref="image" @change="changePicture">
                      <button class="btn btn-outline-primary" @click="$refs.image.click()" v-if="!isEditingImag">Change picture</button>

                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- /Picture left -->

            <!-- Infos  right -->
            <div class="col-md-8">
              <div class="card mb-3">
                <div class="card-body">
                  <!--Date of birth-->
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Date of birth</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                        <p>{{formatDate(UserConnected.dateofbirth)}}</p>
                        <input type="date" class="form-control custom-input" v-model="userToUpdate.dateofbirth" v-if="isEditing">
                    </div>
                  </div>
                  <hr>
                  <!--Weight-->
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Weight</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                      <p>{{UserConnected.weight}} kg </p>
                        <input type="number" name="weight" id="weight"  class="form-control custom-input"  v-model="userToUpdate.weight" v-if="isEditing">
                    </div>
                  </div>
                  <hr>
                  <!--Height-->
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Height</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                        {{UserConnected.height}} cm
                        <input type="number" name="height" id="height" v-model="userToUpdate.height" class="form-control custom-input" v-if="isEditing">
                    </div>
                  </div>
                  <hr>
                  <!--IMC-->
                  <div class="row" v-if="!isEditing">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Body Mass Index (BMI)</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                        {{ calculateIMC(UserConnected.weight, UserConnected.height) }}
                    </div>
                  </div>
                  <hr v-if="!isEditing">
                  <!--IMC Status-->
                  <div class="row" v-if="!isEditing">
                    <div class="col-sm-3">
                      <h6 class="mb-0">BMI Status</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                        {{ getBMIStatus(UserConnected.weight, UserConnected.height) }}
                    </div>
                  </div>
                  <hr v-if="!isEditing">

                  <!--Gender -->
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Sex</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                        {{UserConnected.gender}}
                        <select name="gender" id="gender" class="form-control custom-input" v-model="userToUpdate.gender" v-if="isEditing">
                          <option value="MALE">MALE</option>
                          <option value="FEMALE">FEMALE</option>
                        </select>
                    </div>
                  </div>
                  <hr>

                  <!-- Editing firsname & lastname-->
                  <div class="row" v-if="isEditing">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Username</h6>
                    </div>
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text" id="">First and last name</span>
                      </div>
                      <input type="text" class="form-control" v-model="userToUpdate.firstname">
                      <input type="text" class="form-control" v-model="userToUpdate.lastname">
                    </div>
                  </div>
                  <hr v-if="isEditing">

                  <!-- Editing mail adress-->
                  <div class="row" v-if="isEditing">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Mail</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                        <input type="email" name="email" id="email" v-model="userToUpdate.email" class="form-control custom-input" >
                    </div>
                  </div>
                  <hr v-if="isEditing">

                  <!-- Address editing -->
                  <div class="row" v-if="isEditing">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Adress</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                      <textarea name="" id="" cols="10" rows="2" v-model="userToUpdate.address" class="form-control custom-input" ></textarea>
                    </div>
                  </div>
                  <hr v-if="isEditing">

                  <!--Edit button-->
                  <div class="row" v-if="!isEditing">
                    <div class="col-sm-12">
                      <button class="btn btn-info "  @click="showEditingElements">Edit</button>
                    </div>
                  </div>

                  <!--Save  & cancel button -->
                  <div class="row" v-if="isEditing">
                    <div class="col-sm-12">
                      <p v-if="errorForm.isError" style="color:red;">{{ errorForm.message }}</p>
                      <button class="btn btn-info " @click="onUpdate">Save</button>
                      <button class="btn btn-danger "  @click="cancelEditing">Cancel</button>
                    </div>
                  </div>

                </div>
              </div>

              <!--<div class="row gutters-sm">
                <div class="col-sm-6 mb-3">
                  <div class="card h-100">
                    <div class="card-body">
                      <h6 class="d-flex align-items-center mb-3"><i class="material-icons text-info mr-2">assignment</i>Project Status</h6>
                      <small>Web Design</small>
                      <div class="progress mb-3" style="height: 5px">
                        <div class="progress-bar bg-primary" role="progressbar" style="width: 80%" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                      <small>Website Markup</small>
                      <div class="progress mb-3" style="height: 5px">
                        <div class="progress-bar bg-primary" role="progressbar" style="width: 72%" aria-valuenow="72" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                      <small>One Page</small>
                      <div class="progress mb-3" style="height: 5px">
                        <div class="progress-bar bg-primary" role="progressbar" style="width: 89%" aria-valuenow="89" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                      <small>Mobile Template</small>
                      <div class="progress mb-3" style="height: 5px">
                        <div class="progress-bar bg-primary" role="progressbar" style="width: 55%" aria-valuenow="55" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                      <small>Backend API</small>
                      <div class="progress mb-3" style="height: 5px">
                        <div class="progress-bar bg-primary" role="progressbar" style="width: 66%" aria-valuenow="66" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>-->



            </div>
            <!-- /Infos  right -->
          </div>
          <!--/My profile -->

          <!-- My Activities & My plnannings -->
          <div class="container-fluid">
            <div class="row">
                <!-- Sidebar à gauche avec filtres -->
                <div class="col-md-4">
                <form >
                    <div class="card">
                        <div class="card-header" style="background-color:rgb(211, 207, 207)">FILTERED BY:</div>
                        <div class="list-group list-group-flush mx-3 mt-4 list-unstyled">
                            <!-- My Activities  -->
                            <h4 @click="showElement('Activities')" class="gradient-text">
                                <span > <i class="fas fa-dumbbell"></i> My Activities </span>
                            </h4>
                            <div class="progress-bar"><div class="progress"></div></div>

                            <!-- My Planning  -->
                            <h4 @click="showElement('Planning')" class="gradient-text">
                                <span > <i class="fas fa-calendar-days"></i> My Planning </span>
                            </h4>
                            <div class="progress-bar"><div class="progress"></div></div>

                            <!-- My Subscruption  -->
                            <h4 @click="showElement('Subscription')" class="gradient-text">
                                <span > <i class="fas fa-bell"></i> My Subscription</span>
                            </h4>
                            <div class="progress-bar"><div class="progress"></div></div>


                        </div>
                        
                    </div>
                </form>
                </div>

                
                <!-- Liste d'activités à droite -->
                <div class="col-md-8">
                <div class="container list-activity">
                    <div class="card-body">
                    <div class="row">  
                        <!-- My activities -->
                        <div v-if="dataToShow==='Activities'" class="row activities">
                            <h2 style="color:blue;"> My activities &#x2B50;</h2>
                            <ActivityCardComponent v-for="activity in activities" :key="activity._id" :Activity="activity" @activityDeleted="fetchData"/>
                            <p v-if="activities.length === 0" style="color:white">You don't have any activity &#x1F61E;. Subscribe and start practicing <router-link to="/activities">activities!</router-link></p>
                        </div>

                        <!-- My Planning -->
                        <div v-else-if="dataToShow==='Planning'" class="planning">
                            <h2 style="color:blue"> My planning </h2>
                            <UserPlanningComponent></UserPlanningComponent>
                        </div>

                        <!-- My Subscription  -->
                        <div v-else-if="dataToShow==='Subscription'" class="subscription">
                            <h2> My Subscription </h2>
                            <p v-if="UserConnected.subscription ==''" style="">You are not subscribed &#x1F61E; . Please <router-link to="/offers">Subscribe</router-link> and then practice three activities of your choice.</p>
                        </div>
                    </div>
                    </div>
                </div>
                </div>

            </div>
          </div>
          <!-- /My Activities & My plnannings -->

        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
// Import SweetAlert
import Swal from 'sweetalert2';
import AuthService from '@/services/AuthService';
import UserService from '@/services/UserService';
import ActivityCardComponent from '@/components/activityComponents/ActivityCardComponent.vue';
import UserPlanningComponent from '@/components/userComponents/UserPlanningComponent.vue';
export default {
    name:"ProfileComponent",
    components:{
        ActivityCardComponent,
        UserPlanningComponent
    },
    setup(){
        const UserConnected=ref(null);
        const activities = ref([]); // Initialiser avec un tableau vide
        // Définissez votre référence plannings avec des exemples de données
        const plannings = ref([
        {
            title: 'Entraînement de musculation',
            date: '2024-04-01', // Date au format ISO8601 (AAAA-MM-JJ)
            activity_id: '123', // ID de l'activité liée (facultatif)
            description: 'Entraînement de musculation pour renforcer les muscles du haut du corps.'
        },
        {
            title: 'Séance de course à pied',
            date: '2024-04-05',
            activity_id: '456',
            description: "Séance de course à pied pour améliorer l'endurance."
        },
        // Ajoutez d'autres plannings au besoin
        ]);
        const router = useRouter(); // Initialisez le routeur

        const dataToShow =ref('Activities');

        const isEditing=ref(false);
        const isEditingImag=ref(false);

        const userToUpdate=ref({
          picture:"",
          dateofbirth:null,
          address:"",
          firstname:"",
          lastname:"",
          height:null,
          weight:null,
          email:"",
          //password:"",
          //role:"",
          gender:"",
        })

        const errorForm=ref({
                isError: false,
                message: ""
            })


        //get user in localStorage 
        function getCurrentUserConnected(){
            try{
                const user=AuthService.getConnectedUser();
                return user;
            }catch(error){
                UserConnected.value=null;
                // retourner vers home /
                router.push('/');
            }
        }

        async function fetchActivities(){
            try{
                const user= getCurrentUserConnected();
                const data= await UserService.getActivitiesByUser(user._id);
                activities.value=data;
            }catch(error){
                console.log(error.message)
            }
        }

        function showElement(element){
            dataToShow.value=element;
        }

        onMounted(getUserById);
        onMounted(fetchActivities);

        function calculateIMC(weight, height) {
            if (weight && height) {
                const heightInMeter = height / 100; // Convertir la taille en mètres
                const imc = weight / (heightInMeter * heightInMeter); // Calculer l'IMC
                return imc.toFixed(2); // Retourner l'IMC arrondi à deux décimales
            } else {
                return 'N/A'; // Si le poids ou la taille n'est pas défini, afficher 'N/A'
            }
        }


        function getBMIStatus(weight,height) {
            const bmi = calculateIMC(weight, height);
            if (bmi < 18.5) {
                return "Underweight"; // Poids insuffisant
            } else if (bmi >= 18.5 && bmi < 25) {
                return "Normal weight"; // Poids normal (sain)
            } else if (bmi >= 25 && bmi < 30) {
                return "Overweight"; // Surpoids
            } else if (bmi >= 30 && bmi < 35) {
                return "Obesity Class 1"; // Obésité de classe 1
            } else if (bmi >= 35 && bmi < 40) {
                return "Obesity Class 2 (Moderate)"; // Obésité de classe 2 (modérée)
            } else if(bmi >=40){
                return "Obesity Class 3 (Severe)"; // Obésité de classe 3 (sévère)
            }else{
                return "Not specified";
            }
        }

        function formatDate(date) {
            return new Date(date).toLocaleDateString('en-US');
        }

        // Update UserConnected
        async function getUserById(){
            try{
                const user = getCurrentUserConnected();
                const userFound = await UserService.getUserById(user._id);
                UserConnected.value=userFound;

                //Mettre à jour user dans local storage 
                AuthService.setUserConnected(userFound);
            }catch(error){
                //alert(error.message)
                console.log("Eurreur :", error.message)
                router.push("/")
            }
            
        }


        function showEditingElements(){
          if(UserConnected.value!==null){
            userToUpdate.value.firstname =UserConnected.value.firstname;
            userToUpdate.value.lastname =UserConnected.value.lastname;
            userToUpdate.value.email =UserConnected.value.email;
            userToUpdate.value.dateofbirth =UserConnected.value.dateofbirth;
            userToUpdate.value.address =UserConnected.value.address;
            userToUpdate.value.gender =UserConnected.value.gender;
            userToUpdate.value.weight =UserConnected.value.weight;
            userToUpdate.value.height =UserConnected.value.height;
            //userToUpdate.value.picture =UserConnected.value.picture;
          }
          isEditing.value=true;
        }

        function cancelEditing(){
          // Réinitialiser les erreurs du formulaire
          errorForm.value = {
                isError: false,
                message: ""
            };
          isEditing.value=false;
        }

        async function onUpdate(){
          try{ 
            if(validatorForm(userToUpdate)){
              const userData=userToUpdate.value;
              delete userData.picture;

              const response= await UserService.updateUser(UserConnected.value._id,userData);

              //Mettre à jour l'utilisateur connecter
              UserConnected.value=response.data;
              AuthService.setUserConnected(response.data);

              //cacher le formulaire 
              isEditing.value=false;

              Swal.fire({
                  title: 'Updated!',
                  text: 'Your profile has been updated.',
                  icon: 'success',
                  timer: 2000, // Durée en millisecondes (5000 ms = 5 secondes)
                  showConfirmButton: false, // Ne pas afficher le bouton de confirmation
              });
            }
          }catch(error){
            console.log(error.message)
            errorForm.value.isError=true;
            errorForm.value.message=error.message;
          }
        }

        async function onUpdateImage(){
          try{
            if(!userToUpdate.value.picture && userToUpdate.value.picture==""){
              throw new Error("Invalid Image");
            }else{
              console.log("image est : ",userToUpdate.value.picture)
              const response= await UserService.updateUser(UserConnected.value._id,{picture :userToUpdate.value.picture});

              //Mettre à jour l'utilisateur connecter
              UserConnected.value=response.data;
              AuthService.setUserConnected(response.data);

              // Reinitialiser
              isEditingImag.value=false;
            }
          }catch(error){
            Swal.fire({
                  title: 'Failed!',
                  text: error.message,
                  icon: 'error',
                  timer: 2000, // Durée en millisecondes (5000 ms = 5 secondes)
                  showConfirmButton: false, // Ne pas afficher le bouton de confirmation
              });
          }
        }

        function changePicture(event) {
            const file = event.target.files[0]; // Récupérer le fichier sélectionné
            const reader = new FileReader(); // Créer un objet FileReader pour lire le contenu du fichier

            isEditingImag.value = true;
            if (UserConnected.value != null)
                userToUpdate.value.picture = UserConnected.value.picture;

            // Créer une promesse pour la lecture du fichier
            const readFilePromise = new Promise((resolve) => {
                reader.onload = (event) => {
                    const imageData = event.target.result; // Récupérer les données de l'image en base64
                    // Valider l'image avec la fonction validatorFormImage
                    if (validatorFormImage(file)) {
                        // Si l'image est valide, l'affecter à userToUpdate.picture
                        userToUpdate.value.picture = imageData;
                        resolve();
                    } else {
                        userToUpdate.value.picture ='';
                        //reject(new Error("Invalid image ngiah eee"));
                        resolve();
                    }
                };
            });

            // Lire le contenu du fichier en tant que base64
            if (file) {
                reader.readAsDataURL(file);
            }

            // Retourner la promesse
            return readFilePromise;
        }


        function validatorFormImage(file) {
          errorForm.value.isError = false;
          errorForm.value.message = "";
            // Vérifier si un fichier est sélectionné
            if (!file) {
                errorForm.value.isError = true;
                errorForm.value.message = "Please select an image file.";
                userToUpdate.value.picture = "";
                //alert("dans validator :" + errorForm.value.isError)
                return false;
            }

            // Vérifier si le type de fichier est une image
            if (!file.type.startsWith('image/')) {
                errorForm.value.isError = true;
                errorForm.value.message = "Please select an image file.";
                userToUpdate.value.picture = "";
                //alert("dans validator :" + errorForm.value.isError)
                return false;
            }

            // Vérifier la taille de l'image sélectionnée
            const fileSize = file.size; // Taille du fichier en octets
            const maxSize = 100 * 1024; // 100 ko en octets
            if (fileSize > maxSize) {
                errorForm.value.isError = true;
                errorForm.value.message = "Image size must be less than 100 KB.";
                userToUpdate.value.picture = "";
                //alert("dans validator :" + errorForm.value.isError)
                return false;
            }

            //alert("dans validator :" + errorForm.value.isError)
            // Si toutes les conditions sont remplies, l'image est valide
            return true;
        }

        function cancelEditingImag(){
          // Réinitialiser les erreurs du formulaire
          errorForm.value = {
                isError: false,
                message: ""
            };
          isEditingImag.value=false;
          userToUpdate.value.picture="";
        }

      function validatorForm(userToCreate){
            // Réinitialiser les erreurs du formulaire
            errorForm.value = {
                isError: false,
                message: ""
            };

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

      


        return{
            UserConnected,
            getCurrentUserConnected,
            calculateIMC,
            getBMIStatus,
            formatDate,
            getUserById,
            activities,
            fetchActivities,
            showElement,
            dataToShow,
            plannings,
            showEditingElements,
            isEditing,
            isEditingImag,
            cancelEditing,
            onUpdateImage,
            onUpdate,
            changePicture,
            userToUpdate,
            validatorForm,
            errorForm,
            validatorFormImage,
            cancelEditingImag,
        }
    }
}
</script>

<style scoped>
    body{
        margin-top:20px;
        color: #1a202c;
        text-align: left;
        background-color: #e2e8f0;    
    }
    .main-body {
        padding: 15px;
        margin-top: 100px;
    }
    .card {
        box-shadow: 0 1px 3px 0 rgba(0,0,0,.1), 0 1px 2px 0 rgba(0,0,0,.06);
    }

    .card {
        position: relative;
        display: flex;
        flex-direction: column;
        min-width: 0;
        word-wrap: break-word;
        background-color: #fff;
        background-clip: border-box;
        border: 0 solid rgba(0,0,0,.125);
        border-radius: .25rem;
    }

    .card-body {
        flex: 1 1 auto;
        min-height: 1px;
        padding: 1rem;

    }

    .gutters-sm {
        margin-right: -8px;
        margin-left: -8px;
    }

    .gutters-sm>.col, .gutters-sm>[class*=col-] {
        padding-right: 8px;
        padding-left: 8px;
    }
    .mb-3, .my-3 {
        margin-bottom: 1rem!important;
    }

    .bg-gray-300 {
        background-color: #e2e8f0;
    }
    .h-100 {
        height: 100%!important;
    }
    .shadow-none {
        box-shadow: none!important;
    }
    .lastname{
        text-transform: uppercase;
    }

    /** For sidebar  */
  .gradient-text {
      background: linear-gradient(to right, blue, black);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      transition: background-color 0.3s; 
  }

  /* Style au survol de la souris */
  .gradient-text:hover {
    background: linear-gradient(to right, red, orange); /* Changer les couleurs de dégradé au survol */
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    cursor: pointer; /* Changer le curseur en pointeur au survol */
  }

  .progress-bar {
      width: 100%; /* largeur de la barre */
      height: 2.4px; /* hauteur de la barre */
      border: 1px solid #ccc; /* bordure */
      overflow: hidden; /* pour masquer le débordement de la barre intérieure */
  }

  .progress {
      width: 30%; /* largeur de progression */
      height: 100%; /* hauteur de la barre */
      background-color: blue; /* couleur de progression */
  }

  .custom-input {
      border: 1px solid #ced4da; /* Couleur de la bordure */
      border-radius: 0.25rem; /* Rayon des coins */
      padding: 0.375rem 0.75rem; /* Espace intérieur */
    }

    .activities{
      background-color: rgb(156, 153, 153);
      border-radius: 10px;
    }

    .planning{
      border-radius: 10px;
    }

    .subscription{
      border-radius: 10px;
    }

    


</style>