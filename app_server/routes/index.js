var express = require('express');
var ctrlMain = require('../controllers/projects');
var ctrlAcc = require('../controllers/account');
var router = express.Router();

/* GET home page. */
router.get('/', ctrlAcc.welcome);
router.get('/projects', ctrlMain.prjList);
router.post('/projects', ctrlMain.newPrj);


router.get('/delete/:id', ctrlMain.delPrj);
//router.get('/:id/', ctrlMain.taskList);
router.post('/:id/new', ctrlMain.newTask);
router.get('/:pid/delete/:tid', ctrlMain.delTask);

router.get('/register', ctrlAcc.regForm);
router.post('/register', ctrlAcc.regist);
router.get('/login', ctrlAcc.loginForm);
router.post('/login', ctrlAcc.login);
router.get('/logout', ctrlAcc.logout);

module.exports = router;