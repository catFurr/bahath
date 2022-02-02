<template>
  <div v-if="!getUser.isLoggedIn" class="flex h-screen mx-auto">
    <div class="self-center">
      <p class="text-3xl font-medium">Hi there!</p>
      <hr class="mb-6 mt-4 border-gray-800" />
      <div class="w-24 mx-auto" @click="$login()">
        <HollowButton :text="'Log In'" />
      </div>
    </div>
  </div>
  <div v-else class="h-screen grid sm:grid-cols-3 lg:grid-cols-4">
    <div class="pt-4 md:pt-10">
      <div class="grid grid-cols-3 items-center pb-8">
        <img src="~/assets/images/man.svg" class="h-32 justify-self-end py-3" />
        <div class="justify-self-start p-3 col-span-2">
          <p class="font-bold">{{ getUser.data.user_metadata.full_name }}</p>
          <p class="font-bold">Some important detail</p>
          <div class="w-32" @click="$logout()">
            <HollowButton :text="'sign out'" class="mt-2" />
          </div>
        </div>
      </div>

      <VerticalTabs
        :data-tree="toc"
        :curr-section="currSection"
        class="px-10"
        @goto-section="currSection = $event"
      />
    </div>
    <div class="col-span-2 lg:col-span-3 p-4 md:p-10 bg-secondary">
      <div v-if="currSection[0] === 0">
        <p class="text-gray-600 text-4xl">your forms</p>
        <div v-if="getUser.data.fauna_data" class="flex flex-col py-6">
          <div
            v-for="(form_meta, index) in getUser.data.fauna_data.forms"
            :key="index"
            class="flex flex-row pb-3"
          >
            <p class="font-bold p-2">{{ index }}</p>
            <FormCard :form-meta="form_meta" />
          </div>
        </div>
        <NuxtLink to="/blankform/editor">
          <HollowButton
            :text="'make a new form'"
            :icon="'plus'"
            class="w-48 mx-auto"
          />
        </NuxtLink>
      </div>
      <div v-else>
        <p class="text-gray-700 text-4xl">TODO Netlify Identity Stuff Here</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      toc: {
        content: ["your forms"],
        settings: ["account & profile", "security"],
        // 'Balance & Billing': [],
      },
      currSection: [Number(0), Number(0)],
    };
  },
  computed: {
    ...mapGetters(["getUser"]),
  },
};
</script>
