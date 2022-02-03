<template>
  <!-- single correct multiple choice grid -->
  <div class="py-6 px-10">
    <table>
      <tr>
        <td />
        <td
          v-for="i in collen"
          :key="i"
          class="text-lg font-normal tracking-normal hover:bg-blue-100"
        >
          <div v-if="getEditMode" class="flex flex-row">
            <!-- <FontAwesomeIcon
            class="text-gray-500 hover:text-black cursor-pointer flex-none mx-1"
            :icon="['far', 'image']"
            /> -->
            <LazyTextInputForEditor
              v-model="columns[i - 1].title"
              :placeholder="'option ' + String(i)"
              class=""
            />
            <FontAwesomeIcon
              :icon="['fas', 'times']"
              class="text-gray-500 hover:text-black cursor-pointer mx-1 mt-2"
              @click="
                DELETE_QUESTION_OPTION({
                  sectionIndex: getSectionIndex,
                  qnIndex: index,
                  optIndex: i - 1,
                })
              "
            />
          </div>
          <!-- eslint-disable-next-line prettier/prettier -->
          <p v-else class="whitespace-pre-line">{{ columns[i - 1].title }}</p>
        </td>
      </tr>
      <tr
        v-for="i in rowlen"
        :key="i"
        class="py-3 items-center hover:bg-blue-100"
      >
        <td class="text-lg font-normal tracking-normal mr-3">
          <div v-if="getEditMode" class="flex flex-row">
            <!-- <FontAwesomeIcon
            class="text-gray-500 hover:text-black cursor-pointer flex-none mx-1"
            :icon="['far', 'image']"
            /> -->
            <FontAwesomeIcon
              :icon="['fas', 'times']"
              class="text-gray-500 hover:text-black cursor-pointer flex-none mx-1 mt-2"
              @click="
                DELETE_QUESTION_OPTION({
                  sectionIndex: getSectionIndex,
                  qnIndex: index,
                  optIndex: i - 1,
                })
              "
            />
            <LazyTextInputForEditor
              v-model="rows[i - 1].title"
              :placeholder="'option ' + String(i)"
              class="flex-grow"
            />
            <button class="text-sm" @click="rows[i - 1].type = 'column'">
              Make column
            </button>
          </div>
          <!-- eslint-disable-next-line prettier/prettier -->
          <p v-else class="whitespace-pre-line">{{ rows[i - 1].title }}</p>
        </td>
        <td v-for="j in collen" :key="j" class="mr-2">
          <FontAwesomeIcon :icon="['far', 'circle']" />
        </td>
      </tr>
      <tr v-if="getEditMode">
        <td
          class="mt-1 cursor-pointer"
          @click="ADD_QUESTION_OPTION({ index, sectionIndex: getSectionIndex })"
        >
          <FontAwesomeIcon :icon="['fas', 'plus']" />
          <p class="inline">add option</p>
        </td>
      </tr>
    </table>

    <!-- <div
      v-if="getEditMode"
      class="mt-1 cursor-pointer"
      @click="$store.commit('ADD_QUESTION_OPTION', index)"
    >
      <FontAwesomeIcon :icon="['fas', 'plus']" />
      <p class="inline">add option</p>
    </div> -->
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
    inputVal: {
      get() {
        return this.response ? Number(this.response) : null
      },
      set(value) {
        if (this.getEditMode) return
        this.SET_RESPONSE({
          qnIndex: this.index,
          newVal: value !== null ? String(value) || '0' : null,
        })
      },
    },

    rows() {
      if (!this.question.options) return []
      return this.question.options.filter((option) => option.type === 'row')
    },
    columns() {
      if (!this.question.options) return []
      return this.question.options.filter((option) => option.type === 'column')
    },

    rowlen() {
      return this.rows.length
    },
    collen() {
      return this.columns.length
    },
  },
  methods: {
    ...mapMutations([
      'ADD_QUESTION_OPTION',
      'SET_RESPONSE',
      'DELETE_QUESTION_OPTION',
    ]),
  },
}
</script>
