import { createWebHistory, createRouter } from "vue-router"; 
import Book from "@/views/Book.vue";

const routes = [
    {
        path: "/",
        name: "book",
        component: Book,
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFound.vue"),
    },
    
    {   
        path: "/books/:id",
        name: "book.edit",
        component: () => import("@/views/BookEdit.vue"),
        props: true 
    },
    {   
        path: "/addbooks",
        name: "book.add",
        component: () => import("@/views/BookAdd.vue"),
    },
    
];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL), 
    routes,
});
export default router;