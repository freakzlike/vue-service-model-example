exports = module.exports = function (app, db) {
  /**
   * User list
   */
  app.get('/users', (req, res) => {
    const users = db.get('users').value()
    res.json(users)
  })

  /**
   * Create user
   */
  app.post('/users', (req, res) => {
    const user = {
      ...req.body,
      id: db.get('userId').value()
    }

    db.update('userId', n => n + 1).write()

    db.get('users').push(user).write()
    res.json(user)
  })

  /**
   * User detail
   */
  app.get('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id)
    const user = db.get('users').find({id: userId}).value()
    if (user) {
      res.json(user)
    } else {
      res.status(404).send('Not found')
    }
  })

  /**
   * Update user
   */
  app.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id)
    const user = db.get('users').find({id: userId}).value()
    if (user) {
      const newUserData = {
        ...user,
        ...req.body
      }

      db.get('users').find({id: userId}).assign(newUserData).write()
      res.json(newUserData)
    } else {
      res.status(404).send('Not found')
    }
  })

  /**
   * Delete user
   */
  app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id)
    db.get('users').remove(val => val.id === userId).write()
    res.status(204).send()
  })
}
