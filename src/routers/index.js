import { createWebHistory, createRouter } from "vue-router";
import { inject } from 'vue';  // inject는 setup() 내에서만 사용해야 합니다
import PageLogin from "@/components/PageLogin.vue";
import PageJoin from "@/components/PageJoin.vue";
import PagePasswordFind from "@/components/PagePasswordFind.vue";
import PageRelease from "@/components/PageRelease.vue";
import PageSearch from "@/components/PageSearch.vue";
import PageFavorite from "@/components/PageFavorite.vue";

const routes = [
  {
    path: "/",
    name: "PageLogin",
    component: PageLogin,
    meta: { requiresAuth: false },
  },
  {
    path: "/join",
    name: "PageJoin",
    component: PageJoin,
    meta: { requiresAuth: false },
  },
  {
    path: "/passwordFind",
    name: "PagePasswordFind",
    component: PagePasswordFind,
    meta: { requiresAuth: false },
  },
  {
    path: "/release",
    name: "PageRelease",
    component: PageRelease,
    meta: { requiresAuth: true },
  },
  {
    path: "/search",
    name: "PageSearch",
    component: PageSearch,
    meta: { requiresAuth: true },
  },
  {
    path: "/favorite",
    name: "PageFavorite",
    component: PageFavorite,
    meta: { requiresAuth: true },
  },
  // oauth2 redirect page
  {
    path: '/oauth2/redirect',
    name: "Oauth2Redirect",
    component: PageLogin,
    meta: { requiresAuth: false },
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const showErrorAlert = inject('showErrorAlert');  // inject는 setup() 내에서만 사용해야 합니다.
  const access_token = localStorage.getItem('accessToken');

  if (!access_token) {
    if (to.meta.requiresAuth) {
      showErrorAlert("로그인 후 이용해주세요.");
      next("/");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
