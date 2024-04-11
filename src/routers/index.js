import { createWebHistory, createRouter } from "vue-router";
import SongSearch from "@/components/SongSearch.vue";

const routes = [
    {
        path: "/search",
        name: "SongSearch",
        component: SongSearch,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;