<template>
  <div id="app">
    <h1>vue-service-model Example</h1>

    <div id="nav">
      <router-link to="/">Home</router-link>
      <span> - </span>
      <router-link :to="{name: 'UserList'}">Users</router-link>
    </div>

    <router-view/>
  </div>
</template>

<style lang="sass">
  #app
    font-family: Avenir, Helvetica, Arial, sans-serif
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    text-align: center
    color: #2c3e50

  #nav
    padding-bottom: 30px

    a
      font-weight: bold
      color: #2c3e50

      &.router-link-exact-active
        color: #42b983
</style>
