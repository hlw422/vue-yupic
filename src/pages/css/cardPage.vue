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
    <a-steps :current=current :items="[
        {
            title: 'Finished',
            description,
        },
        {
            title: 'In Progress',
            description,
            subTitle: 'Left 00:00:08',
        },
        {
            title: 'Waiting',
            description,
        },
    ]"></a-steps>
    <a-flex justify="center" style="margin-top: 20px">
        <a-button type="primary" @click="handleClick">下一步</a-button>
    </a-flex>
    <div class="qrcode">
        <a-qrcode :value="text" />
        <a-input v-model:value="text" placeholder="-" :maxlength="60" />
    </div>
</template>

<script setup>
import { ref } from 'vue'
const current = ref(0)
const text = ref('https://www.baidu.com')

function handleClick() {
    if (current.value < 3) {
        current.value++
    }
}
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