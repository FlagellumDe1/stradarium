<script lang="ts" setup>
  import axios from "axios";
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  import { ref } from "vue";
  import type { TPost } from "../types/TPost.ts";

  const posts = ref<TPost[] | null>(null);
  axios.get("https://jsonplaceholder.typicode.com/posts")
    .then((response) => {
      posts.value = response.data;
    })
  .catch((error) => {
    console.error(error);
  })
</script>
<template>
  <template v-if="!posts">
    Подождите, идет загрузка
  </template>
  <template v-else-if="posts?.length === 0" >
    Посты не найдены
  </template>
  <DataTable :value="posts"  paginator :rows="5" show-gridlines v-else>
    <Column field="userId" header="Code"></Column>
    <Column field="id" header="Name"></Column>
    <Column field="title" header="Category"></Column>
    <Column field="body" header="Quantity"></Column>
  </DataTable>
</template>
<style></style>