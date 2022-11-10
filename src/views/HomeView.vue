<template>
  <div class="home">
    <div class="row">
      <div class="col-lg-6">
        <div class="img-cont">
          <img alt="Vue logo" src="../assets/img/logo.png" class="img-logo">
          <h2 class="text-center text-lg-end">Registro de desarrolladores</h2>
        </div>
      </div>
      <div class="col-lg-6">
        <card-components   class="mx-auto card-comp ">
          <FormRegComponents page :btns="btnArray"/>      
        </card-components>
      </div>
    </div>
  </div>
</template>

<script>
import CardComponents from "../components/CardComponents.vue";
import FormRegComponents from "../components/FormRegComponents.vue";

export default {
  name: 'Home',
  components: {
    CardComponents,
    FormRegComponents,
  },
  data(){
    return{
      btnArray: [
        {
          txt: 'Registraste',
          class: 'btn-primary',
          formu: 'register',
        },
      ],
    }
  },
}
</script>

<style scoped>
.img-logo{
  width:100%; 
  height: 95%;
}

.card-comp{
  max-width: 400px;
  margin-top: 8rem;
}

@media (min-width: 992px) {
  .home{
    margin: 4em auto;;
  }
  img{
    margin: 0;
  }
}
</style>