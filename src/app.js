const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

// Define paths for Express config
const publicDir =path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')



//setup handlebars wngine and view location
app.set('view engine','hbs') //pathของปกติต้องตั้งโฟร์เดอร์ชื่อviews
app.set('views',viewPath) //pathของ viewPathหาโฟล์เดอร์template
hbs.registerPartials(partialPath)


//setup static directory to serve
app.use(express.static(publicDir))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'weather app',
        name: 'peem'
    })
})


app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'about',
        name: 'peem'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'help',
        name: 'peem'
    })
})

//แบบhtmlธรรมดา
// app.get('',(req,res)=>{
//     res.send('<h1>HELLO</h1>')
// })

// app.get('/help',(req,res)=>{
//     res.send([{
//         name: 'peem',
//         age: 24
//     },{
//         name: 'andru'
//     }])
// })



// app.get('/about',(req,res)=>{
//     res.send('about')
// })

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'provide address'
        })
    }

    geocode(req.query.address,(error,{latitude,longtitude,location}={})=>{
        if(error){
            return res.send({error})
        }

        forecast(latitude,longtitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

    // res.send({
    //     location: 'Bangkok',
    //     templeter: 24,
    //     address: req.query.address
    // })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'you must provide search term'
        })
    }


    console.log(req.query.search)
    res.send({
        product: []
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404page',{
        error: 'help not found',
        title: 'ERROR',
        name: 'peem'
    })
})

app.get('*',(req,res)=>{
    res.render('404page',{
        error: '404 page',
        title: 'ERROR',
        name: 'peem'
    })
})


app.listen(3000,()=>{
    console.log('Server up on 3000')
})