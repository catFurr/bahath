<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useAuth0 } from "@/services/auth0-plugin";

export default defineComponent({
  name: "App",
  setup() {
    const auth0 = useAuth0();

    onMounted(async () => {
      if (!auth0) return;
      auth0.createClient().then(() => {
        auth0.handleCallback();
      });
    });
  },
});
</script>
