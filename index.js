var http = require('http');
var https = require('https');
var static = require('node-static');
var httpProxy = require('http-proxy');

var file = new static.Server('./public');
var proxy = httpProxy.createProxyServer({target: 'https://data.dublinked.ie/cgi-bin', changeOrigin: true});

var server = http.createServer(function (req, res) {

    if (req.url.indexOf('/rtpi/') === 0) {
        var apiPath = req.url.replace(/^\/rtpi/, '');
        /*var proxy = https.request({
            host: 'data.dublinked.ie',
            path: apiPath
        }, function (json) {
            json.pipe(res, {
                end: true
            });
        });
        req.pipe(proxy, {
            end: true
        });*/
        proxy.web(req, res);
        //https://data.dublinked.ie/cgi-bin/rtpi/realtimebusinformation?stopid=7602&format=xml
    } else {
        file.serve(req, res);
    }
});

server.listen(8080, 'localhost', () => {
  console.log('Server running');
});
