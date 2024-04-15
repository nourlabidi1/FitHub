// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import HomeComponent from '../views/Home.vue';
import LoginComponent from '../views/Login.vue';
import RegisterComponent from '../views/Register.vue';
import ActivityComponent from '../views/Activity.vue';
import NotFoundComponent from '../views/404Component.vue';
import ActivityInfoComponent from '../views/ActivityInfo.vue'
import ProfileComponent from '../views/Profile.vue';
import ClubComponent from '../views/Club.vue';
import OffreComponent from '../views/Offer.vue';
import BlogComponent from '../views/Blog.vue';
import PlanningComponent from '../views/Planning';
import payementComponent from '../views/payement.vue';
import CareZoneComponent from '../views/CareZone';
import ResetPassword from '../views/ResetPassword';
import UserListComponent from '../components/userComponents/UserListComponent.vue'

import AuthService from '../services/AuthService';

const routes = [
  {
    path: '/',
    component: HomeComponent
  },
  {
    path: '/pay',
    component: payementComponent
  },
  {
    path: '/login',
    component: LoginComponent
  },
  {
    path: '/register',
    component: RegisterComponent
  },
  {
    path: '/offers',
    component: OffreComponent
  },
  {
    path: '/planning',
    component: PlanningComponent
  },
  {
    path: '/carezone',
    component: CareZoneComponent
  },
  {
    path: '/blogs',
    component: BlogComponent
  },
  {
    path: '/profile',
    component: ProfileComponent,
    meta: { requiresAuth: true } // AuthGuard
  },
  {
    path: '/clubs',
    component: ClubComponent,
  },
  {
    path: '/activities',
    component: ActivityComponent,
    //meta: { requiresAuth: true } // AuthGuard
  },
  {
    path: '/activities/:title', // Définissez le paramètre de l'ID dans l'URL
    component: ActivityInfoComponent // Utilisez le composant ActivityDetailComponent pour cette route
  },
  {
    path: '/reset-password/:pwd(.*)',
    component: ResetPassword,
    props: true // Activer le passage des paramètres d'URL en tant que props au composant
  },
  {
    path: '/users',
    component: UserListComponent,
  },
  {
    path: '/PageNotFound',//Corriger
    component: NotFoundComponent,
  },

  {
    path: '/:pathMatch(.*)*',//Corriger
    component: NotFoundComponent,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// AuthGuard
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!AuthService.isAuthenticated()) {
      next({ path: '/' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
