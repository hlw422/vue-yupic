<template>
    <div id="add-picture_batch-page">
        <h2 style="margin-bottom:16px">
            批量创建
        </h2>
        <!--图片信息表单-->
        <a-form name="formData" layout="vertical" :model="formData" @finish="handleSubmit">
            <a-form-item name="searchText" label="关键词">
                <a-input v-model:value="formData.searchText" placeholder="请输入关键字" />
            </a-form-item>
            <a-form-item name="count" label="抓取数量">
                <a-input-number v-model:value="formData.count" :min="1" :max="3" allow-clear place-order="请输入数量 (1-3)"
                    style="min-width: 180px;" />
            </a-form-item>
            <a-form-item name="namePrefix" label="名称前缀">
                <a-input v-model:value="formData.namePrefix" placeholder="请输入名称前缀" />
            </a-form-item>
            <a-form-item>
                <a-button type="primary" html-type="submit" style="width: 100%;" :loading="loading">执行任务
                </a-button>
            </a-form-item>
        </a-form>
    </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import PictureUpLoad from '@/components/PictureUpLoad.vue';
import { message } from 'ant-design-vue';
import { editPictureUsingPost, getPictureByIdUsingGet, getPictureVoByIdUsingGet, listPictureTagCategoryUsingGet, uploadPictureByBatchUsingPost } from '@/api/pictureController';
import { useRoute, useRouter } from 'vue-router';
import UrlPictureUpload from '@/components/UrlPictureUpload.vue';

const formData = ref<API.PictureUploadByBatchRequest>({
    searchText: '',
    count: 1,
    namePrefix: ''
});

//   路由跳转
const router = useRouter();
//获取路由信息
const route = useRoute();

const loading = ref<boolean>(false);

const handleSubmit = async () => {
    loading.value = true;
    const res = await uploadPictureByBatchUsingPost(formData.value);
    if (res.data.code === 0&&res.data.data) {
        message.success(`批量上传成功,共${res.data.data}张图片`);
        router.push({
            path: '/',
        });
    } else {
        message.error('批量上传失败'), res.data.message;
    }
    loading.value = false;
}
</script>


<style scoped>
#add-picture-page {
    max-width: 800px;
    margin: 0 auto;
}
</style>