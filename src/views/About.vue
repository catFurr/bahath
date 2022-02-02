<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script lang="ts">
import { useQuery } from "@vue/apollo-composable";
import { gql } from "graphql-tag";
import { Ref } from "vue";

export default {
  name: "About",
  setup(): { result: Ref<string | null> } {
    const { result } = useQuery(gql`
      query getUsers {
        users {
          userID
          name
          email
        }
      }
    `);

    return {
      result,
    };
  },
};
</script>
