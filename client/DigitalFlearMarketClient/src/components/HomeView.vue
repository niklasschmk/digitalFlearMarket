<template>
  <div class="header mb-3">
    <img src="../assets/images/header-image.jpeg" class="img-fluid">
  </div>
  <div class="text-center">
    <div class="row mb-5">
      <div class="col-md-6 col-12 d-flex justify-content-center align-items-center" style="background-color: #fde0e5">
        <h2>Erleben Sie die neue Art des Flohmarktes!</h2>
      </div>
      <div class="col-md-6 col-12">
        <img src="../assets/images/flohmarkt.jpeg" class="img-fluid image-preview">
      </div>
    </div>
    <div class="row mb-5">
      <div class="col-md-6 col-12">
        <img src="../assets/images/haendler.jpeg" class="img-fluid image-preview">
      </div>
      <div class="col-md-6 col-12 d-flex justify-content-center align-items-center" style="background-color: #fde0e5">
        <div>
          <h3>Werden Sie selbst Händler indem Sie uns anfragen</h3>
          <a href="mailto:example@mail.de">Anfragen</a>
        </div>
      </div>
    </div>
    <div class="row mb-5">
      <div class="col-md-6 col-12 d-flex justify-content-center align-items-center" style="background-color: #fde0e5">
        <div>
          <h3>Durchstöbern Sie die Angebote von anderen Händlern</h3>
          <router-link to="alloffers" class="btn btn-primary">Angebote</router-link>
        </div>

      </div>
      <div class="col-md-6 col-12">
        <img src="../assets/images/offers.jpeg" class="img-fluid image-preview">
      </div>
    </div>
    <h5>Besser als eBay? Aber Hallo!</h5>
  </div>
</template>


<script>

export default {
  name: "HomeView",




}
</script>

<style scoped>
.header>img{
  max-height: 20rem;
  width: 100%;
  object-fit: cover;
}
.image-preview{

  width: 100%;
  object-fit: cover;
}
</style>
