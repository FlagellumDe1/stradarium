<script lang="ts" setup>
  import axios from "axios";
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  import { ref } from "vue";
  import type { TPost } from "../types/TPost.ts";
  import { useToast } from "primevue";

  const posts = ref<TPost[]>([]);
  const toast = useToast();
  axios.get("https://jsonplaceholder.typicode.com/posts")
    .then((response) => {
      posts.value = response.data;
      toast.add({
        severity: "success",
        summary: 'Данные успешно загружены',
        life: 3000,
      })
    })
  .catch(() => {
    toast.add({
      severity: "error",
      summary: 'Произошла ошибка',
      detail: 'Попробуйте позже',
      life: 3000,
    })
  })
</script>

<template>
  <DataTable :loading="!posts.length" :value="posts"  paginator :rows="25" show-gridlines>
    <Column field="userId" header="Пользователь" :sortable="true"></Column>
    <Column field="id" header="ID поста" :sortable="true"></Column>
    <Column field="title" header="Заголовок"></Column>
    <Column field="body" header="Текст"></Column>
  </DataTable>
</template>