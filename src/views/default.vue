<script setup lang="ts">
import { Input } from "@/components/input-field";
import { Button } from "@/components/ui/button";
import { DataTable, columns } from "@/components/photo-table";
import { usePhotoStore, type Photo } from "@/stores/photos";
import { useRequestQueue } from "@/composables/throttleScroll";
import { useInputStore } from "@/stores/albumId";
import { computed, onMounted } from "vue";

const $photos = usePhotoStore();
const $input = useInputStore();

// Исключить множественные запросы при скролле
const { wrap } = useRequestQueue();

const tableData = computed<Photo[]>(() => $photos.getPhotos());
const data = computed<string>(() => $input.formatString());

onMounted(async () => {
  if (tableData.value.length === 0) await $photos.fetchPhotos("", 0, "fetch");
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
      @click="$photos.fetchPhotos(data, 0, 'fetch')"
      >Поиск</Button
    >
  </div>

  <div class="mt-8">
    <DataTable
      :columns="columns"
      :data="tableData"
      :loading="$photos.isLoading"
      @reach-bottom="
        wrap<void>(() => $photos.fetchPhotos(data, tableData.length, 'append'))
      "
      @sorting-change="$photos.fetchPhotos(data, 0, 'fetch')"
    />
  </div>
</template>
