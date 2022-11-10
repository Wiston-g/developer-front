<template >
    <h2>rango</h2>
    <form   ref="user"
            @submit.prevent="saveForms()">

    <alerts-components v-for="ass in alertArray" :key="ass.txt" :alertas="alertArray"></alerts-components>
        <div class="mb-3 mt-3">
            <label for="rangeMin" class="form-label">Rango menor:</label>
            <input v-model="user.rangeMin" type="number" class="form-control" aria-describedby="emailHelp">
        </div>
        <div class="mb-3 mt-3">
            <label for="rangeMax" class="form-label">Rango mayor:</label>
            <input v-model="user.rangeMax" type="number" class="form-control" aria-describedby="emailHelp">
        </div>
        <div class="d-grid gap-2">
            <button type="submit" class="btn btn-primary mt-2">Buscar</button>          
        </div>
    </form>

    <div v-for="user in users" :key="user.name">
        <div class="card bg-succes mt-3 text-dark" >
            <div class="card-body">
                <div class="row">
                    {{user.name}} <br>
                    {{user.email}} <br>
                    {{user.salary}}
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import AlertsComponents from "../components/AlertsComponents.vue";

export default {    
    name: 'FormComponents',
    components: {
        AlertsComponents,
    },
    data () {
        return{
            alertArray:[],
            users:[],
            user:{
                rangeMin: '',             
                rangeMax: '',             
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
                'rangeMin': this.user.rangeMin,
                'rangeMax': this.user.rangeMax,
            };
          
            let requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify(formdata),
            };
            console.log(formdata);
            fetch('http://localhost:8000/api/range', requestOptions)
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
                this.users.length = 0 
                if (result.status == 1) {
                    let msg = result.msg ;
                    let alerta = {
                        class: 'alert-success text-success',
                        txt: msg,
                    }
                    result.user.forEach(element => {
                        this.users.push(element);
                    });
                    
                    
                    this.alertArray.push(alerta);
                    setTimeout( () =>{ this.alertArray.length = 0 },  2000);
                    console.log(this.users);
                };
            })
            .catch(error => console.log(error));
            

        },
    },
}
</script>

<style>

</style>