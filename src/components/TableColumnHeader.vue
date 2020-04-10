<template>
  <th>
    {{ label }}
  </th>
</template>

<script>
  import {BaseModel} from 'vue-service-model'

  export default {
    name: 'TableColumnHeader',
    props: {
      model: {
        type: BaseModel,
        required: true
      },
      fieldName: {
        type: String,
        required: true
      }
    },
    computed: {
      field () {
        return this.model.getField(this.fieldName)
      }
    },
    asyncComputed: {
      async label () {
        return this.field.label
      }
    }
  }
</script>
