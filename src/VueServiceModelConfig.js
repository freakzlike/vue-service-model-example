import {setConfig} from 'vue-service-model'

setConfig({
  events: {
    onSendDetailRequest: () => {
      console.log('Example event called')
    }
  }
})
