<template>
    <div >
      <ejs-schedule height="500px" currentView="Month" :eventSettings="appointmentData"></ejs-schedule>
    </div>
</template>
  
<script>
  import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda } from "@syncfusion/ej2-vue-schedule";
  
  export default {
    name:"UserPlanningComponent",
    components: {
      'ejs-schedule': ScheduleComponent
    },
    provide : {
      schedule : [Day, Week, WorkWeek, Month, Agenda]
    },
    data() {
    return {
      selectedCoach: null,
      selectedActivity: null,
      appointmentData: {
        dataSource: [
         
          {
            Subject: 'Boxing',
            StartTime: new Date(2024, 3, 3, 9, 0),
            EndTime: new Date(2024, 3, 3, 10, 0)
          },
          {
            Subject: 'Musculation',
            StartTime: new Date(2024, 3, 10, 10, 30),
            EndTime: new Date(2024, 3, 10, 11, 0)
          },
          {
            Subject: 'Meditation',
            StartTime: new Date(2024, 3, 10, 10, 30),
            EndTime: new Date(2024, 3, 10, 11, 0)
          }
        ]
      },
    };
  },
  methods: {
    }
  };
</script>
  
<style scoped>

</style>