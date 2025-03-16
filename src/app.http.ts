import fs from 'fs'
import http from 'http'

const server = http.createServer((req, res) => {

    if( req.url === '/' ) {
        const htmlFile = fs.readFileSync('./public/index.html', 'utf-8')
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end( htmlFile )
        return
    } 

    if(req.url?.endsWith('.js')) {
        const jsFile = fs.readFileSync(`./public${req.url}`, 'utf-8')
        res.writeHead(200, { 'Content-Type': 'application/javascript' })
        res.end(jsFile)
    } else if(req.url?.endsWith('.css')) {
        const cssFile = fs.readFileSync(`./public${req.url}`, 'utf-8')
        res.writeHead(200, { 'Content-Type': 'text/css' })
        res.end(cssFile)
    }
})

server.listen(8080, () => {
    console.log('Server running on port 8080')
})