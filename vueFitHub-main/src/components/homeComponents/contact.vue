<template>
    <!-- Contact-->
    <section class="page-section" id="contact">
      <div class="container px-4 px-lg-5">
          <div class="row gx-4 gx-lg-5 justify-content-center">
              <div class="col-lg-8 col-xl-6 text-center">
                  <h2 class="mt-0" style="color: #0082cb; font-family: montserrat; font-size: 45px;" >Contact US!</h2>
                  <hr class="divider" />
                  <p class="text-muted mb-5">Ready to start your next project with us? Send us a message and we'll get back to you as soon as possible!</p>
              </div>
          </div>
          <div class="row gx-4 gx-lg-5 justify-content-center mb-5">
              <div class="col-lg-6">
  
                  <form id="contactForm" @submit.prevent="handleSubmit">
                      <!-- Name input-->
                      <div class="form-floating mb-3">
                          <input class="form-control" id="name" type="text" placeholder="Enter your name..." v-model="formData.name" />
                          <label for="name">Full Name</label>
                      </div>
                      <!-- Email address input-->
                      <div class="form-floating mb-3">
                          <input class="form-control" id="email" type="email" placeholder="name@example.com" v-model="formData.email" />
                          <label for="email">Email Address</label>
                      </div>
                      <!-- Phone number input-->
                      <div class="form-floating mb-3">
                          <input class="form-control" id="phone" type="tel" placeholder="(123) 456-7890" v-model="formData.phone" />
                          <label for="phone">Phone Number</label>
                      </div>
                      <!-- Message input-->
                      <div class="form-floating mb-3">
                          <textarea class="form-control" id="message" type="text" placeholder="Enter your message here..." style="height: 10rem" v-model="formData.message"></textarea>
                          <label for="message">Message</label>
                      </div>
  
                      <!-- Submit Button-->
                      <div class="d-grid"><button class="btn btn-primary btn-xl " type="submit">Send</button></div>
                  </form>
              </div>
          </div>
  
      </div>
  </section>
  
  </template>
    
  <script>
  import emailjs from 'emailjs-com';
  
  export default {
    name: "contactComponent",
    data() {
      return {
        formData: {
          name: '',
          email: '',
          phone: '',
          message: ''
        }
      };
    },
    methods: {
      handleSubmit() {
        const templateId = '';
        const serviceId = '';
        emailjs.send(serviceId, templateId, this.formData, '')
          .then(() => {
            alert('😀 Thank you for your message! We will get back to you as soon as possible. 😀');
            this.formData = {
              name: '',
              email: '',
              phone: '',
              message: ''
            };
          })
          .catch((error) => {
            console.error('Error sending message:', error);
            alert('Error sending message. Please try again later.');
          });
      }
    }
  };
  </script>
    
  <style scoped>
  
  </style>
  