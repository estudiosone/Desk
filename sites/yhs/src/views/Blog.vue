<template lang="pug">
  .p-blog
    .s-encabezado
      .s-title blog
    .s-contenido
      .s-filtro
      .s-list
        el-card.i-entry(shadow="hover",v-for="entry in this.$store.state.blog.entries",:key="entry.id")
          img.s-media(:src="entry.mediaURL")
          .s-title {{entry.title}}
          p.s-texto {{ entry.childrens | extractContent }}
          .s-tags
            el-tag(size="mini",type="info",v-for="tag in entry.tags",:key="tag") {{tag}}
          .s-action
            el-button(type="primary" round @click.primary="$router.push(`/blog/${entry.id}`)") Leer más

</template>

<script lang="ts" src="./Blog.ts"/>
