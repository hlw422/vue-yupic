<template>
    <div id="pictureManagerPage">
        <a-flex justify="space-between">
            <h2>图片管理</h2>
            <a-space>
                <a-button type="primary" href="/add_picture" target="_blank">+创建图片</a-button>
                <a-button type="primary" href="/add_picture/batch" target="_blank" ghost>+批量创建图片</a-button>
            </a-space>
        </a-flex>
        <a-form layout="inline" :model="searchParams" @finish="doSearch">
            <a-form-item label="关键词">
                <a-input v-model:value="searchParams.searchText" placeholder="从名称和简介搜索" />
            </a-form-item>
            <a-form-item label="类型">
                <a-input v-model:value="searchParams.category" placeholder="请输入类型" />
            </a-form-item>
            <a-form-item>
                <a-select v-model:value="searchParams.tags" mode="tags" allow-clear placeholder="请输入标签"
                    style="min-width: 180px;"></a-select>
            </a-form-item>
            <a-form-item name="reviewStatus" label="审核状态">
                <a-select :options="PIC_REVIEW_STATUS_OPTIONS" v-model:value="searchParams.reviewStatus" allow-clear
                    placeholder="请选择审核状态" style="min-width: 180px;"></a-select>
            </a-form-item>
            <a-form-item>
                <a-button type="primary" html-type="submit">搜索</a-button>
            </a-form-item>
        </a-form>

        <a-table :columns="columns" :data-source="dataList" :pagination="pagination" @change="doTableChange">

            <template #bodyCell="{ column, record }">
                <template v-if="column.dataIndex === 'url'">
                    <a-image :src="record.url" :width="120" />
                </template>
                <template v-else-if="column.dataIndex === 'tags'">
                    <a-tag v-for="tag in JSON.parse(record.tags || '[]')" :key="tag">
                        {{ tag }}
                    </a-tag>
                </template>
                <template v-else-if="column.dataIndex === 'createTime'">
                    {{ dayjs(record.createTime).format('YYYY-MM-DD HH:mm:ss') }}
                </template>
                <template v-else-if="column.dataIndex === 'editTime'">
                    {{ dayjs(record.editTime).format('YYYY-MM-DD HH:mm:ss') }}
                </template>
                <template v-else-if="column.dataIndex === 'picInfo'">
                    <div>格式:{{ record.picFormat }}</div>
                    <div>尺寸:{{ record.picWidth }}x{{ record.picHeight }}</div>
                    <div>大小:{{ record.picSize }}KB</div>
                    <div>比例:{{ record.picScale }}</div>
                </template>
                <template v-else-if="column.dataIndex === 'reviewMessage'">
                    <div>审核状态:{{ PIC_REVIEW_STATUS_MAP[record.reviewStatus] }}</div>
                    <div>审核信息:{{ record.reviewMessage }}</div>
                    <div>审核人:{{ record.reviewerId }}</div>
                    <div v-if="record.reviewTime">
                        审核时间:{{ dayjs(record.reviewTime).format('YYYY-MM-DD HH:mm:ss') }}
                    </div>

                </template>

                <template v-else-if="column.key === 'action'">
                    <a-space wrap>
                        <a-button type="link" :href="`/add_picture?id=${record.id}`" target="_blank">编辑</a-button>
                        <a-button v-if="record.reviewStatus != PIC_REVIEW_STATUS_ENUM.PASS" type="link"
                            @click="handleReview(record, PIC_REVIEW_STATUS_ENUM.PASS)">通过</a-button>
                        <a-button v-if="record.reviewStatus != PIC_REVIEW_STATUS_ENUM.REJECT" type="link"
                            @click="openRejectReasonModal(record)">拒绝</a-button>
                        <a-popconfirm title="确认删除该图片吗？" @confirm="() => deletepicture(record.id)" ok-text="确认"
                            cancel-text="取消">
                            <a-button danger>删除</a-button>
                        </a-popconfirm>
                    </a-space>
                </template>
            </template>
        </a-table>
        <!-- 审核拒绝原因模态框 -->
        <a-modal v-model:visible="isRejectModalVisible" title="拒绝原因" @ok="handleRejectSubmit"
            @cancel="handleRejectCancel">
            <a-form>
                <a-form-item label="拒绝原因">
                    <a-input v-model:value="reviewMessage" placeholder="请输入拒绝原因" />
                </a-form-item>
            </a-form>
        </a-modal>

    </div>
</template>
<script lang="ts" setup>
import { deletePictureUsingPost, doPictureReviewUsingPost, listPictureByPageUsingPost, listPictureVoByPageUsingPost } from '@/api/pictureController';
import { PIC_REVIEW_STATUS_ENUM, PIC_REVIEW_STATUS_MAP, PIC_REVIEW_STATUS_OPTIONS } from '@/constants/picture';
import { SmileOutlined, DownOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import dayjs from 'dayjs';
import { computed, onMounted, reactive, ref } from 'vue';


// 控制拒绝原因模态框的显示状态
const isRejectModalVisible = ref(false);
// 当前模态框的审核状态（通过或拒绝）
const rejectReasonModalStatus = ref(0);
const rejectReason = ref('');

const reviewMessage = ref('');

const currentPicId = ref<number>(0);


const handleRejectCancel = () => {
    isRejectModalVisible.value = false;
}
const openRejectReasonModal = (record: API.Picture) => {
    isRejectModalVisible.value = true;
    currentPicId.value = record.id;
}

/**
 * 提交审核
 * @param record 
 * @param status 
 */
const handleRejectSubmit = async (record: API.Picture, status: number) => {
    handleReview(record, PIC_REVIEW_STATUS_ENUM.REJECT);
};


const columns = [
    {
        title: 'id',
        dataIndex: 'id',
        width: 80,
    },
    {
        title: '图片',
        dataIndex: 'url',
    },
    {
        title: '名称',
        dataIndex: 'name',
    },
    {
        title: '简介',
        dataIndex: 'introduction',
        ellipsis: true,
    },
    {
        title: '类型',
        dataIndex: 'category',
    },
    {
        title: '标签',
        dataIndex: 'tags',
    },
    {
        title: '图片信息',
        dataIndex: 'picInfo',
    },
    {
        title: '用户 id',
        dataIndex: 'userId',
        width: 80,
    },
    {
        title: '空间 id',
        dataIndex: 'spaceId',
        width: 80,
    },
    {
        title: '审核信息',
        dataIndex: 'reviewMessage',
    },
    {
        title: '创建时间',
        dataIndex: 'createTime',
    },
    {
        title: '编辑时间',
        dataIndex: 'editTime',
    },
    {
        title: '操作',
        key: 'action',
    },
]
const dataList = ref<API.Picture[]>();
const total = ref(0);

// search params
const searchParams = reactive<API.PictureQueryRequest>({
    current: 1,
    pageSize: 10,
    sortField: 'createTime',
    sortOrder: 'descend',
});

// 分页参数
const pagination = computed(() => {
    console.log(searchParams)
    return {
        current: searchParams.current ?? 1,
        pageSize: searchParams.pageSize ?? 10,
        total: total.value,
        showSizeChanger: true,
        showTotal: (total) => `共 ${total} 条`,
    }
})
// 表格变化处理
const doTableChange = (page: any) => {
    searchParams.current = page.current
    searchParams.pageSize = page.pageSize
    getpictures()
}


const getpictures = async () => {
    const res = await listPictureByPageUsingPost({
        ...searchParams,
        reviewStatus: searchParams.reviewStatus == -1 ? "" : searchParams.reviewStatus
    })
    if (res.data.code == 0 && res.data.data) {
        dataList.value = res.data.data.records ?? [] as any;
        total.value = parseInt(res.data.data.total as any, 10) ?? 0;
        console.log("dataList", dataList.value)

        dataList.value.forEach(item => {
            console.log("item", JSON.parse(item.tags || '[]'))
        })

    } else {
        message.error('获取图片列表失败：' + res.data.message);
    }
}

const doSearch = () => {
    // 重置页码
    searchParams.current = 1
    getpictures();
}
/**
 * 审核图片
 * @param record 
 * @param status 
 */
const handleReview = async (record: API.Picture, status: number) => {
    if (status == PIC_REVIEW_STATUS_ENUM.REJECT) {
        if (!reviewMessage.value) {
            message.error('请输入拒绝原因');
            return;
        }
    }
    try {
        const res = await doPictureReviewUsingPost({
            id: record.id ?? currentPicId.value,
            reviewStatus: status,
            reviewMessage: status == PIC_REVIEW_STATUS_ENUM.PASS ? '管理员审核通过' : reviewMessage.value,
        })
        getpictures();
        message.success('审核成功');
    }
    catch (e: any) {
        message.error('审核失败：' + e.message);
    }
    reviewMessage.value = '';
    isRejectModalVisible.value = false;
}

const deletepicture = async (id: number) => {
    if (!id) {
        return;
    }
    const res = await deletePictureUsingPost({ id })
    if (res.data.code == 0) {
        message.success('删除图片成功');
        getpictures();
    } else {
        message.error('删除图片失败：' + res.data.message);
    }
}

onMounted(() => {
    getpictures();
});
</script>