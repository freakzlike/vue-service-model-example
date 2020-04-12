<template>
  <div v-if="errorMessage">
    {{ errorMessage }}
  </div>
  <div v-else class="container">
    <detail-entry :model="user" field-name="id"/>
    <detail-entry :model="user" field-name="name"/>
    <detail-entry :model="user" field-name="username"/>
    <detail-entry :model="user" field-name="email"/>
  </div>
</template>

<script>
  import {NotFoundAPIException} from 'vue-service-model'

  import {User} from '@/models/User'
  import DetailEntry from '@/components/DetailEntry'

  export default {
    name: 'UserDetail',
    components: {DetailEntry},
    props: {
      pk: {
        type: [String, Number],
        required: true
      }
    },
    data () {
      return {
        user: null,
        errorMessage: null,
        editMode: false
      }
    },
    watch: {
      pk () {
        this.loadUser()
      }
    },
    created () {
      this.loadUser()
    },
    methods: {
      async loadUser () {
        this.errorMessage = null

        try {
          this.user = await User.objects.detail(this.pk)
        } catch (err) {
          if (err instanceof NotFoundAPIException) {
            this.errorMessage = 'User not found'
          } else {
            throw err
          }
        }
      }
    }
  }
</script>

<style lang="sass" scoped>
  .container
    max-width: 700px
    margin-left: auto
    margin-right: auto
</style>
