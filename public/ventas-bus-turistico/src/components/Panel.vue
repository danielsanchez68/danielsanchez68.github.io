<template>
  <div class="Panel">
    <div class="jumbotron" style="background-color: green;color: white;">
      <h1>USER OK LOGIN!</h1>
      <h2>
        <i>Bienvenido {{usuario}}</i>
      </h2>
      <br />
      <h3>Nombre: {{nombre}}</h3>
      <h3>Apellido: {{apellido}}</h3>
      <h3>Email: {{email}}</h3>
      <button class="btn btn-danger my-5" @click="logout()">LOGOUT</button>
    </div>
  </div>
</template>

<script lang="js">
  import axios from 'axios'
  axios.defaults.withCredentials = true  // enable axios post cookie, default false
  const api = process.env.NODE_ENV === 'production'? '/': 'http://localhost:8000/'

  import miMixin from '../mixins/myMixin'

  export default  {
    name: 'Panel',
    props: [],
    mixins: [miMixin],
    beforeCreate () {
      //console.log('Contador beforeCreate')
    },
    created () {
      console.log('Contador created')
    },

    beforeMount () {
      //console.log('Contador beforeMount')
    },
    mounted () {
      console.log('Contador usuario')
      
       
        axios.get(api+'datos')
        .then(respuesta => {
            //console.log(respuesta.data)
            this.usuario =  respuesta.data.username
            this.nombre = respuesta.data.firstName
            this.apellido = respuesta.data.lastName
            this.email =  respuesta.data.email
        })
        .catch(e => {
            console.log(`Error axios GET mounted panel: ${e}`)
        })
      
      //this.refInterval = setInterval(() => {
      //  console.log('Hola!')//, this.contador2++)
      //}, 2000);
    },

    beforeUpdate () {
      //console.log('Contador beforeUpdate')
    },
    updated () {
      console.log('Contador updated')
    },

    beforeDestroy () {
      //console.log('Contador beforeDestroy')
    },
    destroyed () {
      console.log('Contador destroyed')
      //clearInterval(this.refInterval)
    },

    data () {
      return {
        contador : parseInt(this.valorInicial),
        contador2 : 0,
        usuario: '',
        nombre: '',
        apellido: '',
        email: ''
      }
    },
    methods: {
      /* incrementar() {
        this.contador++
      } */
        logout() {
            axios.get(api+'logout')
            .then(() => {
                //console.log(respuesta.data)
                this.$router.push('/clogin');
            })
            .catch(e => {
                console.log(`Error axios GET: ${e}`)
            })
        }
    },
    computed: {
      mostrarContador() {
        return this.contador
      }
    }
}


</script>

<style scoped>
.Panel {
}
.Panel .jumbotron {
  margin-top: 30px;
  opacity: 0.95;

/* background-color: darkgreen; */
  /* color: white; */
}
</style>
