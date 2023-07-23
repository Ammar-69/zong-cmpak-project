const express = require('express')

const router = express.Router() // creating router object

const H3C = require('../models/H3C')
const ISB = require('../models/ISB')
const LHR = require('../models/LHR')

router.get('/h3c', (req, res) => {
  H3C.find({}).then(data => {
    res.json({
      message: 'Fetched all the machines',
      result: data
    })
  })
})

router.get('/lhr', (req, res) => {
  LHR.find({}).then(data => {
    res.json({
      message: 'Fetched all the machines',
      result: data
    })
  })
})

router.get('/isb', (req, res) => {
  ISB.find({}).then(data => {
    res.json({
      message: 'Fetched all the machines',
      result: data
    })
  })
})

router.delete('/h3c/delete', (req, res) => {
  H3C.deleteOne({ _id: req.body.id }).then(result => {
    if (result.acknowledged) {
      res.json({ message: 'Successfully deleted.' })
    } else {
      console.error('Error deleting document:', err)
      res.status(500).json({ message: 'Error deleting document.' })
      return
    }
  })
})

router.delete('/lhr/delete', (req, res) => {
  LHR.deleteOne({ _id: req.body.id }).then(result => {
    if (result.acknowledged) {
      res.json({ message: 'Successfully deleted.' })
    } else {
      console.error('Error deleting document:', err)
      res.status(500).json({ message: 'Error deleting document.' })
      return
    }
  })
})

router.delete('/isb/delete', (req, res) => {
  ISB.deleteOne({ _id: req.body.id }).then(result => {
    if (result.acknowledged) {
      res.json({ message: 'Successfully deleted.' })
    } else {
      console.error('Error deleting document:', err)
      res.status(500).json({ message: 'Error deleting document.' })
      return
    }
  })
})

router.post('/h3c/add', async (req, res) => {
  H3C.create({ ...req.body.data })
    .then(doc => {
      res.status(201).json({
        message: 'Created',
        result: doc
      })
    })
    .catch(err => {
      res.status(400).json({
        message: 'Missing parameters',
        error: true
      })
    })
})

router.post('/lhr/add', async (req, res) => {
  LHR.create({ ...req.body.data })
    .then(doc => {
      res.status(201).json({
        message: 'Created',
        result: doc
      })
    })
    .catch(err => {
      res.status(400).json({
        message: 'Missing parameters',
        error: true
      })
    })
})

router.post('/isb/add', async (req, res) => {
  ISB.create({ ...req.body.data })
    .then(doc => {
      res.status(201).json({
        message: 'Created',
        result: doc
      })
    })
    .catch(err => {
      res.status(400).json({
        message: 'Missing parameters',
        error: true
      })
    })
})

router.post('/h3c/edit', async (req, res) => {
  const data = req.body.data

  if (data._id == null) {
    return res.status(400).json({
      message: 'Missing ID',
      error: true
    })
  }

  const updateObject = Object.keys(data).reduce((result, key) => {
    if (key != '_id') {
      result[key] = data[key]
    }
    return result
  }, {})

  H3C.findOneAndUpdate({ _id: data._id }, { ...updateObject })
    .then(doc => {
      res.json({ message: 'Successfully edited!', result: updateObject })
    })
    .catch(err => {
      res.status(400).json({
        message: 'Missing parameters',
        error: true
      })
    })
})

router.post('/lhr/edit', async (req, res) => {
  const data = req.body.data

  if (data._id == null) {
    return res.status(400).json({
      message: 'Missing ID',
      error: true
    })
  }

  const updateObject = Object.keys(data).reduce((result, key) => {
    if (key != '_id') {
      result[key] = data[key]
    }
    return result
  }, {})

  LHR.findOneAndUpdate({ _id: data._id }, { ...updateObject })
    .then(doc => {
      res.json({ message: 'Successfully edited!', result: updateObject })
    })
    .catch(err => {
      res.status(400).json({
        message: 'Missing parameters',
        error: true
      })
    })
})

router.post('/isb/edit', async (req, res) => {
  const data = req.body.data

  if (data._id == null) {
    return res.status(400).json({
      message: 'Missing ID',
      error: true
    })
  }

  const updateObject = Object.keys(data).reduce((result, key) => {
    if (key != '_id') {
      result[key] = data[key]
    }
    return result
  }, {})

  ISB.findOneAndUpdate({ _id: data._id }, { ...updateObject })
    .then(doc => {
      res.json({ message: 'Successfully edited!', result: updateObject })
    })
    .catch(err => {
      res.status(400).json({
        message: 'Missing parameters',
        error: true
      })
    })
})

router.post('/search', (req, res) => {
  const { Name: name, Project: project, 'IPv4 Address': ip } = req.body.data

  const query = {}

  if (name) {
    query['Name'] = { $regex: name }
  }

  if (project) {
    query['Project'] = { $regex: project }
  }

  if (ip) {
    query['IPv4 Address'] = { $regex: ip }
  }

  // H3C.find(query)
  //   .then(docs => {
  //     res.json({ message: 'Search completed!', result: docs })
  //   })
  //   .catch(err => {
  //     res.json({ message: 'No results found!' })
  //   })

  Promise.allSettled([H3C.find(query), LHR.find(query), ISB.find(query)])
    .then(result => {
      result = result.filter(value => value.status == 'fulfilled')
      if (result.length == 0) {
        res.json({ message: 'No results found!' })
      } else {
        res.json({
          message: 'Search completed!',
          result: [
            ...result.reduce((previous, current) => {
              return [...previous, ...current.value]
            }, [])
          ]
        })
      }
    })
    .catch(err => {
      res.json({ message: 'No results found!' })
    })
})

module.exports = router
