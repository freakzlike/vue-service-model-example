<template>
  <div class="row">
    <div>
      <field-label tag="span" :model="model" :field-name="fieldName"/>
    </div>
    <div>
      <template v-if="edit">
        <input-field :model="model" :field-name="fieldName"/>
      </template>
      <template v-else>
        <display-field :model="model" :field-name="fieldName"/>
      </template>
    </div>
  </div>
</template>

<script>
  import {BaseModel, FieldLabel, DisplayField, InputField} from 'vue-service-model'

  export default {
    name: 'DetailEntry',
    components: {FieldLabel, DisplayField, InputField},
    props: {
      model: {
        required: true,
        validator: val => val === null || val instanceof BaseModel
      },
      fieldName: {
        type: String,
        required: true
      },
      edit: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style lang="sass" scoped>
  .row
    flex-direction: row
    display: flex
    flex: 1 1 auto
    flex-wrap: wrap
    text-align: left
    height: 32px

    > div
      flex: 0 0 50%
      width: 50%
      max-width: 50%
      margin-top: 4px
      margin-bottom: 4px
</style>
