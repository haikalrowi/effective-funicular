const http = require('http')
const path = require('path')
const fs = require('fs')


const PORT = process.env.PORT || 5000


http.createServer((req, res) => {
  req.url = path.join(__dirname, 'root', req.url)
  if (fs.existsSync(req.url)) {
    if (fs.statSync(req.url).isDirectory()) {
      res.end(
        fs.readFileSync(path.join(req.url, 'index.html'))
      )
    } else {
      res.end(
        fs.readFileSync(req.url)
      )
    }
  } else { res.end(http.STATUS_CODES[404]) }
}).listen(PORT)