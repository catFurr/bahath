import { createApp } from "vue";
import router from "./router";

import Auth0Plugin from "./services/auth0-plugin";
import ApolloPlugin from "./services/apollo-plugin";

import App from "./App.vue";

createApp(App).use(router).use(Auth0Plugin).use(ApolloPlugin).mount("#app");
