const http = require('http')
const path = require('path')
const fs = require('fs')


const PORT = process.env.PORT || 5000


http.createServer((req, res) => {
  req.url = path.join(__dirname, 'root', req.url)
  if (fs.existsSync(req.url)) {
    if (fs.statSync(req.url).isDirectory()) {
      fs.readFile(path.join(req.url, 'index.html'), (err, data) => {
        if (err) {
          res.end(http.STATUS_CODES[404])
        } else if (data) {
          res.end(data)
        }
      })
    } else if (fs.statSync(req.url).isFile()) {
      res.end(
        fs.readFileSync(req.url)
      )
    }
  } else { res.end(http.STATUS_CODES[404]) }
}).listen(PORT)