const http = require('http')
const fs = require('fs');
var bodyParser = require('body-parser')


fs.readFile('./index.html', function (err, html) {
    if (err) {
        throw err; 
    }
    const server = http.createServer(function(request, response) {
        console.dir(request.param)
      
        if (request.method == 'POST') {
          console.log('POST')
          var body = ''
          request.on('data', function(data) {
            body += data
            console.log('Partial body: ' + body)
          })
          request.on('end', function() {
            console.log('Body: ' + body)
            response.writeHead(200, {'Content-Type': 'text/html'})
            response.end('post received')
          })
        } else {
          console.log('GET')

          response.writeHeader(200, {"Content-Type": "text/html"});  
          response.write(html);  
          response.end()
        }
      })
      
      const port = 3000
      const host = '127.0.0.1'
      server.listen(port, host)
      console.log(`Listening at http://${host}:${port}`)
});