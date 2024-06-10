import { createWebHistory, createRouter } from "vue-router";
import PageLogin from "@/components/PageLogin.vue";
import PageJoin from "@/components/PageJoin.vue";
import PagePasswordFind from "@/components/PagePasswordFind.vue";
import PageRelease from "@/components/PageRelease.vue";
import PageSearch from "@/components/PageSearch.vue";
import PageFavorite from "@/components/PageFavorite.vue";

//oauth2 redirect
//import PageRedirect from "@/components/PageRedirect.vue";

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
        //oauth2 redirect page
    {
        path: '/oauth2/redirect'
      , component: PageLogin}
];

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach(function (to, _, next) {
    const access_token = localStorage.getItem('accessToken');
    if (!access_token) {
      if (to.meta.requiresAuth) {
        alert("로그인 후 이용해주세요.");
        next("/");
      } else {
        next();
      }
    } else {
      next();
    }

  });


export default router;