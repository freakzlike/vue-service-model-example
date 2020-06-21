<template>
  <detail-view :edit="edit"
               :error-message="errorMessage"
               :edit-route="{name: 'AlbumEdit', params: {pk}}"
               :cancel-route="cancelRoute"
               @save="saveAlbum"
               @delete="deleteAlbum">
    <detail-entry :model="album" field-name="id"/>
    <detail-entry :model="album" field-name="title" :edit="edit"/>
  </detail-view>
</template>

<script>
  import {NotFoundAPIException} from 'vue-service-model'

  import DetailView from '@/components/DetailView'
  import DetailEntry from '@/components/DetailEntry'

  import {Album} from '@/models/Album'

  export default {
    name: 'AlbumDetail',
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
        album: null,
        errorMessage: null
      }
    },
    computed: {
      isCreate () {
        return this.edit && !this.pk
      },
      cancelRoute () {
        return this.isCreate ? {name: 'AlbumList'} : {name: 'AlbumDetail', params: {pk: this.pk}}
      }
    },
    watch: {
      pk () {
        this.loadAlbum()
      }
    },
    created () {
      if (this.isCreate) {
        this.album = new Album()
      } else {
        this.loadAlbum()
      }
    },
    methods: {
      async loadAlbum () {
        this.errorMessage = null

        try {
          this.album = await Album.objects.detail(this.pk)
        } catch (err) {
          if (err instanceof NotFoundAPIException) {
            this.errorMessage = 'Album not found'
          } else {
            throw err
          }
        }
      },
      async deleteAlbum () {
        await this.album.delete()
        this.$router.push({name: 'AlbumList'})
      },
      async saveAlbum () {
        await this.album.save()
        this.$router.push({name: 'AlbumDetail', params: {pk: this.album.pk}})
      }
    }
  }
</script>
