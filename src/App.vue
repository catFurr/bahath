<template>
  <div v-if="auth0 && auth0.isLoading.value" class="page-layout">
    <h1>Loading...</h1>
  </div>

  <div v-else class="page-layout">
    <router-view />
  </div>
</template>

<script lang="ts">
import { onMounted } from "vue";
import { useAuth0 } from "@/services/auth0-plugin";
import { Auth0Plugin } from "./models/auth0-plugin";

export default {
  name: "App",
  setup(): { auth0: Auth0Plugin | null } {
    const auth0 = useAuth0();

    onMounted(async () => {
      if (!auth0) {
        return;
      }

      await auth0.createClient();
      await auth0.handleCallback();
    });

    return {
      auth0,
    };
  },
};
</script>

<style lang="stylus">
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 60px
</style>
