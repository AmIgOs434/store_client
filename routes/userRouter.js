const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController.js')
const authMiddleware = require('../middleware/authMiddleware')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware.js')
const checkMiddleware = require('../middleware/checkMiddleware.js')



router.post('/message', userController.postMessage)

router.post('/create_skid', userController.create_skidka)
router.put('/get_skid', userController.get_skidka)

router.post('/registration', userController.registration_0)
router.post('/promocode',authMiddleware, userController.create_promo)
router.get('/get/:id', userController.get_user)
router.put('/update/:id', userController.update_user)
router.put('/code/:id', userController.update_code)
router.put('/code_auth/:id', userController.update_code_auth)

router.put('/get_user_by_email', userController.get_user_by_email)

router.put('/auth_0', userController.auth_0)

// router.post('/login', userController.login)
// router.post('/login_0', userController.login_0)

module.exports = router 