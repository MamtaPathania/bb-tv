const {pool,connect} = require('../../database')
module.exports={
    getdetailsdata:(data,callback)=>{
        console.log(data,"=====data====")
        const query=process.env.SELECT_VIDEO
        pool.query(query,[],(err,result)=>{
            if(err){
                console.log(err,"error ")
                return callback(err,null)
            }
            console.log(result,"=======")
            return callback(null,result)
        })

    },
    fetchiddata:(req,callback)=>{
        const{id}=req.params
        console.log(req)

        const getid=process.env.FETCH_ID
        .replace('<ID>',id)
        console.log(getid)
        pool.query(getid,[],(err,result)=>{
       if(err){
        console.log(err)
        return callback(err,null);
       }
       console.log(result)
       return callback (null,result);
  })

    },
    insertcomments:(req,callback)=>{
        console.log(req,"===reqdata")
        const {message,videoId}=req.body
        
        const insertquery=process.env.INSERT_COMMENTS
        .replace('<message>',message)
        .replace('<videoId>',videoId)
        pool.query(insertquery,[],(err,result)=>{
            if(err){
                console.log(err,"error====")
                return callback(err,null)
            }
            console.log(result,"result=====")
            return callback(null,result)
        })
    },
    fetchComments:(req,callback)=>{
        // console.log(req.body,"req----")
    const {videoId}=req.body
        const fetchData=process.env.FETCH_COMMENTS
        .replace('<videoId>',videoId)
        pool.query(fetchData,[],(err,result)=>{
            if(err){
                console.log(err,"error in fetch comments")
                return callback(err,null)
            }
            console.log(result,"result")
            return callback(null,result)
        })
    },

    checkuserExist:(req,callback)=>{
      console.log(req.body,"req----")
      const {ani}=req.body
      const fetchUser=process.env.checkUser
      .replace('<ani>',ani)

      connect.query(fetchUser,[],(err,result)=>{
          if(err){
              console.log(err,"error in fetch comments")
              return callback(err,null)
          }
          console.log(result,"result")
          return callback(null,result)
      })
  },


    fetchallComments:(req,callback)=>{
      console.log(req.body,"req----")
      const {videoId}=req.body
      const fetchComments=process.env.FETCH_ALL_COMMENTS
      .replace('<videoId>',videoId)

      pool.query(fetchComments,[],(err,result)=>{
          if(err){
              console.log(err,"error in fetch comments")
              return callback(err,null)
          }
          console.log(result,"result")
          return callback(null,result)
      })
  },

    fetchLikes:(req,callback)=>{
        console.log(req.body,"req----")
    const {videoId}=req.body
        const fetchData=process.env.LIKE_STATUS
        .replace('<videoId>',videoId)
        pool.query(fetchData,[],(err,result)=>{
            if(err){
                console.log(err,"error in fetch comments")
                return callback(err,null)
            }
            console.log(result,"result")
            return callback(null,result)
        })
    },






// Function to toggle like status



  toggleLike: (videoId, callback) => {
    // Check if the video is already liked or not
    const likeStatus=process.env.CHECK_VIDEO_STATUS
    pool.query(likeStatus, [videoId], (err, rows) => {
      if (err) {
        console.error('Error selecting from likes table:', err);
        return callback(err);
      }

      if (rows.length === 0) {
        const InsertQuery=process.env.INSERT_LIKED_STATUS
        // If no like exists, create a new one
        pool.query(InsertQuery, [videoId], (err) => {
          if (err) {
            console.error('Error inserting into likes table:', err);
            return callback(err);
          }
          callback(null, 1,1); // Liked
        });
      } else {
        const toggleQuery=process.env.TOGGLE_STATUS
        // If like exists, toggle the status
        const newStatus = rows[0].status === 1 ? 0 : 1;
        pool.query(toggleQuery, [newStatus, videoId], (err) => {
          if (err) {
            console.error('Error updating likes table:', err);
            return callback(err);
          }
        //   callback(null, newStatus);
        const updatedLikeCount = newStatus === 1 ? rows.length : rows.length - 1;
        return callback(null, newStatus, updatedLikeCount);
        });
      }
    });
  }







   
}