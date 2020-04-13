import {mount} from '@vue/test-utils'
import router from '@/router'

import UserDetail from '@/views/users/UserDetail'
import {User} from '@/models/User'

import db from '../../db.json'

describe('UserDetail', () => {
  it('should render detail correctly', async () => {
    expect(db.users[0].id).toBe(1)
    const user = new User(db.users[0])

    const mockUserObjectsDetail = jest.spyOn(User.objects, 'detail').mockImplementation(() => user)

    const wrapper = mount(UserDetail, {
      router,
      propsData: {
        pk: 1,
        edit: false
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

  it('should render edit correctly', async () => {
    expect(db.users[0].id).toBe(1)
    const user = new User(db.users[0])

    const mockUserObjectsDetail = jest.spyOn(User.objects, 'detail').mockImplementation(() => user)

    const wrapper = mount(UserDetail, {
      router,
      propsData: {
        pk: 1,
        edit: true
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

  it('should render create correctly', async () => {
    const mockUserObjectsDetail = jest.spyOn(User.objects, 'detail').mockImplementation()

    const wrapper = mount(UserDetail, {
      router,
      propsData: {
        pk: null,
        edit: true
      }
    })
    expect(wrapper.vm.user).not.toBeNull()
    expect(wrapper.vm.user.data).toEqual({})

    // Wait for ModelLabel and InputField to render correctly
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()

    expect(mockUserObjectsDetail).not.toBeCalled()
    mockUserObjectsDetail.mockRestore()
  })

  it('should save with data', async () => {
    const wrapper = mount(UserDetail, {
      router,
      propsData: {
        pk: null,
        edit: true
      }
    })
    expect(wrapper.vm.user).not.toBeNull()
    expect(wrapper.vm.user.data).toEqual({})

    const newUserId = 8

    const mockUserObjectsSave = jest.spyOn(wrapper.vm.user, 'save').mockImplementation(() => {
      wrapper.vm.user.val.id = newUserId
    })
    const mockRouterPush = jest.spyOn(wrapper.vm.$router, 'push').mockImplementation()

    // Wait for ModelLabel and InputField to render correctly
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()

    // Simulate input
    const newName = 'New Name'
    const nameInput = wrapper.findAll('input').at(0)
    nameInput.setValue(newName)

    // Check input mapped to model data
    expect(wrapper.vm.user.data).toEqual({
      name: newName
    })
    expect(await wrapper.vm.user.val.name).toEqual(newName)

    // Execute save
    await wrapper.vm.saveUser()

    // Check save call
    expect(mockUserObjectsSave).toBeCalledTimes(1)
    expect(mockUserObjectsSave.mock.calls[0]).toEqual([])
    mockUserObjectsSave.mockRestore()

    // Check router push
    expect(mockRouterPush).toBeCalledTimes(1)
    expect(mockRouterPush.mock.calls[0]).toEqual([{name: 'UserDetail', params: {pk: newUserId}}])
    mockRouterPush.mockRestore()
  })
})
