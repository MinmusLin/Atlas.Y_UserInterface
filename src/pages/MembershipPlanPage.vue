<template>
  <div class='page-container'>
    <!-- 个人信息部分 -->
    <div class="profile-section">
      <img src="/Members/exp.png" alt="Avatar" class="avatar" />
      <h2 class="name">NAME</h2>
      <p class="subscription-status">Current Subscription: Free</p>
    </div>

    <!-- 切换按钮部分 -->
    <div class="toggle-buttons">
      <ToggleButton
        v-model="isToggled"
        :leftLabel="'Algorithm Store'"
        :rightLabel="'Membership'"
        :width="'340px'"
        :height="'40px'"
        :fontSize="'16px'"
      ></ToggleButton>
    </div>

    <!-- 选择服务部分 -->
    <div class="service-section">
      <MembershipItem title="Free">
        <li>Basic protein localization design</li>
        <li>Overall functionality scoring</li>
        <li>Overall stability scoring</li>
      </MembershipItem>

      <MembershipItem title="Professional">
        <li>Includes all Free Version features</li>
        <li>
          Access to all algorithms in the algorithm store
          <ul class = "inner-li">
            <li>Specific site functionality scoring</li>
            <li>Protein localization prediction system</li>
            <li>Localization-optimized protein evolution system</li>
            <li>Time-dynamic localization design system</li>
          </ul>
        </li>
      </MembershipItem>

      <MembershipItem title="Company">
        <li>Includes all Professional Version features</li>
        <li>
          Exclusive enterprise services and functions
          <ul class = "inner-li">
            <li>Custom Development</li>
            <li>Team Management</li>
            <li>Enterprise-level Data Security</li>
            <li>Sustainability Reports</li>
          </ul>
        </li>
      </MembershipItem>

      <Dialog v-model="isDialogVisible"
              width="732px"
              class="dialog-container">
        <div class="dialog-content">
          <!-- 标题 -->
          <div class="title-container">
            <h2 class="dialog-title" style="font-size:16px">Professional Plan</h2>

            <!-- 描述文本 -->
            <p class="dialog-description">Copy and paste it into the Text Box or upload the Fasta file.</p>
          </div>
          <!-- 价格选项 -->
          <!-- 价格选项 -->
          <div class="price-options">
            <div
              class="price-card"
              :class="{ 'selected': selectedPrice === 1 }"
              @click="selectPrice(1)"
            >
              <span class="price-amount">399$</span>
              <span class="price-duration">1 month</span>
            </div>

            <div
              class="price-card"
              :class="{ 'selected': selectedPrice === 2 }"
              @click="selectPrice(2)"
            >
              <span class="price-amount">1800$</span>
              <span class="price-duration">half year</span>
            </div>

            <div
              class="price-card"
              :class="{ 'selected': selectedPrice === 3 }"
              @click="selectPrice(3)"
            >
              <span class="price-amount">3000$</span>
              <span class="price-duration">1 year</span>
            </div>
          </div>

          <!-- 订阅按钮 -->
          <button class="subscribe-button">Subscribe</button>
        </div>
      </Dialog>
    </div>


  </div>
</template>

<script setup lang='ts'>
import {ref, watch} from 'vue'
import {useRouter} from "vue-router";
import ToggleButton from "@/components/ToggleButton.vue";
import MembershipItem from "@/components/MembershipItem.vue";
import Dialog from "@/components/Dialog.vue";

const isToggled = ref(false);
const router = useRouter();
const isDialogVisible = ref(true);
const selectedPrice = ref<number | null>(null);

watch(isToggled, (newValue) => {
  console.log('isToggled:', newValue);
  if (newValue) {
    console.log("Switched to Algorithm Store");
    router.push("/algorithm-store");
  } else {
    console.log("An error occured");
  }
});

// 选择价格的函数
const selectPrice = (priceIndex: number) => {
  if (selectedPrice.value === priceIndex) {
    // 如果再次点击，取消选择
    selectedPrice.value = null;
  } else {
    // 设置选中的 price-card
    selectedPrice.value = priceIndex;
  }
};

</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
}

.profile-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 32px;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 16px;
}

.name {
  font-size: 40px;
  color: #5D6164;
  font-weight: bold;
  margin-bottom: 8px;
}

.subscription-status {
  font-size: 16px;
  color: #8F9396;
}
.service-section{
  display: flex;
  flex-direction: row;
  align-items:center;

}
.toggle-buttons {
  margin-bottom: 32px;
}

/* 嵌套列表的样式 */
.subscription-features ul {
  list-style-type: disc;
  padding-left: 20px;
}
.service-section ul > li {
  font-weight: 600;
  font-size: 16px;
  color:#8F9396;
  line-height: 20px;
}

.inner-li{
  font-size: 4px;
}

.dialog-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.dialog-content {
  text-align: center;
  padding: 16px;
}

.dialog-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 12px;
}

.dialog-description {
  font-size: 16px;
  color: #6A737D;
  margin-bottom: 12px;
}

/* 价格选项容器 */
.price-options {
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
}

/* 每个价格选项卡 */
.price-card {
  border: 2px solid #5182F8;
  border-radius: 8px;
  padding: 16px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 209px;
  height: 108px;
  cursor: pointer;
  transition: border-color 0.3s ease;
}
.price-card:hover {
  border:1px solid #5182F8; /* 钱色 (Gold) */
}
.price-card.selected {
  border: 3px solid #5182F8;
}
/* 价格金额 */
.price-amount {
  font-size: 36px;
  font-weight: bold;
  color: #FFCA31;
  margin-bottom: 4px;
}

/* 价格持续时间 */
.price-duration {
  font-size: 16px;
  color: #6A737D;
  font-weight: 600;
}

/* 订阅按钮 */
.subscribe-button {
  background-color: #5182F8;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
  text-align: center;
}

.subscribe-button:hover {
  background-color: #4168C8;
}
.title-container{
  display: flex;
  text-align:left;
  flex-direction: column;
}


</style>
