<template>
<div class="row">
 <div class="col-md-3 col-12">
   <b class="text-center">{{profile.firstname}} {{profile.lastname}}</b><br>
   Standnummer: {{profile.standNumber}}<br>
   Telefon: {{profile.phoneNumber}}
 </div>
 <div class="col-md-9 col-12">
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
</template>

<script>
export default {
  name: "profileView",
  data(){
    return{
      id: new URLSearchParams(window.location.search).get('id'),
      profile:{},
      products:[],
    }
  },
  beforeMount() {
    this.getThisProfile()
    this.getAll()
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
    getAll(){
      this.axios.get(this.apiurl+'product/products')
          .then((response) => {
            for (let i = 0; i < response.data.length; i++) {
              this.products.push(response.data[i])
            }
            this.products=response.data
            console.log(this.products)
          })

    }
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
</style>
