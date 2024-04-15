const { defineConfig } = require('@vue/cli-service')
const Dotenv = require('dotenv-webpack');

//Avant :
/*
module.exports = defineConfig({
  transpileDependencies: true
})*/




//Après : pour pouvoir utiliser .env  :npm install dotenv-webpack --save-dev

module.exports = {
  transpileDependencies: ['dotenv-webpack'], // Ajoutez ici les dépendances à transpiler
  configureWebpack: {
    plugins: [
      new Dotenv()
    ]
  }
};

