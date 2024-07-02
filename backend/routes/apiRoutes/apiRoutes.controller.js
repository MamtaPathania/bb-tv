const { getdetailsdata, fetchiddata, insertcomments, fetchComments, likeService, toggleLike, fetchLikes, fetchallComments, checkuserExist } = require("./apiRoutes.services")

const getData=(req,res)=>{
  getdetailsdata(req,(err,result)=>{
    if(err){
        console.log(err,"error in fething data")
        return res.status(400).json({error:err})
        
    }
    console.log(result,"======")
    return res.send(result)

  })
}
const fetchid=(req,res)=>{
  fetchiddata(req,(err,result)=>{
      if(err){
          console.log(err)
          res.status(400).json({error:err})
      }else{
          console.log(result);
          res.json({message:result})
      }  
  })
}
const commentsData=(req,res)=>{
  insertcomments(req,(err,result)=>{
    if(err){
      console.log(err,"error inserting comments")
      res.status(400).json({error:err})
    }
    console.log(result)
    res.json({message:"SUCCESS"})
  })
}
const getComments=(req,res)=>{

  var {videoId}=req.body
  console.log(videoId)
  fetchComments(req,(err,result)=>{
    if(err){
      console.log(err,"error fetching comments")
      res.status(400).json({error:err})
    }
    console.log(result,"=====res")
    res.json({message:result})
  })
}


const getallcomments=(req,res)=>{
  var {videoId}=req.body
  console.log(videoId)
  fetchallComments(req,(err,result)=>{
    if(err){
      console.log(err,"error fetching comments")
      res.status(400).json({error:err})
    }
    console.log(result,"=====res")
    res.json({message:result})
  })
}
// Toggle like controller
const likeController = (req, res) => {
  const { videoId } = req.body;

  toggleLike(videoId, (err, status,likes) => {
    if (err) {
      console.error('Error toggling like:', err);
      return res.status(500).json({ error: 'Server error' });
    }
    res.json({ status ,likes});
  });
};

const getlikestatus=(req,res)=>{

  var {videoId}=req.body
  console.log(videoId)
  fetchLikes(req,(err,result)=>{
    if(err){
      console.log(err,"error fetching comments")
      res.status(400).json({error:err})
    }
    console.log(result,"=====res")
    res.json({message:result})
  })
}


const checkUser=(req,res)=>{
  var {ani}=req.body
  console.log(ani)
  checkuserExist(req,(err,result)=>{
    if(err){
      console.log(err,"user not exist")
      res.status(400).json({error:err})
    }
    // console.log(result,"=====res")
    // res.json({message:result,statusId=1})
    if(result.length>0){
       
      return res.json({result,"statusId":"1","message":"Login Successfully"})

  }
  return res.json({result,"statusId":"0","message":"Number doesnot exist."})
  })
}




module.exports = {getData,fetchid,commentsData,getComments,likeController,getlikestatus,getallcomments,checkUser}