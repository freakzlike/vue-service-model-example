<template>
  <div class="container">
    <div class="actions">
      <slot name="actions"/>
    </div>
    <table>
      <thead>
      <slot name="head"/>
      </thead>
      <tbody>
      <slot name="body"/>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'TableView'
  }
</script>

<style lang="sass" scoped>
  .container
    max-width: 1000px
    margin-left: auto
    margin-right: auto

    .actions
      text-align: left

      > button
        margin: 4px
</style>
