<template v-if="btns.formu == register" >
    
    <form   
            ref="user"
            :rules="rules"
            @submit.prevent="saveForm()">

          
        <alerts-components v-for="ass in alertArray" :key="ass.txt" :alertas="alertArray"></alerts-components>
        
        <div class="mb-3 mt-3">
            <label for="name" class="form-label">Nombre:</label>
            <input v-model="user.name" type="text" class="form-control" aria-describedby="emailHelp">
        </div>    
        <div class="mb-3 mt-3">
            <label for="email1" class="form-label">Correo Electronico:</label>
            <input v-model="user.email" type="email" class="form-control" aria-describedby="emailHelp">
        </div>
        <div class="mb-3 mt-3">
            <label for="phone" class="form-label">Telefono:</label>
            <input v-model="user.phone" type="number" class="form-control" aria-describedby="emailHelp">
        </div>    
        <div class="mb-3 mt-3">
            <label for="address" class="form-label">Direccion:</label>
            <input v-model="user.address" type="text" class="form-control" aria-describedby="emailHelp">
        </div>    
        <div class="mb-3 mt-3">
            <label for="position" class="form-label">Posicion:</label>
            <input v-model="user.position" type="text" class="form-control" aria-describedby="emailHelp">
        </div>    
        <div class="mb-3 mt-3">
            <label for="salary" class="form-label">Salario:</label>
            <input v-model="user.salary" type="number" class="form-control" aria-describedby="emailHelp">
        </div>  
        <div class="mb-3 mt-3">
            <label for="skills" class="form-label">Skills:</label>
            <input v-model="user.skills" type="text" class="form-control" aria-describedby="emailHelp">
        </div>    
        <div class="mb-3 mt-3">
            <label for="Password1" class="form-label">Contraseña</label>
            <input v-model="user.password" type="password" class="form-control" autocomplete="off" >
        </div>
        <div class="mb-3 mt-3 " >
            <label for="Password2" class="form-label">Confirmar Contraseña</label>
            <input v-model="user.password_confirmation" type="password" class="form-control" autocomplete="off" >
        </div>
               
        <div class="d-grid gap-2">
           <button         
                v-for="btn in btns" 
                :key="btn.txt" 
                type="submit" 
                class="btn mt-2" 
                :class="btn.class">
                    {{ btn.txt }}
            </button>
        </div>
    </form>
</template>


<script>
import AlertsComponents from "../components/AlertsComponents.vue";

export default {    
    name: 'FormRegComponents',
    props: ['btns'],
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
                name: '',
                email: '',
                phone: '',
                address:'',
                position:'',
                salary:'',
                skills:'',
                password: '',
                password_confirmation: ''
                
        
            },
            rules:{
                email:[{
                    required: true,
                    message: 'Campo required',
                }],
                password:[{
                    required: true,
                    message: 'Campo required',
                },
                {
                    min: 8,
                    message: 'limite de caracteres min 8',
                }],
                password_confirmation:[{
                    required: true,
                    message: 'Campo required',
                },
                {
                    min: 8,
                    message: 'limite de caracteres min 8',
                }],
            }
        }
    },
    methods:{
        validacionFormulario(datas){
            this.$ref['user'].validate((valid)=>{
                if (valid) {
                    return this.validacion.valido=true;
                }else{
                    return this.validacion.valido=false;
                }
            })
        },
        saveForm(){
           
            const myHeaders =  {
                "Content-Type": "application/json",
                "Accept" : "application/json",
            };

            let formdata = {
                'name': this.user.name,
                'email': this.user.email,
                'phone': this.user.phone,
                'address':this.user.address,
                'position': this.user.position,
                'salary': this.user.salary,
                'skills': this.user.skills,
                'password' : this.user.password,
                'password_confirmation' : this.user.password_confirmation,
            };

            this.users.push(formdata);
           
            let requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify(formdata),
                redirect: 'follow'
            };
            console.log(formdata);
            fetch('http://localhost:8000/api/register', requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.errors) {
                    let msg = result.errors;
                    let alerta = {
                        class: 'alert-danger text-danger',
                        txt: msg,
                    }
                    this.alertArray.push(alerta);
                    setTimeout( () =>{ this.alertArray.length=0 },  2000);
                    this.user.password = '';
                    this.user.password_confirmation ='';
                }
                
                if (result.status == 1) {
                    let msg = result.msg;
                    let alerta = {
                        class: 'alert-success text-success',
                        txt: msg,
                    }
                    this.alertArray.push(alerta);
                    setTimeout( () =>{ this.alertArray.length = 0 },  2000);
                    setTimeout(this.$router.push('/login'), 5000);
                };
            })
            .catch(error => console.log(error));

        },
    },
}
</script>

<style>

</style>