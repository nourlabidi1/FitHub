<template>
  <div class="planning">
    <div class="jumbotron jumbotron-fluid bg-light text-dark position-relative">
      <div class="container-fluid">
        <div class="row align-items-center" style="background-color:white">
          <div class="col-sm-6">
            <h1 class="text-center">Planning</h1>
            <h5 class="text-center"><router-link to="/"> Home</router-link> > Planning</h5>
          </div>
          <div class="col-sm-6 position-relative">
            <img src="@/assets/coach.jpg" alt="Workout" class="img-fluid">
            <div class="blur-gradient"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="container mt-4">
      <div class="row align-items-center justify-content-center">
        <div class="col-md-4">
          <div class="mb-3">
            <label for="coachSelect" class="form-label"><strong>Choisir un coach :</strong></label>
            <select class="form-select" id="coachSelect" v-model="selectedCoach" @change="handleSelectionChange">
              <option selected disabled>Sélectionner un coach</option>
              <option>Siwar</option>
              <option>Torien</option>
              <option>Nour</option>
            </select>
          </div>
        </div>
        <div class="col-md-4">
          <div class="mb-3">
            <label for="activitySelect" class="form-label"><strong>Choisir une activité :</strong></label>
            <select class="form-select" id="activitySelect" v-model="selectedActivity" @change="fetchData">
              <option selected disabled>Sélectionner une activité</option>
              <option>Boxing</option>
              <option>Zumba</option>
              <option>Musculation</option>
            </select>
          </div>
        </div>
        <p v-if="!selectedCoach && !selectedActivity"><strong>Pour afficher le planning, veuillez sélectionner un coach et/ou une activité.</strong></p>
      </div>
      <div class="col-md-4 text-center">
        <img src="@/assets/agenda.png" alt="Agenda" class="img-fluid agenda-image">
      </div>
    </div>

    <div v-if="showSchedule">
      <div id="schedule" style="margin-top: 40px;">
        <ejs-schedule v-if="showSchedule" height="550px" currentView="Month" :eventSettings="appointmentData"></ejs-schedule>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda } from "@syncfusion/ej2-vue-schedule";

export default {
  name: "PlanningComponent",
  components: {
    'ejs-schedule': ScheduleComponent
  },
  provide: {
    schedule: [Day, Week, WorkWeek, Month, Agenda]
  },
  data() {
    return {
      selectedCoach: null,
      selectedActivity: null,
      appointmentData: {
        dataSource: []
      },
      showSchedule: false
    };
  },
  methods: {
    
    async fetchData() {
      if(this.selectedCoach || this.selectedActivity){
        
        try {
        let response;
        if (this.selectedCoach) {
          
          response = await axios.get(`http://localhost:3000/api/fithub/planning/${this.selectedCoach}`);
          
        } else if (this.selectedActivity) {
          response = await axios.get(`http://localhost:3000/api/fithub/planning/activite/${this.selectedActivity}`);
        }

        if (response && response.data && response.data.length > 0) {
          const adaptedData = response.data.map(item => ({
            Subject: item.id_activite,
            StartTime: new Date(item.date_debut),
            EndTime: new Date(item.date_fin)
          }));
          this.appointmentData.dataSource = adaptedData;
         
          this.showSchedule = true;
        } else {
          console.error('Aucune donnée de planning trouvée.');
        }
      } catch (error) {
        console.error(error);
      }
    }

      }
      
  },
  watch: {
    selectedCoach: 'fetchData',
    selectedActivity: 'fetchData'
  },
  created() {
    // Appel fetchData lors du chargement initial
    this.fetchData();
  }
};
</script>



<style scoped>

@import '../../node_modules/@syncfusion/ej2-base/styles/material.css';
@import '../../node_modules/@syncfusion/ej2-buttons/styles/material.css';
@import '../../node_modules/@syncfusion/ej2-calendars/styles/material.css';
@import '../../node_modules/@syncfusion/ej2-dropdowns/styles/material.css';
@import '../../node_modules/@syncfusion/ej2-inputs/styles/material.css';
@import '../../node_modules/@syncfusion/ej2-navigations/styles/material.css';
@import '../../node_modules/@syncfusion/ej2-popups/styles/material.css';
@import '../../node_modules/@syncfusion/ej2-vue-schedule/styles/material.css';
/* Vos styles CSS existants */
.blur-gradient {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to left, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 70%, rgba(255, 255, 255, 1) 100%);
  pointer-events: none;
}
.planning {
  background-color: rgb(243, 240, 240);
}
.agenda-image {
  width: 100px;
  height: auto;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 580px;
}
</style>
