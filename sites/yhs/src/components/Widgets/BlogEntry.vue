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
      <el-divider/>
    </header>
    <section class="entry-content" v-html="entry.Content"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

type WidgetBlogEntry = {
  Title: String;
  Date: Date;
  Category: String;
  Content: String;
}

const props = {
  entry: {
    type: Object as () => WidgetBlogEntry,
  }
}

export default Vue.extend({
  name: 'widget-blog-entry',
  props,
})
</script>
