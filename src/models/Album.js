import {ServiceModel, Field, CharField} from 'vue-service-model'

export class Album extends ServiceModel {
  static urls =  'http://localhost:3000/albums/'

  static fieldsDef = {
    id: new Field({primaryKey: true, label: 'ID'}),
    title: new CharField({label: 'Name'})
  }
}
