import Vue from "vue";
export default Vue.extend({
  name: "p-blog-entry",
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      title: "",
      tags: [""],
      content: ""
    };
  },
  mounted() {
    const data = this.$store.state.blog.entries.filter(
      (x: any) => x.id === this.id
    )[0];
    this.title = data.title;
    this.tags = data.tags;
    this.content = data.content;
  }
});
