<template>
<div>
  <div class="navbar">
    <router-link to="/" class="nav-item">Home</router-link>
    <router-link to="/alloffers" class="nav-item">Angebote</router-link>
    <router-link to="/chats" class="nav-item">Chats</router-link>
    <a v-if="role==='Seller'" @click="createNewProductModal=true" class="nav-item">Anlegen</a>
    <router-link :to="{ name: 'profile', query: {id: user.userId }}" v-if="role==='Seller'"  class="nav-item">Profil</router-link>
    <a v-if="loggedIn===false" @click="loginModal=true" class="nav-item">Login</a>
    <a v-if="loggedIn===true" @click="settingsModal=true" class="nav-item">Einstellungen</a>
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
        <div class="row">
          <div class="col-md-6 col-12 mb-3">
            <div style="text-align: center">
              <button class="btn btn-outline-secondary" @click="loginModal=false; registerModal=true ">Noch kein Account?</button>
            </div>
          </div>
        </div>



      </template>
      <template #footer>
        <button class="btn btn-success" @click="login()">Login</button>
      </template>
    </modal>
  </Teleport>

  <!--MODAL CREATE NEW PRODUCT-->
  <Teleport to="body">
    <!-- use the modal component, pass in the prop -->
    <modal :show="createNewProductModal" @close="createNewProductModal = false">
      <template #header>
        <p>Login</p>
        <button class="btn btn-secondary" style="text-align: right" @click="createNewProductModal = false;">
          X
        </button>
      </template>
      <template #body>
        <div class="form-group mb-3">
          <label for="inputTitle">Titel</label>
          <input autocomplete="false" type="text" class="form-control" id="inputTitle" placeholder="Canon EOS 750d" v-model="productTitle">
        </div>

        <div class="form-group mb-3">
          <label for="inputPrice">Preis</label>
          <input autocomplete="false" type="number" class="form-control" id="inputPrice" placeholder="499€" v-model="productPrice">
        </div>

        <p>Verhandelbar?</p>
        <div class="custom-control custom-checkbox mb-3">
          <input type="checkbox" class="custom-control-input" id="customCheck1" v-model="productNegotiable">
          <label class="custom-control-label" for="customCheck1">Ja</label>
        </div>

        <div class="form-group">
          <label for="inputDesc">Beschreibung</label>
          <textarea class="form-control" id="inputDesc" rows="3" v-model="productDesc"></textarea>
        </div>

      </template>
      <template #footer>
        <button class="btn btn-success" @click="createProduct()">Anlegen</button>
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
        <div class="form-group mb-3">
          <label for="inputFirstname">Vorname</label>
          <input autocomplete="false" type="text" class="form-control" id="inputFirstname" placeholder="Vorname" v-model="registerFirstname">
        </div>
        <div class="form-group mb-3">
          <label for="inputLastname">Nachname</label>
          <input autocomplete="false" type="text" class="form-control" id="inputLastname" placeholder="Nachname" v-model="registerLastname">
        </div>
        <div class="form-group mb-3">
          <label for="inputPhone">Telefon</label>
          <input autocomplete="false" type="tel" class="form-control" id="inputPhone" placeholder="0123456789" v-model="registerPhone">
        </div>
        <div class="form-group mb-3">
          <label for="inputLoginnameReg">Loginname (Wird für den Login benötigt)</label>
          <input autocomplete="false" type="text" class="form-control" id="inputLoginnameReg" placeholder="Loginname" v-model="registerName">
        </div>
        <div class="form-group mb-3">
          <label for="inputPasswordReg">Passwort</label>
          <input autocomplete="false" type="password" class="form-control" id="inputPasswordReg" placeholder="Passwort" v-model="registerPass">
        </div>
        <div class="form-group mb-3">
          <label for="inputPasswordRegRe">Passwort erneut</label>
          <input autocomplete="false" type="password" class="form-control" id="inputPasswordRegRe" placeholder="Passwort" v-model="registerPassRe">
        </div>

      </template>
      <template #footer>
        <button class="btn btn-success" @click="register()">Registrieren</button>
      </template>
    </modal>
  </Teleport>

  <!--MODAL FOR SETTINGS-->
  <Teleport to="body">
    <!-- use the modal component, pass in the prop -->
    <modal :show="settingsModal" @close="settingsModal = false">
      <template #header>
        <p>Quick Settings</p>
        <button class="btn btn-secondary" style="text-align: right" @click="settingsModal = false;">
          X
        </button>
      </template>
      <template #body>
        <div class="row text-center">
          <div class="col-md-6 col-12 mb-5">
            <button class="btn btn-warning" @click="logout()">Ausloggen</button>
          </div>
          <div class="col-md-6 col-12 mb-5">
            <button class="btn btn-outline-dark" @click="deleteAccount()">Account löschen</button>
          </div>
        </div>
      </template>
      <template #footer>
        <!--Empty p tag for filling the prop placeholder-->
        <p></p>
      </template>
    </modal>
  </Teleport>

</template>

<script>

import Modal from "@/components/Modal";

export default {
  name: 'App',
  components:{Modal},
  beforeMount() {
    this.checkLogin()
  },
  data(){
    return{
      loggedIn: false,
      role:"",

      //login data
      loginModal: false,
      loginModalSeller: false,
      loginname:"",
      password:"",

      //register data
      registerModal: false,
      registerFirstname:"",
      registerLastname:"",
      registerPhone:"",
      registerName:"",
      registerPass:"",
      registerPassRe:"",

      //create new product data
      createNewProductModal: false,
      productTitle:"",
      productPrice:"",
      productNegotiable: false,
      productDesc:"",

      //user object
      user:{},

      //for settings
      settingsModal: false,
    }
  },
  methods:{
    createProduct(){
      this.axios.request({
        method: 'POST',
        url: this.apiurl+'product/newProduct',
        data: {
          userId: this.user.userId,
          name: this.user.firstname,
          price: this.productPrice,
          negotiable: this.productNegotiable,
          description: this.productDesc,
          title: this.productTitle

        },
      })
          .then(response => {
            console.log(response.data)
            if (response.status===401){
              alert("Falsche Logindaten")
            }else{
              this.loggedIn=true
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    },

    login(){
      if (this.loginname.length!==0&&this.password.length!==0){
        this.axios.request({
          method: 'POST',
          url: this.apiurl+'auth/login',
          data: {
            username: this.loginname.toString().trim(),
            password: this.password.toString().trim()
          },
        })
            .then(response => {
              console.log(response.data)
              if (response.status===401){
                alert("Falsche Logindaten")
              }else{
                this.loggedIn=true
                this.checkLogin()
                this.loginModal=false
              }
            })
            .catch(function (error) {
              console.log(error);
            });
      }
    },
    logout(){
      this.axios.request({
        method: 'POST',
        url: this.apiurl+'auth/logout',
      })
          .then(function() {
           window.location.reload()
          })
          .catch(function (error) {
            console.log(error);
          });
    },

    deleteAccount(){
      if (confirm('Möchten Sie Ihren Account wirklich löschen?')) {
        // Yes

        //check role and use route representing his role
        let route ="";
        if (this.role==="Offerer"){
          route = "offerer/delteOfferer"
        }
        if (this.role==="Seller"){
          route = "seller/deleteSeller"
        }

        this.axios.request({
          method: 'POST',
          url: this.apiurl+route+'/'+this.user.userId,
        })
            .then(function() {
              this.logout()
            })
            .catch(function (error) {
              console.log(error);
            });


      } else {
        // No
        console.log('Nichts hat sich geändert');
      }
    },

    register(){
      if (this.registerName.length!==0&&this.registerPass.length!==0&&this.registerPassRe.length!==0&&this.registerFirstname.length!==0&&this.registerLastname.length!==0&&this.registerPhone.length!==0){
        if (this.registerPass===this.registerPassRe){
          this.axios.request({
            method: 'POST',
            url: this.apiurl+'auth/register',
            data: {
              username: this.registerName.toString().trim(),
              hashedPassword: this.registerPass.toString().trim(),
              firstname: this.registerFirstname.toString().trim(),
              lastname: this.registerLastname.toString().trim(),
              phoneNumber: this.registerPhone.toString().trim(),
            },
          })
              .then(response => {
                console.log(response.data)
                this.loginname=this.registerName
                this.password=this.registerPass
                this.registerModal=false
                //calling loginfunction with the inserted username and password from registration
                this.login()

              })
              .catch(function (error) {
                console.log(error);
              });
        }else {
          alert("Passwort stimmt nicht überein")
        }
      }else{
        alert("Sie müssen alle Felder ausfüllen")
      }
    },
    checkLogin(){
      this.axios.get(this.apiurl+'auth/checkLogin').then((response) => {
        console.log(response.data)
        if (response.data.length!==0){
          this.loggedIn=true
          this.user=response.data.user
          this.role=response.data.role
        }
      })
          .catch(function (error) {
            console.log(error);
          });
    },
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
  width: 10vw;
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
