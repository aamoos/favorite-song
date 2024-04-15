import { createWebHistory, createRouter } from "vue-router";
import PageLogin from "@/components/PageLogin.vue";
import PageSearch from "@/components/PageSearch.vue";

const routes = [
    {
        path: "/",
        name: "PageLogin",
        component: PageLogin,
    },
    {
        path: "/search",
        name: "PageSearch",
        component: PageSearch,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;