<template>
    <form class="container mt-5">
      <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input type="text" class="form-control" id="name" name="name" placeholder="Enter your name" :value="messag">
        <input type="number" class="form-control" name="age" placeholder="Enter your age" :value="messag">
      </div>
      <button type="submit" class="btn btn-primary">Create</button>
    </form>
  </template>
  
  <script>
  export default {
    name:'UserForm',
    props: {
        message:String,
  },
  data() {
    return {
      messag: 'Hello Vue!'
    };
  }
  
  }
  </script>
  
  <style>
  
  </style>
  