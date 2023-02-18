<template>

  <div class="text-center">
    <div class="d-flex flex-wrap">
      <div class="col-md-6 col-12 d-flex justify-content-center align-items-center erlebe min-height-200 shadow" style="background-color: #fde0e5">
        <h2 class="erle">Erleben Sie die neue Art des Flohmarktes!</h2>
      </div>
      <div class="col-md-6 col-12">
        <img alt="bild" src="../assets/images/flohmarkt.jpeg" class="image-preview">
      </div>
    </div>
  </div>


<!--card höhe anpassen!!!-->

  <div class="text-center" :style="{ backgroundColor: '#f9f9f9', padding: '20px' }">
    <div class="row mb-5">
      <div class="col-md-6 col-12" style="margin-bottom: 20px;">
        <div class="card shadow border-0 h-100">
          <img src="../assets/images/haendler.jpeg" class="card-img-top" alt="Händler" style="height: 400px;">
          <div class="card-body">
            <h3 class="card-title">Werden Sie selbst Händler indem Sie uns anfragen</h3>
            <p class="card-text">Bieten Sie Ihre Waren auf unserem Flohmarkt an und machen Sie ein gutes Geschäft.</p>
            <a href="mailto:example@mail.de" class="btn btn-primary">Kostenlos registrieren!</a>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-12">
        <div class="card shadow border-0 h-100">
          <img src="../assets/images/offers.jpeg" class="card-img-top" alt="Angebote" style="height: 400px;">
          <div class="card-body">
            <h3 class="card-title">Durchstöbern Sie die Angebote</h3>
            <p class="card-text">Finden Sie tolle Angebote von anderen Händlern und sparen Sie Geld.</p>
            <a href="#" class="btn btn-primary">Zu den Angeboten</a>
          </div>
        </div>
      </div>
    </div>
  </div>




</template>


<script>
export default {
  name: "HomeView",
}
</script>

<style scoped>
.min-height-200 {
  min-height: 200px;
  border-radius: 10px 10px 0 0;
}

.header>img{
  max-height: 20rem;
  width: 100%;
  object-fit: cover;
}

.image-preview{
  width: 100%;
  object-fit: cover;
}
.image-preview {
  height: 50vh;
}





.card-custom {
  border: none;
  border-radius: 0;
}

.card-custom .card-img-top {
  height: 200px;
  object-fit: cover;
}

.card-custom .card-body {
  padding: 20px;
}

.card-custom .card-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.card-custom .card-text {
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 20px;
}

.card-custom .btn-primary {
  background-color: #007bff;
  border-color: #007bff;
  font-size: 18px;
  font-weight: bold;
  padding: 12px 20px;
}
.card-img-top {
  object-fit: cover;
}

</style>
