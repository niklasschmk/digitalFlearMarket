<template>
  <h1>Meine Chats:</h1>
  <div class="container offer-box">

    <div class="card">
      <div class="row no-gutters">
        <div class="col-md-4">
          <img src="https://as1.ftcdn.net/v2/jpg/04/08/51/90/1000_F_408519023_dxOq9Lel1AID4wP7uAQDLTKdwteiIlum.jpg" alt="Produktbild" class="card-img-left product-image">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title haupt">neuesprodukt</h5>
            <p class="card-text haupt">Händler: name des händler</p>

          </div>
        </div>
      </div>
    </div>
  </div>


</template>

<script>
import homeView from "@/components/HomeView.vue";

export default {
  name: "chatsView",
  computed: {
    homeView() {
      return homeView
    }
  }
}
</script>

<style scoped>
h1{
  font-size: 2rem;
  text-shadow: 1px 1px #ccc;
  text-align: center;
}
.product-image{
  max-height: 10rem;
  border-radius: 20px;
  box-shadow: 2px 2px #565e64;
}
.offer-box{
  position: relative;
  background-color: #e8e8e8;
  border: 1px solid #b2b2b2;
  border-radius: 2rem;
  padding: 1rem;
  margin: 1rem;
  box-shadow: 5px 5px #5c636a;
}
.haupt{
  font-weight: bold;
}

.buttonnn{
  position: absolute;
  top: 15px;
  right: 20px;
}


.card:hover {
  border: 1px solid black;
  transform: scale(1.05);
}

.card:active {
  transform: scale(0.95) rotateZ(1.7deg);
}
</style>
