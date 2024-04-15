<template>
    <div>
      <p>{{name}} a {{ age }} ans</p>
      <p>Le nom inversé est dans computed: {{ reversedName }}</p>
      <p>Le nom inversé est dans methods : {{ inverseName() }}</p>
      <input type="text" name="name" id="" v-model="name"> <br>
      <button @click="increment">Increment</button>
      <button @click="decrement">Decrement</button>
    </div>
</template>
  
<script>
  export default {
    name:"MyComponent1",

    data() {
      console.log("data() is called !")
      return {age: 0, name :"Torien",};
    },

    methods: {
      increment() { this.age++;},
      decrement() { this.age--;},
      inverseName() {return this.name.split('').reverse().join('');}
    },

    watch: {
      age(newValue, oldValue) {
        if (newValue <0) {alert("Valeur minimum aceptée est "+oldValue);this.age=oldValue}
      }
    },

    computed: {
      reversedName() { //nouveau attribut via l'attribut NAME
        return this.name.split('').reverse().join('');
      },
      fullName() {
        return this.name + ' ' + this.name;
      }
    },

    mounted() {
      console.log('Le composant est monté dans le DOM.');
    }
  };
</script>
  