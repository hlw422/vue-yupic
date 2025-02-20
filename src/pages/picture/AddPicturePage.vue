<template>
    <div id="add-picture-page">
        <h1 style="margin-bottom: 16px;">创建图片</h1>
        <PictureUpLoad :picture="picture" :onSuccess="handleSuccess" :onError="handleError" />
        <!--图片信息表单-->
        <a-form name="picture-form"  layout="vertical" :model="pictureForm" @finish="handleSubmit">
            <a-form-item name="name" label="图片名称">
                <a-input v-model:value="pictureForm.name" placeholder="请输入图片名称" />
            </a-form-item>
            <a-form-item name="introduction" label="图片简介">
                <a-textarea v-model:value="pictureForm.introduction" placeholder="请输入图片简介"
                    :autosize="{ minRows: 2, maxRows: 5 }" allow-clear />
            </a-form-item>
            <a-form-item name="category" label="图片分类">
                <a-auto-complete :options="categoryOptions" v-model:value="pictureForm.category" allow-clear placeholder="请选择图片分类" />
            </a-form-item>
            <a-form-item  name="tags" label="图片标签">
                <a-select :options="tagOptions" v-model:value="pictureForm.tags" mode="tags" allow-clear placeholder="请选择图片标签"></a-select>
            </a-form-item>
            <a-form-item name="picture">
                <a-button type="primary" html-type="submit" style="width:100%">创建</a-button>
            </a-form-item>
        </a-form>
    </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import PictureUpLoad from '@/components/PictureUpLoad.vue';
import { message } from 'ant-design-vue';
import { editPictureUsingPost, listPictureTagCategoryUsingGet } from '@/api/pictureController';
import { useRouter } from 'vue-router';

const router = useRouter();
const pictureForm = reactive<API.PictureEditRequest>(
    {}
);


const categoryOptions = ref<string[]>([]);
const tagOptions = ref<string[]>([]);

//   获取分类列表
const getCategoryOptions = async () => {
    const res = await listPictureTagCategoryUsingGet();
    if (res.data.code === 0&&res.data.data) {
        tagOptions.value=(res.data.data.tagList??[]).map((tag:string)=>{
            return{
                value:tag,
                label:tag
            }
        })as any;
        categoryOptions.value=(res.data.data.categoryList??[]).map((category:string)=>{
            return{
                value:category,
                label:category
            }
        })as any;
    }
}


onMounted(() => {
    getCategoryOptions();
});


const handleSubmit = async(values: any) => {
    const pictureId = picture.value?.id;
    if(!pictureId){
        return;
    }
    const res = await editPictureUsingPost({id: pictureId, ...values}   );
    if(res.data.code===0) {
        message.success('图片信息更新成功');
        router.push({
            path: `/picture/${pictureId}`,
        })
    } else {
        message.error('图片信息更新失败'),res.data.message;
    }
}

const picture = ref<API.PictureVO>();
const handleSuccess = (newPicture: API.PictureVO) => {
    picture.value = newPicture;
    pictureForm.name=newPicture.name;
}
const handleError = (error: any) => {
    console.error(error);
    message.error('Upload failed, please try again later.');
}
</script>


<style scoped>
#add-picture-page {
    max-width: 800px;
    margin: 0 auto;
}
</style>