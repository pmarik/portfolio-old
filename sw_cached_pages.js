const cacheName = 'v2'; 

const cacheAssets = [
    'index.html',
    'case_one.html',
    'case_two.html',
    'browserconfig.xml',
    'dist/bundle.js',
    'assets/js/breakpoints.min.js',
    'assets/js/browser.min.js',
    'assets/js/jquery.min.js',
    'assets/js/jquery.scrollex.min.js',
    'assets/js/jquery.scrolly.min.js',
    'assets/js/main.js',
    'assets/js/util.js',
    'assets/css/main.css',
    'assets/css/noscript.css',
    'assets/css/font-awesome.min.css',
    'images/daymakerHome.JPG',
    'images/daymakerHomeBlur.jpg',
    'images/daymakerTemplate.png',
    'images/unaffiliatedHome.JPG',
    'images/unaffiliatedHomeBlur.jpg',
    'images/unaffiliatedTemplate.png',
    'images/marik.tech_logo.png'
];

// Call Install Event
self.addEventListener('install', (e) => {
    console.log('Service Worker: Installed');

    e.waitUntil(
        caches
            .open(cacheName)
            .then(cache => {
                console.log('Service Worker: Caching Files');
                cache.addAll(cacheAssets);
            })
            .then(() => self.skipWaiting())
    );
});

// Call Activate Event
self.addEventListener('activate', (e) => {
    console.log('Service Worker: Activated');
    //Remove Unwanted Caches
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if(cache !== cacheName) {
                        console.log("Service Worker: Clearing Old Cache");
                        return caches.delete(cache);
                    }
                })
            )
        })
    );
});


//Call Fetch Event
self.addEventListener('fetch', e => {
    console.log('Service Worker: Fetching');
    e.respondWith(
        fetch(e.request).catch(() => caches.match(e.request) )
    );
})

