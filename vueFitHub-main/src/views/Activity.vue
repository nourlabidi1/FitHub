<template>
  <div >
    <!-- Partie haute -->
    <div class="jumbotron jumbotron-fluid bg-light text-dark position-relative" >
      <div class="container-fluid">
        <div class="row align-items-center" style="background-color:white"> <!-- Utilisation de align-items-center pour centrer verticalement -->
          <div class="col-sm-6" >
            <h1 class="text-center">Activities</h1> <!-- Ajout de la classe text-center pour centrer horizontalement -->
            <h5 class="text-center"><router-link to="/"> Home</router-link> > activities</h5> <!-- Ajout de la classe text-center pour centrer horizontalement -->
             <!-- Button to Open Modal -->
             <button type="button" class="btn btn-primary" style="border-radius: 20px;" @click="showModal = true" v-if="isAdmin()">Add an activity</button>
          </div>
          <div class="col-sm-6 position-relative">
            <!-- Insérer ici votre image de fond -->
            <img src="@/assets/workout.jpg" alt="Workout" class="img-fluid">
            <div class="blur-gradient"></div> <!-- Overlay gradient pour l'effet de flou progressif -->
          </div>
        </div>
      </div>
    </div>

    <!-- Modal d'ajout-->
    <div class="modal " :class="{ 'show': showModal }">
      <div class="modal-dialog modal-xl modal-dialog-scrollable ">
        <div class="transparent-background modal-content">
          <!-- Modal Header -->
          <div class="modal-header bg-gris ">
            <h4 class="modal-title">CREATE AN ACTIVITY</h4>
            <button type="button" class="close" @click="closeModal">&times;</button>
            <!-- Error message -->
            <div class="alert alert-danger mb-0 position-absolute start-50 translate-middle-x" v-if="!modalValidator.isValid" role="alert">
                <em>{{ modalValidator.error }}</em>
            </div>
          </div>

          <!-- Modal Body -->
          <div class="modal-body">
            <!-- Modal content -->
            <form class="form modal-form" >
              <div class="container-fluid">
                <div class="row">
                  <!-- Partie Gauche-->
                  <div class="col-sm-6" style="overflow-y: auto; max-height: 400px;">
                    <!-- Title -->
                    <div class="form-group row">
                      <label for="title" class="col-sm-3 col-form-label label-form">Title :</label>
                      <div class="col-sm-9">
                        <input v-model="selectedModals.title" type="text" class="form-control"  id="title" placeholder="Ex : Workout">
                      </div>
                    </div>

                    <!-- Image -->
                    <div class="form-group row">
                      <label for="title" class="col-sm-3 col-form-label label-form">Image :</label>
                      <div class="col-sm-9">
                        <input type="file" id="activity_image_id" accept="image/*" style="display: block" ref="image" @change="selectActivityImage">
                      </div>
                    </div>
                    <!-- Intensity -->
                    <div class="form-group row">
                      <label for="intensity" class="col-sm-3 col-form-label label-form">Intensity :</label>
                      <div class="col-sm-9">
                        <input v-model="selectedModals.intensity" type="text" class="form-control"  id="intensity" placeholder="Ex : Low to High">
                      </div>
                    </div>

                    <!-- Sportswear -->
                    <div class="form-group row">
                      <label for="sportswear" class="col-sm-4 col-form-label label-form">Sportswear:</label>
                      <div class="col-sm-8">
                        <input v-model="selectedModals.sportswear" type="text" class="form-control"  id="sportswear" placeholder="Ex : Comfortable clothing">
                      </div>
                    </div>

                    <!-- Material -->
                    <div class="form-group row">
                      <label for="material" class="col-sm-4 col-form-label label-form">Material used:</label>
                      <div class="col-sm-8">
                        <input v-model="selectedModals.material" type="text" class="form-control"  id="material" placeholder="Ex : Kettlebells, Slam Ball">
                      </div>
                    </div>

                    <!-- Duration -->
                    <div class="form-group row">
                      <label for="duration" class="col-sm-4 col-form-label label-form">Duration(mn) :</label>
                      <div class="col-sm-8">
                        <input v-model="selectedModals.duration" type="number" class="form-control"  id="duration" placeholder="Ex : 40 mins"> 
                      </div>
                    </div>

                    <!-- Age -->
                    <div class="form-group row">
                      <label for="age" class="col-sm-4 col-form-label label-form">Age :</label>
                      <div class="col-sm-4">
                        <input v-model="selectedModals.ageMin" type="number" class="form-control"  id="agemin" placeholder="age min "> 
                      </div>
                      <div class="col-sm-4">
                        <input v-model="selectedModals.ageMax" type="number" class="form-control"  id="agemax" placeholder="age max "> 
                      </div>
                    </div>

                    <!-- IMC -->
                    <div class="form-group row">
                      <label for="imc" class="col-sm-4 col-form-label label-form">IMC :</label>
                      <div class="col-sm-4">
                        <input v-model="selectedModals.imcMin" type="number" class="form-control"  id="imcmin" placeholder="imc min "> 
                      </div>
                      <div class="col-sm-4">
                        <input v-model="selectedModals.imcMax" type="number" class="form-control"  id="imcmax" placeholder="imc max "> 
                      </div>
                    </div>

                    <!-- Frequency -->
                    <div class="form-group row">
                      <label for="frequency" class="col-sm-4 col-form-label label-form">Frequency :</label>
                      <div class="col-sm-4">
                        <input v-model="selectedModals.frequencyMin" type="number" class="form-control"  id="frequencymin" placeholder="freq min "> 
                      </div>
                      <div class="col-sm-4">
                        <input v-model="selectedModals.frequencyMax" type="number" class="form-control"  id="frequencymax" placeholder="freq max "> 
                      </div>
                    </div>

                    <!-- Muscle Target -->
                    <div class="form-group row">
                      <label for="muscleTarget" class="col-sm-6 col-form-label label-form">Muscle Target:</label>
                      <div class="col-sm-12">
                        <textarea v-model="selectedModals.muscleTarget" name="muscleTarget" id="muscleTarget" cols="30" rows="2" class="form-control" placeholder="Ex : Full body or hips, legs and glutes."></textarea>
                      </div>
                    </div>

                    <!-- Recommandations -->
                    <div class="form-group row">
                      <label for="recommandations" class="col-sm-6 col-form-label label-form">Recommandations :</label>
                      <div class="col-sm-12">
                        <textarea v-model="selectedModals.recommandations" name="recommandations" id="recommandations" cols="30" rows="2" class="form-control" placeholder="Ex : Remember to bring a towel and a bottle of water, or flask"></textarea>
                      </div>
                    </div>



                  </div>
                  <!-- Partie Gauche-->

                  <!-- Partie Droite -->
                  <div class="col-sm-6" style="overflow-y: auto; max-height: 400px;">
                    <div class="list-group list-group-flush mx-3 mt-4 list-unstyled">
                      <!-- Collapse 1 : Category-->
                      <h3 @click="toggleCategoriesModal" class="gradient-text">
                          <span v-if="!showCategoriesModal">
                              <i class="fas fa-circle-plus"></i> Categories
                          </span>
                          <span v-else>
                              <i class="fas fa-circle-minus"></i> Categories
                          </span>
                      </h3>
                      <div class="progress-bar">
                          <div class="progress"></div>
                      </div>
                      <!-- Collapsed content -->
                      <ul v-if="showCategoriesModal" class="collapse show list-group list-group-flush">
                          <li class="list-group-item py-1  checkbox-label-container"><input type="radio" id="aquatic" value="Aquatic" v-model="selectedModals.category"> <label for="adult">Aquatic</label></li>
                          <li class="list-group-item py-1  checkbox-label-container"><input type="radio" id="cardio" value="Cardio" v-model="selectedModals.category"> <label for="child">Cardio</label></li>
                          <li class="list-group-item py-1  checkbox-label-container"><input type="radio" id="dance" value="Dance" v-model="selectedModals.category"> <label for="adult">Dance</label></li>
                          <li class="list-group-item py-1  checkbox-label-container"><input type="radio" id="strength" value="Strength" v-model="selectedModals.category"> <label for="child">Strength</label></li>
                          <li class="list-group-item py-1  checkbox-label-container"><input type="radio" id="kids_island" value="Kids Island" v-model="selectedModals.category"> <label for="adult">Kids Island</label></li>
                          <li class="list-group-item py-1 checkbox-label-container"><input type="radio" id="flexibility" value="Flexibility" v-model="selectedModals.category"> <label for="child">Flexibility</label></li>
                          <li class="list-group-item py-1 checkbox-label-container"><input type="radio" id="training" value="Training" v-model="selectedModals.category"> <label for="child">Training</label></li>
                      </ul>
                      <!-- Collapse 2 : Goals -->
                      <h3 @click="toggleObjectifModal" class="gradient-text">
                          <span v-if="!showObjectifModal">
                              <i class="fas fa-circle-plus"></i> Goals
                          </span>
                          <span v-else>
                              <i class="fas fa-circle-minus"></i> Goals
                          </span>
                      </h3>
                      <div class="progress-bar">
                          <div class="progress"></div>
                      </div>
                      <!-- Collapsed content -->
                      <ul v-if="showObjectifModal" class="collapse show list-group list-group-flush">
                          <li class="list-group-item py-1 checkbox-label-container"><input type="checkbox" id="weight_loss" value="goal1" v-model="selectedModals.goals"> <label for="weight_loss">Weight Loss</label></li>
                          <li class="list-group-item py-1 checkbox-label-container" ><input type="checkbox" id="muscle_flexibility_relaxation" value="goal2" v-model="selectedModals.goals"> <label for="muscle_flexibility_relaxation">Deep Muscle Strengthening, Flexibility, and Relaxation</label></li>
                          <li class="list-group-item py-1 checkbox-label-container"><input type="checkbox" id="unwind" value="goal3" v-model="selectedModals.goals"> <label for="unwind">Unwind</label></li>
                          <li class="list-group-item py-1 checkbox-label-container"><input type="checkbox" id="sculpt_tone" value="goal4" v-model="selectedModals.goals"> <label for="sculpt_tone">Muscle Building, Sculpting Silhouette</label></li>
                          <li class="list-group-item py-1 checkbox-label-container"><input type="checkbox" id="dance_train" value="goal5" v-model="selectedModals.goals"> <label for="dance_train">Train While Dancing</label></li>
                      </ul>

                      <!-- Collapse 3 : ageGroup -->
                      <h3 @click="togglePourQuiModal" class="gradient-text">
                          <span v-if="!showPourQuiModal">
                              <i class="fas fa-circle-plus"></i> For Whom
                          </span>
                          <span v-else>
                              <i class="fas fa-circle-minus"></i> For Whom
                          </span>
                      </h3>
                      <div class="progress-bar">
                          <div class="progress"></div>
                      </div>
                      <!-- Collapsed content -->
                      <ul v-if="showPourQuiModal" class="collapse show list-group list-group-flush">
                          <li class="list-group-item py-1 checkbox-label-container"><input type="checkbox" id="adults" value="Adult"  v-model="selectedModals.ageGroup"> <label for="adult">Adults</label></li>
                          <li class="list-group-item py-1 checkbox-label-container"><input type="checkbox" id="children" value="Children"  v-model="selectedModals.ageGroup"> <label for="child">Children</label></li>
                      </ul>

                      <!-- Collapse 4 : Who else -->
                      <h3 @click="toggleKindPersModal" class="gradient-text">
                          <span v-if="!showKindPersModal">
                              <i class="fas fa-circle-plus"></i> Who else ?
                          </span>
                          <span v-else>
                              <i class="fas fa-circle-minus"></i> Who else ?
                          </span>
                      </h3>
                      <div class="progress-bar">
                          <div class="progress"></div>
                      </div>
                      <!-- Collapsed content -->
                      <ul v-if="showKindPersModal" class="collapse show list-group list-group-flush">
                          <li class="list-group-item py-1 checkbox-label-container"><input type="checkbox" id="adults" value="People who already have good physical condition."  v-model="selectedModals.whoelse"> <label for="adult">Good physical condition</label></li>
                          <li class="list-group-item py-1 checkbox-label-container"><input type="checkbox" id="children" value="People looking to burn as many calories as possible in a great atmosphere"  v-model="selectedModals.whoelse"> <label for="child">Burning many Calories</label></li>
                          <li class="list-group-item py-1 checkbox-label-container"><input type="checkbox" id="children" value="Accessible to all, whatever the level"  v-model="selectedModals.whoelse"> <label for="child">Everyone</label></li>
                          <li class="list-group-item py-1 checkbox-label-container"><input type="checkbox" id="children" value="Accessible to overweight people because it has no impact."  v-model="selectedModals.whoelse"> <label for="child">Accessible to overweight people</label></li>
                          <li class="list-group-item py-1 checkbox-label-container"><input type="checkbox" id="children" value="Accessible to all, but mainly female audiences."  v-model="selectedModals.whoelse"> <label for="child">Everyone but mainly female audiences</label></li>
                          <li class="list-group-item py-1 checkbox-label-container"><input type="checkbox" id="children" value="Refines the silhouette."  v-model="selectedModals.whoelse"> <label for="child">Refines the silhouette.</label></li>
                          <li class="list-group-item py-1 checkbox-label-container"><input type="checkbox" id="children" value="People who want to strengthen their lower and upper body"  v-model="selectedModals.whoelse"> <label for="child">People who want to strengthen their lower and upper body</label></li>
                          <li class="list-group-item py-1 checkbox-label-container"><input type="checkbox" id="children" value="From beginner to very sporty, the weights being individualized."  v-model="selectedModals.whoelse"> <label for="child">From beginner to very sporty</label></li>
                      </ul>

                      <!-- Collapse 5 :Advantages -->
                      <h3 @click="toggleAdvantageModal" class="gradient-text">
                          <span v-if="!showAdvantagesModal">
                              <i class="fas fa-circle-plus"></i> Advantages
                          </span>
                          <span v-else>
                              <i class="fas fa-circle-minus"></i> Advantages
                          </span>
                      </h3>
                      <div class="progress-bar">
                          <div class="progress"></div>
                      </div>
                      <!-- Collapsed content -->
                      <ul v-if="showAdvantagesModal" class="collapse show list-group list-group-flush">
                          <li class="list-group-item py-1 checkbox-label-container"><input type="checkbox" id="adults" value="Improves strength, power and endurance."  v-model="selectedModals.advantages"> <label for="adult">Strength, power and endurance.</label></li>
                          <li class="list-group-item py-1 checkbox-label-container"><input type="checkbox" id="children" value="True surpassing oneself."  v-model="selectedModals.advantages"> <label for="child">True surpassing oneself.</label></li>
                          <li class="list-group-item py-1 checkbox-label-container"><input type="checkbox" id="children" value="Weightloss."  v-model="selectedModals.advantages"> <label for="child">Weightloss</label></li>
                          <li class="list-group-item py-1 checkbox-label-container"><input type="checkbox" id="children" value="Improved cardiovascular condition."  v-model="selectedModals.advantages"> <label for="child">Cardiovascular condition.</label></li>
                          <li class="list-group-item py-1 checkbox-label-container"><input type="checkbox" id="children" value="Explosiveness and muscle tone."  v-model="selectedModals.advantages"> <label for="child">Explosiveness and muscle tone.</label></li>
                          <li class="list-group-item py-1 checkbox-label-container"><input type="checkbox" id="children" value="Release, and increase in self-confidence."  v-model="selectedModals.advantages"> <label for="child">Self-confidence.</label></li>
                          <li class="list-group-item py-1 checkbox-label-container"><input type="checkbox" id="children" value="Huge calorie expenditure"  v-model="selectedModals.advantages"> <label for="child">Huge calorie expenditure</label></li>
                          <li class="list-group-item py-1 checkbox-label-container"><input type="checkbox" id="children" value="Releases endorphins, brings a feeling of natural euphoria."  v-model="selectedModals.advantages"> <label for="child">Releases endorphins</label></li>
                          <li class="list-group-item py-1 checkbox-label-container"><input type="checkbox" id="children" value="Improves posture and gives ultra-fast results."  v-model="selectedModals.advantages"> <label for="child">Improves posture and ultra-fast</label></li>
                          <li class="list-group-item py-1 checkbox-label-container"><input type="checkbox" id="children" value="Strengthens the immune system"  v-model="selectedModals.advantages"> <label for="child">Strengthens the immune system</label></li>
                          <li class="list-group-item py-1 checkbox-label-container"><input type="checkbox" id="children" value="Revitalizes internal organs"  v-model="selectedModals.advantages"> <label for="child">Revitalizes internal organs</label></li>
                          <li class="list-group-item py-1 checkbox-label-container"><input type="checkbox" id="children" value="Refines the legs, reduces cellulite"  v-model="selectedModals.advantages"> <label for="child">Refines the legs, reduces cellulite</label></li>
                      </ul>

                    </div>
                  </div>
                  <!-- Partie droite -->

                </div>
              </div>

            </form>
          </div>

         <!-- Modal Footer -->
        <div class="modal-footer bg-gris position-relative">
            <!-- Buttons -->
            <div class="container-fluid btn-group-modal" v-if="!isUpdating">
                <button type="button" class="btn btn-success btn-modal" @click="createActivity" style="border-radius: 20px; width: 100px;" >Add </button>
                <button type="button" class="btn btn-primary btn-modal" @click="resetModal" style="border-radius: 20px; width: 100px;" >Reset </button>
                <button type="button" class="btn btn-danger btn-modal" @click="closeModal" style="border-radius: 20px; width: 100px;" >Close</button>
            </div>
            <!-- Buttons Update -->
            <div class="container-fluid btn-group-modal" v-if="isUpdating">
                <button type="button" class="btn btn-success btn-modal" @click="updateActivity" style="border-radius: 20px; width: 100px;" >Update </button>
                <button type="button" class="btn btn-danger btn-modal" @click="closeModal" style="border-radius: 20px; width: 100px;" >Cancel</button>
            </div>
        </div>


        </div>
      </div>
    </div>

    <!-- Partie basse -->
    <div class="container-fluid">
      <div class="row">
        <!-- Sidebar à gauche avec filtres -->
        <div class="col-md-3">
          <form @submit.prevent="filter">
            <div class="card">
                <div class="card-header" style="background-color:rgb(211, 207, 207)">FILTERED BY:</div>
                <div class="list-group list-group-flush mx-3 mt-4 list-unstyled">
                    <!-- Collapse 1 -->
                    <h3 @click="toggleCategories" class="gradient-text">
                        <span v-if="!showCategories">
                            <i class="fas fa-circle-plus"></i> Categories
                        </span>
                        <span v-else>
                            <i class="fas fa-circle-minus"></i> Categories
                        </span>
                    </h3>
                    <div class="progress-bar">
                        <div class="progress"></div>
                    </div>
                    <!-- Collapsed content -->
                    <ul v-if="showCategories" class="collapse show list-group list-group-flush">
                        <li class="list-group-item py-1  checkbox-label-container"><input type="checkbox" id="aquatic" value="Aquatic" v-model="selectedFilters.category"> <label for="adult">Aquatic</label></li>
                        <li class="list-group-item py-1  checkbox-label-container"><input type="checkbox" id="cardio" value="Cardio" v-model="selectedFilters.category"> <label for="child">Cardio</label></li>
                        <li class="list-group-item py-1  checkbox-label-container"><input type="checkbox" id="dance" value="Dance" v-model="selectedFilters.category"> <label for="adult">Dance</label></li>
                        <li class="list-group-item py-1  checkbox-label-container"><input type="checkbox" id="strength" value="Strength" v-model="selectedFilters.category"> <label for="child">Strength</label></li>
                        <li class="list-group-item py-1  checkbox-label-container"><input type="checkbox" id="kids_island" value="Kids Island" v-model="selectedFilters.category"> <label for="adult">Kids Island</label></li>
                        <li class="list-group-item py-1 checkbox-label-container"><input type="checkbox" id="flexibility" value="Flexibility" v-model="selectedFilters.category"> <label for="child">Flexibility</label></li>
                        <li class="list-group-item py-1 checkbox-label-container"><input type="checkbox" id="training" value="Training" v-model="selectedFilters.category"> <label for="child">Training</label></li>
                    </ul>

                    <!-- Collapse 2 -->
                    <h3 @click="toggleObjectif" class="gradient-text">
                        <span v-if="!showObjectif">
                            <i class="fas fa-circle-plus"></i> Goals
                        </span>
                        <span v-else>
                            <i class="fas fa-circle-minus"></i> Goals
                        </span>
                    </h3>
                    <div class="progress-bar">
                        <div class="progress"></div>
                    </div>
                    <!-- Collapsed content -->
                    <ul v-if="showObjectif" class="collapse show list-group list-group-flush">
                        <li class="list-group-item py-1 checkbox-label-container"><input type="checkbox" id="weight_loss" value="goal1" v-model="selectedFilters.goals"> <label for="weight_loss">Weight Loss</label></li>
                        <li class="list-group-item py-1 checkbox-label-container" ><input type="checkbox" id="muscle_flexibility_relaxation" value="goal2" v-model="selectedFilters.goals"> <label for="muscle_flexibility_relaxation">Deep Muscle Strengthening, Flexibility, and Relaxation</label></li>
                        <li class="list-group-item py-1 checkbox-label-container"><input type="checkbox" id="unwind" value="goal3" v-model="selectedFilters.goals"> <label for="unwind">Unwind</label></li>
                        <li class="list-group-item py-1 checkbox-label-container"><input type="checkbox" id="sculpt_tone" value="goal4" v-model="selectedFilters.goals"> <label for="sculpt_tone">Muscle Building, Sculpting Silhouette</label></li>
                        <li class="list-group-item py-1 checkbox-label-container"><input type="checkbox" id="dance_train" value="goal5" v-model="selectedFilters.goals"> <label for="dance_train">Train While Dancing</label></li>
                    </ul>

                    

                    <!-- Collapse 3 -->
                    <h3 @click="togglePourQui" class="gradient-text">
                        <span v-if="!showPourQui">
                            <i class="fas fa-circle-plus"></i> For Whom
                        </span>
                        <span v-else>
                            <i class="fas fa-circle-minus"></i> For Whom
                        </span>
                    </h3>
                    <div class="progress-bar">
                        <div class="progress"></div>
                    </div>
                    <!-- Collapsed content -->
                    <ul v-if="showPourQui" class="collapse show list-group list-group-flush">
                        <li class="list-group-item py-1 checkbox-label-container"><input type="checkbox" id="adults" value="Adult"  v-model="selectedFilters.ageGroup"> <label for="adult">Adults</label></li>
                        <li class="list-group-item py-1 checkbox-label-container"><input type="checkbox" id="children" value="Children"  v-model="selectedFilters.ageGroup"> <label for="child">Children</label></li>
                    </ul>

                    <div style="height: 10px;"></div>
                    <!-- Boutons Reset et Filter -->
                    <div class="d-flex justify-content-between mt-3">
                      <button type="button" class="btn btn-primary" style="border-radius: 20px; width: 100px;" @click="filter">Filter</button>
                      <button type="button" class="btn btn-primary" style="border-radius: 20px; width: 100px;" v-show="hasSelectedFilters" @click="reset">Reset</button>
                    </div>
                </div>
                
            </div>
          </form>
        </div>

          
        <!-- Liste d'activités à droite -->
        <div class="col-md-9">
          <div class="container list-activity">
            <div class="card-body">
              <div class="row">
                  
                <!-- Exemple d'activité -->
                <ActivityCardComponent v-for="activity in activities" :key="activity._id" :Activity="activity" @activityDeleted="fetchData" @show-update-modal="showUpdateModal"/>
                
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Pagination -->
    <nav aria-label="Page navigation example" class="pagination-container">
      <ul class="pagination justify-content-center mt-4">
        <li class="page-item" :class="{ 'disabled': currentPage === 1 }">
          <a class="page-link" href="#" @click="prevPage">&laquo;</a>
        </li>
        <li class="page-item" v-for="page in totalPages" :key="page" :class="{ 'active': page === currentPage }">
          <a class="page-link" href="#" @click="goToPage(page)">{{ page }}</a>
        </li>
        <li class="page-item" :class="{ 'disabled': currentPage === totalPages }">
          <a class="page-link" href="#" @click="nextPage">&raquo;</a>
        </li>
      </ul>
    </nav>

    



  </div>
</template>

<script>
  import ActivityCardComponent from '../components/activityComponents/ActivityCardComponent.vue';
  import activityService from '../services/activityService';
  import { ref, computed, onMounted } from 'vue';
  import AuthService from '@/services/AuthService';
  import Swal from 'sweetalert2';

  export default {
    name: "ActivityComponent",
    components: {
      ActivityCardComponent
    },
    setup() {
      const showCategories = ref(false);
      const showObjectif = ref(false);
      const showPourQui = ref(false);
      const isUpdating =ref(false);
      const activitiesPerPage = 6;
      const currentPage = ref(1);
      const activities = ref([]); // Initialiser avec un tableau vide
      const selectedFilters = ref({
        category: [],
        goals: [],
        ageGroup: []
      });
      const UserConnected=ref(null);
      const selectedModals = ref({
        title:"",
        image:"",
        duration:"",
        intensity:"",
        sportswear:"",
        muscleTarget:"",
        recommandations:"",
        material:"",
        ageMin:null,
        ageMax:null,
        imcMin:null,
        imcMax:null,
        frequencyMin:"",
        frequencyMax:"",
        category:"",
        goals: [],
        ageGroup: [],
        advantages:[],
        whoelse:[]
      });

      const showModal=ref(false);
      const showCategoriesModal = ref(false);
      const showObjectifModal = ref(false);
      const showPourQuiModal = ref(false);
      const showAdvantagesModal = ref(false);
      const showKindPersModal = ref(false);
      const modalValidator=ref({isValid:true,error:""})

      function toggleCategories() {
        showCategories.value = !showCategories.value;
      }
      function toggleObjectif() {
        showObjectif.value = !showObjectif.value;
      }
      function togglePourQui() {
        showPourQui.value = !showPourQui.value;
      }

      async function fetchData() {
        try {
          const res = await activityService.getAllActivities();
          //console.log("Reponse ",res.data)
          // Assurez-vous que les données récupérées sont un tableau
          if (Array.isArray(res.data)) {
            activities.value = res.data;
          } else {
            console.error('Failed to fetch activities: Data is not an array');
          }
        } catch (error) {
          console.error('Failed to fetch activities:', error);
        }
      }

      onMounted(fetchData);

      const totalPages = computed(() => Math.ceil(activities.value.length / activitiesPerPage));

      function goToPage(page) {
        currentPage.value = page;
      }

      function nextPage() {
        if (currentPage.value < totalPages.value) {
          currentPage.value++;
        }
      }

      function prevPage() {
        if (currentPage.value > 1) {
          currentPage.value--;
        }
      }

      async function filter() {
        try {
            const res = await activityService.getAllActivitiesByFilter(
              selectedFilters.value.category,
              selectedFilters.value.goals,
              selectedFilters.value.ageGroup
            );

            // Mettre à jour les activités avec les données filtrées
            activities.value = res.data;
          } catch (error) {
            console.error('Failed to filter activities:', error);
          }
      }

      async function createActivity(){
        try {
          validateFormModal();
          if(modalValidator.value.isValid){

            //Save
            const res = await activityService.createActivity(selectedModals.value);
            //console.log("saving :",selectedModals.value)

            //Reset Modal Value
            resetModal();

            //Fetch data
            fetchData();

            //Close Modal
            closeModal();

            //console.log("Create Activity",res.data)
            Swal.fire({
                  title: 'Created !',
                  text: 'Activity '+ res.data.title +' has been added.',
                  icon: 'success',
                  timer: 2000, 
                  showConfirmButton: false,
                  timerProgressBar: true
              });
          }
          } catch (error) {
            //console.error('Failed to filter activities:', error);
            Swal.fire({
                  title: 'Oups !',
                  text: 'Failed : '+ error.message,
                  icon: 'error',
                  timer: 2000, 
                  showConfirmButton: true, 
              });
          }

      }

      function resetModal(){
        modalValidator.value.isValid = true;
        modalValidator.value.error = "";
        selectedModals.value = {
          title:"",
          image:"",
          duration:"",
          intensity:"",
          sportswear:"",
          muscleTarget:"",
          recommandations:"",
          material:"",
          ageMin:null,
          ageMax:null,
          imcMin:null,
          imcMax:null,
          frequencyMin:"",
          frequencyMax:"",
          category:"",
          goals: [],
          ageGroup: [],
          advantages:[],
          whoelse:[]
        };
      }

      function closeListModal(){
        showPourQuiModal.value=false;
        showAdvantagesModal.value=false;
        showKindPersModal.value=false;
        showObjectifModal.value=false;
        showCategoriesModal.value=false;
      }
      
      const hasSelectedFilters = computed(() => {
        return (
          selectedFilters.value.category.length > 0 ||
          selectedFilters.value.goals.length > 0 ||
          selectedFilters.value.ageGroup.length > 0
        );
      });

      function reset() {
        // Réinitialisez les filtres sélectionnés
        selectedFilters.value = {
          category: [],
          goals: [],
          ageGroup: []
        };
        // Rechargez les données
        fetchData();
      }

      const paginatedActivities = computed(() => {
        const startIndex = (currentPage.value - 1) * activitiesPerPage;
        const endIndex = startIndex + activitiesPerPage;
        // Vérifiez si activities.value est un tableau avant d'appeler slice
        if (Array.isArray(activities.value)) {
          return activities.value.slice(startIndex, endIndex);
        } else {
          // Si activities.value n'est pas un tableau, retournez un tableau vide
          return [];
        }
      });

      function closeModal() {
        showModal.value = false;
        isUpdating.value=false;
        closeListModal();
        resetModal()
      }

      function toggleCategoriesModal() {
        showCategoriesModal.value = !showCategoriesModal.value;
      }
      function toggleObjectifModal() {
        showObjectifModal.value = !showObjectifModal.value;
      }
      
      function togglePourQuiModal() {
        showPourQuiModal.value = !showPourQuiModal.value;
      }
      function toggleAdvantageModal() {
        showAdvantagesModal.value = !showAdvantagesModal.value;
      }
      function toggleKindPersModal() {
        showKindPersModal.value = !showKindPersModal.value;
      }



      function validateFormModal(){
          modalValidator.value.isValid = false;
          modalValidator.value.error = "";

          // Vérification du titre
          if(selectedModals.value.title.trim().length < 2){
              modalValidator.value.error = "Title field is required";
          }
          // Vérification de la taille de l'image
          else if (selectedModals.value.image && document.getElementById("activity_image_id").files[0] && document.getElementById("activity_image_id").files[0].size > 60 * 1024) { // Convertir 100KB en octets
              modalValidator.value.error = "Image size should not exceed 60KB";
          }
    
          // Vérification de l'intensité
          else if(selectedModals.value.intensity.trim().length < 2){
              modalValidator.value.error = "Intensity field is required";
          }
          // Vérification de la sportswear
          else if(selectedModals.value.sportswear.trim().length < 2){
              modalValidator.value.error = "Sportswear is required";
          }
          // Vérification de la material
          else if(selectedModals.value.material.trim().length < 2){
              modalValidator.value.error = "Material field is required";
          }
          // Vérification de la durée
          else if(selectedModals.value.duration === null || selectedModals.value.duration === ""){
              modalValidator.value.error = "Duration field is required";
          }
          
          // Vérification des valeurs minimales et maximales
          else if((selectedModals.value.ageMin===null || selectedModals.value.ageMax===null) || (selectedModals.value.ageMin !== null && selectedModals.value.ageMax !== null && selectedModals.value.ageMin > selectedModals.value.ageMax)){
              modalValidator.value.error = "Age  is required and Age maximum should be greater than age minimum";
          }
          else if((selectedModals.value.imcMin===null || selectedModals.value.imcMax===null) ||(selectedModals.value.imcMin !== null && selectedModals.value.imcMax !== null && selectedModals.value.imcMin > selectedModals.value.imcMax)){
              modalValidator.value.error = "IMC is required and IMC maximum should be greater than IMC minimum";
          }
          else if((selectedModals.value.frequencyMin===null || selectedModals.value.frequencyMax===null) ||(selectedModals.value.frequencyMin !== null && selectedModals.value.frequencyMax !== null && selectedModals.value.frequencyMin > selectedModals.value.frequencyMax)){
              modalValidator.value.error = "Frequency is required and Frequency maximum should be greater than frequency minimum";
          }
          // Vérification de la muscleTarget
          else if(selectedModals.value.muscleTarget.trim().length < 2){
              modalValidator.value.error = "Muscle Target is required";
          }

          // Vérification de la recommandations
          else if(selectedModals.value.recommandations.trim().length < 2){
              modalValidator.value.error = "Recommandations field is required";
          }
          // Vérification de la catégorie
          else if(selectedModals.value.category.trim().length < 2){
              modalValidator.value.error = "One category is required";
          }
          // Vérification des tableaux goals, ageGroup, advantages, whoelse
          else if(selectedModals.value.goals.length === 0){
              modalValidator.value.error = "At least one goal is required";
          }
          else if(selectedModals.value.ageGroup.length === 0){
              modalValidator.value.error = "At least one age group is required";
          }
          else if(selectedModals.value.advantages.length === 0){
              modalValidator.value.error = "At least one advantage is required";
          }
          else if(selectedModals.value.whoelse.length === 0){
              modalValidator.value.error = "At least one value for who else is required";
          }
          else {
              modalValidator.value.isValid = true;
          }
      }

      //retourner user ds localstorage
      function getCurrentUserConnected(){
            try{
                const user=AuthService.getConnectedUser();
                UserConnected.value = user;
            }catch(error){
                UserConnected.value=null;
            }
        }

      function isAdmin(){
        getCurrentUserConnected();
        return (UserConnected.value && (UserConnected.value.role== 'SUPER_ADMIN' || UserConnected.value.role== 'ADMIN'));
      }

      //Select Image and Convert It in base64
      function selectActivityImage(event) {
        const file = event.target.files[0]; // Récupérer le fichier sélectionné
        const reader = new FileReader(); // Créer un objet FileReader pour lire le contenu du fichier

        reader.onload = (event) => {
            const imageData = event.target.result; // Récupérer les données de l'image en base64
            selectedModals.value.image = imageData; // Affecter les données de l'image à selectedModals.value.image
            //console.log("Image : ",selectedModals.value.image)
        };

        // Lire le contenu du fichier en tant que base64
        if (file) {
            reader.readAsDataURL(file);
        }
        else{//Aucun image selectionné
          selectedModals.value.image=""
        }
      }


      //Updating Activity
      function showUpdateModal(Activity){
        selectedModals.value=Activity;
        //console.log("Modal : ",selectedModals.value._id)
        showModal.value=true;
        isUpdating.value=true
      }

      async function updateActivity(){
        try {
          validateFormModal();
          if(modalValidator.value.isValid){
            const id =selectedModals.value._id
            var Activity_to_update =selectedModals.value;
            delete Activity_to_update._id;

            //console.log(Activity_to_update);
            //update
            const res = await activityService.updateActivity(id, Activity_to_update);

            //Fetch data
            fetchData();

            //Close Modal
            closeModal();

            //console.log("Create Activity",res.data)
            Swal.fire({
                  title: 'Updated !',
                  text: 'Activity '+ res.data.title +' has been updated.',
                  icon: 'success',
                  timer: 2000, 
                  showConfirmButton: false,
                  timerProgressBar: true
              });
          }
          } catch (error) {
            //console.error('Failed to filter activities:', error);
            Swal.fire({
                  title: 'Oups !',
                  text: 'Failed : '+ error.message,
                  icon: 'error',
                  timer: 2000, 
                  showConfirmButton: true, 
              });
          }
      }



      return {
        showCategories,
        showObjectif,
        showPourQui,
        toggleCategories,
        toggleObjectif,
        togglePourQui,
        selectedFilters,
        activities: paginatedActivities,
        totalPages,
        currentPage,
        goToPage,
        nextPage,
        prevPage,
        filter,
        hasSelectedFilters,
        reset,
        
        //Modal
        closeModal,
        showModal,
        selectedModals,
        showCategoriesModal ,
        showObjectifModal,
        showPourQuiModal,
        showAdvantagesModal,
        showKindPersModal,
        toggleCategoriesModal,
        toggleObjectifModal,
        togglePourQuiModal,
        toggleKindPersModal,
        toggleAdvantageModal,
        createActivity,
        resetModal,
        modalValidator,
        validateFormModal,
        closeListModal,
        fetchData,

        //UserConnected
        UserConnected,
        isAdmin,
        getCurrentUserConnected,

        //Image
        selectActivityImage,

        //Update Modal
        showUpdateModal,
        updateActivity,
        isUpdating

      };
    }
  };
</script>


<style scoped>
/* Ajoutez ici vos styles personnalisés si nécessaire */
.list-unstyled{
      text-align: left;
  }

   /* Styles pour les cases à cocher */
   input[type="checkbox"] {
      transform: scale(1.5); /* Ajustez la valeur pour augmenter ou diminuer la taille de la case à cocher */
      margin-right: 5px; /* Ajustez la marge droite pour créer de l'espace entre la case à cocher et l'étiquette */
  }

  /* Réduction de l'espace entre les éléments <li> */
  .list-group-item li {
      margin-bottom: 5px; /* Ajustez la valeur pour réduire l'espace entre les éléments <li> */
  }


  /* Overlay gradient pour l'effet de flou progressif */
  .blur-gradient {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%; /* Pleine largeur */
      height: 100%;
      background: linear-gradient(to left, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 70%, rgba(255, 255, 255, 1) 100%); /* Gradient transparent à flou opaque de gauche à droite */
      pointer-events: none; /* Permet aux éléments de cliquer à travers */
  }

  .gradient-text {
      background: linear-gradient(to right, blue, black);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
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

  .checkbox-label-container {
      display: flex;
      align-items: flex-start;
  }
  .checkbox-label-container input[type="checkbox"] {
      margin-top: 5px; /* Ajustez selon votre besoin */
  }
  .checkbox-label-container label {
      margin-left: 5px; /* Ajustez selon votre besoin */
  }

  .pagination-container {
    padding-right: 1px;
    padding-left:70%;
  }

  /* Modal style */
  .modal {
    display: none;
    position: fixed;
    z-index: 1050;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .modal-content {
    position: relative;
    margin: 10% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    background-color: #fff;
  }

  .show {
    display: block !important;
  }

  .label-form{
    text-align: left;
    color: blue;
  }

  .transparent-background {
    background-color: transparent !important;
  }

  .modal-form{
    padding: 10px 0px;
    border-radius: 10px;
    background-color:white;
  }

  .bg-gris{
    border-radius: 20px;
    background-color:white;
  }
  .btn-modal{
    margin-left: 10px;
  }
</style>
