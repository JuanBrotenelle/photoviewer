<script setup lang="ts">
import Default from "./views/default.vue";
import { Toaster } from "@/components/ui/sonner";
</script>

<template>
  <Toaster position="bottom-center" richColors />
  <main class="max-w-[600px] mx-auto">
    <Default />
  </main>
</template>

<style scoped></style>
