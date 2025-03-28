import { createMemoryHistory, createRouter } from 'vue-router'
import Table from "../components/Table.vue";

const routes = [
    { path: '/', component: Table},
];

const router = createRouter({
    history: createMemoryHistory(),
    routes
});
export default router;