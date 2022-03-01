<template>
  <div v-if="isLoggedIn" class="font-secondary text-right">
    <p class="text-center p-2 w-40 truncate">{{ user?.name }}!</p>
    <router-link v-if="keepExpanded" to="/dashboard">
      <SolidButtonVue :text="'dashboard'" class="w-32 mt-2 mb-1" />
    </router-link>
    <div v-if="keepExpanded" @click="logout?.()">
      <EmptyButtonVue :text="'logout'" class="w-32" />
    </div>
  </div>
  <div v-else @click="login?.()">
    <SolidButtonVue
      v-if="isLoading"
      :icon="'spinner'"
      :iconMeta="'fa-pulse'"
      :text="'login'"
      class="w-16"
    />
    <SolidButtonVue v-else :text="'login'" class="w-16" />
  </div>
</template>

<script lang="ts">
import { useAuth0 } from "@/services/auth0-plugin";

import EmptyButtonVue from "../particles/EmptyButton.vue";
import SolidButtonVue from "../particles/SolidButton.vue";
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    keepExpanded: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    SolidButtonVue,
    EmptyButtonVue,
  },
  setup() {
    const auth0 = useAuth0();
    let isLoggedIn = auth0?.isAuthenticated;
    let user = auth0?.user;
    let login = auth0?.login;
    let logout = auth0?.logout;
    let isLoading = auth0?.isLoading;
    let getToken = auth0?.getAccessToken;

    return {
      user,
      login,
      logout,
      isLoggedIn,
      isLoading,
      getToken,
    };
  },
});
</script>
