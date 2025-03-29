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
  const isLoading = ref<boolean>(false);
  const controller = ref<AbortController | null>(null);

  function getData(): void {
    if (controller.value) {
      controller.value.abort();
    }
    controller.value = new AbortController();
    isLoading.value = true;
    axios.get("https://jsonplaceholder.typicode.com/posts", {
      params: {
        title: inputText.value ? inputText.value : undefined,
      },
      signal: controller.value.signal,
    })
      .then((response) => {
        posts.value = response.data;
      })
      .catch((error) => {
        if (!axios.isCancel(error)) {
          toast.add({
            severity: "error",
            summary: 'Произошла ошибка',
            detail: error,
            life: 9000,
          })
        }
      })
      .finally(() => {
        isLoading.value = false;
      });
  }
  getData();
</script>

<template>
  <InputText type="text" v-model="inputText" @update:model-value="getData"></InputText>
  <DataTable :loading="isLoading" :value="posts"  paginator :rows="25" show-gridlines>
    <Column field="userId" header="Пользователь" :sortable="true"></Column>
    <Column field="id" header="ID поста" :sortable="true"></Column>
    <Column field="title" header="Заголовок"></Column>
    <Column field="body" header="Текст"></Column>
  </DataTable>
</template>