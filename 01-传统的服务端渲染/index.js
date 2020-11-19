const app = require('express');
const fs = require('fs')
const template = require('art-template')

const serve = app();

// art-template 的用法
// const r = template.render('<h1>{{message}}</h1>', {message: 'hello world'})

const templateStr = fs.readFileSync('./index.html', 'utf-8')
const data = JSON.parse(fs.readFileSync('./data.json', 'utf-8'))
const result = template.render(templateStr, data)
console.log(result)

serve.get('/', (req, res) => {
  res.send(result)
})



serve.listen(3000, () => console.log('app is running in 3000 prot ....'))
