import Vue from 'vue';

import WidgetBlogEntry from '../components/Widgets/BlogEntry.vue';
import WidgetBlog from '../components/Widgets/Blog.vue';

import SiteHeader from '../components/SiteHeader.vue';

export const Register = () => {
  Vue.component('desknavi', SiteHeader);
  Vue.component(WidgetBlogEntry.name, WidgetBlogEntry);
  Vue.component(WidgetBlog.name, WidgetBlog);
};

export default {
  Register,
};
