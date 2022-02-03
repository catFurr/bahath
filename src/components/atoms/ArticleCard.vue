<template>
  <NuxtLink
    class="text-gray-800 rounded-lg shadow-lg px-6 py-2 prose bg-white hover:bg-secondary"
    :to="`/docs/${slug}`"
  >
    <p class="text-2xl font-bold text-primary" v-html="$md.render(title)" />
    <p class="mt-4" v-html="$md.render(description)" />
    <p class="text-sm mt-1" v-html="$md.render(date)" />
  </NuxtLink>
</template>

<script>
export default {
  props: {
    title: String(),
    slug: String(),
    description: String(),
    // author: Object(),
    date: String(),
  },
}
</script>
