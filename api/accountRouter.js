const express = require('express')

const knex = require('../data/dbConfig')

const router = express.Router()

router.get('/', (req, res) => {
    knex
    .select('*')
    .from('accounts')
    .then(accounts => {
        res.status(200).json({data:accounts})
    })
    .catch(err => {
        res.status(500).json({message: err.message})
    })
})

router.get('/:id', (req, res) => {
    knex
    .select('*')
    .from('accounts')
    .where({id: req.params.id})
    .then(account => {
        res.status(200).json({data:account})
    })
    .catch(err => {
        res.status(500).json({message: err.message})
    })
})

router.post('/', (req, res) => {
    const body = req.body
    knex('accounts')
    .insert(body)
    .then(accounts => {
        res.status(201).json({data:accounts})
    })
    .catch(err => {
        res.status(500).json({message: err.message})
    })
})

router.put('/:id', (req, res) => {
    const {id} = req.params
    const changes = req.body

    knex('accounts')
    .where({id})
    .update(changes)
    .then(count => {
        if(count > 0) {
            res.status(201).json({message: 'Update successful'})
        } else {
            res.status(404).json({message: 'No accounts matches the id'})
        }
    })
    .catch(err => {
        res.status(500).json({message: err.message})
    })
})

router.delete('/:id', (req, res) => {
    const {id} = req.params

    knex('accounts')
    .where({id})
    .del()
    .then(count => {
        if (count > 0) {
            res.status(200).json({message:'Account deleted'})
        } else {
            res.status(400).json({message:'No account matches the id'})
        }
    })
    .catch(err => {
        res.status(500).json({message: err.message})
    })
})

module.exports = router