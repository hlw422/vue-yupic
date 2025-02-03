<template>
    <div id="userManagerPage">
        <a-table :columns="columns" :data-source="dataList" :pagination="pagination" @change="doTableChange">

            <template #bodyCell="{ column, record }">
                <template v-if="column.dataIndex === 'userAvatar'">
                    <a-image :src="record.userAvatar" :width="120" />
                </template>
                <template v-else-if="column.dataIndex === 'userRole'">
                    <div v-if="record.userRole === 'admin'">
                        <a-tag color="green">管理员</a-tag>
                    </div>
                    <div v-else>
                        <a-tag color="blue">普通用户</a-tag>
                    </div>
                </template>
                <template v-else-if="column.dataIndex === 'createTime'">
                    {{ dayjs(record.createTime).format('YYYY-MM-DD HH:mm:ss') }}
                </template>
                <template v-else-if="column.key === 'action'">
                    <a-button danger>删除</a-button>
                </template>
            </template>
        </a-table>
    </div>
</template>
<script lang="ts" setup>
import { listUserVoByPageUsingPost } from '@/api/userController';
import { SmileOutlined, DownOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import dayjs from 'dayjs';
import { computed, onMounted, reactive, ref } from 'vue';
const columns = [
    {
        title: 'id',
        dataIndex: 'id',
    },
    {
        title: '账号',
        dataIndex: 'userAccount',
    },
    {
        title: '用户名',
        dataIndex: 'userName',
    },
    {
        title: '头像',
        dataIndex: 'userAvatar',
    },
    {
        title: '简介',
        dataIndex: 'userProfile',
    },
    {
        title: '用户角色',
        dataIndex: 'userRole',
    },
    {
        title: '创建时间',
        dataIndex: 'createTime',
    },
    {
        title: '更新时间',
        dataIndex: 'updateTime',
    },
    {
        title: '操作',
        key: 'action',
    },
]
const dataList = ref<API.UserVO[]>();
const total = ref(0);

// search params
const searchParams = reactive<API.UserQueryRequest>({
    current: 1,
    pageSize: 10,
    sortField: 'createTime',
    sortOrder: 'ascend',
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
    getUsers()
}


const getUsers = async () => {
    const res = await listUserVoByPageUsingPost({
        ...searchParams,
    })
    if (res.data.code == 0 && res.data.data) {
        dataList.value = res.data.data.records ?? [];
        total.value = parseInt(res.data.data.total, 10) ?? 0;
    } else {
        message.error('获取用户列表失败：' + res.data.message);
    }
}

onMounted(() => {
    getUsers();
});
</script>