import Vue from "vue";
export default Vue.extend({
  name: "blog",
  filters: {
    extractContent(s: any) {
      return new DOMParser().parseFromString(s, "text/html").documentElement
        .textContent;
      // const span = document.createElement("span");
      // span.innerHTML = s;
      // const children = span.querySelectorAll("*");
      // for (const item of children) {
      //   if (item.textContent) {
      //     item.textContent += " ";
      //   } else {
      //     item.innerText += " ";
      //   }
      // }
      // return [span.textContent || span.innerText]
      //   .toString()
      //   .replace(/ +/g, " ");
    }
  }
});
