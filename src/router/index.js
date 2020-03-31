import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const Home = () =>
    import ("../views/home/Home");
const Video = () =>
    import ("../views/video/Video");
const MyMusic = () =>
    import ("../views/my-music/MyMusic");
const Profile = () =>
    import ("../views/profile/Profile");
const Detail = () =>
    import ("../views/detail/Detail");

const routes = [
    { path: "", redirect: "/home" },
    { path: "/home", component: Home, meta: { footShow: true } },
    { path: "/video", component: Video, meta: { footShow: true } },
    { path: "/my-music", component: MyMusic, meta: { footShow: true } },
    { path: "/profile", component: Profile, meta: { footShow: true } },
    { path: "/detail/:id", name: "detail", component: Detail, meta: { footShow: false } }
];

const router = new VueRouter({
    routes,
    mode: "history"
});

export default router;