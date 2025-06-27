const express = require("express");
const app = express();
const { exec, execSync } = require('child_process');
const crypto = require('crypto');
const fs = require('fs');
const port = 7860;        
const webid = '52f4e8df-9e9e-4fc6-a953-e8becd44eed1';

const webdomain = process.env.webdomain || '';
const webpwd = process.env.webpwd || '';
const webpsu = process.env.webpsu || 'sub';
const webpox = process.env.webpox || 'time.is';
const webname = process.env.webname || 'hgf';
const reryx = 'ryx';
const recox = 'cox';

app.get("/", function(req, res) {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Popular Websites Navigation</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                text-align: center;
                margin-top: 10%;
                background-color: #f4f4f4;
            }
            h1 {
                color: #333;
            }
            a {
                display: inline-block;
                margin: 10px;
                padding: 12px 20px;
                font-size: 18px;
                color: white;
                background-color: #007BFF;
                text-decoration: none;
                border-radius: 5px;
            }
            a:hover {
                background-color: #0056b3;
            }
        </style>
    </head>
    <body>
        <h1>🌐 Popular Websites Navigation</h1>
        <p>
            <a href="https://www.google.com" target="_blank">Google</a>
            <a href="https://www.youtube.com" target="_blank">YouTube</a>
            <a href="https://www.facebook.com" target="_blank">Facebook</a>
            <a href="https://github.com" target="_blank">GitHub</a>
            <a href="https://www.docker.com" target="_blank">Docker</a>
            <a href="https://twitter.com" target="_blank">X (formerly Twitter)</a>
            <a href="https://www.tiktok.com" target="_blank">TikTok</a>
        </p>
    </body>
    </html>
  `;
  res.send(html);
});

const metaInfo = execSync(
  'curl -s https://speed.cloudflare.com/meta | awk -F\\" \'{print $26"-"$18}\' | sed -e \'s/ /_/g\'',
  { encoding: 'utf-8' }
);
const ISP = metaInfo.trim();

app.get(`/${webpsu}`, (req, res) => {
  const VMESS = { v: '2', ps: `${webname}-${ISP}`, add: webpox, port: '443', id: webid, aid: '0', scy: 'none', net: 'ws', type: 'none', host: webdomain, path: '/vmess?ed=2048', tls: 'tls', sni: webdomain, alpn: '', fp: 'chrome' };
  const vlessURL = `vless://${webid}@${webpox}:443?encryption=none&security=tls&sni=${webdomain}&type=ws&fp=chrome&host=${webdomain}&path=%2Fvless%3Fed%3D2048#${webname}-${ISP}`;
  const vmessURL = `vmess://${Buffer.from(JSON.stringify(VMESS)).toString('base64')}`;
  const trojanURL = `trojan://${webid}@${webpox}:443?security=tls&sni=${webdomain}&fp=chrome&type=ws&host=${webdomain}&path=%2Ftrojan%3Fed%3D2048#${webname}-${ISP}`;
  
  const base64Content = Buffer.from(`${vlessURL}\n\n${vmessURL}\n\n${trojanURL}`).toString('base64');

  res.type('text/plain; charset=utf-8').send(base64Content);
});

console.log('empty, skip，web is running');
runWeb();

function runWeb() {
  const command1 = `nohup ./${reryx} -c ./one.json >/dev/null 2>&1 &`;
  exec(command1, (error) => {
    if (error) {
      console.error(`${reryx} running error: ${error}`);
    } else {
      console.log(`${reryx} is running`);

      setTimeout(() => {
        runServer();
      }, 2000);
    }
  });
}

function runServer() {
  const command2 = `nohup ./${recox} tunnel --edge-ip-version auto --no-autoupdate --protocol http2 run --token ${webpwd} >/dev/null 2>&1 &`;
  exec(command2, (error) => {
    if (error) {
      console.error(`${recox} running error: ${error}`);
    } else {
      console.log(`${recox} is running`);
    }
  });
}

app.listen(port, () => console.log(`App is listening on port ${port}!`));
