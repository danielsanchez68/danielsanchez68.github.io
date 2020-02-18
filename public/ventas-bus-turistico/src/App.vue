<template>
  <div id="app">
    <!-- <div class="container-fluid"> -->
      <Navbar />
      <router-view></router-view>
    <!-- </div> -->
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue"


export default {
  name: "app",
  components: {
    Navbar
  },
  data() {
    return {
      mostrar: true
    };
  }
};
</script>

<style>

  body {
   
    background-image: url('https://www.cronista.com/__export/1561495852906/sites/diarioelcronista/img/2019/06/25/dcc210319-017f01_crop1561495852403.jpg_258117318.jpg');
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;/*100% 100vh;*/
  }

</style>
