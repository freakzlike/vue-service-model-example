<template>
  <component :is="tag">
    <slot :label="label">
      {{ label }}
    </slot>
  </component>
</template>

<script>
  import {BaseModel} from 'vue-service-model'

  export default {
    name: 'ModelLabel',
    props: {
      model: {
        required: true,
        validator: val => val === null || val instanceof BaseModel
      },
      fieldName: {
        type: String,
        required: true
      },
      tag: {
        type: String,
        default: 'div'
      }
    },
    computed: {
      field () {
        return this.model ? this.model.getField(this.fieldName) : null
      }
    },
    asyncComputed: {
      async label () {
        return this.field ? this.field.label : null
      }
    }
  }
</script>
