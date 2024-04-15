<template>
  <!-- Navbar -->
  <nav :class="{'navbar-transparent': isNavbarTransparent, 'navbar-solid': !isNavbarTransparent}" class="navbar navbar-expand-lg navbar-light bg-body-tertiary fixed-top">
    <!-- Container wrapper -->
    <div class="container-fluid">
      <!-- Toggle button -->
      <button
        class="navbar-toggler"
        type="button"
        data-mdb-toggle="collapse"
        data-mdb-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i class="fas fa-bars"></i>
      </button>

      <!-- Collapsible wrapper -->
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <!-- Navbar brand -->
        <router-link to="/">
            <img src="@/assets/fithub_logo.jpeg" alt="FIT HUB Logo" class="navbar-logo">
        </router-link>
        <!-- Left links -->
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <!--<router-link to="/clubs" class="nav-link">Clubs</router-link>-->
          </li>
          <li class="nav-item">
            <router-link to="/activities" class="nav-link">Activities</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/offers" class="nav-link">Offers</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/planning" class="nav-link">Planning</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/carezone" class="nav-link">careZone</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/blogs" class="nav-link">Blogs</router-link>
          </li>
        </ul>
        <!-- Left links -->
      </div>
      <!-- Collapsible wrapper -->

      <!-- Right elements -->
      <div class="d-flex align-items-center">

        <!-- Login button -->
        <div class="dropdown" v-if="!isloggedIn()">
          <button
            class="btn btn-primary"
            @click="typeModalShown='login';showModal = true;"
          >
           Connect
          </button>
        </div>
        
        <!-- Notifications -->
        <div class="dropdown" v-if="isConnected">
          <a
            class="text-reset me-3 dropdown-toggle hidden-arrow"
            href="#"
            id="navbarDropdownMenuLink"
            role="button"
            data-mdb-toggle="dropdown"
            aria-expanded="false"
          >
            <i class="fas fa-bell"></i>
            <span class="badge rounded-pill badge-notification bg-danger">1</span>
          </a>
          <ul
            class="dropdown-menu dropdown-menu-end"
            aria-labelledby="navbarDropdownMenuLink"
          >
            <li>
              <a class="dropdown-item" href="#">Some news</a>
            </li>
            <li>
              <a class="dropdown-item" href="#">Another news</a>
            </li>
            <li>
              <a class="dropdown-item" href="#">Something else here</a>
            </li>
          </ul>
        </div>
        <!-- Avatar -->
        <div class="dropdown" v-if="isConnected">
          <a
            class="dropdown-toggle d-flex align-items-center hidden-arrow"
            href="#"
            id="navbarDropdownMenuAvatar"
            role="button"
            data-mdb-toggle="dropdown"
            aria-expanded="false"
          >
            <img v-if="UserConnected && UserConnected.picture!==''"
              :src="UserConnected.picture "
              class="rounded-circle"
              height="25"
              alt="Profile"
              loading="lazy"
            />
            <img v-else
              src="@/assets/login.png"
              class="rounded-circle"
              height="25"
              alt="Profile"
              loading="lazy"
            />
          </a>
          <ul
            class="dropdown-menu dropdown-menu-end"
            aria-labelledby="navbarDropdownMenuAvatar"
          >
            <li v-if="UserConnected !== null">
              <router-link class="dropdown-item username" to="/profile">{{UserConnected.firstname}}</router-link>
            </li>
            <li v-if="UserConnected == null">
              <router-link class="dropdown-item" to="">My profile</router-link>
            </li>
            
            <li>
              <router-link class="dropdown-item" to="" @click="logout">Logout</router-link>
            </li>
          </ul>
        </div>
      </div>
      <!-- Right elements -->

    </div>
    <!-- Container wrapper -->
  </nav>
  <!-- Navbar -->

 <!-- Modal -->
<div class="container">
    <div class="modal" :class="{ 'show': showModal }">
        <LoginComponent  @closeModal="closeModal" @showRegisterModal="showRegisterModal" @showForgotPwdModal="showForgotPwdModal" v-if="typeModalShown=='login'"></LoginComponent>
        <ForgotPwdComponent  @closeModal="closeModal" @showLoginModal="showLoginModal" v-else-if="typeModalShown=='forgot_pwd'"/>
        <CreateUserComponent @closeModal="closeModal"  @showLoginModal="showLoginModal" v-else-if="typeModalShown=='register'"/>
    </div>
</div>

</template>

<script>

import LoginComponent from '../components/userComponents/LoginComponent.vue';
import ForgotPwdComponent from '../components/userComponents/ForgotPwdComponent.vue';
import CreateUserComponent from '../components/userComponents/CreateUserComponent.vue';
import AuthService from '@/services/AuthService';


export default {
  name: "NavBar2Component",
  components:{
    LoginComponent,
    ForgotPwdComponent,
    CreateUserComponent,
  },
  data() {
    return {
      isNavbarTransparent: true,
      showModal:false,
      typeModalShown:"login",
      isConnected:localStorage.getItem('token') !== null,
      defautUserPicture:"@/assets/picture.jpeg",
      UserConnected:{
        type:Object,
      }
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    //localStorage.clear();
    this.isloggedIn();
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      const top = window.scrollY;
      if (top === 0) {
        this.isNavbarTransparent = true;
      } else {
        this.isNavbarTransparent = false;
      }
    },
    closeModal() {
        this.showModal = false;
    },
    showLoginModal(){
      this.typeModalShown='login';
    },
    showRegisterModal(){
      this.typeModalShown='register';
    },
    showForgotPwdModal(){
      this.typeModalShown='forgot_pwd';
    },
    isloggedIn(){
      this.isConnected= AuthService.isAuthenticated()
      this.getCurrentUserConnected()
      return this.isConnected
    },
    async logout(){
      try{
        this.isloggedIn()
        const user=AuthService.getConnectedUser();
        await AuthService.logout(user._id);
        this.isConnected=this.isloggedIn()
        this.$router.push('/')
      }catch(error){
        alert(error.message)
      }
    },

    getCurrentUserConnected(){
      try{
        const user=AuthService.getConnectedUser();
        this.UserConnected=user;
      }catch(error){
        this.UserConnected=null;
      }
    }


  },
};
</script>

<style scoped>
  /* Color of the links BEFORE scroll */
  .navbar-scroll .nav-link,
  .navbar-scroll .navbar-toggler-icon,
  .navbar-scroll .navbar-brand {
    color: #262626;
  }

  /* Color of the navbar BEFORE scroll */
  .navbar-scroll {
    background-color: #ffc017;
  }

  /* Color of the links AFTER scroll */
  .navbar-scrolled .nav-link,
  .navbar-scrolled .navbar-toggler-icon,
  .navbar-scroll .navbar-brand {
    color: #262626;
  }

  /* Color of the navbar AFTER scroll */
  .navbar-scrolled {
    background-color: #fff;
  }

  /* An optional height of the navbar AFTER scroll */
  .navbar.navbar-scroll.navbar-scrolled {
    padding-top: auto;
    padding-bottom: auto;
  }
  .navbar-brand {
    font-size: unset;
    height: 3.5rem;
  }

  .navbar-logo {
        width: 120px; /* Largeur de l'image */
        height: 50px; /* Hauteur automatique pour maintenir les proportions */
    }

    .navbar-transparent {
    background-color: transparent !important;
  }

  .navbar-solid {
    background-color: #ffffff !important; /* Définir votre couleur de fond solide ici */
  }


  /* Modal style */
    .modal {
      display: none;
      /*position: fixed;*/
      z-index: 1050;
      left: 0;
      top: 0;
      /*width: 100%;
      height: 100%;*/
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

    .username{
      color :blue;
      text-transform: uppercase;
    }
</style>
