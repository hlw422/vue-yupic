<template>
    <div class="url-picture-uploader">
        <a-input-group compact>
            <a-input v-model:value="fileUrl" style="width: calc(100% - 120px)" placeholder="请输入图片地址，支持 http/https格式" />
            <a-button type="primary" style="width: 120px;" @click="handleUpload">上传图片</a-button>
        </a-input-group>
        <div class="img-wrapper">
            <img v-if="picture?.url" :src="picture.url"  alt="图片"/>
        </div>

    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import type { UploadChangeParam, UploadProps } from 'ant-design-vue';
import { uploadPictureByUrlUsingPost, uploadPictureUsingPost } from '@/api/pictureController';

const fileUrl = ref('');


interface Props {
    picture?: API.PictureVO
    onSuccess?: (newPicture: API.PictureVO) => void
}

const props = defineProps<Props>();

function getBase64(img: Blob, callback: (base64Url: string) => void) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
}

const fileList = ref([]);
const loading = ref<boolean>(false);
const imageUrl = ref<string>('');


const handleUpload = async () => {
    loading.value = true;
    try {
        const params:API.PictureUploadRequest = {fileUrl:fileUrl.value}
        if (props.picture) {
            params.id = props.picture.id;
        }
        const res = await uploadPictureByUrlUsingPost(params);
        if (res.data.code === 0 && res.data.data) {
            message.success('上传成功');
            props.onSuccess?.(res.data.data);
        } else {
            message.error('上传失败', res.data.message);
        }
    }
    catch (e) {
        message.error('上传失败', e.message);
    }
}
</script>
<style scoped>
.url-picture-uploader{
    margin-bottom: 16px;

}
.url-picture-uploader .img-wrapper {
    text-align: center;
    margin-top: 16px;
}


.avatar-uploader>.ant-upload {
    width: 128px;
    height: 128px;
}

.ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
}


</style>