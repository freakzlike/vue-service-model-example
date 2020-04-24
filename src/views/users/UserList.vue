<template>
  <table-view>
    <template v-slot:actions>
      <button @click="loadUsers">Refresh</button>
      <router-link :to="{name: 'UserCreate'}" tag="button">Create</router-link>
    </template>

    <template v-slot:head>
      <field-label tag="th" :model="model" field-name="id"/>
      <field-label tag="th" :model="model" field-name="name"/>
      <field-label tag="th" :model="model" field-name="username"/>
      <field-label tag="th" :model="model" field-name="email"/>
    </template>

    <template v-slot:body>
      <template v-for="user in users">
        <tr :key="user.id">
          <td>
            <router-link :to="{name: 'UserDetail', params: {pk: user.pk}}">
              <display-field :model="user" field-name="id"/>
            </router-link>
          </td>

          <td>
            <router-link :to="{name: 'UserDetail', params: {pk: user.pk}}">
              <display-field :model="user" field-name="name"/>
            </router-link>
          </td>

          <td>
            <display-field :model="user" field-name="username"/>
          </td>

          <td>
            <display-field :model="user" field-name="email"/>
          </td>
        </tr>
      </template>
    </template>
  </table-view>
</template>

<script>
  import {FieldLabel, DisplayField} from 'vue-service-model'

  import TableView from '@/components/TableView'

  import {User} from '@/models/User'

  export default {
    name: 'UserList',
    components: {
      FieldLabel,
      DisplayField,
      TableView
    },
    data () {
      return {
        model: new User(),
        users: []
      }
    },
    created () {
      this.loadUsers()
    },
    methods: {
      async loadUsers () {
        this.users = await User.objects.list()
      }
    }
  }
</script>
