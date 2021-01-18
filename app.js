const express = require('express')
const expressLayouts=require('express-ejs-layouts')

const app = express()
const port =5000
app.use(express.static("public"));

app.use("/styles", express.static(__dirname + "public/styles"));


const F=function(req,res,next){
    let date= new Date();
    let day = date.getDay();
    let hours = date.getHours();
    if (day!=6 && day !=0 && hours >8 && hours <17){
        console.log('new request recieved at '+Date.now())
        next();
    }else {
        next(res.send(`<div className='closing'><h1> Sorry we are closed , we are open from Monday to Friday ,08:00 to 17:00<br> Thank you for visiting</h1><img src="image/closing.gif" alt="closing" width="800" height="500"></img></div>
        `))
    }
}


app.use(expressLayouts,F)
app.set ('view engine','ejs')



// app.get ('',(req,res)=>{
//     res.render('index')        
// })
app.get ('',(req,res)=>{
    res.render('Home',{title:'Home', date:new Date()})        
})
app.get ('/contactUs',(req,res)=>{
    res.render('contactUs',{title:'Contact Us'})        
})
app.get ('/ourServices',(req,res)=>{
    res.render('ourServices',{title:'Our Services'})        
})

app.listen(port ,()=>console.info(`app listening on port : ${port}`))