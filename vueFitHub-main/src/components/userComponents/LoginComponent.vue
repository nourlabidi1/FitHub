<template>
    <div class="modal-dialog modal-md">
        <div class="modal-content">
            <!-- Modal Header -->
            <div class="modal-header bg-gris d-flex justify-content-between align-items-center" >
                <h4 class="modal-title text-center m-0">Login</h4>
                <button type="button" class="close" data-dismiss="modal" @click="closeModal">&times;</button>
            </div>

            <!-- Modal Body -->
            <div class="modal-body" style="padding: 20px;">
                <!-- Modal content -->
                <form role="form" @submit="logIn">
                    <div class="mb-3" style="text-align:left">
                        <label for="usrname" class="form-label d-block"><i class="fas fa-user"></i> Username</label>
                        <input type="text" class="form-control" id="usrname" placeholder="Enter email" v-model="loginData.email">
                    </div>
                    <div class="mb-3" style="text-align:left">
                        <label for="psw" class="form-label d-block"><i :class="showPWD? 'fas fa-eye-slash' : 'fas fa-eye'" @click="showPwdORnot"></i> Password</label>
                        <input :type="showPWD ? 'text' : 'password'" class="form-control" id="psw" placeholder="Enter password" v-model="loginData.password">
                    </div>
                    <div class="mb-3" style="text-align:left" v-if="errorData.isError">
                        <label for="error" class="form-label d-block" style="color:red">{{errorData.message}}</label>
                    </div>
                    <button type="button" class="btn btn-primary btn-block" @click="logIn"><i class="fas fa-sign-in-alt"></i> Login</button>
                </form>
            </div>

            <!-- Modal Footer -->
            <div class="modal-footer bg-gris">
                <p>Not a member? <router-link to="" @click="registerModal">Sign Up</router-link></p>
                <p>Forgot <router-link to=""  @click="forgotPasswordModal">Password?</router-link></p>
            </div>
        </div>
    </div>
</template>

<script>
import {getCurrentInstance, ref} from 'vue';
import AuthService from '@/services/AuthService';
export default {
    name :"LoginComponent",
    setup(){
        const loginData=ref({
            email:"",
            password:"",
        })
        const showPWD=ref(false)
        const errorData=ref({
            isError:false,
            message:""
        })

        const instance = getCurrentInstance();

        function closeModal() {
            resetLogin();
            instance.emit('closeModal');
        }

        function forgotPasswordModal() {
            instance.emit('showForgotPwdModal');
        }

        function registerModal() {
            instance.emit('showRegisterModal');
        }

        async function logIn(){
            if(validatorLogin()){
                try{
                    const user= await AuthService.login(loginData.value);
                    resetLogin();
                    //Comment je fais pour rafraichir la page ici 
                    instance.emit("closeModal");
                    console.log(user)
                }catch(error){
                    errorData.value.isError=true;
                    errorData.value.message=error.message;
                    console.log(error)
                }
            }
        }
        function showPwdORnot(){
            showPWD.value=!showPWD.value;
        }
        function resetLogin(){
            loginData.value.email="";
            loginData.value.password="";
            errorData.value.isError=false;
            errorData.value.message="";
        }

        function validatorLogin() {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!loginData.value.email || !loginData.value.password) {
                errorData.value.isError = true;
                errorData.value.message = "Please fill in all fields.";
                return false;
            } else if (!emailPattern.test(loginData.value.email)) {
                errorData.value.isError = true;
                errorData.value.message = "Please enter a valid email address.";
                return false;
            } else if (loginData.value.password.length < 3) {
                errorData.value.isError = true;
                errorData.value.message = "Password must be at least 3 characters long.";
                return false;
            } else {
                errorData.value.isError = false;
                errorData.value.message = "";
                return true;
            }
        }

        
        return {
            closeModal,
            forgotPasswordModal,
            registerModal,
            logIn,
            loginData,
            errorData,
            showPWD,
            showPwdORnot,
            resetLogin,
            validatorLogin
        }
    }

}
</script>

<style scoped>
    .modal-header{
        background-color: rgb(56, 152, 216);
    }
    .modal-footer{
        background-color: rgb(36, 34, 34);
    }
    p,button, h4{
        color:white;
    }
</style>