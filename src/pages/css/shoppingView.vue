<script setup lang="ts">
import { ref, computed } from 'vue'

interface OrderItem {
    id: number
    name: string
    price: number
    quantity: number
    image: string
}

interface Address {
    id: number
    name: string
    phone: string
    address: string
    isDefault: boolean
}

const orderItems = ref<OrderItem[]>([
    {
        id: 1,
        name: "iPhone 15 Pro",
        price: 7999,
        quantity: 1,
        image: "https://placehold.co/100x100"
    },
    {
        id: 2,
        name: "AirPods Pro",
        price: 1999,
        quantity: 1,
        image: "https://placehold.co/100x100"
    }
])

const addresses = ref<Address[]>([
    {
        id: 1,
        name: "张三",
        phone: "13800138000",
        address: "北京市朝阳区某某街道1号楼",
        isDefault: true
    }
])

const selectedAddress = ref(addresses.value[0])
const paymentMethod = ref('alipay')

const totalAmount = computed(() => {
    return orderItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
})

const getItemTotal = (item: OrderItem) => {
    return item.price * item.quantity
}

const updateQuantity = (itemId: number, change: number) => {
    const item = orderItems.value.find(item => item.id === itemId)
    if (item) {
        const newQuantity = item.quantity + change
        if (newQuantity > 0) {
            item.quantity = newQuantity
        }
    }
}

const removeItem = (itemId: number) => {
    const index = orderItems.value.findIndex(item => item.id === itemId)
    if (index !== -1) {
        orderItems.value.splice(index, 1)
    }
}

const submitOrder = () => {
    console.log('提交订单', {
        items: orderItems.value,
        address: selectedAddress.value,
        paymentMethod: paymentMethod.value,
        totalAmount: totalAmount.value
    })
}
</script>

<template>
    <div class="order-confirmation">
        <h2 class="page-title">确认订单</h2>

        <!-- 收货地址 -->
        <div class="section address-section">
            <h3>收货地址</h3>
            <div class="address-card" v-if="selectedAddress">
                <div class="contact-info">
                    <span class="name">{{ selectedAddress.name }}</span>
                    <span class="phone">{{ selectedAddress.phone }}</span>
                </div>
                <div class="address">{{ selectedAddress.address }}</div>
            </div>
        </div>

        <!-- 商品列表 -->
        <div class="section order-items">
            <h3>商品信息</h3>
            <div class="item" v-for="item in orderItems" :key="item.id">
                <img :src="item.image" :alt="item.name" class="item-image">
                <div class="item-info">
                    <div class="item-name">{{ item.name }}</div>
                    <div class="item-price">单价：¥{{ item.price }}</div>
                </div>
                <div class="quantity-control">
                    <button class="quantity-btn" @click="updateQuantity(item.id, -1)">-</button>
                    <span class="quantity">{{ item.quantity }}</span>
                    <button class="quantity-btn" @click="updateQuantity(item.id, 1)">+</button>
                </div>
                <div class="item-total">
                    <div class="total-label">小计</div>
                    <div class="total-price">¥{{ getItemTotal(item) }}</div>
                </div>
                <button class="remove-btn" @click="removeItem(item.id)">删除</button>
            </div>
        </div>

        <!-- 支付方式 -->
        <div class="section payment-method">
            <h3>支付方式</h3>
            <div class="payment-options">
                <label class="payment-option">
                    <input type="radio" v-model="paymentMethod" value="alipay">
                    <span>支付宝</span>
                </label>
                <label class="payment-option">
                    <input type="radio" v-model="paymentMethod" value="wechat">
                    <span>微信支付</span>
                </label>
            </div>
        </div>

        <!-- 订单总额 -->
        <div class="section total-amount">
            <div class="amount-row">
                <span>商品总额</span>
                <span class="price">¥{{ totalAmount }}</span>
            </div>
            <div class="amount-row">
                <span>运费</span>
                <span class="price">¥0</span>
            </div>
            <div class="amount-row final">
                <span>实付款</span>
                <span class="price">¥{{ totalAmount }}</span>
            </div>
        </div>

        <!-- 提交订单按钮 -->
        <div class="submit-section">
            <button class="submit-button" @click="submitOrder">提交订单</button>
        </div>
    </div>
</template>

<style scoped>
.order-confirmation {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

.page-title {
    font-size: 24px;
    margin-bottom: 20px;
}

.section {
    background: #fff;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

h3 {
    font-size: 18px;
    margin-bottom: 15px;
    color: #333;
}

/* 地址样式 */
.address-card {
    padding: 15px;
    border: 1px solid #eee;
    border-radius: 4px;
}

.contact-info {
    margin-bottom: 8px;
}

.name {
    font-weight: bold;
    margin-right: 15px;
}

.phone {
    color: #666;
}

/* 商品列表样式 */
.item {
    display: flex;
    align-items: center;
    padding: 15px 0;
    border-bottom: 1px solid #eee;
}

.item:last-child {
    border-bottom: none;
}

.item-image {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 4px;
    margin-right: 15px;
}

.item-info {
    flex: 1;
}

.item-name {
    font-size: 16px;
    margin-bottom: 8px;
}

.item-price {
    color: #666;
}

/* 数量控制样式 */
.quantity-control {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-right: 20px;
}

.quantity-btn {
    width: 24px;
    height: 24px;
    border: 1px solid #ddd;
    background: #fff;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: #666;
}

.quantity-btn:hover {
    background: #f5f5f5;
}

.quantity {
    min-width: 30px;
    text-align: center;
}

/* 商品小计样式 */
.item-total {
    margin-right: 20px;
    text-align: right;
}

.total-label {
    font-size: 12px;
    color: #666;
    margin-bottom: 4px;
}

.total-price {
    color: #ff4400;
    font-weight: bold;
    font-size: 16px;
}

.remove-btn {
    padding: 4px 8px;
    border: 1px solid #ddd;
    background: #fff;
    color: #666;
    border-radius: 4px;
    cursor: pointer;
}

.remove-btn:hover {
    background: #f5f5f5;
    color: #ff4400;
}

/* 支付方式样式 */
.payment-options {
    display: flex;
    gap: 20px;
}

.payment-option {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
}

/* 总额样式 */
.amount-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
}

.amount-row.final {
    margin-top: 15px;
    padding-top: 15px;
    border-top: 1px solid #eee;
    font-weight: bold;
}

.price {
    color: #ff4400;
}

/* 提交按钮样式 */
.submit-section {
    position: fixed;
    bottom: 50px;
    left: 0;
    right: 0;
    background: #fff;
    padding: 15px;
    box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
}

.submit-button {
    background: #ff4400;
    color: #fff;
    border: none;
    padding: 12px 40px;
    border-radius: 24px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 10s;
}

.submit-button:hover {
    background: blue;
}
</style>
