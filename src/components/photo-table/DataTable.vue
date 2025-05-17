<script setup lang="ts" generic="TData, TValue">
import {
  type ColumnDef,
  getSortedRowModel,
  type SortingState,
} from "@tanstack/vue-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FlexRender, getCoreRowModel, useVueTable } from "@tanstack/vue-table";
import { ref } from "vue";
import { valueUpdater } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";

const props = defineProps<{
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  loading: boolean;
}>();

const emit = defineEmits<{
  (e: "reachBottom"): void;
  (e: "sortingChange"): void;
}>();

const sorting = ref<SortingState>([]);

const table = useVueTable({
  get data() {
    return props.data;
  },
  get columns() {
    return props.columns;
  },
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
  onSortingChange: (updaterOrValue) => {
    valueUpdater(updaterOrValue, sorting);
    emit("sortingChange");
  },
  state: {
    get sorting() {
      return sorting.value;
    },
  },
});

const scrollRef = ref<HTMLElement | null>(null);

function onScroll() {
  const el = scrollRef.value;
  if (!el) return;

  const threshold = 5;
  const isBottom = el.scrollHeight - el.scrollTop - el.clientHeight < threshold;

  if (isBottom) emit("reachBottom");
}
</script>

<template>
  <div
    ref="scrollRef"
    class="rounded-md overflow-auto max-h-[600px] border mx-auto"
    @scroll="onScroll"
  >
    <Table>
      <TableHeader class="sticky top-0 z-10 bg-background">
        <TableRow
          v-for="headerGroup in table.getHeaderGroups()"
          :key="headerGroup.id"
        >
          <TableHead v-for="header in headerGroup.headers" :key="header.id">
            <FlexRender
              v-if="!header.isPlaceholder"
              :render="header.column.columnDef.header"
              :props="header.getContext()"
            />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <template v-if="table.getRowModel().rows?.length">
          <TableRow
            v-for="row in table.getRowModel().rows"
            :key="row.id"
            :data-state="row.getIsSelected() ? 'selected' : undefined"
          >
            <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
              <FlexRender
                :render="cell.column.columnDef.cell"
                :props="cell.getContext()"
              />
            </TableCell>
          </TableRow>
        </template>
        <template v-else>
          <TableRow>
            <TableCell :colspan="columns.length" class="h-24 text-center">
              Ничего нет.
            </TableCell>
          </TableRow>
        </template>
        <template v-if="props.loading">
          <TableRow>
            <TableCell :colspan="columns.length" class="h-24 text-center">
              <Spinner />
            </TableCell>
          </TableRow>
        </template>
      </TableBody>
    </Table>
  </div>
</template>
