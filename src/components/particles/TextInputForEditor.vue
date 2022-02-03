<template>
  <textarea
    ref="textele"
    v-model="inputValue"
    type="text"
    class="bg-transparent border-gray-500 focus:outline-none focus:border-l-4 pl-4 w-full overflow-hidden resize-none"
    :placeholder="placeholder"
    rows="1"
    maxlength="1000"
  />
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: null,
    },
    placeholder: String(),
  },
  emits: ["input"],
  data() {
    return {
      hiddenDiv: null,
    };
  },
  computed: {
    inputValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
        this.resizeArea();
      },
    },
  },
  mounted() {
    this.hiddenDiv = document.createElement("div");
    this.hiddenDiv.style.display = "none";
    this.hiddenDiv.style.whiteSpace = "pre-wrap";
    this.hiddenDiv.style.wordWrap = "break-word";
    // focus:outline-none focus:border-l-4 pl-4 w-full
  },
  methods: {
    resizeArea() {
      // Get 'el', the textarea element
      const el = this.$refs.textele;
      if (!this.inputValue) return;

      // Append hiddendiv to parent of textarea, so the size is correct
      el.parentNode.appendChild(this.hiddenDiv);
      // Add the same content to the hidden div
      // This is for old IE
      const content = this.inputValue.replace(/\n/g, "<br>");
      // The <br ..> part is for old IE
      this.hiddenDiv.innerHTML = content + '<br style="line-height: 3px;">';
      // Briefly make the hidden div block but invisible
      // This is in order to read the height
      this.hiddenDiv.style.visibility = "hidden";
      this.hiddenDiv.style.display = "block";
      const newHeight = this.hiddenDiv.offsetHeight;
      // Make the hidden div display:none again
      this.hiddenDiv.style.visibility = "visible";
      this.hiddenDiv.style.display = "none";
      el.style.height = newHeight + "px";
    },
  },
};
</script>
