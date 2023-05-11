import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";
import ResultView from "../views/ResultView.vue";
import SavedLocationsView from "../views/SavedLocationsView.vue";

const routes = [{
        path: "/",
        name: "home",
        component: HomeView,
    },
    {
        path: "/search-result",
        name: "result",
        component: ResultView,
    },
    {
        path: "/saved-locations",
        name: "savedLocations",
        component: SavedLocationsView,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;