<template>
    <div>
      <p>{{ name }} a {{ age }} ans</p>
      <p>Le nom inversé est dans computed: {{ reversedName }}</p>
      <p>Le nom inversé est dans methods : {{ inverseName() }}</p>
      <input type="text" name="name" id="" v-model="name"> <br>
      <button @click="increment">Increment</button>
      <button @click="decrement">Decrement</button>
    </div>
  </template>
  
  <script>
  import { ref, computed, watch, onMounted } from 'vue';
  
  export default {
    name: "MyComponent",
    setup() {
      // Définition des variables réactives
      const age = ref(0);
      const name = ref("Torien");
  
      // Méthodes
      function increment() {age.value++;}
      function decrement() {age.value--;}
      function inverseName() {return name.value.split('').reverse().join('');}
  
      // Propriété calculée
      const reversedName = computed(() => name.value.split('').reverse().join(''));
  
      // Watcher
      watch(age, (newValue, oldValue) => {
        if (newValue < 0) {
          alert("Valeur minimum acceptée est " + oldValue);
          age.value = oldValue;
        }
      });
  
      // Montage
      onMounted(() => {console.log('Le composant est monté dans le DOM.');});
  
      // Retourner les variables et méthodes à exposer dans le template
      return {
        age,
        name,
        increment,
        decrement,
        inverseName,
        reversedName
      };
    }
  };
  </script>
  