const { Router } = require('express')
authController = require('../controllers/authController')
todoController = require('../controllers/todoController')

const router = Router();

router.get('/signup', authController.signup_get);
router.post('/signup', authController.signup_post);
router.get('/login', authController.login_get);
router.post('/login', authController.login_post);
router.get('/logout', authController.logout_get);
router.post('/todo', todoController.todo_post)
router.delete('/:id', todoController.deleteTodo);
module.exports = router;