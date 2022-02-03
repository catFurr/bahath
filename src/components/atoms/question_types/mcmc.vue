<template>
  <!-- multiple correct multiple choice -->
  <!-- responses are sequence of comma seperated numbers, each between 0 to n,
        i.e. the index of the chosen option -->
  <div class="flex flex-col">
    <div
      v-for="(option, optIndex) in question.options"
      :key="optIndex"
      class="cursor-pointer flex flex-row hover:bg-blue-100"
      @click="updateResponse(optIndex)"
    >
      <FontAwesomeIcon
        :icon="isOptSelected(optIndex) ? ['fas', 'square'] : ['far', 'square']"
        class="mr-2 mt-2"
      />
      <div class="text-lg font-normal tracking-normal w-full">
        <LazyTextInputForEditor
          v-if="getEditMode"
          v-model="option.title"
          :placeholder="'option ' + String(optIndex + 1)"
          class="flex-grow"
        />
        <div
          v-else-if="option.title"
          class="prose"
          v-html="$md.render(parseText(option.title))"
        />
      </div>
      <!-- <img
        v-if="option.foto"
        :src="option.foto"
        class="h-48 pl-10 rounded-md"
      /> -->

      <!-- <FontAwesomeIcon
            v-if="getEditMode"
            class="text-gray-500 hover:text-black cursor-pointer flex-none mx-1"
            :icon="['far', 'image']"
          /> -->
      <FontAwesomeIcon
        v-if="getEditMode"
        :icon="['fas', 'times']"
        class="text-gray-500 hover:text-black cursor-pointer flex-none mx-1 mt-2"
        @click="
          DELETE_QUESTION_OPTION({
            sectionIndex: getSectionIndex,
            qnIndex: index,
            optIndex,
          })
        "
      />
    </div>

    <div
      v-if="getEditMode"
      class="mt-1 cursor-pointer"
      @click="ADD_QUESTION_OPTION({ index, sectionIndex: getSectionIndex })"
    >
      <FontAwesomeIcon :icon="['fas', 'plus']" />
      <p class="inline">add option</p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  props: {
    index: Number(),
  },
  computed: {
    ...mapGetters([
      'parseText',
      'getSectionIndex',
      'getEditMode',
      'getQuestionResponse',
      'getQuestion',
    ]),
    question() {
      return this.getQuestion(this.index)
    },
    response() {
      return this.getQuestionResponse(this.index)
    },
  },
  methods: {
    ...mapMutations([
      'SET_RESPONSE',
      'ADD_QUESTION_OPTION',
      'DELETE_QUESTION_OPTION',
    ]),

    isOptSelected(index) {
      if (this.response) return this.response.split(',').includes(String(index))
      return false
    },

    updateResponse(optIndex) {
      if (this.getEditMode) return
      let newVal
      if (this.isOptSelected(optIndex)) {
        // remove from the response
        const tempArray = this.response.split(',')
        tempArray.splice(tempArray.indexOf(String(optIndex)), 1)
        newVal = tempArray.toString()
      } else {
        // add to the response
        newVal = (this.response ? this.response + ',' : '') + String(optIndex)
      }
      this.SET_RESPONSE({
        qnIndex: this.index,
        newVal,
      })
    },
  },
}
</script>
