import {mount} from '@vue/test-utils'
import router from '@/router'

import UserDetail from '@/views/users/UserDetail'
import {User} from '@/models/User'

import db from '../../db.json'

describe('UserDetail', () => {
  it('should render correctly', async () => {
    expect(db.users[0].id).toBe(1)
    const user = new User(db.users[0])

    const mockUserObjectsDetail = jest.spyOn(User.objects, 'detail').mockImplementation(() => user)

    const wrapper = mount(UserDetail, {
      router,
      propsData: {
        pk: 1
      }
    })
    expect(wrapper.vm.user).toBeNull()

    // Wait to request users
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.user).toEqual(user)

    // Wait to render DisplayField
    await wrapper.vm.$nextTick()

    // Wait for DisplayField to resolve value
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()

    expect(mockUserObjectsDetail).toBeCalledTimes(1)
    expect(mockUserObjectsDetail.mock.calls[0]).toEqual([1])
    mockUserObjectsDetail.mockRestore()
  })
})
