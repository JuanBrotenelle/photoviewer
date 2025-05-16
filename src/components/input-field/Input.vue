<script setup lang="ts">
import Input from "@/components/ui/input/Input.vue";

const REGEX = /^[0-9]+$/;

const modelValue = defineModel<string[]>();

function formatModelValue(newVal: string | number) {
  if (typeof newVal === "string") {
    const arrVals = newVal.split(" ");
    modelValue.value = arrVals.filter((v) => REGEX.test(v));
  }
}
</script>

<template>
  <Input
    :model-value="modelValue?.join(' ')"
    @update:model-value="formatModelValue"
  />
</template>
