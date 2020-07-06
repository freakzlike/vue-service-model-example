import {ServiceModel, Field, CharField, ForeignKeyField} from 'vue-service-model'
import {User} from './User'

export class Album extends ServiceModel {
  static urls = 'http://localhost:3000/albums/'

  static fieldsDef = {
    id: new Field({primaryKey: true, label: 'ID'}),
    title: new CharField({label: 'Title'}),
    user: new ForeignKeyField({
      label: 'User',
      attributeName: 'userId',
      options: {
        model: User,
        fieldName: 'name'
      }
    })
  }
}
