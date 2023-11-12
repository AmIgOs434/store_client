const Router = require('express')

const router = new Router()
const deviceController = require('../controllers/deviceController')
const checkRole = require('../middleware/checkRoleMiddleware')
const authMiddleware = require('../middleware/authMiddleware')


router.post('/', deviceController.create)

router.post('/basket', deviceController.createBasketDevice)
router.delete('/basket/:id', deviceController.deleteBasketDevice)

router.get('/me/basket/:id', deviceController.getAllBasketDevice)
router.get('/me/basket',authMiddleware, deviceController.getAllBasketDevice_)
router.get('/basket/:id', authMiddleware,deviceController.getOneBasketDevice)
router.get('/basket/basket/:id', deviceController.getOneBasket)
router.put('/basket_/:id', deviceController.update_basket_)


router.get('/basket/get/:id',authMiddleware, deviceController.getOneBasketDeviceID)
router.put('/basket/get_2/:id', deviceController.getOneBasketDeviceID_2)
router.get('/basket/get_3/:id',authMiddleware, deviceController.getOneBasketDeviceID_3)
router.get('/devicesize/:id', deviceController.getDeviceInfo)
router.get('/deviceonesize/:id', deviceController.getOneDeviceInfo)
router.put('/basket/update/:id', deviceController.updateOneBasket)

router.put('/basket/put/:id', deviceController.updateOneBasketDevice)
router.put('/color/put/:id',authMiddleware, deviceController.updateOneColor)
router.put('/color/put_/:id',authMiddleware, deviceController.updateQuantity)
router.delete('/basket/delete/:id', authMiddleware,deviceController.deleteOneBasketDevice)
router.get('/item_order/:id',authMiddleware, deviceController.getAllBasketDevice_order)


router.get('/getoneColor/:id', deviceController.getoneColor)




router.post('/create_Glav_Str', deviceController.createGlavStr)
router.put('/put_Glav_Str/:id',authMiddleware, deviceController.putGlavStr)
router.get('/get_Glav_Str/:id', deviceController.getGlavStr)






router.get('/', deviceController.getAll) 
router.get('/:id', deviceController.getOne) 
router.delete('/:id',authMiddleware, deviceController.delOne)
router.put('/:id', authMiddleware,deviceController.updateOne)

router.get('/dev', deviceController.getAll1)
module.exports = router