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
        <button class="btn btn-outline-dark col-12" v-if="productFaved===false">
          <font-awesome-icon icon="fa-solid fa-star" />
          Zur Merkliste hinzufügen
        </button>
        <button class="btn btn-outline-dark col-12" v-if="productFaved===true">
          <font-awesome-icon style="color: #ffd000" icon="fa-solid fa-star" />
          Von Merkliste entfernen
        </button>
        <hr>
        <div style="text-align: left">
          <div class="row">
            <div class="col">
              Verkäufer: <b>{{product.name}}</b>
            </div>
            <div class="col">
              <button class="btn btn-outline-success" v-if="followOfferrer===false">Folgen</button>
              <button class="btn btn-success" v-if="followOfferrer===true">Gefolgt</button>
            </div>
          </div>
          <router-link :to="{ name: 'profile', query: {id: product.userId }}" class="btn btn-primary">
            Händlerprofil
          </router-link>
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
      alertVisible:false,
      alertMessage:"",
      productFaved: false,
      followOfferrer: false
    }
  },
  beforeMount() {
    this.getThisProduct()
  },
  methods:{
    getThisProduct(){
      this.axios.get(this.apiurl+'product/'+this.id,{
      })
          .then((response) => {
            this.product=response.data
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
    }
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
