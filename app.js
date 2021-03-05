const express = require('express');
const ejs = require('ejs');
const path = require('path');
const fs = require('fs');

const { createBundleRenderer } = require('vue-server-renderer')

//创建渲染器
let renderer = createBundleRenderer(
    path.join(process.cwd(), './bundle/vue-ssr-server-bundle.json'), 
    {
        template: fs.readFileSync(path.join(process.cwd(), './views/index.html'), 'utf-8')
    }
)

let app = express();

app.engine('.html', ejs.__express);

app.use('/static/', express.static(path.join(__dirname, './static/')))

app.get('*', (req, res) => {
    // res.render('index.html');
    renderer.renderToString({
        // 传递路由url 
        url: req.url,
        // 插值注入
        title: 'vue-ssr',
        meta: `
            <meta name="keywords" content="vue webpack ssr">
            <meta name="description" content="vue-ssr">
        `,
        // 同步数据
        data: {
            msg: 'hello vue-ssr',
            description: '前后端同步渲染',
        }
    })
    .then(html => res.end(html))
    .catch(err => {
        if(err.code === 404) {
            res.writeHead(404, {'Content-Type': 'text/plain; utf-8'}).end(err.msg);
        }
        else {
            res.status(500).end('服务器错误');
        }
    })
})

app.listen(3005);
