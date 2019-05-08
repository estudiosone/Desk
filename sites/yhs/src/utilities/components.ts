import Vue from 'vue';

import WidgetBlogEntry from '../components/Widgets/BlogEntry.vue';
import WidgetBlog from '../components/Widgets/Blog.vue';

export const Register = () => {
  Vue.component(WidgetBlogEntry.name, WidgetBlogEntry);
  Vue.component(WidgetBlog.name, WidgetBlog);
}

export default {
  Register,
}