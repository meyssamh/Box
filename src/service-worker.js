/* eslint-disable no-undef */
/* eslint-disable no-magic-numbers */
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst, StaleWhileRevalidate, NetworkOnly } from 'workbox-strategies';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';
import { BackgroundSyncPlugin } from 'workbox-background-sync';

// Precaches files from our website.
precacheAndRoute(self.__WB_MANIFEST);

// notificationclick event listener
self.addEventListener('notificationclick', event => {
	const notification = event.notification;
	const action = event.action;

	action === 'open' || action === 'confirm' ?
		event.waitUntil(
			clients.matchAll()
				.then(clis => {
					const client = clis.find(c => {
						return c.visibilityState === 'visible';
					});

					if (client !== undefined) {
						client.navigate(notification.data.url);
						client.focus();
					} else {
						clients.openWindow(notification.data.url);
					}
					notification.close();
				})
		) :
		notification.close();
});

// push notification event listener
self.addEventListener('push', event => {
	let data = {
		title: 'Please check the Box!',
		content: 'You forgot to buy something from your shopping list!',
		openUrl: /* PUT WEBSITE ADDRESS THERE --> */'',
	};

	if (event.data) {
		data = event.data.text();
	}

	const options = {
		body: data.content,
		icon: 'static/icons/favicon-144x144.png',
		badge: 'static/icons/favicon-144x144.png',
		data: {
			url: data.openUrl
		},
		actions: [
			{
				action: 'open',
				title: 'Open',
			},
			{
				action: 'cancel',
				title: 'Cancel',
			},
		],
	};

	event.waitUntil(
		self.registration.showNotification(data.title, options)
	);
});

// Caches fonts from fonts.googleapis.com with a stale-while-revalidate strategy.
registerRoute(
	({ url }) => url.origin === 'https://fonts.googleapis.com',
	new StaleWhileRevalidate({
		cacheName: 'google-fonts-stylesheets',
	})
);

// Caches font files from fonts.gstatic.com with cache-first strategy 
// and expiration of 1 year.
registerRoute(
	({ url }) => url.origin === 'https://fonts.gstatic.com',
	new CacheFirst({
		cacheName: 'google-fonts-webfonts',
		plugins: [
			new CacheableResponsePlugin({
				statuses: [0, 200],
			}),
			new ExpirationPlugin({
				maxAgeSeconds: 60 * 60 * 24 * 365,
				maxEntries: 30,
			}),
		],
	})
);

// Caches css files from cdn.jsdelivr.net with stale-while-revalidate strategy.
registerRoute(
	({ url }) => url.origin === 'https://cdn.jsdelivr.net',
	new StaleWhileRevalidate({
		cacheName: 'js-delivr-stylesheets',
	})
);

// Makes a queue for fialed fetch requests.
const bgSyncPlugin = new BackgroundSyncPlugin('bgSyncQueue', {
	maxRetentionTime: 24 * 60 // Retry for max of 24 Hours (specified in minutes)
});

// Registers our plugins with network-only strategy.
registerRoute(
	/\/api\/.*\/*.json/,
	new NetworkOnly({
		plugins: [bgSyncPlugin]
	}),
	'POST'
);