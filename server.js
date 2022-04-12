const express = require('express')
const app = express()
const path = require('path')
var bodyParser = require('body-parser')
var port = 3000

app.listen(port, function () {
console.log('We are listening on port ' + port)
})

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/js/kvin.js',function(req,res){
    res.sendFile(path.join(__dirname + '/node_modules/kvin/kvin.js')); 
});
app.get('*', function (req, res) {
res.sendFile(path.join(__dirname, '/index.html'))
})

app.post('/num', function (req, res) {
    if (req.headers['content-type'] == 'application/octet-stream') {
        let msg=[];
        req.on('data',(chunk)=>{
            // console.log('chunk', chunk);
            if(chunk){
                msg.push(chunk);
            }
        })
        req.on('end',()=>{
            // console.log('msg', msg);
            let buf = Buffer.concat(msg);
            console.log([].slice.call(buf));
        })
        
    }
    else {
        console.log("llll", req.body)
    }
    return res.end('done')      
    
     
})