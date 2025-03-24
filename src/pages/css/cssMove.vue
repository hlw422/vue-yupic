<template>
 <div class="trasnsition"></div>
 <div class="tranforme-box"></div>
 <div class="tranforme-box-rotate">
    <h1 style="text-align:center">Hello World</h1>
 </div>
 <div class="container">
  <div class="tranforme-box-3d"></div>
  <div class="test-box"></div>
 </div>
</template>
<style scoped>
.trasnsition {
  width: 100px;
  height: 100px;
  background-color: orange;
  transition: all 0.5s ease; 
}
.trasnsition:hover{
    width: 200px;
    height: 200px;
    background-color: blue;

}

.tranforme-box{
    width: 200px;
    height: 200px;
    background-color: green;
    transform: rotate(360deg);
    transition: all 1s
}
.tranforme-box:hover{
    transform: translate(100px,20px);
}
.tranforme-box-rotate{
    margin-top: 200px;
    position:absolute;
    width: 200px;
    height: 200px;
    left: 100px;
    right: 100px;
    background-color: orange;
    transform: rotate(360deg);
    transition: all 1s

}
.tranforme-box-rotate:hover{
    transform: rotate(60deg);
    transform-origin: right bottom;
    transform: scale(1.5,2);
    transform: skew(-30deg,-20deg);
}


.container{
    width: 200px;
    margin: 0 auto;
    transform-style: preserve-3d;
    perspective: 500px;
    position: relative;
    transition: all 1s;
}
.container:hover{
    transform: rotate3d(0,1,0,180deg);
}
.tranforme-box-3d{
    width: 200px;
    height: 200px;
    background-color: green;
    position: absolute;
    transition: all 1s;
}
.test-box{
    width: 200px;
    height: 200px;
    background-color: red;
    position: absolute;
    transform: translateZ(-100px);
}
</style>