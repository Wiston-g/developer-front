<template >
    <h2>Empleado</h2>
    <form   ref="user"
            @submit.prevent="saveForms()">

    <alerts-components v-for="ass in alertArray" :key="ass.txt" :alertas="alertArray"></alerts-components>
        <div class="mb-3 mt-3">
            <label for="exampleInputEmail1" class="form-label">Correo Electronico:</label>
            <input v-model="user.email" type="email" class="form-control" aria-describedby="emailHelp">
        </div>
        <div class="d-grid gap-2">
            <button type="submit" class="btn btn-primary mt-2">Buscar</button>          
        </div>
    </form>
</template>


<script>
import AlertsComponents from "../components/AlertsComponents.vue";

export default {    
    name: 'FormPerComponents',
    components: {
        AlertsComponents,
    },
    data () {
        return{
            alertArray:[],
            valicion:{
                valido: false,
            },
            users:[],
            user:{
                email: '',             
            },
        }
    },
    methods:{
        saveForms(){
            const myHeaders =  {
                "Content-Type": "application/json",
                "Accept" : "application/json",
            };

            let formdata = {
                'email': this.user.email,
            };

            this.users.push(formdata);
          
            let requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify(formdata),
            };
            console.log(formdata);
            fetch('http://localhost:8000/api/searchEmail', requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                if (result.status == 0) {
                    let msg = result.msg;
                    let alerta = {
                        class: 'alert-danger text-danger',
                        txt: msg,
                    }
                    this.alertArray.push(alerta);
                    setTimeout( () =>{ this.alertArray.length=0 },  2000);
                }
                
                if (result.status == 1) {
                    let msg = `id numero = ${result.user.id}  nombre =  ${result.user.name} correo =  ${result.user.email}  salario =  ${result.user.salary} ` ;
                    let alerta = {
                        class: 'alert-success text-success',
                        txt: msg,
                    }
                    this.alertArray.push(alerta);
                    setTimeout( () =>{ this.alertArray.length = 0 },  100000);
                };
            })
            .catch(error => console.log(error));

        },
    },
}
</script>

<style>

</style>