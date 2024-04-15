<template>
    <div class="modal-dialog modal-md">
        <div class="modal-content">
            <!-- Modal Header -->
            <div class="modal-header bg-gris d-flex justify-content-between align-items-center" >
                <h4 class="modal-title text-center m-0">RESET PASSWORD</h4>
                <button type="button" class="close" data-dismiss="modal" @click="closeModal">&times;</button>
            </div>

            <!-- Modal Body -->
            <div class="modal-body" style="padding: 20px;">
                <!-- Modal content -->
                <form role="form">
                    <div class="mb-3">
                        <label for="usrname" class="form-label d-block"><i class="fas fa-user"></i> Email</label>
                        <input type="text" class="form-control" id="usrname" placeholder="Enter email" @keyup="checkEmail()" v-model="email">
                        <p v-if="errorEmail.hasError" style="color:red;">{{ errorEmail.message }}</p>
                    </div>
                    <button type="button" class="btn btn-success btn-block" @click="sendEmail" :disabled="errorEmail.hasError"><i class="fas fa-sign-in-alt"></i> Send Email</button>
                </form>
            </div>

            <!-- Modal Footer -->
            <div class="modal-footer bg-gris">
                <button type="submit" class="btn btn-danger" data-dismiss="modal" @click="closeModal"><i class="fas fa-times"></i> Cancel</button>
                <p>Connenct ? <a href="#" @click="showLoginModal">Sign In</a></p>
            </div>
        </div>
    </div>
</template>

<script>
import {getCurrentInstance, ref} from 'vue';
import Swal from 'sweetalert2';
import AuthService from '@/services/AuthService';
export default {
    name :"ForgotPwdComponent",
    setup(){

        const email=ref("");
        const errorEmail=ref({
            hasError:false,
            message:"",
        })

        const instance = getCurrentInstance();

        function closeModal() {
            email.value="";
            instance.emit('closeModal');
        }

        function showLoginModal() {
          instance.emit('showLoginModal');
        }

        async function sendEmail(){
            try{
                if(checkEmail()){
                    const user = await AuthService.getUserByEmail(email.value);
                    //const URL="http://localhost:8081/";
                    const URL = window.location.origin; // Obtenez l'URL de base de l'application
                    if(user){
                        const currentDate = new Date();
                        const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()} ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
                        const mailOptions = {
                            to : email.value,
                            subject : `FiT HuB: Reset Password -  ${formattedDate}`,
                            text :"",
                            html : `
                                <html>
                                <head>
                                    <style>
                                        /* Add your CSS style for the email here */
                                    </style>
                                </head>
                                <body>
                                    <h1 style="color: #007bff;">Password Reset</h1>
                                    <p>Hi there,</p>
                                    <p>You have requested a password reset on FiT HuB. To proceed with the reset, click the link below:</p>
                                    <a href="${URL}/reset-password/${user.password}">Reset Password</a>
                                    <p>If you did not request a password reset, simply ignore this email.</p>
                                    <p>Thanks,</p>
                                    <p>The FiT HuB Team</p>
                                </body>
                                </html>
                            `
                        }

                        const info = await AuthService.sendEmail(mailOptions);

                        if(info){
                            Swal.fire({
                                title: 'Email Sent !',
                                text: 'Check your email to reset your password !',
                                icon: 'success',
                                timer: 3000, // Durée en millisecondes (5000 ms = 5 secondes)
                                showConfirmButton: false, // Ne pas afficher le bouton de confirmation
                                timerProgressBar:true,
                            });

                            // show login modal 
                            showLoginModal()
                        }else{
                            throw new Error("Something went wrong !")
                        }
                    }else{
                        throw new Error("No user found with this "+email.value)
                    }
                        
                }
            }catch(error){
                Swal.fire({
                  title: 'Oups !',
                  text: 'Failed Sending email : '+error.message,
                  icon: 'error',
                  //timer: 3000, 
                  showConfirmButton: true, 
              });

            }
        }

        function checkEmail() {
            errorEmail.value = {
                hasError: false,
                message: "",
            };

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expression régulière pour valider l'e-mail

            if (email.value.trim().length === 0) {
                errorEmail.value = {
                    hasError: true,
                    message: "Email field is required",
                };
                return false;
            } else if (emailRegex.test(email.value)) {
                errorEmail.value = {
                    hasError: false,
                    message: "",
                };
                return true;
            } else {
                errorEmail.value = {
                    hasError: true,
                    message: "Invalid email format",
                };
                return false;
            }
        }

        function reset(){
            email.value="";
            errorEmail.value = {
                hasError: false,
                message: "",
            };

        }


        
        return {
            closeModal,
            showLoginModal,
            email,
            sendEmail,
            errorEmail,
            checkEmail,
            reset
        }
    }

}
</script>

<style scoped>
    .mb-3{
        text-align: left;
    }
</style>