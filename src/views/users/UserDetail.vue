<template>
  <detail-view :edit="edit"
               :error-message="errorMessage"
               :edit-route="{name: 'UserEdit', params: {pk}}"
               :cancel-route="cancelRoute"
               @save="saveUser"
               @delete="deleteUser">
    <detail-entry :model="user" field-name="id"/>
    <detail-entry :model="user" field-name="name" :edit="edit"/>
    <detail-entry :model="user" field-name="username" :edit="edit"/>
    <detail-entry :model="user" field-name="email" :edit="edit"/>
    <detail-entry :model="user" field-name="active" :edit="edit"/>
    <detail-entry :model="user" field-name="age" :edit="edit"/>
  </detail-view>
</template>

<script>
  import {NotFoundAPIException} from 'vue-service-model'

  import DetailView from '@/components/DetailView'
  import DetailEntry from '@/components/DetailEntry'

  import {User} from '@/models/User'

  export default {
    name: 'UserDetail',
    components: {DetailView, DetailEntry},
    props: {
      pk: {
        type: [String, Number],
        default: null
      },
      edit: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        user: null,
        errorMessage: null
      }
    },
    computed: {
      isCreate () {
        return this.edit && !this.pk
      },
      cancelRoute () {
        return this.isCreate ? {name: 'UserList'} : {name: 'UserDetail', params: {pk: this.pk}}
      }
    },
    watch: {
      pk () {
        this.loadUser()
      }
    },
    created () {
      if (this.isCreate) {
        this.user = new User()
      } else {
        this.loadUser()
      }
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
      },
      async deleteUser () {
        await this.user.delete()
        this.$router.push({name: 'UserList'})
      },
      async saveUser () {
        await this.user.save()
        this.$router.push({name: 'UserDetail', params: {pk: this.user.pk}})
      }
    }
  }
</script>
