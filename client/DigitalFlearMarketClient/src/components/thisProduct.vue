<template>
  <div v-if="alertVisible===true" class="alert alert-primary" role="alert">
    {{alertMessage}}
  </div>
  <div class="row mb-5">
    <div class="col-md-6 col-12 mb-5">
      <img src="https://as1.ftcdn.net/v2/jpg/04/08/51/90/1000_F_408519023_dxOq9Lel1AID4wP7uAQDLTKdwteiIlum.jpg" class="img-fluid product-image">
    </div>
    <div class="col-md-6 col-12 border-left d-flex justify-content-center align-items-center">
      <div>
        <router-link :to="{ name: 'chat', query: {id: product.userId, product: product.productId }}" class="btn btn-success mb-3 col-12">
          Verkäufer anschreiben
        </router-link><br>
        <button class="btn btn-outline-primary mb-3 col-12" @click="copyToClipBoard()">
          Anzeige teilen
        </button><br>
        <button class="btn btn-outline-dark col-12" v-if="productFaved===false" @click="favorProduct()">
          <font-awesome-icon icon="fa-solid fa-star" />
          Zur Merkliste hinzufügen
        </button>
        <button class="btn btn-outline-dark col-12" v-if="productFaved===true">
          <font-awesome-icon style="color: #ffd000" icon="fa-solid fa-star" disabled/>
          Von Merkliste entfernen
        </button>
        <hr>
        <div style="text-align: left">
            <div class="mb-3">
              Verkäufer: <b>{{product.name}}</b>
            </div>
          <div class="row">
            <div class="col">
              <button class="btn btn-outline-success" v-if="followSeller===false" @click="favorSeller()"><font-awesome-icon icon="fa-solid fa-user-plus" /> Folgen</button>
              <button class="btn btn-success" v-if="followSeller===true"><font-awesome-icon icon="fa-solid fa-user-plus" disabled /> Gefolgt</button>
            </div>
            <div class="col">
              <router-link :to="{ name: 'profile', query: {id: product.userId }}" class="btn btn-primary">
                Händlerprofil
              </router-link>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
  <div class="mb-3">
    <h2>{{product.title}}</h2>
    <b class="price">{{product.price}}€ <span v-if="product.negotiable===true">Verhandelbar</span> <span v-if="product.negotiable===false">Festpreis</span></b>
  </div>
  <hr class="mb-3">
  <h3>Beschreibung</h3>
  <div>
    {{product.description}}
  </div>

</template>

<script>
export default {
  name: "thisProduct",
  data(){
    return{
      id: new URLSearchParams(window.location.search).get('id'),
      product:{},
      seller:{},
      alertVisible:false,
      alertMessage:"",
      productFaved: false,
      followSeller: false,

      //safe loggedIn user
      user: {},
    }
  },
  beforeMount() {
    this.getThisProduct()
    this.checkLogin()
  },
  methods:{
    getThisProduct(){
      this.axios.get(this.apiurl+'product/'+this.id,{
      })
          .then((response) => {
            this.product=response.data
            console.log(response.data)
            this.getThisSeller()
          })
    },

    getThisSeller(){
      this.axios.get(this.apiurl+'seller/'+this.product.userId,{
      })
          .then((response) => {
            this.seller=response.data
            console.log(response.data)
          })
    },

    copyToClipBoard(){
      navigator.clipboard.writeText(window.location.href);
      this.alertMessage="In Zwischenablage gespeichert"
      this.alertVisible=true
      setTimeout(()=>{
        this.alertVisible=false
      }, 3000)
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
    favorProduct(){
      this.axios.request({
        method: 'POST',
        url: this.apiurl+'offerer/favorProduct',
        data: {
          userId: this.user.userId,
          product: this.product
        },
      })
          .then( () => {
            this.productFaved=true
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
  max-height: 20rem;
}
@media (min-width: 768px) {
  .border-left{
    border-left: 1px solid rgba(0, 0, 0, 0.5);
  }
}
.price{
  color: #04AA6D;
  font-size: xx-large
}
.price>span{
  color: black;
  font-weight: lighter;
}

</style>
