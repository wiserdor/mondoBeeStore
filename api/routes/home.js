// Import express
const express = require('express')
// Import home controller
const homeControllers = require('../controllers/home-controller.js')
// Create express router
const router = express.Router()
// Create rout between homeControllers and '/' endpoint
router.post('/send', homeControllers.send)
router.get('/catalog', homeControllers.catalog)
router.post('/catalog/add', homeControllers.addToCatalog)
// Export router
module.exports = router