import {mount} from '@vue/test-utils'
import UserList from '@/views/users/UserList'
import {User} from '@/models/User'

describe('UserList', () => {
  it('should render correctly', async () => {
    const users = [
      new User({id: 1, name: 'Leanne Graham'}),
      new User({id: 2, name: 'Ervin Howell'})
    ]

    const mockUserObjectsList = jest.spyOn(User.objects, 'list').mockImplementation(() => users)

    const wrapper = mount(UserList)
    expect(wrapper.vm.users).toHaveLength(0)

    // Wait to request users
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.users).toHaveLength(users.length)

    // Wait to render DisplayField
    await wrapper.vm.$nextTick()

    // Wait for DisplayField to resolve value
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()

    expect(mockUserObjectsList).toBeCalledTimes(1)
    expect(mockUserObjectsList.mock.calls[0]).toEqual([])
    mockUserObjectsList.mockRestore()
  })
})
