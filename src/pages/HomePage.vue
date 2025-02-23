<template>
    <div id="home-page">
        <div class="home-page-search">
            <a-input-search v-model:value="searchParams.searchText" enter-button="搜索" size="large" placeholder="从这里搜索"
                @search="doSearch" />
        </div>

        <div>
            <a-tabs v-model:active-key="selectedCategory" @change="doSearch">
                <a-tab-pane key="all" tab="全部"></a-tab-pane>
                <a-tab-pane v-for="category in categoryList" :key="category" :tab="category"></a-tab-pane>
            </a-tabs>

            <div class="tag-bar">
                <span>标签：</span>
                <a-space :size="[0, 8]" wrap>
                    <a-checkable-tag v-for="(tag, index) in tagList" :key="tag" v-model:checked="SelectedTagList[index]"
                        @change="doSearch">
                        {{ tag }}
                    </a-checkable-tag>
                </a-space>
            </div>
        </div>
        <a-list :grid="{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 6 }" :data-source="dataList" :loading>
            <template #renderItem="{ item: picture }">
                <a-list-item style="padding: 0;">
                    <a-card hoverable style="width: 240px;" @click="doShowPicture(picture)">
                        <template #cover>
                            <img alt="example" :src="picture.url" style="height: 180px;object-fit: cover;" />
                        </template>
                        <a-card-meta :title="picture.name">
                            <template #description>
                                <a-flex>
                                    <a-tag color="green">{{ picture.category }}</a-tag>
                                </a-flex>
                            </template>
                        </a-card-meta>
                    </a-card>
                </a-list-item>
            </template>
        </a-list>
    </div>
</template>

<script setup lang="ts">
import { listPictureTagCategoryUsingGet, listPictureVoByPageUsingPost } from '@/api/pictureController';
import { message } from 'ant-design-vue';
import { computed, onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
const dataList = ref<API.PictureVO[]>([]);


const router = useRouter();


const categoryList = ref<string[]>([]);
const tagList = ref<string[]>([]);
const selectedCategory = ref<string>("all");
const SelectedTagList = ref<string[]>([]);

//   获取分类列表
const getCategoryOptions = async () => {
    const res = await listPictureTagCategoryUsingGet();
    if (res.data.code === 0 && res.data.data) {
        tagList.value = res.data.data.tagList ?? [];
        categoryList.value = res.data.data.categoryList ?? [];
    } else {
        message.error('获取分类列表失败：' + res.data.message);
    }
}

const loading = ref(true);
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
        onchange: (page: any) => {
            doTableChange(page)
        }
    }
})


const doShowPicture = (picture: API.PictureVO) => {
    router.push({
        path: `/picture/${picture.id}`,
    });
}


// 表格变化处理
const doTableChange = (page: any) => {
    searchParams.current = page.current
    searchParams.pageSize = page.pageSize
    getpictures()
}


const getpictures = async () => {
    loading.value = true;

    const params = {
        ...searchParams,
        tags: [] as string[]
    }
    if (selectedCategory.value != "all") {
        params.category = selectedCategory.value
    }
    SelectedTagList.value.forEach((useTag, index) => {
        if (useTag) {
            params.tags.push(tagList.value[index])
        }
    })

    const res = await listPictureVoByPageUsingPost(params);
    if (res.data.code == 0 && res.data.data) {
        dataList.value = res.data.data.records ?? [] as any;
        total.value = parseInt(res.data.data.total as any, 10) ?? 0;
        console.log("dataList", dataList.value)
    } else {
        message.error('获取图片列表失败：' + res.data.message);
    }
    loading.value = false;
}

const doSearch = () => {

    console.log("doSearch", searchParams)
    // 重置页码
    searchParams.current = 1
    getpictures();
}
onMounted(() => {
    getCategoryOptions();
    getpictures();
});

</script>

<style scoped>
#home-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
}

#home-page .home-page-search {
    width: 480px;
    margin: 0 auto 16px;
}

#home-page .tag-bar {
    margin-bottom: 16px;
}
</style>