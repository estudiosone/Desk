/* eslint-disable vue/no-v-html */
<template>
  <div class="widget-blog-entry">
    <header class="entry-header">
      <h1 class="title">
        {{ entry.Title }}
      </h1>
      <p class="entry-meta">
        <span class="entry-date">
          {{ entry.Date }}
        </span>
        <span class="entry-category">
          {{ entry.Category }}
        </span>
      </p>
      <el-divider />
    </header>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "WidgetBlogEntry"
});
</script>
