<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-info mb-0">
    <router-link to="/">
        <a class="navbar-brand">VBusT 1.0.0</a>
    </router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">

        <!-- LINK LOGIN -->  
        <li class="nav-item">
          <router-link tag="li" to="/clogin">
            <a class="nav-link">Login</a>
          </router-link>
        </li>

        <!-- LINK SIGNUP -->  
        <li class="nav-item">
          <router-link tag="li" to="/csignup">
            <a class="nav-link">Signup</a>
          </router-link>
        </li>

      </ul>
    </div>
  </nav>
</template>