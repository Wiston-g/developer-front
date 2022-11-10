<template>
  <nav class="navbar navbar-expand-lg bg-dark">
    <div class="container justify-content-evenly">
   
        <router-link 
            to="/" 
            class="nav-link" 
            :class="{ active : activePath.home }" 
            aria-current="page">
                <span class="material-icons-outlined materialsw">
                    inventory
                </span>
        </router-link>
        <router-link 
            to="/login" 
            class="nav-link" 
            :class="{ active : activePath.login }" 
            aria-current="page">
                <span class="material-icons-outlined materialsw">
                    done
                </span>
        </router-link>
        <router-link 
            to="/" 
            class="nav-link" 
            :class="{ active : activePath.about }"
            @click="logout()">
                <span class="material-icons-outlined materialsw">
                    logout
                </span>
        </router-link>
       
    </div>
  </nav>
  
  <router-view/>
</template>

<script>
export default {
    name:'NavComponents',
    computed: {
        activePath(){
            if (this.$route.path === '/') {
                return {
                home: true,
                login: false,
                register: false,
                about: false,
                }
            }else if(this.$route.path === '/login'){
                return {
                home: false,
                login: true,
                register: false,
                about: false,
                }
            }else if(this.$route.path === '/profile'){
                return {
                home: false,
                login: false,
                register: true,
                about: false,
                }
            }else if(this.$route.path === '/about'){
                return {
                home: false,
                login: false,
                register: false,
                about: true,
                }
            }
            
        }
    },
    methods:{
        logout(){
            
            const myHeaders =  {
                "Content-Type": "application/json",
                "Accept" : "application/json",
                'Authorization': 'Bearer ' +  localStorage.getItem('token'), 
            };

            let requestOptions = {
                method: 'GET',
                headers: myHeaders,
            };
            
            fetch('http://localhost:8000/api/create', requestOptions)
            .then(response => response.json())
            .then(result)
            .catch(error => console.log(error));

            localStorage.setItem('Token', '');
            this.$router.push('/')
        },
    },
}
</script>
<style scoped>
.active .materialsw{
    background-color: rgba(115, 255, 0, 0.4);
}
</style>
