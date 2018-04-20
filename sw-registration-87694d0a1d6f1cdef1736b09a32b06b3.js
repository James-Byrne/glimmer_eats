(function(){"use strict"
var e=[],r=[]
"serviceWorker"in navigator&&navigator.serviceWorker.register("/glimmer_eatssw.js",{scope:"/glimmer_eats"}).then(function(r){for(var n=Promise.resolve(),t=0;t<e.length;t++)(function(t){n=n.then(function(){return e[t](r)})})(t)
return n.then(function(){console.log("Service Worker registration succeeded. Scope is "+r.scope)})}).catch(function(e){for(var n=Promise.resolve(),t=0;t<r.length;t++)(function(t){n=n.then(function(){return r[t](e)})})(t)
return n.then(function(){console.log("Service Worker registration failed with "+e)})})})()
