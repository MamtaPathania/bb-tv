const express = require('express');
const {getData, fetchid, commentsData, getComments, likeController, getlikestatus, getallcomments, checkUser} = require('./apiRoutes.controller');
const router=express.Router();

router.get('/videos',getData)
router.get('/video/:id',fetchid)
router.post('/video/comments',commentsData)
router.post('/video/getcomments',getComments)
router.post('/video/allcomments',getallcomments)
router.post('/video/like', likeController);
router.post('/video/getstatus', getlikestatus);

router.post('/check-user',checkUser)



module.exports=router