import {shallowMount} from '@vue/test-utils'
import TableColumnHeader from '@/components/TableColumnHeader.vue'
import {BaseModel, Field} from 'vue-service-model'

describe('TableColumnHeader', () => {
  const label = 'Field label'

  class TestModel extends BaseModel {
    static fieldsDef = {
      title: new Field({label})
    }
  }

  it('should render field label', async () => {
    const wrapper = shallowMount(TableColumnHeader, {
      propsData: {
        model: new TestModel(),
        fieldName: 'title'
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
