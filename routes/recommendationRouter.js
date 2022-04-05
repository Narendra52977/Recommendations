const router=require('express').Router()
const recomndCtrl=require('../controllers/recommendationCtrl')
router.get('/:userid/recommendations',recomndCtrl.get_list)
router.post('/:userid/recommendation',recomndCtrl.addrecommendation)
router.patch('/:userid/recommendations',recomndCtrl.reset)
module.exports=router