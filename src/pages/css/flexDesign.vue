<template>
    <div class="container">
        <div class="flex-box flex-box1">1</div>
        <div class="flex-box flex-box2">2</div>
        <div class="flex-box flex-box3">3</div>

    </div>

</template>
<script setup>
</script>

<style scoped>
.container {
    display: flex;
    height: 700px;
    flex-wrap: wrap;
    justify-content: center;
    background: yellow;
    flex-direction: row; /* 设置主轴方向为横向 */
    align-content: space-between; /* 交叉轴居中 */
}

.flex-box {
    width: 200px;
    margin: 10px;
    border: 3px solid #ccc;
    background-color: #dedede;
}

.flex-box1 {
    min-height: 100px;
    flex-shrink: 0;/*不会随浏览器改变大小*/
    order: 2;
}

.flex-box2 {
    min-height: 200px;
    align-self: center;
    order: 3;
}

.flex-box3 {
    min-height: 300px;
    flex-grow :1; /* 剩余空间按比例分配 */
    order: 1;
}
</style>