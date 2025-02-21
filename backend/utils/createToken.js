import jwt from 'jsonwebtoken'

const generateToken = (res,usedId) =>{
    const token =jwt.sign({usedId},process.env.JWT_SECRET,
        {expiresIn:"45d",}
    )

    //Set JWT as a HTTP only 
res.cookie('jwt',token,{
    httpOnly: true,
    secure:process.env.NODE.ENV !== 'development',
    sameSite:'strict',
    maxAge: 30* 24* 60* 60* 1000
})

 return token;
}

export default generateToken

