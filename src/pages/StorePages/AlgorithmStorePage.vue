<template>
  <div class="page-container">
    <!-- 个人信息部分 -->
    <div class="profile-section">
      <!--      <img src="/Members/Example.png" alt="Avatar" class="avatar" />-->
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

    <!-- 算法商店部分 -->
    <div class="store">
      <AlgorithmItem
        title="Site-Specific CAD Scoring System"
        description="The CAD scoring algorithm provides a quantitative evaluation of the structural similarity between a protein's active site and a reference model. This algorithm assesses the accuracy and physical realism of a protein model by calculating the differences in residue-residue contact areas. By selecting specific sites in the protein, users can obtain CAD scores for these locations, enabling precise evaluation of the structural fidelity and potential functionality of the site."
        :timesLeft="3"
        :price="19"
        :line-clamp="4"
        @open-dialog="openDialog"
      />
      <AlgorithmItem
        title="Temporal Dynamic Localization Design System"
        description="The Temporal Dynamic Localization Design System utilizes light-sensitive components and localization tags to achieve time-controlled regulation of protein localization. This system can precisely manipulate the positioning of proteins within cells or other environments, aiding in the study of protein behavior, interactions, and functions over time."
        :timesLeft="0"
        :price="19"
        @open-dialog="openDialog"
      />
      <AlgorithmItem
        title="Optimized Protein Evolution Localization System"
        description="The Optimized Protein Evolution Localization System uses computational algorithms to assist in protein evolution. Based on the user's selection of a specific organelle, the system evolves the user's fusion protein to be suitable for localization within that organelle. This system is a powerful tool in the field of protein engineering, aiding in the design of proteins with enhanced localization capabilities and functionality tailored to specific cellular environments."
        :timesLeft="3"
        :price="19"
        @open-dialog="openDialog"
      />
      <AlgorithmItem
        title="Protein Localization Prediction System"
        description="The Protein Localization Prediction System analyzes protein sequences and structural features using advanced algorithms to predict protein localization within cells. This system helps optimize research workflows, supports the design of novel proteins, enhances experimental efficiency, and improves protein design for specific cellular applications."
        :timesLeft="3"
        :price="19"
        @open-dialog="openDialog"
      />

      <Dialog
        v-model="isDialogVisible"
        width="732px"
        class="dialog-container">
        <h1 class="dialog-title">{{ selectedItem.title }}</h1>
        <p class="dialog-description">{{ selectedItem.description }}</p>
        <div class="dialog-footer">
          <span class="times-left">{{ selectedItem.timesLeft }}
            <span style="color:#8F9396 ;font-size: 16px"> times left</span>
          </span>
          <div class="footer-button">
            <span style="font-size: 16px;margin-right:16px ;color: #FFCA31; font-weight: 600;">{{ selectedItem.price }} $</span>
            <button class="price-button">BUY</button>
          </div>
        </div>
      </Dialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, watch} from 'vue'
import ToggleButton from "@/components/ToggleButton.vue";
import AlgorithmItem from "@/components/AlgorithmItem.vue";
import Dialog from "@/components/Dialog.vue";
import {useRouter} from 'vue-router'

// 控制弹窗是否显示
const isDialogVisible = ref(false);
const isToggled = ref(true)
// 保存当前点击的 AlgorithmItem 的详细信息
const selectedItem = ref({
  title: '',
  description: '',
  timesLeft: 0,
  price: 0
});

// 打开对话框并传递当前点击项的内容
const openDialog = (item) => {
  selectedItem.value = item;
  isDialogVisible.value = true;
}
const router = useRouter()

watch(isToggled, (newValue) => {
  if (!newValue) {
    router.push('/membership-plan')
    // 这里可以处理切换到 Membership 时的逻辑，例如加载数据、切换页面等
  } else {
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

.toggle-buttons {
  margin-bottom: 32px;
}

.store {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(489px, 1fr)); /* 保证每个卡片最小宽度为 489px */
  width: 100%;
  max-width: 1000px;
  justify-content: center;
}

.dialog-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 24px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  z-index: 1000; /* 确保弹窗在最上层 */
}

.dialog-title {
  font-size: 16px;
  margin-bottom: 16px;
  margin-left: 16px;
}

.dialog-description {
  font-size: 16px;
  margin-left: 16px;
  margin-right: 16px;
}

.dialog-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 16px;
  margin-right: 16px;
}

.times-left {
  font-size: 16px;
  color: #5182F8;
}

.price-button {
  padding: 8px 20px 8px 20px;
  background-color: #5182F8;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}

.price-button:hover {
  background-color: #4168C8;
}
</style>
