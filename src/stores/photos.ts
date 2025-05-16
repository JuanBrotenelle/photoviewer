import axios from "axios";
import { defineStore } from "pinia"
import { ref } from "vue"
import { parse, stringify } from "zipson/lib";

export interface Photo {
    id: number;
    albumId: number;
    title: string;
    url: string;
    thumbnailUrl: string;
}

export const usePhotoStore = defineStore('photos', () => {
    const photos = ref<Photo[]>([])
    const isLoading = ref<boolean>(false)

    function getPhotos() {
        return photos.value
    }

    async function fetchPhotos(value: string = '', start: number = 0, limit: number = 30, type: 'append' | 'fetch') {
        if (isLoading.value) return
        isLoading.value = true

        try {
            const { data, status } = await axios.get<Photo[]>(`https://jsonplaceholder.typicode.com/photos?${value === '' ? '' : value + '&'}_start=${start}&_limit=${limit}`)

            if (status === 200) {
                if (type === 'fetch') photos.value = data
                else photos.value = [...photos.value, ...data]
            }
        } catch (e) {
            console.error(e)
        } finally {
            isLoading.value = false
        }
    }

    return { photos, getPhotos, fetchPhotos }
}, {
    persist: {
        pick: ['photos'],
        serializer: {
          deserialize: parse,
          serialize: stringify
        }
    }
})