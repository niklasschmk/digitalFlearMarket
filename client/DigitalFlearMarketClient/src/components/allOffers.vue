<template>

  <h1 class="title">Alle Angebote</h1>

  <div v-for="offer in testOffers" :key="offer.id">
    <div class="row mb-3 offer-box">
      <div class="col-md-3 col-12 mb-3">
        <!--IMAGE IS STATIC BECAUSE WE DONT HAVE A FILESYSTEM RIGHT NOW-->
        <img alt="bild" :src="offer.image" class="img-fluid product-image pbild">
        <div class="offer-title">{{offer.title}}</div>
      </div>
      <div class="col-md-9 col-12 d-flex align-items-center">
        <div class="row w-100">
          <div class="col-6"><b class="haupt" style="font-size: 1.5rem;">{{offer.price}}€</b></div>
          <div class="col-6 text-right haupt">Händler: {{offer.offerer}}</div>
          <div class="col-12 text-right">
            <router-link :to="{ name: 'product', query: {id: offer.productId }}" class="btn btn-primary details">
              Details
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>


</template>

<script>

export default {
  name: "allOffers",

  data(){
    return{
      testOffers:[
        {
          'id': '1',
          'title': 'Test',
          'offerer': ' Hans ',
          'offererId': '1',
          'price': '6,99',
          'image': 'https://as1.ftcdn.net/v2/jpg/04/08/51/90/1000_F_408519023_dxOq9Lel1AID4wP7uAQDLTKdwteiIlum.jpg'
        },
        {
          'id': '2',
          'title': 'Test2name ',
          'offerer': ' Hans2 molllllllle ',
          'offererId': '1',
          'price': '6,99',
          'image': 'https://as1.ftcdn.net/v2/jpg/04/08/51/90/1000_F_408519023_dxOq9Lel1AID4wP7uAQDLTKdwteiIlum.jpg'
        },
        {
          'id': '3',
          'title': 'Test3',
          'offerer': ' Hans3 laaaaaaaaaaaang ',
          'offererId': '1',
          'price': '6,99',
          'image': 'https://as1.ftcdn.net/v2/jpg/04/08/51/90/1000_F_408519023_dxOq9Lel1AID4wP7uAQDLTKdwteiIlum.jpg'
        }
      ],
      products:[],
    }
  },
  beforeMount() {
    this.getAll()
  },
  methods:{
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
h1{
  font-size: 2rem;
  text-shadow: 1px 1px #ccc;
  text-align: center;
  margin-bottom: 30px;
}
.offer-title {
  margin-top: 10px;
  font-size: 1.2rem;
  font-weight: bold;
  text-align: left;
}
.haupt{
  font-weight: bold;
}
.pbild{
  border-radius: 5px;
  box-shadow: 2px 2px #565e64;
}
.details{
  position: absolute;
  top: 15px;
  right: 20px;
}
.offer-box{
  position: relative;
  background-color: #e8e8e8;
  border: 1px solid #b2b2b2;
  border-radius: 1rem;
  padding: 1rem;
  margin: 1rem;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
}

</style>
