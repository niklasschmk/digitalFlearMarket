import {createRouter, createWebHistory} from "vue-router";
import HomeView from "@/components/HomeView";
import allOffers from "@/components/allOffers";
import chatView from "@/components/chatView";
import thisProduct from "@/components/thisProduct";
import chatsView from "@/components/chatsView";
import profileView from "@/components/profileView";

const routes =[
    {path: "/", component: HomeView},
    {path: "/alloffers", component: allOffers},
    {path: "/chats", component: chatsView},
    {path: "/chat", name: "chat" , component: chatView, props: true},
    {path: "/product", name: "product" , component: thisProduct, props: true},
    {path: "/profile", name: "profile" , component: profileView, props: true},

]
const router = createRouter({
    history: createWebHistory(),
    routes: routes,
    linkActiveClass: "active"
})
export default router;
