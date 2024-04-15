<template>

<section class="svg-container">
    
    
    <svg class="circle" xmlns="http://www.w3.org/2000/svg">
      <g>
        <ellipse class="background" ry="60" rx="60" cy="62.5" cx="62.5" stroke-width="2"/>
        <ellipse class="foreground" ry="60" rx="60" cy="62.5" cx="62.5" stroke-width="2"/>
        <line class="line line1" x1="52" y1="62" x2="74" y2="62" />
        <line class="line line2" x1="52" y1="62" x2="74" y2="62" />
      </g>
    </svg>
  </section>

  </template>
  
  <script>
  
  
  export default {
    name: "pluComponent",
    methods: {
    
     
    }
  };
  </script>
  
  <style scoped>
   @import url(https://fonts.googleapis.com/css?family=Source+Sans+Pro:300);

body {
  align-items: center;
  background: #222;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  
}

.svg-container {
  height: 124px;
  position: relative;
  width: 224px;
  
  h1 {
    color: #aaa;
    font-family: "Source Sans Pro";
    font-size: 1.2rem;
    left: 50%;
    letter-spacing: 4px;
    position: absolute;
    text-align: center;
    top: -60px;
    transform: translateX(-50%);
    width: 100%;
  }
}

.circle {
  height: 124px;
  width: 124px;
  
  .background {
    fill: transparent;
    stroke: #b7c81c;
    transition: all 200ms ease;
  }
  
  .foreground {
    fill: transparent;
    stroke-dasharray: 377;
    stroke-dashoffset: 377;
    stroke: #dca313;
    transform-origin: 50% 50%;
    transform: rotate(-270deg);
    transition: all 800ms ease;
  }
  
  .line {
    stroke-width: 2;
    stroke: #9ebc1a;
    transform-origin: 50% 50%;
    transition: all 500ms ease;
  }
  
  .line2 {
    transform: rotate(-90deg);
  }
  
  &:hover {
    cursor: pointer;
    
    .background {
      stroke: transparent;
    }
    
    .foreground {
      stroke-dashoffset: 0;
      transform: rotate(-90deg);
    }
    
    .line {
      stroke: #d0a41f;
    }
    
    .line {
      transform: rotate(180deg);
    }
    
    .line2 {
      transform: rotate(0);
    }
  }
}
   </style>