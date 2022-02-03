import { createApp } from "vue";
import router from "@/router";

import Auth0Plugin from "@/services/auth0-plugin";
import ApolloPlugin from "@/services/apollo-plugin";
import FontAwesomePlugin from "@/services/fa-plugin";

import App from "@/App.vue";
import "@/assets/css/tailwind.css";
import "@/assets/css/fonts.css";

createApp(App)
  .use(router)
  .use(Auth0Plugin)
  .use(ApolloPlugin)
  .use(FontAwesomePlugin)
  .mount("#app");
