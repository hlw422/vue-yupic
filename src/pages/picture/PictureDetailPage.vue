<template>
    <div id="picture-detail-page">
        <a-row :gutter="[16, 16]"><!--横纵间距-->
            <a-col :sm="24" :md="16" :xl="18"><!--图片预览-->
                <a-image :src="picture?.url" style="max-height: 600px; object-fit: contain;" />
            </a-col>
            <a-col :sm="24" :md="8" :xl="6"><!--图片信息-->
                <a-card titl="图片信息">
                    <a-descriptions :column="1">
                        <a-descriptions-item label="作者">
                            <a-space>
                                <a-avatar :size="24" :src="picture?.user?.userAvatar" />
                                <div>{{ picture?.user?.userName }}</div>
                            </a-space>
                        </a-descriptions-item>
                        <a-descriptions-item label="名称">{{ picture?.name }}</a-descriptions-item>
                        <a-descriptions-item label="分类">{{ picture?.category }}</a-descriptions-item>
                        <a-descriptions-item label="标签">
                            <a-tag v-for="(tag, index) in picture?.tags" :key="index">{{ tag }}</a-tag>
                        </a-descriptions-item>
                        <a-descriptions-item label="宽度">{{ picture?.picWidth ?? "-" }}</a-descriptions-item>
                        <a-descriptions-item label="高度">{{ picture?.picHeight ?? "-" }}</a-descriptions-item>
                        <a-descriptions-item label="宽高比">{{ picture?.picScale ?? "-" }}</a-descriptions-item>
                        <a-descriptions-item label="大小">{{ formatSize(picture?.picSize) }}</a-descriptions-item>
                    </a-descriptions>
                    <a-space wrap>
                        <a-button type="primary" @click="downloadPicture">
                            免费下载
                        <template #icon>
                            <DownloadOutlined />
                        </template>
                        </a-button>
                        <a-button v-if="CanEdit" :icon="h(EditOutlined)" type="link" :href="`/add_picture?id=${picture?.id}`"
                            target="_blank">编辑</a-button>
                        <a-popconfirm title="确认删除该图片吗？" @confirm="() => deletepicture(picture?.id)" ok-text="确认"
                            cancel-text="取消">
                            <a-button v-if="CanEdit" :icon="h(DeleteOutlined)" danger>删除</a-button>
                        </a-popconfirm>
                    </a-space>
                </a-card>
            </a-col>
        </a-row>
    </div>
</template>
<script setup lang="ts">
import { deletePictureUsingPost, getPictureVoByIdUsingGet } from '@/api/pictureController';
import { formatSize,downloadImage } from '@/utils';
import { message } from 'ant-design-vue';
import { computed, onMounted, ref } from 'vue';
import { EditOutlined, DeleteOutlined, DownloadOutlined } from '@ant-design/icons-vue';
import { h } from 'vue';
import { useLoginUserStore } from '@/stores/useLoginUserStore';

interface Props {
    id: string | number
}
const props = defineProps<Props>();

const picture = ref<API.PictureVO>();

//判断能否编辑图片
const CanEdit = computed(() => {
    const loginUser = useLoginUserStore().loginUser;
    if (!loginUser.id) {
        return;
    }
    const user = loginUser || {}
    return loginUser.id === picture.value?.userId || loginUser.userRole === 'admin'
}
)

/**
 * 下载图片
 */
const downloadPicture = () => {
    const url = picture.value?.url;
    if (!url) {
        return;
    }
    downloadImage(url, picture.value?.name);
}

const deletepicture = async () => {
    const id=picture.value?.id;
    if (!id) {
        return;
    }
    const res = await deletePictureUsingPost({ id });
    if (res.data.code === 0) {
        message.success('删除成功');
        fetchDetail();
    }
    else{
        message.error('删除失败,' + res.data.message);
    }

}

const fetchDetail = async () => {
    try {
        const res = await getPictureVoByIdUsingGet({ id: props.id as any });
        if (res.data.code === 0 && res.data.data) {
            picture.value = res.data.data;

            console.log('fetchDetail', picture.value);
        }
        else {
            message.error('获取图片详情失败,' + res.data.message);
        }
    }
    catch (e: any) {
        message.error('获取图片详情失败,' + e.message);
    }

}
onMounted(() => {
    fetchDetail();
}); 
</script>

<style scoped></style>