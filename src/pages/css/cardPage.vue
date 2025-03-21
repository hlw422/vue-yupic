<template>
    <a-flex gap="30">
        <a-card hoverable style="width: 240px">
            <template #cover>
                <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
            </template>
            <a-card-meta title="Europe Street beat">
                <template #description>www.instagram.com</template>
            </a-card-meta>
            <a-button type="primary" style="width: 50%;margin-top: 20px;">查看详情</a-button>
        </a-card>
        <a-card hoverable style="width: 240px">
            <template #cover>
                <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
            </template>
            <a-card-meta title="Europe Street beat">
                <template #description>www.instagram.com</template>
            </a-card-meta>
            <a-button type="primary" style="width: 50%;margin-top: 20px;">查看详情</a-button>
        </a-card>
        <a-card hoverable style="width: 240px">
            <template #cover>
                <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
            </template>
            <a-card-meta title="Europe Street beat">
                <template #description>www.instagram.com</template>
            </a-card-meta>
            <a-button type="primary" style="width: 50%;margin-top: 20px;">查看详情</a-button>
        </a-card>
    </a-flex>
    <a-row :gutter="16">
        <a-col v-for="(item, index) in data" :key="index" :span="6">
            <a-card hoverable style="width: 240px">
                <template #cover>
                    <img alt="example" :src="item.img" />
                </template>
                <a-card-meta :title="item.title">
                    <template #description>{{ item.description }}</template>
                </a-card-meta>
                <a-button type="primary" style="width: 50%;margin-top: 20px;">查看详情</a-button>
            </a-card>
        </a-col>
    </a-row>
</template>

<script setup>
import { ref } from 'vue'
const data = ref([
    {
        title: 'Europe Street beat',
        description: 'www.instagram.com',
        img: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
    },
    {
        title: 'Europe Street beat',
        description: 'www.instagram.com',
        img: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
    },
    {
        title: 'Europe Street beat',
        description: 'www.instagram.com',
        img: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
    },
    {
        title: 'Europe Street beat',
        description: 'www.instagram.com',
        img: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
    },
    {
        title: 'Europe Street beat',
        description: 'www.instagram.com',
        img: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
    },
    {
        title: 'Europe Street beat',
        description: 'www.instagram.com',
        img: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
    },
    {
        title: 'Europe Street beat',
        description: 'www.instagram.com',
        img: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
    },
    {
        title: 'Europe Street beat',
        description: 'www.instagram.com',
        img: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
    },
    {
        title: 'Europe Street beat',
        description: 'www.instagram.com',
        img: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
    },
    {
        title: 'Europe Street beat',
        description: 'www.instagram.com',
        img: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
    },
    {
        title: 'Europe Street beat',
        description: 'www.instagram.com',
        img: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
    },
    {
        title: 'Europe Street beat',
        description: 'www.instagram.com',
        img: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
    },
    {
        title: 'Europe Street beat',
        description: 'www.instagram.com',
        img: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
    },
    {
        title: 'Europe Street beat',
        description: 'www.instagram.com',
        img: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
    },
    {
        title: 'Europe Street beat',
        description: 'www.instagram.com',
        img: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
    },
    {
        title: 'Europe Street beat',
        description: 'www.instagram.com',
        img: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
    },
    {
        title: 'Europe Street beat',
        description: 'www.instagram.com',
        img: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
    }
]);
</script>
<style scoped></style>