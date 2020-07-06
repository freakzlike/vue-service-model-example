<template>
  <div>
    <h2>Standalone field example</h2>

    <h5>Enter your Name:</h5>

    <div>
      <input-field :field="welcomeField"/>
    </div>

    <div>
      <display-field :field="welcomeField"/>
    </div>
  </div>
</template>

<script>
  import {CharField, InputField, DisplayField} from 'vue-service-model'

  class WelcomeMessageField extends CharField {
    async valueFormatter () {
      const name = await super.valueFormatter()
      return name ? `Welcome ${name}!` : null
    }
  }

  export default {
    name: 'StandaloneFieldExample',
    components: {InputField, DisplayField},
    data: () => ({
      welcomeField: new WelcomeMessageField({}, {value: null})
    })
  }
</script>
