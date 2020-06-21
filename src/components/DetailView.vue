<template>
  <div v-if="errorMessage">
    {{ errorMessage }}
  </div>
  <div v-else class="container">
    <slot/>

    <div class="actions">
      <template v-if="edit">
        <router-link :to="cancelRoute" tag="button">Back</router-link>
        <button @click="doSave">Save</button>
      </template>

      <template v-else>
        <router-link :to="editRoute" tag="button">Edit</router-link>
        <button @click="doDelete">Delete</button>
      </template>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DetailView',
    props: {
      edit: {
        type: Boolean,
        default: false
      },
      errorMessage: {
        type: String,
        default: null
      },
      editRoute: {
        type: Object,
        default: null
      },
      cancelRoute: {
        type: Object,
        default: null
      }
    },
    methods: {
      doSave () {
        this.$emit('save')
      },
      doDelete () {
        this.$emit('delete')
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
