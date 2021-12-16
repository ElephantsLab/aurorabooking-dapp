import VueRouter from "vue-router";

export default new VueRouter({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "main",
            component: () => import("../views/Landing")
        },
        {
            path: "/booking",
            name: "booking",
            component: () => import("../views/Booking")
        },
        {
            path: "/profile",
            name: "profile",
            component: () => import("../views/Profile")
        },
        {
            path: "/marketplace",
            name: "marketplace",
            component: () => import("../views/Marketplace")
        }
    ]
});