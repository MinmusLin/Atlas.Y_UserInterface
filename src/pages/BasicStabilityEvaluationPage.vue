<template>
    <div class='page-container'>
      <div class="title-container">
        <h1 class="title">Stability Evaluation</h1>
      </div>
      <div class="subtitle-container">
        <span class="subtitle">
          <span class="sub-content">Fusion Protein: </span>FP_001
        </span>
        <span class="subtitle">
          <span class="sub-content">Signal: </span>SG_001
        </span>
        <span class="subtitle">
          <span class="sub-content">Linker: </span>LK_001
        </span>
      </div>
      <el-table
        :data="currentPageData"
        style="width: 1093px; max-height: 470px; overflow-y: auto;" 
        :header-cell-style="headerCellStyle"
        :cell-style="cellStyle"
        height="470"
      >
        <el-table-column
          prop="item"
          label="Item"
          width="290"
        />
        <el-table-column
          prop="scoreValue"
          label="Score Value"
          width="270"
        />
        <el-table-column
          prop="explanation"
          label="Explanation"
          width="533"
        />
      </el-table>
    </div>
</template>
  
<script setup lang='ts'>
  import { ref, computed } from 'vue';
  import { ElMessage } from 'element-plus';

  // 定义表格数据的接口
  interface TableData {
    item: string;
    scoreValue: number;
    explanation: string;
  }

  interface CellStyleParams {
    columnIndex: number;
    rowIndex: number;
  }

  // 定义行数和表格数据
  const row = ref(25);  // 总数据量
  const pageSize = ref(100);  // 每页显示的数量
  const currentPage = ref(1);  // 当前页码

  const tableData = ref<TableData[]>([]); // 原始数据列表

  // 初始化表格数据
  for (let i = 0; i < row.value; i++) {
    tableData.value.push({
      item: `fa_art`,
      scoreValue: -2525.13,
      explanation: `Favorable atomic attraction`,
    });
  }
  // 修改第一行的数据
  tableData.value[0] = {
    item: "Total Score",
    scoreValue: -254.71,
    explanation: "Overall stability score",
  };

  // 计算当前页的数据
  const currentPageData = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value;
    const end = start + pageSize.value;
    return tableData.value.slice(start, end);
  });

  // 处理页码变化
  const handlePageChange = (page: number) => {
    currentPage.value = page;
    ElMessage.info(`当前页: ${page}`);
  };

  const baseHeaderStyle = {
    backgroundColor: '#2F62D7',
    height: '42px',
    fontSize: '16px',
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 600,
  };

  const baseCellStyle = {
    backgroundColor: '#ffffff',
    height: '37px',
    fontSize: '16px',
    color: '#2F3235',
    textAlign: 'center',
    paddingTop: '7px',
    paddingBottom: '6px',
    fontWeight: 400,
    boxShadow: 'inset 0px 0px 0px 0px #ffffff',
  };

  const headerCellStyle = ({ columnIndex }: CellStyleParams) => {
    const style = { ...baseHeaderStyle } as any;

    if (columnIndex === 0) {
        style.borderTopLeftRadius = '10px'; // 左上角圆角
        style.paddingRight = '160px';
    } else if (columnIndex === 2) {
        style.borderTopRightRadius = '10px'; // 右上角圆角
        style.paddingLeft = '40px';
        style.textAlign = 'left';
    } else if (columnIndex === 1) {
        style.paddingRight = '120px';
    }

    return style;
  };

  const cellStyle = ({ columnIndex, rowIndex }: CellStyleParams) => {
  const style = { ...baseCellStyle } as any;
  if (rowIndex === 0) {
    style.backgroundColor = "#EEF3FE";
    style.fontWeight = 600; 
  }
  if (columnIndex === 0) {
      style.borderLeft = '2px solid #EEF3FE';
      style.paddingRight = '160px';
  }
  if (columnIndex === 2) {
      style.borderRight = '2px solid #EEF3FE';
      style.paddingLeft = '40px';
      style.textAlign = 'left';
      style.color = "#8F9396";
  }
  if (columnIndex === 1) {
    style.paddingRight = '120px';
  }
  if (rowIndex % 4 === 3) {
    style.boxShadow = 'inset 0px -0.25px 0px 0px #5182F8';
  }
  return style;
  };
</script>

<style scoped>
  .page-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0;
  }

  .title-container {
  display: flex;
  align-items:end;
  width: 1093px;
  margin-bottom: 15px; /* 为文本添加间距 */
  color: #2F3235;
  }

  .title {
  height: 48px;
  font-size: 40px; /* 适当的字体大小 */
  font-weight: 600;
  }

  .subtitle-container {
  display: flex;
  width: 1093px;
  height: 28px;
  font-size: 16px; /* 适当的字体大小 */
  text-align: center;
  margin-bottom: 24px;
  border-bottom: 1px solid #C5C9CD;
  }

  .subtitle {
  color: #2F3235;
  font-weight: 400;
  margin-right: 50px; 
  }

  .sub-content {
  color: #16396E;
  font-weight: 600;
  }

  .pagination-container {
  display: flex;
  justify-content: flex-end;
  width: 1093px; /* 与表格宽度保持一致 */
  margin-top: 10px;
  }
</style>
  