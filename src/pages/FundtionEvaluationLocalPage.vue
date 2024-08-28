<template>
    <div class='page-container'>
      <div class='inner-layer'>
        
        <div class="title-section">
            <div class="title">
                <p class="primary">
                    Function Evaluation
                </p>
                <p class="secondary">
                    Local CAD Score
                </p>
            </div>
            <div class="subtitle">
                <span v-for="(item, index) in items" :key="index">
                    <strong>{{ item.label }}: </strong>{{ item.value }}
                </span>
            </div>           
        </div>
        
        <div class="content-section">
            <div class="left-section">
                <p>Interactive 3D Structure</p>
                <div class="tD-picture">
                    
                </div>
            </div>

            <div class="right-section">

                <div class="residue-section">
                    <p class="residue-title">Center Residue</p>
                    <p class="residue">('A', 50)</p>
                              
                </div>

                <div class="radius-section">
                    <p class="radius-title">Radius (Å)</p>
                    <p class="radius">8.0</p>    
                    
                </div>

                <div class="scoreA-section">    
                    <p>
                        CAD A-A Score
                        <InfoTooltip width='310px' height='86px'> 
                            <div class="info">
                                <p class="info-title">CAD A-A Score:</p>
                                <p class="info-content"> Measures the difference in contact areas between all atoms of the central residue and surrounding residues.</p>
                            </div>
                        </InfoTooltip>
                      </p>
                    <p class="score">{{ score_A }}</p>
                </div>

                <div class="scoreS-section">    
                    <p>
                        CAD A-S Score
                        <InfoTooltip width='310px' height='98px'> 
                            <div class="info">
                            <p class="info-title">CAD A-S Score:</p>
                            <p class="info-content"> ssesses the difference in contact areas between the central residue's atoms and surrounding side-chain atoms.</p>
                        </div>
                            
                        </InfoTooltip>
                      </p>
                    <p class="score">{{ score_S }}</p>
                </div>

                <DefaultButton width='488px'
                         height='40px'
                         text='Calculate Another Site'
                         @click=''
                         :active='true'/>
            </div>
        </div>
      </div>
    </div>
  
  </template>
  
  <script setup lang='ts'>
  import {ref,computed} from 'vue'

  // 路径
  const items = ref([
      { label: "Fusion Protein", value: "FP_0001" },
      { label: "Signal", value: "SG_0001" },
      { label: "Linker", value: "LK_0001" },
    ])


  // Score
  const cad_AScore = ref(0.0)
  cad_AScore.value = 0.970826775404717

  const score_A = computed(() => cad_AScore.value)

  const cad_SScore = ref(0.0)
  cad_SScore.value = 0.9217568423111843

  const score_S = computed(() => cad_SScore.value)

  </script>
  
  <style scoped>
  .page-container {
    height: 800px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .inner-layer {
    margin-top: 100px;
    margin-bottom: 110px;
    width: 1148px;
  }
    
  p {
      font-size: 16px;
      font-weight: 600;
      line-height: 19.36px;
      text-align: left;
      color: #2F3235;
  }

    /* 标题 */
  .title-section {
    width: 1093px;
    border-bottom: solid 1px #C5C9CD;
    margin-bottom: 35px;
  }

  .title {
    display: flex;
    gap: 24px; 
    height: 48px;
    margin-bottom: 11px;
  }

  .primary {
    font-size: 40px;
    line-height: 48.41px;
  }

  .secondary {
    font-size: 24px;
    color: #16396E; 
    line-height: 29px;
    align-self: flex-end;
    margin-bottom: 4px;
  }

  .subtitle {
    display: flex;
    gap: 24px; 
    height: 21px;
    margin-bottom: 5px;
    font-weight: 400;
    line-height: 20.8px;
  }

  .subtitle strong {
    font-weight: 600;
    color: #16396E; 
  }

  /* 内容 */
  .content-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 470px;
  }

  /* 3D部分 */
  .left-section {
    width: 638px;
  }

  .tD-picture {
    margin-top: 4px;
    background-color: #D9D9D9;
    height: 447px;
    width: 638px;
  }

  .right-section {
    width: 488px;
  }

/*Center Residue部分*/
.residue-section {
    margin-bottom: 40px;
  }
  .residue-title{
    font-weight: 700;
  }

  .residue{
    line-height: 26px;
    font-weight:420;
  }

/*Radius部分*/
.radius-section {
    margin-bottom: 40px;
  }
  .radius-title{
    font-weight: 700;
  }

  .radius{
    line-height: 26px;
    font-weight:420;
  }


  /* Score部分 */
  .scoreA-section {
    margin-bottom: 40px;
  }
  .scoreS-section {
    margin-bottom: 70px;
  }
  .info{
    
 }
  .info-title{
    display: inline;
    font-weight: 600;
    font-size: 14px;
    color: #95999b;

  }
  .info-content{
    display: inline;
    font-weight: 400;
    font-size: 14px;
    color: #95999b;
    
  }

  .score {
    font-size: 40px;
    line-height: 48.41px;
    color:#5182F8;
    margin-top: 4px;
    margin-bottom: 9px;
  }

  

  </style>