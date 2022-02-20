/// <reference no-default-lib="true"/>
/// <reference lib="es6" />
/// <reference lib="webworker" />
declare var self: ServiceWorkerGlobalScope;

import { AUDIO_CACHE_NAME, CacheMessageKind, CacheMessageRequest } from "./cache/cs-cache";


export default undefined;


// function broadcastMessage(msg?: string) {
//     self.clients.matchAll().then((clients) => {
//         console.log(`Got (${msg}) ${clients.length} clients`);

//         for (const c of clients) {
//             console.log(`Sending ${msg} to client ` + JSON.stringify(c));
//             c.postMessage({txt: "Here is your worker"});

//         }
//     })
// }

const DEVELOPMENT = true;
const staticResources = [
  "/",
  "/index.html",
  "/global.css",
  "/favicon.png",
  "/build/bundle.css",
  "/build/bundle.js",
];

const cacheName = "static-v1";
const audioCache = AUDIO_CACHE_NAME;

self.addEventListener("install", (evt) => {
  evt.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => {
        return cache.addAll(DEVELOPMENT ? ["/favicon.png"] : staticResources);
      })
      .then(() => {
        console.log("SW Installation successful");
        return self.skipWaiting(); // forces to immediately replace old SW
      })
  );
});

self.addEventListener("activate", (evt) => {
  evt.waitUntil(
    caches
      .keys()
      .then((keyList) => {
        return Promise.all(
          keyList.map((key) => {
            if (key.startsWith("static-") && key != cacheName) {
              return caches.delete(key);
            }
          })
        );
      })
      .then(() => {
        console.log("SW Activation successful");
        return self.clients.claim(); // and forces immediately to take over current page
      })
  );
});

self.addEventListener("message", (evt: MessageEvent) => {
  const msg: CacheMessageRequest = evt.data;
  if (msg.kind === CacheMessageKind.Prefetch) {
    console.debug("SW PREFETCH", msg.data.url);
    fetch(msg.data.url, {
      credentials:'include',
      cache: 'no-cache'
    })
    .then((resp) => {
      if (resp.ok) {
      const url = new URL(msg.data.url);
      url.search="";
      const keyUrl = url.toString();
     
      return self.caches.open(audioCache)
        .then((cache) => {
         return cache.put(keyUrl, resp)
        })
        .then(()=>  console.debug(`SW PREFETCH RESPONSE: ${resp.status} saving as ${keyUrl}`))
      } else {
        console.error(`Cannot cache audio ${resp.url}: STTAUS ${resp.status}`);
      }
    })
  }
  
});

self.addEventListener("push", (evt) => {
  console.log("Got push message", evt.data.text());
});

self.addEventListener("fetch", (evt: FetchEvent) => {
  const parsedUrl = new URL(evt.request.url);
  if (/^\/\d+\/audio\//.test(parsedUrl.pathname)) {
    console.log("AUDIO FILE request: ", decodeURI(parsedUrl.pathname));
    // we are not intercepting requests with seek query
    if (parsedUrl.searchParams.get("seek")) return;

    const rangeHeader = evt.request.headers.get("range");
    if (rangeHeader) {
      console.log("RANGE: ", rangeHeader);
    }

    evt.respondWith(caches.open(audioCache).then((cache) => cache.match(evt.request).then((resp) => {
      if (resp) console.debug(`SERVING CACHED AUDIO: ${resp.url}`);
      return resp || fetch(evt.request)
    })))
  } else {
    evt.respondWith(
      caches.open(cacheName).then((cache) =>
        cache.match(evt.request).then((response) => {
          console.log(
            `OTHER request: ${evt.request.url}`,
            evt.request,
            response
          );
          return response || fetch(evt.request);
        })
      )
    );
  }
});
