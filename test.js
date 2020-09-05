var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
const { urlencoded } = require('express');
var app = express();
app.use(urlencoded({ extended: true }))
app.get('/scrape', async function (req, res) {

    url = 'https://www.wikido.com/us/';
    if (req.body.state != undefined && isNaN(req.body.state) && req.body.city != undefined && isNaN(req.body.city)) {
        url += req.body.state + '/' + req.body.city + '/'
        await request(url, async function (error, response, html) {
            if (!error) {
                var $ = await cheerio.load(html);
                var time = []
                const title = []
                const urls = []
                const loc = []
                $(('[itemprop="startDate"]'), '#container').each(function () {
                    // var url = $(this).text().split(/\n/)
                    // url = url.filter(function(e) {
                    //     return String(e).trim();
                    // });
                    // for(let i = 0;i < url.length;i++) {
                    //     url[i] = url[i].trim()
                    // }
                    // txtData.push(url)
                    const timeTxt = $(this).text()
                    time.push(timeTxt)
                })
                $(('[itemprop="url"]'), '#container').each(function () {
                    var url = $(this).attr('href');
                    title.push($(this).text())
                    urls.push(url)
                });
                $(('[itemprop="location"]'), '#container').find(('[itemprop="name"]')).each(function () {
                    const data = $(this).text()
                    loc.push(data.trim())
                });
                const data = []
                for(let i = 0; i < title.length && i < urls.length && i < title.length && i < loc.length;i++) {
                    var obj = {
                        description: title[i],
                        time: time[i],
                        location: loc[i],
                        url: urls[i]
                    }
                    data.push(obj)
                }
                res.send(JSON.stringify([...data]));
            }
        });
    } else {
        res.send({ error: 'State and city not provided' })
    }


})

app.listen('8081', () => {
    console.log('Listening on https://localhost:8081');
})

exports = module.exports = app;

