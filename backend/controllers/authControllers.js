
//Dummy Testing 
const test = (req, res) => {
    res.json('test is working');
  };

//New Users 
const registerUser =async (req,res)=>{
 try {
  const {username,email,password} =req.body
  //username
  if(!username) {
    return res.json({
      error:"Usename is required"
    })
  }
  //email

  //password
  if(!password || password <8 ){
    return res.json({
      error:"Enter the Password and It should be Less that 8"
    })
  }


 } catch (error) {
  
 }
}

export {test,registerUser}