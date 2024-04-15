<template>
    <div class="container">
      <div class="row justify-content-center mt-5 page">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header bg-primary text-white">
              <h4 class="text-center">Reset Password</h4>
            </div>
            <div class="card-body">

              <form @submit.prevent="resetPassword">
                <div class="form-group">
                  <label for="password">Enter your new password </label>
                  <input type="password" class="form-control" id="password" v-model="password">
                </div>
                <div class="form-group">
                  <label for="confirmPassword">Confirm  your Password</label>
                  <input type="password" class="form-control" id="confirmPassword" v-model="confirmPassword">
                </div>
                <br>
                <p class="error">{{ error.message }}</p>
                <button type="submit" class="btn btn-primary btn-block">Reset Password</button>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import AuthService from '@/services/AuthService';
  import Swal from 'sweetalert2';
  export default {
    name :"ResetPassword",
    data() {
      return {
        password: '',
        confirmPassword: '',
        error :{
            hasError:false,
            message :""
        },
        hash:"",
        User:null,
      };
    },
    created() {
        // Récupérer le paramètre de l'URL au moment de la création du composant
        this.hash = this.$route.params.pwd;
        this.getUserByPWD(this.hash);
    },
    methods: {
      async resetPassword() {
        this.error={hasError:false,message:""}

        if (this.password.trim().length <3) {
          this.error={hasError:true,message:"Password  should at least contain 3 caracters!"}
          return;
        }else if (this.password !== this.confirmPassword) {
          // Handle password mismatch
          this.error={hasError:true,message:"Passwords do not match!"}
          return;
        }
        try{
           const user= await AuthService.updateUserPassword(this.User._id, this.password);
           if(user){
            Swal.fire({
                title: 'Password updated !',
                text: 'Your password is updated succesfully , You can log in now !',
                icon: 'success',
                timer: 3000, // Durée en millisecondes (5000 ms = 5 secondes)
                showConfirmButton: false, // Ne pas afficher le bouton de confirmation
                timerProgressBar:true,
            });
            this.$router.push("/");
           }else{
            throw new Error("fAILED TO RESET ")
           }
        }catch(error){
            this.error={hasError:true,message: error.message}
        }
  
      },

      async getUserByPWD(hashPWP){
        const data ={ "hashpassword" : hashPWP};
        try{
            const user=await AuthService.getUserByPWD(data);
            this.User=user;
        }catch(err){
            console.log("get user by hashpwd Error : "+err.message)
            this.$router.push("/PageNotFound")
        }
      }

    }

  };
  </script>
  
  <style>
  /* Add custom styles here */
  .page{
    padding-top: 8%;
  }

  .error{
    color:red;
  }
  </style>
  