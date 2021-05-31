(()=>{"use strict";var e={200:()=>{try{self["workbox:background-sync:6.1.2"]&&_()}catch(e){}},247:()=>{try{self["workbox:cacheable-response:6.1.2"]&&_()}catch(e){}},41:()=>{try{self["workbox:core:6.1.2"]&&_()}catch(e){}},169:()=>{try{self["workbox:expiration:6.1.2"]&&_()}catch(e){}},370:()=>{try{self["workbox:precaching:6.1.2"]&&_()}catch(e){}},654:()=>{try{self["workbox:routing:6.1.2"]&&_()}catch(e){}},222:()=>{try{self["workbox:strategies:6.1.2"]&&_()}catch(e){}}},t={};function s(n){if(t[n])return t[n].exports;var a=t[n]={exports:{}};return e[n](a,a.exports,s),a.exports}(()=>{s(41);class e extends Error{constructor(e,t){super(((e,...t)=>{let s=e;return t.length>0&&(s+=` :: ${JSON.stringify(t)}`),s})(e,t)),this.name=e,this.details=t}}const t={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},n=e=>[t.prefix,e,t.suffix].filter((e=>e&&e.length>0)).join("-"),a=e=>e||n(t.precache),r=e=>e||n(t.runtime);function i(e,t){const s=t();return e.waitUntil(s),s}function c(t){if(!t)throw new e("add-to-cache-list-unexpected-type",{entry:t});if("string"==typeof t){const e=new URL(t,location.href);return{cacheKey:e.href,url:e.href}}const{revision:s,url:n}=t;if(!n)throw new e("add-to-cache-list-unexpected-type",{entry:t});if(!s){const e=new URL(n,location.href);return{cacheKey:e.href,url:e.href}}const a=new URL(n,location.href),r=new URL(n,location.href);return a.searchParams.set("__WB_REVISION__",s),{cacheKey:a.href,url:r.href}}s(370);class o{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:e,state:t})=>{t&&(t.originalRequest=e)},this.cachedResponseWillBeUsed=async({event:e,state:t,cachedResponse:s})=>{if("install"===e.type){const e=t.originalRequest.url;s?this.notUpdatedURLs.push(e):this.updatedURLs.push(e)}return s}}}class h{constructor({precacheController:e}){this.cacheKeyWillBeUsed=async({request:e,params:t})=>{const s=t&&t.cacheKey||this._precacheController.getCacheKeyForURL(e.url);return s?new Request(s):e},this._precacheController=e}}let l;function u(e,t){const s=new URL(e);for(const e of t)s.searchParams.delete(e);return s.href}class d{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}const p=new Set;function f(e){return new Promise((t=>setTimeout(t,e)))}function y(e){return"string"==typeof e?new Request(e):e}s(222);class w{constructor(e,t){this._cacheKeys={},Object.assign(this,t),this.event=t.event,this._strategy=e,this._handlerDeferred=new d,this._extendLifetimePromises=[],this._plugins=[...e.plugins],this._pluginStateMap=new Map;for(const e of this._plugins)this._pluginStateMap.set(e,{});this.event.waitUntil(this._handlerDeferred.promise)}async fetch(t){const{event:s}=this;let n=y(t);if("navigate"===n.mode&&s instanceof FetchEvent&&s.preloadResponse){const e=await s.preloadResponse;if(e)return e}const a=this.hasCallback("fetchDidFail")?n.clone():null;try{for(const e of this.iterateCallbacks("requestWillFetch"))n=await e({request:n.clone(),event:s})}catch(t){throw new e("plugin-error-request-will-fetch",{thrownError:t})}const r=n.clone();try{let e;e=await fetch(n,"navigate"===n.mode?void 0:this._strategy.fetchOptions);for(const t of this.iterateCallbacks("fetchDidSucceed"))e=await t({event:s,request:r,response:e});return e}catch(e){throw a&&await this.runCallbacks("fetchDidFail",{error:e,event:s,originalRequest:a.clone(),request:r.clone()}),e}}async fetchAndCachePut(e){const t=await this.fetch(e),s=t.clone();return this.waitUntil(this.cachePut(e,s)),t}async cacheMatch(e){const t=y(e);let s;const{cacheName:n,matchOptions:a}=this._strategy,r=await this.getCacheKey(t,"read"),i={...a,cacheName:n};s=await caches.match(r,i);for(const e of this.iterateCallbacks("cachedResponseWillBeUsed"))s=await e({cacheName:n,matchOptions:a,cachedResponse:s,request:r,event:this.event})||void 0;return s}async cachePut(t,s){const n=y(t);await f(0);const a=await this.getCacheKey(n,"write");if(!s)throw new e("cache-put-with-no-response",{url:(r=a.url,new URL(String(r),location.href).href.replace(new RegExp(`^${location.origin}`),""))});var r;const i=await this._ensureResponseSafeToCache(s);if(!i)return!1;const{cacheName:c,matchOptions:o}=this._strategy,h=await self.caches.open(c),l=this.hasCallback("cacheDidUpdate"),d=l?await async function(e,t,s,n){const a=u(t.url,s);if(t.url===a)return e.match(t,n);const r={...n,ignoreSearch:!0},i=await e.keys(t,r);for(const t of i)if(a===u(t.url,s))return e.match(t,n)}(h,a.clone(),["__WB_REVISION__"],o):null;try{await h.put(a,l?i.clone():i)}catch(e){throw"QuotaExceededError"===e.name&&await async function(){for(const e of p)await e()}(),e}for(const e of this.iterateCallbacks("cacheDidUpdate"))await e({cacheName:c,oldResponse:d,newResponse:i.clone(),request:a,event:this.event});return!0}async getCacheKey(e,t){if(!this._cacheKeys[t]){let s=e;for(const e of this.iterateCallbacks("cacheKeyWillBeUsed"))s=y(await e({mode:t,request:s,event:this.event,params:this.params}));this._cacheKeys[t]=s}return this._cacheKeys[t]}hasCallback(e){for(const t of this._strategy.plugins)if(e in t)return!0;return!1}async runCallbacks(e,t){for(const s of this.iterateCallbacks(e))await s(t)}*iterateCallbacks(e){for(const t of this._strategy.plugins)if("function"==typeof t[e]){const s=this._pluginStateMap.get(t),n=n=>{const a={...n,state:s};return t[e](a)};yield n}}waitUntil(e){return this._extendLifetimePromises.push(e),e}async doneWaiting(){let e;for(;e=this._extendLifetimePromises.shift();)await e}destroy(){this._handlerDeferred.resolve()}async _ensureResponseSafeToCache(e){let t=e,s=!1;for(const e of this.iterateCallbacks("cacheWillUpdate"))if(t=await e({request:this.request,response:t,event:this.event})||void 0,s=!0,!t)break;return s||t&&200!==t.status&&(t=void 0),t}}class g{constructor(e={}){this.cacheName=r(e.cacheName),this.plugins=e.plugins||[],this.fetchOptions=e.fetchOptions,this.matchOptions=e.matchOptions}handle(e){const[t]=this.handleAll(e);return t}handleAll(e){e instanceof FetchEvent&&(e={event:e,request:e.request});const t=e.event,s="string"==typeof e.request?new Request(e.request):e.request,n="params"in e?e.params:void 0,a=new w(this,{event:t,request:s,params:n}),r=this._getResponse(a,s,t);return[r,this._awaitComplete(r,a,s,t)]}async _getResponse(t,s,n){let a;await t.runCallbacks("handlerWillStart",{event:n,request:s});try{if(a=await this._handle(s,t),!a||"error"===a.type)throw new e("no-response",{url:s.url})}catch(e){for(const r of t.iterateCallbacks("handlerDidError"))if(a=await r({error:e,event:n,request:s}),a)break;if(!a)throw e}for(const e of t.iterateCallbacks("handlerWillRespond"))a=await e({event:n,request:s,response:a});return a}async _awaitComplete(e,t,s,n){let a,r;try{a=await e}catch(r){}try{await t.runCallbacks("handlerDidRespond",{event:n,request:s,response:a}),await t.doneWaiting()}catch(e){r=e}if(await t.runCallbacks("handlerDidComplete",{event:n,request:s,response:a,error:r}),t.destroy(),r)throw r}}class m extends g{constructor(e={}){e.cacheName=a(e.cacheName),super(e),this._fallbackToNetwork=!1!==e.fallbackToNetwork,this.plugins.push(m.copyRedirectedCacheableResponsesPlugin)}async _handle(e,t){return await t.cacheMatch(e)||(t.event&&"install"===t.event.type?await this._handleInstall(e,t):await this._handleFetch(e,t))}async _handleFetch(t,s){let n;if(!this._fallbackToNetwork)throw new e("missing-precache-entry",{cacheName:this.cacheName,url:t.url});return n=await s.fetch(t),n}async _handleInstall(t,s){this._useDefaultCacheabilityPluginIfNeeded();const n=await s.fetch(t);if(!await s.cachePut(t,n.clone()))throw new e("bad-precaching-response",{url:t.url,status:n.status});return n}_useDefaultCacheabilityPluginIfNeeded(){let e=null,t=0;for(const[s,n]of this.plugins.entries())n!==m.copyRedirectedCacheableResponsesPlugin&&(n===m.defaultPrecacheCacheabilityPlugin&&(e=s),n.cacheWillUpdate&&t++);0===t?this.plugins.push(m.defaultPrecacheCacheabilityPlugin):t>1&&null!==e&&this.plugins.splice(e,1)}}m.defaultPrecacheCacheabilityPlugin={cacheWillUpdate:async({response:e})=>!e||e.status>=400?null:e},m.copyRedirectedCacheableResponsesPlugin={cacheWillUpdate:async({response:t})=>t.redirected?await async function(t,s){let n=null;if(t.url&&(n=new URL(t.url).origin),n!==self.location.origin)throw new e("cross-origin-copy-response",{origin:n});const a=t.clone(),r={headers:new Headers(a.headers),status:a.status,statusText:a.statusText},i=s?s(r):r,c=function(){if(void 0===l){const e=new Response("");if("body"in e)try{new Response(e.body),l=!0}catch(e){l=!1}l=!1}return l}()?a.body:await a.blob();return new Response(c,i)}(t):t};class _{constructor({cacheName:e,plugins:t=[],fallbackToNetwork:s=!0}={}){this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map,this._strategy=new m({cacheName:a(e),plugins:[...t,new h({precacheController:this})],fallbackToNetwork:s}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this._strategy}precache(e){this.addToCacheList(e),this._installAndActiveListenersAdded||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this._installAndActiveListenersAdded=!0)}addToCacheList(t){const s=[];for(const n of t){"string"==typeof n?s.push(n):n&&void 0===n.revision&&s.push(n.url);const{cacheKey:t,url:a}=c(n),r="string"!=typeof n&&n.revision?"reload":"default";if(this._urlsToCacheKeys.has(a)&&this._urlsToCacheKeys.get(a)!==t)throw new e("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(a),secondEntry:t});if("string"!=typeof n&&n.integrity){if(this._cacheKeysToIntegrities.has(t)&&this._cacheKeysToIntegrities.get(t)!==n.integrity)throw new e("add-to-cache-list-conflicting-integrities",{url:a});this._cacheKeysToIntegrities.set(t,n.integrity)}if(this._urlsToCacheKeys.set(a,t),this._urlsToCacheModes.set(a,r),s.length>0){const e=`Workbox is precaching URLs without revision info: ${s.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(e)}}}install(e){return i(e,(async()=>{const t=new o;this.strategy.plugins.push(t);for(const[t,s]of this._urlsToCacheKeys){const n=this._cacheKeysToIntegrities.get(s),a=this._urlsToCacheModes.get(t),r=new Request(t,{integrity:n,cache:a,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:s},request:r,event:e}))}const{updatedURLs:s,notUpdatedURLs:n}=t;return{updatedURLs:s,notUpdatedURLs:n}}))}activate(e){return i(e,(async()=>{const e=await self.caches.open(this.strategy.cacheName),t=await e.keys(),s=new Set(this._urlsToCacheKeys.values()),n=[];for(const a of t)s.has(a.url)||(await e.delete(a),n.push(a.url));return{deletedURLs:n}}))}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}async matchPrecache(e){const t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s)return(await self.caches.open(this.strategy.cacheName)).match(s)}createHandlerBoundToURL(t){const s=this.getCacheKeyForURL(t);if(!s)throw new e("non-precached-url",{url:t});return e=>(e.request=new Request(t),e.params={cacheKey:s,...e.params},this.strategy.handle(e))}}let b;const R=()=>(b||(b=new _),b);s(654);const q=e=>e&&"object"==typeof e?e:{handle:e};class v{constructor(e,t,s="GET"){this.handler=q(t),this.match=e,this.method=s}setCatchHandler(e){this.catchHandler=q(e)}}class x extends v{constructor(e,t,s){super((({url:t})=>{const s=e.exec(t.href);if(s&&(t.origin===location.origin||0===s.index))return s.slice(1)}),t,s)}}class C{constructor(){this._routes=new Map,this._defaultHandlerMap=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",(e=>{const{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)}))}addCacheListener(){self.addEventListener("message",(e=>{if(e.data&&"CACHE_URLS"===e.data.type){const{payload:t}=e.data,s=Promise.all(t.urlsToCache.map((t=>{"string"==typeof t&&(t=[t]);const s=new Request(...t);return this.handleRequest({request:s,event:e})})));e.waitUntil(s),e.ports&&e.ports[0]&&s.then((()=>e.ports[0].postMessage(!0)))}}))}handleRequest({request:e,event:t}){const s=new URL(e.url,location.href);if(!s.protocol.startsWith("http"))return;const n=s.origin===location.origin,{params:a,route:r}=this.findMatchingRoute({event:t,request:e,sameOrigin:n,url:s});let i=r&&r.handler;const c=e.method;if(!i&&this._defaultHandlerMap.has(c)&&(i=this._defaultHandlerMap.get(c)),!i)return;let o;try{o=i.handle({url:s,request:e,event:t,params:a})}catch(e){o=Promise.reject(e)}const h=r&&r.catchHandler;return o instanceof Promise&&(this._catchHandler||h)&&(o=o.catch((async n=>{if(h)try{return await h.handle({url:s,request:e,event:t,params:a})}catch(e){n=e}if(this._catchHandler)return this._catchHandler.handle({url:s,request:e,event:t});throw n}))),o}findMatchingRoute({url:e,sameOrigin:t,request:s,event:n}){const a=this._routes.get(s.method)||[];for(const r of a){let a;const i=r.match({url:e,sameOrigin:t,request:s,event:n});if(i)return a=i,(Array.isArray(i)&&0===i.length||i.constructor===Object&&0===Object.keys(i).length||"boolean"==typeof i)&&(a=void 0),{route:r,params:a}}return{}}setDefaultHandler(e,t="GET"){this._defaultHandlerMap.set(t,q(e))}setCatchHandler(e){this._catchHandler=q(e)}registerRoute(e){this._routes.has(e.method)||this._routes.set(e.method,[]),this._routes.get(e.method).push(e)}unregisterRoute(t){if(!this._routes.has(t.method))throw new e("unregister-route-but-not-found-with-method",{method:t.method});const s=this._routes.get(t.method).indexOf(t);if(!(s>-1))throw new e("unregister-route-route-not-registered");this._routes.get(t.method).splice(s,1)}}let U;function T(t,s,n){let a;if("string"==typeof t){const e=new URL(t,location.href);a=new v((({url:t})=>t.href===e.href),s,n)}else if(t instanceof RegExp)a=new x(t,s,n);else if("function"==typeof t)a=new v(t,s,n);else{if(!(t instanceof v))throw new e("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});a=t}return(U||(U=new C,U.addFetchListener(),U.addCacheListener()),U).registerRoute(a),a}class k extends v{constructor(e,t){super((({request:s})=>{const n=e.getURLsToCacheKeys();for(const e of function*(e,{ignoreURLParametersMatching:t=[/^utm_/,/^fbclid$/],directoryIndex:s="index.html",cleanURLs:n=!0,urlManipulation:a}={}){const r=new URL(e,location.href);r.hash="",yield r.href;const i=function(e,t=[]){for(const s of[...e.searchParams.keys()])t.some((e=>e.test(s)))&&e.searchParams.delete(s);return e}(r,t);if(yield i.href,s&&i.pathname.endsWith("/")){const e=new URL(i.href);e.pathname+=s,yield e.href}if(n){const e=new URL(i.href);e.pathname+=".html",yield e.href}if(a){const e=a({url:r});for(const t of e)yield t.href}}(s.url,t)){const t=n.get(e);if(t)return{cacheKey:t}}}),e.strategy)}}const E={cacheWillUpdate:async({response:e})=>200===e.status||0===e.status?e:null};class S extends g{constructor(e){super(e),this.plugins.some((e=>"cacheWillUpdate"in e))||this.plugins.unshift(E)}async _handle(t,s){const n=s.fetchAndCachePut(t).catch((()=>{}));let a,r=await s.cacheMatch(t);if(r);else try{r=await n}catch(e){a=e}if(!r)throw new e("no-response",{url:t.url,error:a});return r}}s(247);class N{constructor(e={}){this._statuses=e.statuses,this._headers=e.headers}isResponseCacheable(e){let t=!0;return this._statuses&&(t=this._statuses.includes(e.status)),this._headers&&t&&(t=Object.keys(this._headers).some((t=>e.headers.get(t)===this._headers[t]))),t}}function L(e){e.then((()=>{}))}class A{constructor(e,t,{onupgradeneeded:s,onversionchange:n}={}){this._db=null,this._name=e,this._version=t,this._onupgradeneeded=s,this._onversionchange=n||(()=>this.close())}get db(){return this._db}async open(){if(!this._db)return this._db=await new Promise(((e,t)=>{let s=!1;setTimeout((()=>{s=!0,t(new Error("The open request was blocked and timed out"))}),this.OPEN_TIMEOUT);const n=indexedDB.open(this._name,this._version);n.onerror=()=>t(n.error),n.onupgradeneeded=e=>{s?(n.transaction.abort(),n.result.close()):"function"==typeof this._onupgradeneeded&&this._onupgradeneeded(e)},n.onsuccess=()=>{const t=n.result;s?t.close():(t.onversionchange=this._onversionchange.bind(this),e(t))}})),this}async getKey(e,t){return(await this.getAllKeys(e,t,1))[0]}async getAll(e,t,s){return await this.getAllMatching(e,{query:t,count:s})}async getAllKeys(e,t,s){return(await this.getAllMatching(e,{query:t,count:s,includeKeys:!0})).map((e=>e.key))}async getAllMatching(e,{index:t,query:s=null,direction:n="next",count:a,includeKeys:r=!1}={}){return await this.transaction([e],"readonly",((i,c)=>{const o=i.objectStore(e),h=t?o.index(t):o,l=[],u=h.openCursor(s,n);u.onsuccess=()=>{const e=u.result;e?(l.push(r?e:e.value),a&&l.length>=a?c(l):e.continue()):c(l)}}))}async transaction(e,t,s){return await this.open(),await new Promise(((n,a)=>{const r=this._db.transaction(e,t);r.onabort=()=>a(r.error),r.oncomplete=()=>n(),s(r,(e=>n(e)))}))}async _call(e,t,s,...n){return await this.transaction([t],s,((s,a)=>{const r=s.objectStore(t),i=r[e].apply(r,n);i.onsuccess=()=>a(i.result)}))}close(){this._db&&(this._db.close(),this._db=null)}}A.prototype.OPEN_TIMEOUT=2e3;const D={readonly:["get","count","getKey","getAll","getAllKeys"],readwrite:["add","put","clear","delete"]};for(const[e,t]of Object.entries(D))for(const s of t)s in IDBObjectStore.prototype&&(A.prototype[s]=async function(t,...n){return await this._call(s,t,e,...n)});s(169);const K="cache-entries",P=e=>{const t=new URL(e,location.href);return t.hash="",t.href};class M{constructor(e){this._cacheName=e,this._db=new A("workbox-expiration",1,{onupgradeneeded:e=>this._handleUpgrade(e)})}_handleUpgrade(e){const t=e.target.result.createObjectStore(K,{keyPath:"id"});t.createIndex("cacheName","cacheName",{unique:!1}),t.createIndex("timestamp","timestamp",{unique:!1}),(async e=>{await new Promise(((t,s)=>{const n=indexedDB.deleteDatabase(e);n.onerror=()=>{s(n.error)},n.onblocked=()=>{s(new Error("Delete blocked"))},n.onsuccess=()=>{t()}}))})(this._cacheName)}async setTimestamp(e,t){const s={url:e=P(e),timestamp:t,cacheName:this._cacheName,id:this._getId(e)};await this._db.put(K,s)}async getTimestamp(e){return(await this._db.get(K,this._getId(e))).timestamp}async expireEntries(e,t){const s=await this._db.transaction(K,"readwrite",((s,n)=>{const a=s.objectStore(K).index("timestamp").openCursor(null,"prev"),r=[];let i=0;a.onsuccess=()=>{const s=a.result;if(s){const n=s.value;n.cacheName===this._cacheName&&(e&&n.timestamp<e||t&&i>=t?r.push(s.value):i++),s.continue()}else n(r)}})),n=[];for(const e of s)await this._db.delete(K,e.id),n.push(e.url);return n}_getId(e){return this._cacheName+"|"+P(e)}}class O{constructor(e,t={}){this._isRunning=!1,this._rerunRequested=!1,this._maxEntries=t.maxEntries,this._maxAgeSeconds=t.maxAgeSeconds,this._matchOptions=t.matchOptions,this._cacheName=e,this._timestampModel=new M(e)}async expireEntries(){if(this._isRunning)return void(this._rerunRequested=!0);this._isRunning=!0;const e=this._maxAgeSeconds?Date.now()-1e3*this._maxAgeSeconds:0,t=await this._timestampModel.expireEntries(e,this._maxEntries),s=await self.caches.open(this._cacheName);for(const e of t)await s.delete(e,this._matchOptions);this._isRunning=!1,this._rerunRequested&&(this._rerunRequested=!1,L(this.expireEntries()))}async updateTimestamp(e){await this._timestampModel.setTimestamp(e,Date.now())}async isURLExpired(e){return!!this._maxAgeSeconds&&await this._timestampModel.getTimestamp(e)<Date.now()-1e3*this._maxAgeSeconds}async delete(){this._rerunRequested=!1,await this._timestampModel.expireEntries(1/0)}}s(200);const I="requests",j="queueName";class W{constructor(e){this._queueName=e,this._db=new A("workbox-background-sync",3,{onupgradeneeded:this._upgradeDb})}async pushEntry(e){delete e.id,e.queueName=this._queueName,await this._db.add(I,e)}async unshiftEntry(e){const[t]=await this._db.getAllMatching(I,{count:1});t?e.id=t.id-1:delete e.id,e.queueName=this._queueName,await this._db.add(I,e)}async popEntry(){return this._removeEntry({direction:"prev"})}async shiftEntry(){return this._removeEntry({direction:"next"})}async getAll(){return await this._db.getAllMatching(I,{index:j,query:IDBKeyRange.only(this._queueName)})}async deleteEntry(e){await this._db.delete(I,e)}async _removeEntry({direction:e}){const[t]=await this._db.getAllMatching(I,{direction:e,index:j,query:IDBKeyRange.only(this._queueName),count:1});if(t)return await this.deleteEntry(t.id),t}_upgradeDb(e){const t=e.target.result;e.oldVersion>0&&e.oldVersion<3&&t.objectStoreNames.contains(I)&&t.deleteObjectStore(I),t.createObjectStore(I,{autoIncrement:!0,keyPath:"id"}).createIndex(j,j,{unique:!1})}}const H=["method","referrer","referrerPolicy","mode","credentials","cache","redirect","integrity","keepalive"];class F{constructor(e){"navigate"===e.mode&&(e.mode="same-origin"),this._requestData=e}static async fromRequest(e){const t={url:e.url,headers:{}};"GET"!==e.method&&(t.body=await e.clone().arrayBuffer());for(const[s,n]of e.headers.entries())t.headers[s]=n;for(const s of H)void 0!==e[s]&&(t[s]=e[s]);return new F(t)}toObject(){const e=Object.assign({},this._requestData);return e.headers=Object.assign({},this._requestData.headers),e.body&&(e.body=e.body.slice(0)),e}toRequest(){return new Request(this._requestData.url,this._requestData)}clone(){return new F(this.toObject())}}const B="workbox-background-sync",$=new Set,V=e=>{const t={request:new F(e.requestData).toRequest(),timestamp:e.timestamp};return e.metadata&&(t.metadata=e.metadata),t};class G{constructor(t,{onSync:s,maxRetentionTime:n}={}){if(this._syncInProgress=!1,this._requestsAddedDuringSync=!1,$.has(t))throw new e("duplicate-queue-name",{name:t});$.add(t),this._name=t,this._onSync=s||this.replayRequests,this._maxRetentionTime=n||10080,this._queueStore=new W(this._name),this._addSyncListener()}get name(){return this._name}async pushRequest(e){await this._addRequest(e,"push")}async unshiftRequest(e){await this._addRequest(e,"unshift")}async popRequest(){return this._removeRequest("pop")}async shiftRequest(){return this._removeRequest("shift")}async getAll(){const e=await this._queueStore.getAll(),t=Date.now(),s=[];for(const n of e){const e=60*this._maxRetentionTime*1e3;t-n.timestamp>e?await this._queueStore.deleteEntry(n.id):s.push(V(n))}return s}async _addRequest({request:e,metadata:t,timestamp:s=Date.now()},n){const a={requestData:(await F.fromRequest(e.clone())).toObject(),timestamp:s};t&&(a.metadata=t),await this._queueStore[`${n}Entry`](a),this._syncInProgress?this._requestsAddedDuringSync=!0:await this.registerSync()}async _removeRequest(e){const t=Date.now(),s=await this._queueStore[`${e}Entry`]();if(s){const n=60*this._maxRetentionTime*1e3;return t-s.timestamp>n?this._removeRequest(e):V(s)}}async replayRequests(){let t;for(;t=await this.shiftRequest();)try{await fetch(t.request.clone())}catch(s){throw await this.unshiftRequest(t),new e("queue-replay-failed",{name:this._name})}}async registerSync(){if("sync"in self.registration)try{await self.registration.sync.register(`${B}:${this._name}`)}catch(e){}}_addSyncListener(){"sync"in self.registration?self.addEventListener("sync",(e=>{if(e.tag===`${B}:${this._name}`){const t=async()=>{let t;this._syncInProgress=!0;try{await this._onSync({queue:this})}catch(e){throw t=e,t}finally{!this._requestsAddedDuringSync||t&&!e.lastChance||await this.registerSync(),this._syncInProgress=!1,this._requestsAddedDuringSync=!1}};e.waitUntil(t())}})):this._onSync({queue:this})}static get _queueNames(){return $}}var Q;Q=[{'revision':'0745774a2635a6d30f5d07fa79958724','url':'/favicon.ico'},{'revision':'e97399f0f7e08aec1e4e3a582ded8f18','url':'/index.html'},{'revision':'8716ac19985a52b67967ea15a40d58d1','url':'/manifest.json'},{'revision':null,'url':'/static/css/124.b87906fe9626a8976e2e.chunk.css'},{'revision':null,'url':'/static/css/135.56035bdbb5dae3194abb.chunk.css'},{'revision':null,'url':'/static/css/292.ee2028dc8fdf43ed701e.chunk.css'},{'revision':null,'url':'/static/css/352.aed7f2318dee8c1990c1.chunk.css'},{'revision':null,'url':'/static/css/547.cdf9f5e32cea4d6c6f6b.chunk.css'},{'revision':null,'url':'/static/css/549.27b6c580626af8c2d33c.chunk.css'},{'revision':null,'url':'/static/css/584.ea1635fe6017e5089c07.chunk.css'},{'revision':null,'url':'/static/css/818.26be61a3348f7e17c5a0.chunk.css'},{'revision':null,'url':'/static/css/855.f337cb694a4da90bfd6e.chunk.css'},{'revision':null,'url':'/static/css/868.77a7bc4bc69aa5f1fbf2.chunk.css'},{'revision':null,'url':'/static/css/977.27b6c580626af8c2d33c.chunk.css'},{'revision':null,'url':'/static/css/main.4802ac817325b234b927.css'},{'revision':'49f8783dadd2ca41552e6f235d5b524c','url':'/static/icons/android-chrome-192x192.png'},{'revision':'9dda0b790c889fcd6cc3cf747da60e56','url':'/static/icons/android-chrome-256x256.png'},{'revision':'9bdfeb7220f3d7598230a5ef4d14e3e2','url':'/static/icons/apple-touch-icon.png'},{'revision':'79ca31e2ec0f40ac66a29870ea25e697','url':'/static/icons/favicon-144x144.png'},{'revision':'25a65cee809c4f9a2c19bb9312852830','url':'/static/icons/favicon-16x16.png'},{'revision':'49f8783dadd2ca41552e6f235d5b524c','url':'/static/icons/favicon-192x192.png'},{'revision':'9dda0b790c889fcd6cc3cf747da60e56','url':'/static/icons/favicon-256x256.png'},{'revision':'892f29e0f67ccfcef15126319fed63b7','url':'/static/icons/favicon-32x32.png'},{'revision':'8b77a0400473638fdc3dcbb2479c4402','url':'/static/icons/favicon-384x384.png'},{'revision':'5ea66c8cb66b2edaa1ff0d05743add4b','url':'/static/icons/favicon-48x48.png'},{'revision':'0ef6e4bd920be38b2acb4465e5906ef8','url':'/static/icons/favicon-512x512.png'},{'revision':'159496f7b3cef6f14d92c92a963ea19c','url':'/static/icons/favicon-96x96.png'},{'revision':'54a8916bb9fc2f7ff7b5ccf4ad54e773','url':'/static/icons/mstile-150x150.png'},{'revision':'cd82b252695b612930b09a01ffa2d824','url':'/static/icons/safari-pinned-tab.svg'},{'revision':'d4c9c5d19b978bf5a0e1f7e1ca2a89b2','url':'/static/images/b36fe795c69d3c48dc8c928b4597546e.png'},{'revision':'fdbc6886c0d40e47af6d2a9673ebf11b','url':'/static/images/bd57ee6bcb33e14e32ab2d89fba31a3f.png'},{'revision':null,'url':'/static/js/135.724c55df96f8fd68bd85.chunk.js'},{'revision':null,'url':'/static/js/292.34eb7f9966553eb6dc18.chunk.js'},{'revision':null,'url':'/static/js/313.fa37f6aa10cd3713c083.chunk.js'},{'revision':null,'url':'/static/js/352.be2b45a8fa533d1d730c.chunk.js'},{'revision':null,'url':'/static/js/374.73a1fa78e911c2de6d00.chunk.js'},{'revision':null,'url':'/static/js/519.53805381aae3662d4940.chunk.js'},{'revision':null,'url':'/static/js/560.be45388f0dc34d526a74.chunk.js'},{'revision':null,'url':'/static/js/584.b3ffeb047920fe61ca95.chunk.js'},{'revision':null,'url':'/static/js/731.ec07cd25a99a304e21ea.chunk.js'},{'revision':null,'url':'/static/js/821.08eb113ef3f0208ed3c0.chunk.js'},{'revision':null,'url':'/static/js/868.86fb243566746ac33491.chunk.js'},{'revision':null,'url':'/static/js/9.f19e4073c851d3b2cee0.chunk.js'},{'revision':null,'url':'/static/js/935.7a789a0d06b7faff08dc.chunk.js'},{'revision':null,'url':'/static/js/965.7b55fc6822da595fb4ee.chunk.js'},{'revision':null,'url':'/static/js/977.b3a6a1ae11e41f00e4a3.chunk.js'},{'revision':null,'url':'/static/js/main.f6edfbe420ee0da3a7d2.js'},{'revision':'0ae8b86f349a0aa565e21d6cef4bed6c','url':'/static/js/main.f6edfbe420ee0da3a7d2.js.LICENSE.txt'}],R().precache(Q),function(e){const t=R();T(new k(t,undefined))}(),self.addEventListener("notificationclick",(function(e){var t=e.notification,s=e.action;"open"===s||"confirm"===s?e.waitUntil(clients.matchAll().then((function(e){var s=e.find((function(e){return"visible"===e.visibilityState}));void 0!==s?(s.navigate(t.data.url),s.focus()):clients.openWindow(t.data.url),t.close()}))):t.close()})),self.addEventListener("push",(function(e){var t={title:"Please check the Box!",content:"You forgot to buy something from your shopping list!",openUrl:""};e.data&&(t=e.data.text());var s={body:t.content,icon:"static/icons/favicon-144x144.png",badge:"static/icons/favicon-144x144.png",data:{url:t.openUrl},actions:[{action:"open",title:"Open"},{action:"cancel",title:"Cancel"}]};e.waitUntil(self.registration.showNotification(t.title,s))})),T((function(e){return"https://fonts.googleapis.com"===e.url.origin}),new S({cacheName:"google-fonts-stylesheets"})),T((function(e){return"https://fonts.gstatic.com"===e.url.origin}),new class extends g{async _handle(t,s){let n,a=await s.cacheMatch(t);if(a);else try{a=await s.fetchAndCachePut(t)}catch(e){n=e}if(!a)throw new e("no-response",{url:t.url,error:n});return a}}({cacheName:"google-fonts-webfonts",plugins:[new class{constructor(e){this.cacheWillUpdate=async({response:e})=>this._cacheableResponse.isResponseCacheable(e)?e:null,this._cacheableResponse=new N(e)}}({statuses:[0,200]}),new class{constructor(e={}){var t;this.cachedResponseWillBeUsed=async({event:e,request:t,cacheName:s,cachedResponse:n})=>{if(!n)return null;const a=this._isResponseDateFresh(n),r=this._getCacheExpiration(s);L(r.expireEntries());const i=r.updateTimestamp(t.url);if(e)try{e.waitUntil(i)}catch(e){}return a?n:null},this.cacheDidUpdate=async({cacheName:e,request:t})=>{const s=this._getCacheExpiration(e);await s.updateTimestamp(t.url),await s.expireEntries()},this._config=e,this._maxAgeSeconds=e.maxAgeSeconds,this._cacheExpirations=new Map,e.purgeOnQuotaError&&(t=()=>this.deleteCacheAndMetadata(),p.add(t))}_getCacheExpiration(t){if(t===r())throw new e("expire-custom-caches-only");let s=this._cacheExpirations.get(t);return s||(s=new O(t,this._config),this._cacheExpirations.set(t,s)),s}_isResponseDateFresh(e){if(!this._maxAgeSeconds)return!0;const t=this._getDateHeaderTimestamp(e);return null===t||t>=Date.now()-1e3*this._maxAgeSeconds}_getDateHeaderTimestamp(e){if(!e.headers.has("date"))return null;const t=e.headers.get("date"),s=new Date(t).getTime();return isNaN(s)?null:s}async deleteCacheAndMetadata(){for(const[e,t]of this._cacheExpirations)await self.caches.delete(e),await t.delete();this._cacheExpirations=new Map}}({maxAgeSeconds:31536e3,maxEntries:30})]})),T((function(e){return"https://cdn.jsdelivr.net"===e.url.origin}),new S({cacheName:"js-delivr-stylesheets"}));var J=new class{constructor(e,t){this.fetchDidFail=async({request:e})=>{await this._queue.pushRequest({request:e})},this._queue=new G(e,t)}}("bgSyncQueue",{maxRetentionTime:1440});T(/\/api\/.*\/*.json/,new class extends g{constructor(e={}){super(e),this._networkTimeoutSeconds=e.networkTimeoutSeconds||0}async _handle(t,s){let n,a;try{const e=[s.fetch(t)];if(this._networkTimeoutSeconds){const t=f(1e3*this._networkTimeoutSeconds);e.push(t)}if(a=await Promise.race(e),!a)throw new Error(`Timed out the network response after ${this._networkTimeoutSeconds} seconds.`)}catch(e){n=e}if(!a)throw new e("no-response",{url:t.url,error:n});return a}}({plugins:[J]}),"POST")})()})();