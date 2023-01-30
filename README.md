<h1>Home Things - ⚠️ Beta ⚠️</h1>

Packages:
```
npm install -g json-server
npm install connect-pause (optional)
```

replace absolute path on:
```
- backend/https-json-server
- backend/script.sh
```

<b>N.B:</b> replace your domain on <b>index.js</b>


to get authoritative certificates via let's encrypt certboot you need to have a domain with DNS management

if you are not interested in signed certificates you can obtain them by the following command:
```
openssl req -nodes -new -x509 -keyout server.key -out server.cert
```