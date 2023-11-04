
# Box - a PWA shopping list

The Box is a responsive PWA shopping list developed using [Vue.js](https://vuejs.org/), [Vuex](https://vuex.vuejs.org/), [Vuetify](https://vuetifyjs.com/en/), and [VueI18n](https://kazupon.github.io/vue-i18n/) technologies.

In this PWA project, I used [Webpack](https://webpack.js.org/) and [Babel](https://babeljs.io/) for bundling, [Babel](https://babeljs.io/), [Jest](https://jestjs.io/), and [Vue Test Utils](https://vue-test-utils.vuejs.org/) for testing, and [ESLint](https://eslint.org/) for linting.

Finally, I utilized [Workbox](https://developers.google.com/web/tools/workbox/) to create the service worker.



### Caution

I am aware that it is unprofessional to comment the codes, but I commented the dynamic imports due to [a shallowMount bug](https://github.com/vuejs/vue-test-utils/issues/1279).

If you want to create a new build version or run the app in development mode using lazy loading, please keep in mind that you need to remove the comments from the dynamic imports and add comments to the static imports. **Please note that dynamic imports should not be used for testing purposes!**

Also, I didn't fill in the public VAPID key and back-end and server addresses `(in List.vue, Header.vue, and service-worker.js)`.



### Start

#### Please make sure to install the latest version of Python before installing the dependencies of this project. If you prefer not to install Python, you can opt to globally install HTTP-server and then use `npm start` to run the build version.

To begin using this application, please ensure that you have installed all the necessary dependencies by running `npm install` command.

To run the development codes, you can utilize the command `npm run dev`. Alternatively, you can run a lazy loaded build version by using `npm start`. If you prefer to create a build version, you can use the command `npm run build`, followed by `npm start` to execute the build version.

To run the tests, please use the command `npm test`.
