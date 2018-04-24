(function(){"use strict"
function e(e,t){return caches.keys().then(function(n){n.forEach(function(n){var c=0===n.indexOf(e),i=n!==t
c&&i&&caches.delete(n)})})}function t(e){var t=arguments.length<=1||void 0===arguments[1]?self.location:arguments[1]
return decodeURI(new URL(encodeURI(e),t).toString())}function n(e){var n=t(e)
return new RegExp("^"+n+"$")}function c(e,t){return!!t.find(function(t){return t.test(decodeURI(e))})}self.CACHE_BUSTER="1524569394690|0.49682183081140296",self.addEventListener("install",function(e){return self.skipWaiting()}),self.addEventListener("activate",function(e){return self.clients.claim()})
var i=["assets/glimmer-192x192-4bf7f0d4df2ab92104594a41588a21c2.png","assets/glimmer-eats-icon-f14de28324f40c0ef412c663e8a70fb8.png","app-b5b083d48e4dc67dab770898964a39d2.js","glimmer-512x512-287ec1eb23beaa19e728ac13f3a2717b.png","glimmer-logo-5153f9bb9b1b1b1c0944900cf072e514.png","index.html","manifest.json"],a="esw-asset-cache-1",r=i.map(function(e){return new URL(e,self.location).toString()}),s=function(){caches.open(a).then(function(e){return e.keys().then(function(t){t.forEach(function(t){-1===r.indexOf(t.url)&&e.delete(t)})})})}
self.addEventListener("install",function(e){e.waitUntil(caches.open(a).then(function(e){return Promise.all(r.map(function(t){var n=new Request(t,{mode:"cors"})
return fetch(n).then(function(n){if(n.status>=400){var c=new Error("Request for "+t+" failed with status "+n.statusText)
throw c}return e.put(t,n)}).catch(function(e){console.error("Not caching "+t+" due to "+e)})}))}))}),self.addEventListener("activate",function(t){t.waitUntil(Promise.all([e("esw-asset-cache",a),s()]))}),self.addEventListener("fetch",function(e){var t="GET"===e.request.method,n=-1!==r.indexOf(e.request.url)
t&&n&&e.respondWith(caches.match(e.request,{cacheName:a}).then(function(t){return t||fetch(e.request)}))})
var o=["https://developers.zomato.com/api/(.+)"],u=o.map(n)
self.addEventListener("fetch",function(e){var t=e.request
"GET"===t.method&&/^https?/.test(t.url)&&c(t.url,u)&&e.respondWith(caches.open("esw-cache-fallback-1").then(function(n){return fetch(t).then(function(e){return n.put(t,e.clone()),e}).catch(function(){return caches.match(e.request)})}))}),self.addEventListener("activate",function(t){t.waitUntil(e("esw-cache-fallback","esw-cache-fallback-1"))})
var f=[],l=[]
self.INDEX_FILE_HASH="84ad47853a1bf068414197e160bdb7cc"
var h=new URL("index.html",self.location).toString()
self.addEventListener("install",function(e){e.waitUntil(fetch(h,{credentials:"include"}).then(function(e){return caches.open("esw-index-1").then(function(t){return t.put(h,e)})}))}),self.addEventListener("activate",function(t){t.waitUntil(e("esw-index","esw-index-1"))}),self.addEventListener("fetch",function(e){var t=e.request,n=new URL(t.url),i="GET"===t.method,a=-1!==t.headers.get("accept").indexOf("text/html"),r=n.origin===location.origin,s=c(t.url,f),o=!l.length||c(t.url,l)
!("/tests"===n.pathname&&!1)&&i&&a&&r&&o&&!s&&e.respondWith(caches.match(h,{cacheName:"esw-index-1"}))})})()
