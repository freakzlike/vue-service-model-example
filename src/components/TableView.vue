<template>
  <table>
    <thead>
    <slot name="head"/>
    </thead>
    <tbody>
    <slot name="body"/>
    </tbody>
  </table>
</template>

<script>
  export default {
    name: 'TableView'
  }
</script>
