workbox.core.skipWaiting();
workbox.core.clientsClaim();

workbox.routing.registerRoute(
	new RegExp('(https|http):.*\\.(css|js|png)'),
	new workbox.strategies.StaleWhileRevalidate({
		cacheName: 'cdn-cache',
	})
);

workbox.routing.registerRoute(
	new RegExp('/.*\\.json'),
	workbox.strategies.networkFirst()
);

workbox.precaching.precacheAndRoute(self.__precacheManifest || []);
