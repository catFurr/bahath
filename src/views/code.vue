<template>
  <div
    class="lg:px-96 sm:px-32 px-5 py-10 min-h-screen"
    v-if="els"
    :style="'background-color:light' + branch.scene.bg"
  >
    <!-- Form Content -->
    <div v-for="el in els" :key="el.id">
      <!-- Question -->
      <div class="font-primary text-xl pl-2">{{ el.title }}</div>

      <div v-if="el.__typename !== 'empty'" class="mt-6 font-secondary text-lg">
        <scmcVue
          v-if="el.__typename == 'McEl'"
          :node="el"
          @update:value="updateAnswer($event, el.id)"
        />

        <!-- <LazyEmpty v-else /> -->
      </div>

      <!-- <AlertDialogVue :text="currAnswer[id]" class="mt-2" /> -->
    </div>

    <!-- Form Footer Nav -->
    <div class="flex px-3 my-6">
      <div class="w-20 mr-3" v-if="branch.isBackAvail">
        <HollowButtonVue :text="'back'" @click="goBack()" />
      </div>
      <!-- <HollowButton -->
      <div v-if="branch.next" class="w-20">
        <SolidButtonVue
          v-if="submitState.submitLoading.value"
          :icon="'snowflake'"
          :icon-type="'far'"
          :icon-meta="'fa-spin'"
          :is-selected="true"
        />
        <SolidButtonVue v-else :text="'next'" @click="goNext()" />
      </div>
      <div class="w-20 ml-auto" v-if="branch.isSubmitAvail">
        <SolidButtonVue
          v-if="submitState.submitLoading.value"
          :icon="'snowflake'"
          :icon-type="'far'"
          :icon-meta="'fa-spin'"
          :is-selected="true"
        />
        <SolidButtonVue v-else :text="'submit'" @click="submitFinish()" />
      </div>
      <!-- <AlertDialogVue
        :text="String(submitState.submitError.value)"
        class="mt-2"
      /> -->
    </div>
  </div>
  <div
    v-else-if="fetchState.fetchLoading.value"
    class="bg-green-200 min-h-screen text-center"
  >
    <font-awesome-icon
      :icon="['far', 'snowflake']"
      class="fa-spin text-9xl text-red-800"
    />
  </div>
  <div v-else>{{ fetchState.fetchError }}</div>
</template>

<script lang="ts">
import router from "@/router";
import { useMutation, useQuery, useResult } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";

import scmcVue from "@/components/atoms/question_types/scmc.vue";
import SolidButtonVue from "@/components/particles/SolidButton.vue";
import HollowButtonVue from "@/components/particles/HollowButton.vue";
// import AlertDialogVue from "@/components/particles/AlertDialog.vue";
import { FRAG_BRANCH_CORE } from "@/models/fragments";
import { ElementNodeType, StringObjMap } from "@/models/elements";

export default defineComponent({
  components: {
    scmcVue,
    SolidButtonVue,
    HollowButtonVue,
    // AlertDialogVue,
  },
  setup() {
    //
    // Fetch the current page
    const route = useRoute();

    const {
      result: branchResult,
      loading: fetchLoading,
      error: fetchError,
      onResult: fetchRes,
    } = useQuery(
      gql`
        ${FRAG_BRANCH_CORE}
        query getForm($branchWhere: BranchNodeWhere) {
          branchNodes(where: $branchWhere) {
            ...BranchCore
          }
        }
      `,
      () => ({
        branchWhere: route.params.branch
          ? { id: route.params.branch }
          : { code: route.params.code },
      })
    );
    const fetchState = { fetchLoading, fetchError };
    const branch = useResult(branchResult, null, (d) => d.branchNodes[0]);
    const branchID = computed(() => branch.value?.id);
    const els = computed(() => {
      return branch.value?.scene.elementsConnection.edges.map(
        (x: { node: ElementNodeType }) => {
          return { ...x.node, answer: answersMap.value[x.node.id] };
        }
      );
    });

    fetchRes(({ data }) => {
      if (data && !data.branchNodes.length) router.replace("/error?type=404");
    });

    // Form Navigation
    const goBack = () => {
      // checking if we came from the previous branch
      // need to do better error handling here TODO
      const history_branch = String(router.options.history.state.back).split(
        "/"
      )[-1];
      const prevBranch = currAnswer.value.prevAns.branch.id;
      if (prevBranch == history_branch) {
        router.back();
      } else {
        router.push(`/${route.params.code}/${prevBranch}`);
      }
    };
    const goNext = () => {
      const nextBranch = currAnswer.value.nextAns.branch.id;
      router.push(`/${route.params.code}/${nextBranch}`);
      // move currBranch to next branch (let the backend handle this!)
    };
    const submitFinish = () => {
      // make sure all answers are saved
      // move currBranch to first/entry branch (backend needs to do!)
      router.push("coffee");
    };

    // Sync answer with DB
    // this should selectively request data: skipping stuff we already know
    // i.e. if we already know answerID, query using that
    // if we know prevAns skip that, skip currBranch if this is not entry branch
    // if this is newly created, value and nextAns will always be null
    const {
      result: answerResult,
      loading: answerLoading,
      error: answerError,
    } = useQuery(
      gql`
        query getAnswer($branchWhere: BranchNodeWhere) {
          branchNodes(where: $branchWhere) {
            id
            answers {
              id
              value
              nextAns {
                id
                branch {
                  id
                }
              }
              prevAns {
                id
                branch {
                  id
                }
              }
              currBranch {
                id
              }
            }
          }
        }
      `,
      () => ({
        branchWhere: route.params.branch
          ? { id: route.params.branch }
          : { code: route.params.code },
      })
    );
    const currAnswer = useResult(
      answerResult,
      null,
      (d) => d.branchNodes[0].answers[0]
    );
    const answerState = { answerLoading, answerError };

    const {
      mutate: sendAnswer,
      loading: submitLoading,
      error: submitError,
    } = useMutation(
      gql`
        mutation AnswerNext($currBranchID: ID!, $currAnswer: [String!]) {
          sendAnswer(branchID: $currBranchID, value: $currAnswer) {
            id
            value
            nextAns {
              id
              branch {
                id
              }
            }
          }
        }
      `,
      {
        optimisticResponse: (vars) => {
          return {
            sendAnswer: {
              id: currAnswer.value?.id,
              value: vars.currAnswer,
              nextAns: null,
            },
          };
        },
      }
    );
    const submitState = { submitLoading, submitError };

    const answersMap = computed(() => {
      var k: StringObjMap = {};
      currAnswer.value?.value?.forEach((e: string) => {
        k[e.split(":")[0]] = String(e.substring(e.indexOf(":") + 1));
      });
      return k;
    });
    // this should optimistically show a change in answer value immediately to the UI TODO
    const updateAnswer = (event: string | number | null, elID: string) => {
      if (submitLoading.value) return;
      if (String(event) === answersMap.value[elID]) return;
      // make a copy answer array
      var newAns: string[] = [];
      const answersArray = Object.entries(answersMap.value);
      if (!answersArray.length && event) {
        newAns.push(String(elID) + ":" + String(event));
      }
      answersArray.forEach((e) => {
        if (e[0] === elID) {
          if (event) newAns.push(String(e[0]) + ":" + String(event));
        } else {
          newAns.push(String(e[0]) + ":" + String(e[1]));
        }
      });
      sendAnswer({
        currBranchID: branchID.value,
        currAnswer: newAns,
      });
    };

    return {
      els,
      branch,
      fetchState,
      submitState,
      answerState,
      goBack,
      goNext,
      submitFinish,
      updateAnswer,
    };
  },
});
</script>
