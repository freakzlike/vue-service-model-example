<template>
  <table-view>
    <template v-slot:actions>
      <button @click="loadAlbums">Refresh</button>
      <router-link :to="{name: 'AlbumCreate'}" tag="button">Create</router-link>
    </template>

    <template v-slot:head>
      <field-label tag="th" :model="model" field-name="id"/>
      <field-label tag="th" :model="model" field-name="title"/>
    </template>

    <template v-slot:body>
      <template v-for="album in albums">
        <tr :key="album.id">
          <td>
            <router-link :to="{name: 'AlbumDetail', params: {pk: album.pk}}">
              <display-field :model="album" field-name="id"/>
            </router-link>
          </td>

          <td>
            <router-link :to="{name: 'AlbumDetail', params: {pk: album.pk}}">
              <display-field :model="album" field-name="title"/>
            </router-link>
          </td>
        </tr>
      </template>
    </template>
  </table-view>
</template>

<script>
  import {FieldLabel, DisplayField} from 'vue-service-model'

  import TableView from '@/components/TableView'

  import {Album} from '@/models/Album'

  export default {
    name: 'AlbumList',
    components: {
      FieldLabel,
      DisplayField,
      TableView
    },
    data () {
      return {
        model: Album,
        albums: []
      }
    },
    created () {
      this.loadAlbums()
    },
    methods: {
      async loadAlbums () {
        this.albums = await Album.objects.list()
      }
    }
  }
</script>
