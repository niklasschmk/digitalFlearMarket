<template>
<h1>Meine Chats:</h1>

  <div v-for="chat in chats" :key="chat">
    <div class="row mb-3 offer-box">
      <div class="col-md-3 col-12 mb-3">
        <!--IMAGE IS STATIC BECAUSE WE DONT HAVE A FILESYSTEM RIGHT NOW-->
        <img alt="bild" src="https://as1.ftcdn.net/v2/jpg/04/08/51/90/1000_F_408519023_dxOq9Lel1AID4wP7uAQDLTKdwteiIlum.jpg" class="img-fluid product-image pbild">
      </div>
      <div class="col-md-9 col-12 d-flex align-items-center justify-content-center">
        <div class="row">
          <div class="col-auto"><h5 class="haupt">{{offer.title}}</h5></div>
          <div class="col-auto"><b style="color: #04AA6D;">{{offer.price}}€</b></div>
          <div class="col-auto haupt">Händler: {{offer.offerer}}</div>
          <div class="col-auto">
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
  name: "chatsView"
}
</script>

<style scoped>

</style>
