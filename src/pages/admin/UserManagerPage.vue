<template>
    <div id="userManagerPage">
        <a-form layout="inline" :model="searchParams" @finish="doSearch">
            <a-form-item label="账号">
                <a-input v-model:value="searchParams.userAccount" placeholder="输入账号" />
            </a-form-item>
            <a-form-item label="用户名">
                <a-input v-model:value="searchParams.userName" placeholder="输入用户名" />
            </a-form-item>
            <a-form-item>
                <a-button type="primary" html-type="submit">搜索</a-button>
            </a-form-item>
        </a-form>

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
                    <a-popconfirm 
                        title="确认删除该用户吗？" 
                        @confirm="() => deleteUser(record.id)" 
                        ok-text="确认" 
                        cancel-text="取消">
                        <a-button danger>删除</a-button>
                    </a-popconfirm>
                </template>
            </template>
        </a-table>
    </div>
</template>
<script lang="ts" setup>
import { deleteUserUsingPost, listUserVoByPageUsingPost } from '@/api/userController';
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

const doSearch = () => {
    // 重置页码
    searchParams.current = 1
    getUsers();
}

const deleteUser = async (id: number) => {
    if (!id) {
        return;
    }
    const res = await deleteUserUsingPost({ id })
    if (res.data.code == 0) {
        message.success('删除用户成功');
        getUsers();
    } else {
        message.error('删除用户失败：' + res.data.message);
    }
}

onMounted(() => {
    getUsers();
});
</script>