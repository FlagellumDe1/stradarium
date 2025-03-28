<script lang="ts" setup>
  import axios from "axios";
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  import { ref } from "vue";
  import type { TPost } from "../types/TPost.ts";
  import { useToast } from "primevue";
  import InputText from 'primevue/inputtext';


  const posts = ref<TPost[]>([]);
  const toast = useToast();
  const inputText = ref<string>('');
  function getData(): void {
    axios.get("https://jsonplaceholder.typicode.com/posts", inputText.value ? {
      params: {
        title: inputText.value,
      }
    } : {})
      .then((response) => {
        posts.value = response.data;
      })
    .catch(() => {
      toast.add({
        severity: "error",
        summary: 'Произошла ошибка',
        detail: 'Попробуйте позже',
        life: 3000,
      })
    })
  }
  getData();
</script>

<template>
  <InputText type="text" v-model="inputText" @update:model-value="getData"></InputText>
  <DataTable :loading="!posts.length" :value="posts"  paginator :rows="25" show-gridlines>
    <Column field="userId" header="Пользователь" :sortable="true"></Column>
    <Column field="id" header="ID поста" :sortable="true"></Column>
    <Column field="title" header="Заголовок"></Column>
    <Column field="body" header="Текст"></Column>
  </DataTable>
</template>