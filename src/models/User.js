import {ServiceModel, Field, CharField, BooleanField} from 'vue-service-model'

export class User extends ServiceModel {
  static urls =  'http://localhost:3000/users/'

  static fieldsDef = {
    id: new Field({primaryKey: true, label: 'ID'}),
    name: new CharField({label: 'Name'}),
    username: new CharField({label: 'Username'}),
    email: new CharField({label: 'Email'}),
    active: new BooleanField({label: 'Active'})
  }
}
