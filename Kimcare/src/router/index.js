import { createRouter, createWebHistory } from 'vue-router';
import Home from './src/views/HomeView.vue';
import Donate from '/src/views/Donate.vue';
import Volunteer from '/src/views/Volunteer.vue';
import Learn from './src/views/Learn.vue';
import Community from './src/views/Community.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/donate', component: Donate },
  { path: '/volunteer', component: Volunteer },
  { path: '/learn', component: Learn },
  { path: '/community', component: Community },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;