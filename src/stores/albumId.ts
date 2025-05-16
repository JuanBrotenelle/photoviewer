import { defineStore } from "pinia"
import { ref } from "vue"


export const useInputStore = defineStore('input', () => {
    const data = ref<string[]>([]);

    function formatString(): string {
        return data.value.map((v) => ('albumId='+v)).join('&')
    }

    return { data, formatString }
}, {
    persist: true
})