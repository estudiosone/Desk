import Vue from "vue";
export default Vue.extend({
  name: "blog",
  filters: {
    extractContent(childrens: any) {
      let text = "";

      for (const children of childrens) {
        if (children.type === "p") {
          text += `${children.data} `;
        }
      }

      return text;
    }
  }
});
