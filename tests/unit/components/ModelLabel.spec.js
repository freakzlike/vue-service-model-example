import {shallowMount} from '@vue/test-utils'
import ModelLabel from '@/components/ModelLabel.vue'
import {BaseModel, Field} from 'vue-service-model'

describe('ModelLabel', () => {
  const label = 'Field label'

  class TestModel extends BaseModel {
    static fieldsDef = {
      title: new Field({label})
    }
  }

  it('should render field label', async () => {
    const wrapper = shallowMount(ModelLabel, {
      propsData: {
        model: new TestModel(),
        fieldName: 'title',
        tag: 'div'
      }
    })
    expect(wrapper.vm.field).toBeInstanceOf(Field)
    expect(wrapper.vm.label).toBeNull()

    // Wait for asyncComputed to be resolved and re-render
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.label).toBe(label)
    expect(wrapper.text()).toMatch(label)
  })
})
