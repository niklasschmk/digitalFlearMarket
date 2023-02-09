<template>
<div>
  <div class="navbar">
    <router-link to="/" class="nav-item">Home</router-link>
    <router-link to="/alloffers" class="nav-item">Angebote</router-link>
    <router-link to="/chats" class="nav-item">Chats</router-link>
    <router-link v-if="loggedIn===true" to="/profile" class="nav-item">Profil</router-link>
    <a v-if="loggedIn===false" @click="loginModal=true" class="nav-item">Login</a>
  </div>
</div>


<div class="content">
  <!--Components rendered by router-view-->
  <router-view></router-view>
</div>



  <!-----MODALS----->

  <!--MODAL TO LOGIN-->
  <Teleport to="body">
    <!-- use the modal component, pass in the prop -->
    <modal :show="loginModal" @close="loginModal = false">
      <template #header>
        <p>Login</p>
        <button class="btn btn-secondary" style="text-align: right" @click="loginModal = false;">
          X
        </button>
      </template>
      <template #body>
        <div class="form-group mb-5">
          <label for="inputLoginname">Loginname</label>
          <input autocomplete="false" type="text" class="form-control" id="inputLoginname" placeholder="Loginname" v-model="loginname">
        </div>
        <div class="form-group mb-5">
          <label for="inputPassword">Passwort</label>
          <input autocomplete="false" type="password" class="form-control" id="inputPassword" placeholder="Passwort" v-model="password">
        </div>
        <div style="text-align: center">
          <button class="btn btn-outline-secondary" @click="loginModal=false; registerModal=true ">Noch kein Account?</button>
        </div>

      </template>
      <template #footer>
        <button class="btn btn-success" @click="login()">Login</button>
      </template>
    </modal>
  </Teleport>
  <!--MODAL TO REGISTER-->
  <Teleport to="body">
    <!-- use the modal component, pass in the prop -->
    <modal :show="registerModal" @close="registerModal = false">
      <template #header>
        <p>Registrieren</p>
        <button class="btn btn-secondary" style="text-align: right" @click="registerModal = false;">
          X
        </button>
      </template>
      <template #body>
        <div class="form-group mb-5">
          <label for="inputLoginnameReg">Loginname</label>
          <input autocomplete="false" type="text" class="form-control" id="inputLoginnameReg" placeholder="Loginname" v-model="registerName">
        </div>
        <div class="form-group mb-5">
          <label for="inputPasswordReg">Passwort</label>
          <input autocomplete="false" type="password" class="form-control" id="inputPasswordReg" placeholder="Passwort" v-model="registerPass">
        </div>
        <div class="form-group mb-5">
          <label for="inputPasswordRegRe">Passwort erneut</label>
          <input autocomplete="false" type="password" class="form-control" id="inputPasswordRegRe" placeholder="Passwort" v-model="registerPassRe">
        </div>

      </template>
      <template #footer>
        <button class="btn btn-success" @click="register()">Registrieren</button>
      </template>
    </modal>
  </Teleport>

</template>

<script>

import Modal from "@/components/Modal";

export default {
  name: 'App',
  components:{Modal},
  data(){
    return{
      loggedIn: false,
      loginModal: false,
      loginname:"",
      password:"",

      registerModal: false,
      registerName:"",
      registerPass:"",
      registerPassRe:"",
    }
  },
  methods:{
    login(){
      if (this.loginname.length!==0&&this.password.length!==0){
        /*
        Hier Request ans Beckend senden. Wenn Login erfolgreich, dann Variable this.loggedIn = true
         */
      }
    },
    register(){
      if (this.registerName.length!==0&&this.registerPass.length!==0&&this.registerPassRe.length!==0){
        if (this.registerPass===this.registerPassRe){
          /*
          Hier Request ans Backend senden mit Registerdaten. Wenn success, dann login funktion aufrufen und vorher
          this.loginname = this.registername
          this.password = this.registerPass
          setzen.
           */
        }else {
          alert("Passwort stimmt nicht überein")
        }
      }else{
        alert("Sie müssen alle Felder ausfüllen")
      }
    },
    isLoggedIn(){
      /*
      Hier request ans Backend, gucken ob aktive Session, wenn ja, dann this.loggedIn = true
       */
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  overflow-x: hidden;
}
/* Place the navbar at the bottom of the page, and make it stick */
.navbar {
  padding: 0 10px;
  background-color: #333;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
}

/* Style the links inside the navigation bar */
.nav-item {
  color: #f2f2f2;
  width: 20vw;
  transition: all ease-in-out .1s;
  display: inline-block;
  text-align: center;
  padding: 14px 0;
  text-decoration: none;
}
/* Change the color of links on hover */
.nav-item:hover {
  background-color: #ddd;
  color: black;
  cursor: pointer;
}

/* Add a color to the active/current link */
.nav-item.active {
  background-color: #04AA6D;
  color: rgba(255, 255, 255, 0.68);

  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
a{
  text-decoration: none;
}
@media (min-width: 921px) {
  .content{
    margin: 0 2rem ;
  }
}
@media (max-width: 920px) {
  .content{
    margin: 0 1rem ;
  }
}
.alert{
  position: absolute !important;
  margin: 0 auto;
  top: 5rem !important;
  width: 100%;
  z-index: 9999999 !important;
}

</style>
