<template>
  <div class="Login">
    <div class="jumbotron">
      <h2>
        <i>LOGIN</i>
      </h2>
      <br />

      <form class="form" role="form" @submit.prevent="login()" novalidate autocomplete="off">
        <div class="form-group">
          <input
            name="username"
            v-model="f.username"
            placeholder="Nombre"
            class="form-control"
            type="text"
            required
          />
        </div>
        <div class="form-group">
          <input
            name="password"
            v-model="f.password"
            placeholder="Password"
            class="form-control"
            type="password"
            required
          />
        </div>

        <div class="form-group">
          <input class="btn btn-success my-3" type="submit" value="Login" />
        </div>
      </form>

      <hr />
      <div class="text-center"></div>
      <router-link to="/csignup">
        <a class="btn btn-success my-3" href="">Ir a Signup</a>
      </router-link>

      <!-- <a class="btn btn-success my-3" href="/signup">SIGNUP</a> -->
    </div>
  </div>
</template>

<script lang="js">
  import axios from 'axios'
  axios.defaults.withCredentials = true  // enable axios post cookie, default false
  const api = process.env.NODE_ENV === 'production'? '/': 'http://localhost:8000/'

  export default  {
    name: 'Login',
    props: [],
    mounted () {
      console.log('mounted login')
       
        axios.get(api+'login')
        .then(respuesta => {
            console.log(respuesta.data)
            if(respuesta.data.login == 'ok') {
              this.$router.push('/cpanel');
            }
        })
        .catch(e => {
            console.log(`Error axios GET mounted login: ${e}`)
        })
      
      //this.refInterval = setInterval(() => {
      //  console.log('Hola!')//, this.contador2++)
      //}, 2000);
    },
    data () {
      return {
        f : this.resetFormulario()
      }
    },
    methods: {
      resetFormulario() {
        return {
          username : '',
          password: ''
        }
      },
      login() {
        //console.log(this.f)
        console.log('Enviando credenciales...')
        let datos = {
            username: this.f.username,
            password: this.f.password
        }
        axios.post(api+'login',datos)
        .then(respuesta => {
            console.log(respuesta.data)
            if(respuesta.data.login == 'ok') {
              this.$router.push('/cpanel');
            }
        })
        .catch(e => {
            console.log(`Error axios POST: ${e}`)
        })
        this.f = this.resetFormulario()
      }
    },
    computed: {

    }
}


</script>

<style scoped>
.Login {
}

.Login .jumbotron {
  margin-top: 30px;
  opacity: 0.95;
  /* background-color: pink; */
  /* color: brown; */
 /*  height: 100vh; */
}

.Login hr {
  background-color: #333;
}
</style>
