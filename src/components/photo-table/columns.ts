import type { Photo } from '@/stores/photos'
import type { ColumnDef } from '@tanstack/vue-table'
import { Button } from '@/components/ui/button'
import { ArrowUpDown } from 'lucide-vue-next'
import { h } from 'vue'

export const columns: ColumnDef<Photo>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) =>
    h(Button, {
      variant: 'ghost',
      class: 'text-center mx-auto',
      onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
    }, () => ['Id', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })]),
    cell: ({ row }) => {
      return h('div', { class: 'text-center font-medium' }, row.getValue('id'))
    },
  },
  {
    accessorKey: 'albumId',
    header: () => h('div', { class: 'text-center' }, 'Альбом'),
    cell: ({ row }) => {
      return h('div', { class: 'text-center font-medium' }, row.getValue('albumId'))
    },
  },
  {
    accessorKey: 'title',
    header: () => h('div', { class: 'text-center' }, 'Название'),
    cell: ({ row }) => {
      return h('div', { class: 'text-center font-medium truncate max-w-[120px]' }, row.getValue('title'))
    },
  },
  {
    accessorKey: 'url',
    header: () => h('div', { class: 'text-center' }, 'Ссылка'),
    cell: ({ row }) => {
      return h('div', { class: 'text-center font-medium  truncate max-w-[120px]' }, row.getValue('url'))
    },
  },
  {
    accessorKey: 'thumbnailUrl',
    header: () => h('div', { class: 'text-center' }, 'Миниатюра'),
    cell: ({ row }) => {
      return h('div', { class: 'text-center font-medium truncate max-w-[120px]' }, row.getValue('thumbnailUrl'))
    },
  },
]