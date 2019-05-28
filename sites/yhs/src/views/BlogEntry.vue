<template lang="pug">
  .p-blog-entry
    .s-encabezado
      .s-title {{ title }}
    .s-contenido
      .s-children(v-for="children in childrens",:key="children.index")
        el-carousel(v-if="children.type === 'img'",:interval="4000",type="card",height="400px")
          el-carousel-item(v-for="img in children.data",)
            img(:src="img")
        p(v-else-if="children.type === 'p'") {{children.data}}

</template>

// <script lang="ts" src="./BlogEntry.ts"/>
