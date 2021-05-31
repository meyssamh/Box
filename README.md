
# Box - a PWA shopping list

Box is a responsive PWA shopping list and developed by [Vue.js](https://vuejs.org/), [Vuex](https://vuex.vuejs.org/), [Vuetify](https://vuetifyjs.com/en/) and [VueI18n](https://kazupon.github.io/vue-i18n/) technologies.

In this PWA I used [Webpack](https://webpack.js.org/) and [Babel](https://babeljs.io/) for bundling, [Babel](https://babeljs.io/), [Jest](https://jestjs.io/) and [Vue Test Utils](https://vue-test-utils.vuejs.org/) for testing and [ESLint](https://eslint.org/) for linting.

At last I used [Workbox](https://developers.google.com/web/tools/workbox/) for making the service worker.

## Caution

I am aware that it is unprofessional to comment the codes, but I had to comment my dynamic imports in some files regarding [a shallowMount bug](https://github.com/vuejs/vue-test-utils/issues/1279).
So if you want to make a new build version or run this app in development-mode with lazy loading, please note that you have to uncomment the dynamic imports and comment the static imports. **Please don't use dynamic imports for testing!**

Also, I didn't fill in the public VAPID key and backend and server addresses `(in List.vue, Header.vue and service-worker.js)`.

## Start

To start this app please first use `npm install` to install all the dependencies.

For running the deveopment-codes you can  use `npm run dev`. You can eather use `npm start` to run my lazy loaded build version or use `npm run build` to make a build version and then use `npm start` to run your build version.
For running the tests please use `npm test`.