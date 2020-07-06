<template>
  <div>
    <hr/>

    <div class="user-example-link">
      See a complete service example
      <router-link :to="{name: 'UserList'}">here.</router-link>
    </div>

    <hr/>

    <standalone-field-example/>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    components: {
      'standalone-field-example': () => import('./StandaloneFieldExample')
    }
  }
</script>

<style scoped>
  .user-example-link {
    margin: 24px 0;
  }
</style>
