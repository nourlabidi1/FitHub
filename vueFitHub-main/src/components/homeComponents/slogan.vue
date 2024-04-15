<template>
    <div class="button">
        <span class="line-1"></span>
        <span class="line-2"></span>
        <span class="line-3"></span>
        <span class="line-4"></span>
        <span class="line-5"></span>
        <span class="line-6"></span>
        See More
      </div>
      <!-- -->
  </template>
  
  <script>
  
  
  export default {
    name: "sloganComponent",
    methods: {
    
     
    }
  };
  </script>
  
  <style scoped>
  .button {
  position: relative;
  display: block;
  text-align: center;
  margin-right: auto;
  margin-left: auto;
  margin-top: 100px;
  height: 30px;
  width: 100%;
  max-width: 150px;
  line-height: 30px;
  font-family: 'Helvetica';

  overflow: hidden;

  font-size: 14px;
  color: #0047ba;
  text-transform: uppercase;
  cursor: pointer;
  background: #fff;  
  border-left: 2px solid #0047ba;
  span {
    position: absolute;
    transition: all 200ms ease-in-out;
    /* horizontal */
    &.line-1 {
      top: 0;
      left: 0;
      width: 110px;
      height: 2px;
      background: #0047ba;
      transform: translateX(-48px);
    }
    &.line-2 {
      bottom: 0;
      right: 0;
      width: 120px;
      height: 2px;
      background: #0047ba;
      transform: translateX(-25px);
    }

    &.line-3 {
      top: 0;
      right: 0;
      width: 40px;
      height: 2px;
      background: #0047ba;
      transform: translateX(20px);
    }
    &.line-4 {
      bottom: 0;
      right: 0;
      width: 100px;
      height: 2px;
      background: #0047ba;
      transform: translateX(95px);
    }
    &.line-5 {
     bottom: 0;
     right: 0;
     width: 2px;
     height: 50px;
     background: #0047ba;
     transform: translateY(0px);
    }
    &.line-6 {
     top: 0;
     right: 0;
     width: 2px;
     height: 8px;
     background: #0047ba;
     transform: translateY(-48px);
    }
  }
  &:hover {
    .line-1 {
      transform: translateX(0px);
    }
    .line-2 { 
      transform: translateX(-65px);
    }
    .line-3 {
      transform: translateX(60px);
    }
    .line-4 {
      transform: translateX(55px);
    }
    .line-5 {
      transform: translateY(44px);
    }
    .line-6 {
      transform: translateY(-2px);
    }
  }
}


.button-b {
  
}
   </style>