<script setup lang="ts">
import { Input } from "@/components/input-field";
import { Button } from "@/components/ui/button";
import { DataTable, columns } from "@/components/photo-table";
import { usePhotoStore, type Photo } from "@/stores/photos";
import { computed, onMounted } from "vue";
import { useInputStore } from "@/stores/albumId";

const $photos = usePhotoStore();
const $input = useInputStore();

const tableData = computed<Photo[]>(() => $photos.getPhotos());
const data = computed<string>(() => $input.formatString());

onMounted(async () => {
  if (tableData.value.length === 0)
    await $photos.fetchPhotos("", 0, 30, "fetch");
});
</script>

<template>
  <div class="flex flex-row gap-x-4 mt-8 px-4 py-2 bg-accent rounded-md">
    <Input
      placeholder="Введите id альбомов"
      v-model:model-value="$input.data"
    />
    <Button
      variant="default"
      class="cursor-pointer"
      @click="$photos.fetchPhotos(data, 0, 30, 'fetch')"
      >Поиск</Button
    >
  </div>

  <div class="mt-8">
    <DataTable
      :columns="columns"
      :data="tableData"
      @reach-bottom="$photos.fetchPhotos(data, tableData.length, 30, 'append')"
    />
  </div>
</template>
