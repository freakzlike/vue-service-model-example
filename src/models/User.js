import {ServiceModel, Field} from 'vue-service-model'

export class User extends ServiceModel {
  static urls =  'http://localhost:3000/users/'

  static fieldsDef = {
    id: new Field({primaryKey: true, label: 'ID'}),
    name: new Field({label: 'Name'}),
    username: new Field({label: 'Username'}),
    email: new Field({label: 'Email'})
  }
}
