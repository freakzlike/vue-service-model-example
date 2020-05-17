<template>
  <detail-view :error-message="errorMessage" :edit="edit">
    <detail-entry :model="user" field-name="id"/>
    <detail-entry :model="user" field-name="name" :edit="edit"/>
    <detail-entry :model="user" field-name="username" :edit="edit"/>
    <detail-entry :model="user" field-name="email" :edit="edit"/>
    <detail-entry :model="user" field-name="active" :edit="edit"/>
    <detail-entry :model="user" field-name="age" :edit="edit"/>

    <template v-if="user" v-slot:actions>
      <template v-if="edit">
        <router-link :to="cancelRoute" tag="button">Back</router-link>
        <button @click="saveUser">Save</button>
      </template>

      <template v-else>
        <router-link :to="{name: 'UserEdit', params: {pk}}" tag="button">Edit</router-link>
        <button @click="deleteUser">Delete</button>
      </template>
    </template>
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
        errorMessage: null,
        editMode: false
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
