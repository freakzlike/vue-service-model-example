<template>
  <table-view>
    <template v-slot:head>
      <model-label tag="th" :model="model" field-name="id"/>
      <model-label tag="th" :model="model" field-name="name"/>
      <model-label tag="th" :model="model" field-name="username"/>
      <model-label tag="th" :model="model" field-name="email"/>
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
  import {DisplayField} from 'vue-service-model'

  import TableView from '@/components/TableView'
  import ModelLabel from '@/components/ModelLabel'

  import {User} from '@/models/User'

  export default {
    name: 'UserList',
    components: {
      DisplayField,
      TableView,
      ModelLabel
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
