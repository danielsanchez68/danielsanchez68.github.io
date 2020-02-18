<template>
  <div class="Login">
    <div class="jumbotron">
      <h2>
        <i>SIGNUP</i>
      </h2>
      <br />

      <form class="form" role="form" @submit.prevent="signup()" novalidate autocomplete="off">
        <div class="form-group">
          <input
            name="username"
            placeholder="Nombre"
            class="form-control"
            type="text"
            required
            v-model="f.username"
          />
        </div>

        <div class="form-group">
          <input
            name="password"
            placeholder="Password"
            class="form-control"
            type="password"
            required
            v-model="f.password"
          />
        </div>

        <br />

        <div class="form-group">
          <input
            name="firstName"
            placeholder="firstname"
            class="form-control"
            type="text"
            required
            v-model="f.firstName"
          />
        </div>

        <div class="form-group">
          <input
            name="lastName"
            placeholder="lastname"
            class="form-control"
            type="text"
            required
            v-model="f.lastName"
          />
        </div>

        <div class="form-group">
          <input
            name="email"
            placeholder="email"
            class="form-control"
            type="email"
            required
            v-model="f.email"
          />
        </div>

        <div class="form-group">
          <input class="btn btn-success my-3" type="submit" value="Signup" />
        </div>
      </form>
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
          password: '',
          firstName: '',
          lastName: '',
          email: ''
        }
      },
      validarDatos(f) {
        if(
            f.username == '' ||
            f.password == '' ||
            f.firstName == '' ||
            f.lastName == '' ||
            f.email == ''
          ) return false
          return true
      },
      signup() {
        
        //console.log(this.f)

        //check datos válidos
        if(this.validarDatos(this.f)) {
          console.log('Enviando datos...')
          let datos = {
              username: this.f.username,
              password: this.f.password,
              firstName: this.f.firstName,
              lastName: this.f.lastName,
              email: this.f.email
          }

          axios.post(api+'signup', datos)
          .then(() => {
              //console.log(respuesta.data)
              this.$router.push('/cpanel');

          })
          .catch(e => {
              console.log(`Error axios POST: ${e}`)
          })
          this.f = this.resetFormulario()
        }
        else {
          console.log('ERROR datos signup')
        }
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
  /* height: 100vh; */
}

.Login hr {
  background-color: #333;
}
</style>
