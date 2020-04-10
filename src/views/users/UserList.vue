<template>
  <table-view>
    <template v-slot:head>
      <table-column-header :model="model" field-name="id"/>
      <table-column-header :model="model" field-name="name"/>
    </template>

    <template v-slot:body>
      <template v-for="user in users">
        <tr :key="user.id">
          <td>
            <display-field :model="user" field-name="id"/>
          </td>
          <td>
            <display-field :model="user" field-name="name"/>
          </td>
        </tr>
      </template>
    </template>
  </table-view>
</template>

<script>
  import {DisplayField} from 'vue-service-model'

  import TableView from '@/components/TableView'
  import TableColumnHeader from '@/components/TableColumnHeader'

  import {User} from '@/models/User'

  export default {
    name: 'UserList',
    components: {
      DisplayField,
      TableView,
      TableColumnHeader
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
