<template>
  <div class='page-container'>
    <!-- 个人信息部分 -->
    <div class="profile-section">
      <img src="/Members/Example.png" alt="Avatar" class="avatar" />
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
      <MembershipItem title="Free" :isSubscribed ="false">
        <ul>
          <li>Basic protein localization design</li>
          <li>Overall functionality scoring</li>
          <li>Overall stability scoring</li>
        </ul>
      </MembershipItem>

      <MembershipItem title="Professional" :isSubscribed ="true" @open-dialog="openDialog">
        <ul>
          <li>Includes all Free Version features</li>
          <li>
            Access to all algorithms in the algorithm store
            <ul class = "inner-li">
              <li style="font-size:14px">Specific site functionality scoring</li>
              <li style="font-size:14px">Protein localization prediction system</li>
              <li style="font-size:14px">Localization-optimized protein evolution system</li>
              <li style="font-size:14px">Time-dynamic localization design system</li>
            </ul>
          </li>
        </ul>
      </MembershipItem>

      <MembershipItem title="Company" :isSubscribed ="true" @open-dialog="openDialog">
        <ul>
          <li>Includes all Professional Version features</li>
          <li>
            Exclusive enterprise services and functions
            <ul class = "inner-li">
              <li style="font-size:14px">Custom Development</li>
              <li style="font-size:14px">Team Management</li>
              <li style="font-size:14px">Enterprise-level Data Security</li>
              <li style="font-size:14px">Sustainability Reports</li>
            </ul>
          </li>
        </ul>
      </MembershipItem>

      <!-- Custom Dialog for subscribing -->
      <CustomDialog
        v-model="isDialogVisible"
        :title="'Professional'"
        :description="'Copy and paste it into the Text Box or upload the Fasta file.'"
        :prices="[
            { amount: '399$', duration: '1 month' },
            { amount: '1800$', duration: 'half year' },
            { amount: '3000$', duration: '1 year' }
          ]"
        @subscribe="handleSubscribe"
      />
    </div>
  </div>
</template>

<script setup lang='ts'>
import {ref, watch} from 'vue';
import {useRouter} from "vue-router";
import ToggleButton from "@/components/ToggleButton.vue";
import MembershipItem from "@/components/MembershipItem.vue";
import CustomDialog from '@/components/CustomDialog.vue';

const isToggled = ref(false);
const router = useRouter();
const isDialogVisible = ref(false); // initially hidden
const dialogTitle = ref(''); // dynamically set title

// 处理订阅的逻辑
const handleSubscribe = (selectedPrice: number | null) => {
  console.log('Subscribed with price option:', selectedPrice);
};

// Open dialog with a specific title
const openDialog = ({ title }) => {
  console.log("father:openDialog:", title);
  dialogTitle.value = title;  // 设置弹窗的标题
  isDialogVisible.value = true;  // 打开弹窗
};

watch(isToggled, (newValue) => {
  console.log('isToggled:', newValue);
  if (newValue) {
    console.log("Switched to Algorithm Store");
    router.push("/algorithm-store");
  } else {
    console.log("An error occured");
  }
});
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
</style>
