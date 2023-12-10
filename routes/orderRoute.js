const Router = require('express')
const router = new Router()
const orderController = require('../controllers/orderController.js')

router.post('/',  orderController.createOrder_)
router.put('/get/',  orderController.getOne_Order_by_Track)

module.exports = router