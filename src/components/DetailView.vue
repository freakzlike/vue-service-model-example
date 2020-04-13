<template>
  <div v-if="errorMessage">
    {{ errorMessage }}
  </div>
  <div v-else class="container">
    <slot/>

    <div class="actions">
      <slot name="actions"/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DetailView',
    props: {
      errorMessage: {
        type: String,
        default: null
      }
    }
  }
</script>

<style lang="sass" scoped>
  .container
    max-width: 700px
    margin-left: auto
    margin-right: auto

    .actions
      text-align: left

      > button
        margin: 4px
</style>
