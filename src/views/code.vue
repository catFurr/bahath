<template>
  <div class="min-h-screen" v-if="els">
    <!-- Form Page -->
    <FormPageVue
      :branch="branch"
      :els="els"
      :submit-state="submitState"
      :update-answer="updateAnswer"
      :go-next="goNext"
      :go-back="goBack"
      :submit-finish="submitFinish"
    />
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
import { computed, defineComponent, inject } from "vue";
import { useRoute } from "vue-router";

// import AlertDialogVue from "@/components/particles/AlertDialog.vue";
import FormPageVue from "@/components/polymers/FormPage.vue";

import { FRAG_BRANCH_CORE } from "@/models/fragments";
import { ElementNodeType, StringObjMap } from "@/models/elements";

export default defineComponent({
  components: {
    // AlertDialogVue,
    FormPageVue,
  },
  setup() {
    //
    // Fetch the current page
    const route = useRoute();
    const popToast: { (data: string): null } | undefined = inject("popToast");

    const {
      result: branchResult,
      loading: fetchLoading,
      error: fetchError,
      onResult: onFetchRes,
      onError: onFetchError,
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
    onFetchError((err) => {
      popToast?.(String(err) + String(fetchError.value));
    });
    const branch = useResult(branchResult, null, (d) => d.branchNodes[0]);
    const branchID = computed(() => branch.value?.id);
    const els = computed(() => {
      return branch.value?.scene.elementsConnection.edges.map(
        (x: { node: ElementNodeType }) => {
          return { ...x.node, answer: answersMap.value[x.node.id] };
        }
      );
    });

    onFetchRes(({ data }) => {
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
      router.push("/coffee");
    };

    // Sync answer with DB
    // this should selectively request data: skipping stuff we already know
    // i.e. if we already know answerID, query using that
    // if we know prevAns skip that, skip currBranch if this is not entry branch
    // if this is newly created, value and nextAns will always be null
    const {
      result: answerResult,
      // loading: answerLoading,
      error: answerError,
      onResult: onAnswerRes,
      onError: onAnswerError,
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
    // const answerState = { answerLoading, answerError };
    onAnswerRes(({ data }) => {
      if (data?.branchNodes?.[0]?.answers?.[0]?.id) {
        popToast?.("Loaded old answers");
      }
    });
    onAnswerError((err) => {
      popToast?.(String(err) + String(answerError.value));
    });

    // use answerID when possible TODO
    const {
      mutate: sendAnswer,
      loading: submitLoading,
      error: submitError,
      onError: onSubmitError,
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
          // this needs to work even when answering for the first time
          // that is when answer does not exist in the database for this user and this branch
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
    onSubmitError((err) => {
      popToast?.(String(err) + String(submitError.value));
    });

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
      goBack,
      goNext,
      submitFinish,
      updateAnswer,
    };
  },
});
</script>
