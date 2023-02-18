<template>
<div class="row">
 <div class="col-md-3 col-12">
   <div class="mb-5 offerrerInfo">
     <h2 class="text-center">Informationen</h2>
     <hr class="m-4">
     <b class="text-center">{{profile.firstname}} {{profile.lastname}}</b><br>
     <p>Standnummer: {{profile.standNumber}}</p>
     <p>Telefon: {{profile.phoneNumber}}</p>
     <div v-if="profile.userId!==user.userId">
       <button class="btn btn-outline-success" v-if="followSeller===false" @click="favorSeller()"><font-awesome-icon icon="fa-solid fa-user-plus" /> Folgen</button>
       <button class="btn btn-success" v-if="followSeller===true" disabled><font-awesome-icon icon="fa-solid fa-user-plus" /> Gefolgt</button>
     </div>
     <div v-if="profile.userId===user.userId">
       <button class="btn btn-success"
               @click="
               editProfileModal=true;
               firstname=profile.firstname;
               lastname=profile.lastname;
               phone=profile.phoneNumber;
               standnumber=profile.standNumber
                ">
         Bearbeiten
       </button>
     </div>
   </div>
 </div>
 <div class="col-md-8 col-12">
   <h2 class="text-center">Offene Angebote</h2>
   <div v-for="offer in products" :key="offer">
     <div class="row mb-3 offer-box">
       <div class="col-md-3 col-12 mb-3">
         <!--IMAGE IS STATIC BECAUSE WE DONT HAVE A FILESYSTEM RIGHT NOW-->
         <img src="https://as1.ftcdn.net/v2/jpg/04/08/51/90/1000_F_408519023_dxOq9Lel1AID4wP7uAQDLTKdwteiIlum.jpg" class="img-fluid product-image">
       </div>
       <div class="col-md-9 col-12 d-flex align-items-center justify-content-center">
         <div class="row">
           <div class="col-auto"><h5>{{offer.title}}</h5></div>
           <div class="col-auto"><b style="color: #04AA6D;">{{offer.price}}€</b></div>
           <div class="col-auto">
             <router-link :to="{ name: 'product', query: {id: offer.productId }}" class="btn btn-primary">
               Details
             </router-link>
           </div>
         </div>
       </div>
     </div>
   </div>
 </div>
</div>


  <!--MODALS-->

  <!--MODAL TO LOGIN-->
  <Teleport to="body">
    <!-- use the modal component, pass in the prop -->
    <modal :show="editProfileModal" @close="editProfileModal = false">
      <template #header>
        <p>Login</p>
        <button class="btn btn-secondary" style="text-align: right" @click="editProfileModal = false;">
          X
        </button>
      </template>
      <template #body>
        <div class="form-group mb-5">
          <label for="inputLoginname">Vorname</label>
          <input autocomplete="false" type="text" class="form-control" id="inputLoginname" placeholder="Loginname" v-model="firstname">
        </div>
        <div class="form-group mb-5">
          <label for="inputPassword">Nachname</label>
          <input autocomplete="false" type="text" class="form-control" id="inputPassword" placeholder="Passwort" v-model="lastname">
        </div>
        <div class="form-group mb-5">
          <label for="inputPhone">Telefonnummer</label>
          <input autocomplete="false" type="tel" class="form-control" id="inputPhone" placeholder="01568489" v-model="phone">
        </div>
        <div class="form-group mb-5">
          <label for="inputStandnumber">Standnummer</label>
          <input autocomplete="false" type="number" class="form-control" id="inputStandnumber" placeholder="1" v-model="standnumber">
        </div>

        <div class="row">
          <div class="col-md-6 col-12 mb-3">
            <div style="text-align: center">
              <button class="btn btn-outline-secondary" @click="saveProfile()">Speichern</button>
            </div>
          </div>
        </div>



      </template>
      <template #footer>
        <button class="btn btn-success" @click="login()">Login</button>
      </template>
    </modal>
  </Teleport>
</template>

<script>
import Modal from "@/components/Modal";

export default {

  name: "profileView",
  components:{Modal},
  data(){
    return{
      id: new URLSearchParams(window.location.search).get('id'),
      profile:{},
      products:[],
      followSeller:false,
      user:{},

      //editProfile
      editProfileModal: false,
      firstname: "",
      lastname: "",
      phone: "",
      standnumber: 0,

    }
  },
  beforeMount() {
    this.getThisProfile()
    this.getAllOffers()
    this.checkLogin()
  },

  methods:{
    getThisProfile(){
      this.axios.get(this.apiurl+'seller/'+this.id,{
      })
          .then((response) => {
            this.profile=response.data
            console.log(response.data)
          })
    },
    getAllOffers(){
      this.axios.get(this.apiurl+'product/productsOfSeller/'+this.id)
          .then((response) => {
            for (let i = 0; i < response.data.length; i++) {
              this.products.push(response.data[i])
            }
            this.products=response.data
            console.log(this.products)
          })

    },

    saveProfile(){
      this.axios.request({
        method: 'PUT',
        url: this.apiurl+'seller/updateSeller/'+this.profile.userId,
        data: {
          firstname: this.firstname,
          lastname: this.lastname,
          phoneNumber: this.phoneNumber,
          standNumber: this.standNumber
        },
      })
          .then(() => {
           window.location.reload()
          })
          .catch(function (error) {
            console.log(error);
          });
    },


    checkLogin(){
      this.axios.get(this.apiurl+'auth/checkLogin').then((response) => {
        console.log(response.data)
        if (response.data.length!==0){
          this.user=response.data.user
        }
      })
          .catch(function (error) {
            console.log(error);
          });
    },
    favorSeller(){
      this.axios.request({
        method: 'POST',
        url: this.apiurl+'offerer/favorSeller',
        data: {
          userId: this.user.userId,
          seller: this.seller
        },
      })
          .then( () => {
            this.followSeller=true
          })
          .catch(function (error) {
            console.log(error);
          });
    },
  }
}
</script>

<style scoped>
.product-image{
  max-height: 10rem;
}
.offer-box{
  background-color: #e8e8e8;
  border: 1px solid #b2b2b2;
  border-radius: 1rem;
  padding: 1rem;
}
.offerrerInfo>*{
  margin-top: .5rem;
}

</style>
