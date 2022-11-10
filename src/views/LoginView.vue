<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-3">
        <card-components  class="mt-2 mx-auto card-comp "> 
          <div class="d-grid gap-2">
            <button class="btn btn-dark" @click="showPerAll()">Todos los empleados</button>   
          </div>
          <div class="d-grid gap-2">
            <button class="btn btn-dark" @click="showPerFavorite()">Rango</button>   
          </div>
          <div class="d-grid gap-2">
            <button class="btn btn-dark" @click="showForm()">Buscar Email</button>   
          </div>
          
        </card-components>
      </div>

      <div class="col-lg-9 bg-secundary mt-2 pb-2"  v-if="showForms.allPer == true">
        <div class="mt-2 mb-4">
          <h2>Todos los empleados</h2>
        </div>
        <card-components   
          v-for="personaje in allpersonajes" 
          :key="personaje.name"
          class="mt-2 mx-auto single-post"
          :title="personaje.name"
          :parrafo="personaje.id"
          :email="personaje.email"
          :salary="personaje.salary"
          >
            <button class="btn btn-primary mt-2" @click="perso = personaje.id"> Mas informacion</button>
           <h3 v-if="personaje.id == perso ">Telefono = {{personaje.phone}}</h3> 
           <h3 v-if="personaje.id == perso ">Posicion = {{personaje.position}}</h3> 
           <h3 v-if="personaje.id == perso ">Habilidades = {{personaje.skills}}</h3> 
        </card-components>
      </div>  

      <div class="col-lg-9" v-if="showForms.estado == true">
        <div class="mt-2 mb-4">
          <h2>Buscar empleado</h2>
        </div>
        <card-components  class="mt-2 mx-auto card-comp ">    
          <FormPerComponents/>  
        </card-components>
      </div>

      <div class="col-lg-9 bg-secundary mt-2 pb-2" v-if="showForms.personajesF == true">
        <div class="mt-2 mb-4">
          <h2>Rango salarial</h2>
        </div>
        <card-components  class="mt-2 mx-auto card-comp ">     
          <FormComponents/>  
        </card-components> 
      </div>

    </div>
  </div>
</template>

<script>
import CardComponents from "../components/CardComponents.vue";
import FormPerComponents from "../components/FormPerComponents.vue";
import FormComponents from "../components/FormComponents.vue";

export default {
  name: 'Profile',
  components: {
    CardComponents,
    FormPerComponents,
    FormComponents
  },
  data(){
    return{
      perso: null,
      btnArray: [
        {
          txt: 'Agregar favorito ',
          class: 'btn-primary',
          formu: 'login',
        },
      ],
      user:[],
      favorites:[],
      allpersonajes:[],
      showForms: {
        estado: false,
        personajesF : true,
        allPer: false,
      },
    }
  },
  methods:{
    showForm(){
      if (this.showForms.estado == false){  
        this.showForms.estado = true;
        this.showForms.personajesF = false;
        this.showForms.allPer = false;
      }
    },
    showPerFavorite(){
      if (this.showForms.personajesF == false){
        this.showForms.estado = false;
        this.showForms.allPer = false;
        this.showForms.personajesF = true;
      } 
    },
    showPerAll(){
      if (this.showForms.allPer == false){
        this.getUsert();
        this.showForms.estado = false;
        this.showForms.allPer = true;
        this.showForms.personajesF = false;
      } 
    },
    getUsert(){
      this.allpersonajes.length=0;
      const myHeaders =  {
        "Content-Type": "application/json",
        "Accept" : "application/json",
        };

        let requestOptions = {
          method: 'GET',
          headers: myHeaders,
        };
    
        fetch('http://localhost:8000/api/show', requestOptions)
          .then(response => response.json())
          .then(result => {console.log(result);
            result.forEach(element => {
              let favorit = {
                id: element.id,
                name: element.name,
                email: element.email,
                phone: element.phone,
                position: element.position,
                salary: element.salary,
                skills: element.skills,
              }
              
              this.allpersonajes.push(favorit);
            });
          })
          .catch(error => console.log(error));      
    },
    
  },
}
</script>

<style>

</style>