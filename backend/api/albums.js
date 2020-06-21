exports = module.exports = function (app, db) {
  /**
   * Album list
   */
  app.get('/albums', (req, res) => {
    const albums = db.get('albums').value()
    res.json(albums)
  })

  /**
   * Create album
   */
  app.post('/albums', (req, res) => {
    const album = {
      ...req.body,
      id: db.get('albumId').value()
    }

    db.update('albumId', n => n + 1).write()

    db.get('albums').push(album).write()
    res.json(album)
  })

  /**
   * Album detail
   */
  app.get('/albums/:id', (req, res) => {
    const albumId = parseInt(req.params.id)
    const album = db.get('albums').find({id: albumId}).value()
    if (album) {
      res.json(album)
    } else {
      res.status(404).send('Not found')
    }
  })

  /**
   * Update album
   */
  app.put('/albums/:id', (req, res) => {
    const albumId = parseInt(req.params.id)
    const album = db.get('albums').find({id: albumId}).value()
    if (album) {
      const newAlbumData = {
        ...album,
        ...req.body
      }

      db.get('albums').find({id: albumId}).assign(newAlbumData).write()
      res.json(newAlbumData)
    } else {
      res.status(404).send('Not found')
    }
  })

  /**
   * Delete album
   */
  app.delete('/albums/:id', (req, res) => {
    const albumId = parseInt(req.params.id)
    db.get('albums').remove(val => val.id === albumId).write()
    res.status(204).send()
  })
}
