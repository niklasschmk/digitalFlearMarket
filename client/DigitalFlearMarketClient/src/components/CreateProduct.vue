<template>
  <div>
    <h2 class="text-success">Produkt hinzufügen</h2>
    <form>
      <div class="form-floating mb-3">
        <input class="form-control" id="name" v-model="state.name" type="text" placeholder="Produktname">
        <label class="form-label" label-for="name" label-cols-sm="3" label-align-sm="right">Produktname</label>
      </div>

      <div class="form-floating mb-3">
        <input class="form-control" id="price" v-model="state.price" type="text" placeholder="0.00€">
        <label class="form-label" label-for="price" label-cols-sm="3" label-align-sm="right">Preis</label>
      </div>

      <div class="form-floating mb-3">
        <textarea class="form-control" id="description" v-model="state.description" type="text" aria-placeholder="Beschreibung"></textarea>
        <label class="form-label" label-for="description" label-cols-sm="3" label-align-sm="right">Beschreibung</label>
      </div>

      <div class="form-floating mb-3">
        <select class="form-select" id="negotiable" v-model="state.negotiable">
          <option selected>Wähle aus, ob dein Preis verhandelbar ist.</option>
          <option value="false">Preis ist nicht verhandelbar</option>
          <option value="true">Preis ist verhandelbar</option>
        </select>
        <label class="form-label" label-for="negotiable" label-cols-sm="3" label-align-sm="right">Verhandelbarkeit</label>
      </div>

      <div class="form-floating mb-3">
        <label label-cols-sm="3" label-align-sm="right" class="mb-0 form-label">
          <button class="btn-success" type="button" @change="formatNames"></button>
          <input class="form-control" id="files" accept="image/*" type="file">
        </label>
      </div>

      <div class="mt-3 form-floating" v-if="state.files.length >0">
        <div v-for="(pic, index) in state.files" :key="index">Bild: {{ pic ? state.files[index].name : '' }}</div>
      </div>
    </form>
    <button class="btn btn-success formButton" @click="saveProduct()">Bild hochladen</button>
  </div>
</template>

<script setup lang="ts">
  import {reactive} from "vue";
  import useVuelidate from "@vuelidate/core";
  import {required, minLength, maxLength} from "@vuelidate/validators";

  const state = reactive({
    name: '',
    price: '0,00€',
    negotiable: null,
    description: '',
    files: new Array<any>(),
  });

  const rules = {
    name: {required, minLength, maxLength},
    price: {required},
    negotiable: {required},
    description: {required, maxLength},
  }

  const v$ = useVuelidate(rules, state)

  function formatNames(files: any) {
    state.files = files.target.files;
  }

  function saveProduct() {
    console.log(v$);
  }
</script>

<style scoped>
.formButton{
  margin-left: 11em;
}
</style>