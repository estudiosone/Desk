/* eslint-disable vue/no-v-html */
<template lang="pug">
  .widget-blog-entry
    header.entry-header
      h1.title
        | {{ entry.Title }}
      p.entry-meta
        span.entry-date
          | {{ entry.Date }}
        span.entry-category
          | {{ entry.Category }}
      el-divider
</template>


<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "WidgetBlogEntry"
});
</script>
