<template>
    <div class="grid-container">
        <a-row :gutter="16" class="row-center">
            <a-col :span="8"></a-col>
            <a-row :gutter="16" class="row-center">
            <a-col :span="8" v-for="i in 3" :key="i">
                <a-card title="Card title">
                    <span class="ellipsis-text">
                        Card content long long text long long text long long text
                    </span></a-card>
            </a-col>
            </a-row>
        </a-row>
    </div>
</template>
<style>
.ellipsis-text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
    width: 100%;
    /* 确保有宽度，否则省略号不会生效 */
}
.grid-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; /* 让容器占满整个屏幕高度，才能看到居中效果 */
    left: 50%;
}
.row-center {
    display: flex; /* 让 a-row 也变成 flex 容器 */
    align-items: center;

}
</style>