<template>
    <div>
        <h1>Add Picture Page</h1>
        <PictureUpLoad :picture="picture" :onSuccess="handleSuccess" :onError="handleError" />
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import PictureUpLoad from '@/components/PictureUpLoad.vue';
import { message } from 'ant-design-vue';

const picture = ref<API.PictureVO>();
const handleSuccess = (newPicture: API.PictureVO) => {
    picture.value = newPicture;
}
const handleError = (error: any) => {
    console.error(error);
    message.error('Upload failed, please try again later.');
}
</script>