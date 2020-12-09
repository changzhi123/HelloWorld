<template>
  <div class="app-container">
    <div class="filter-container">
      <el-checkbox-group v-model="checkboxVal">
        <!-- <el-checkbox label="apple">
          apple
        </el-checkbox>
        <el-checkbox label="banana">
          banana
        </el-checkbox>
        <el-checkbox label="orange">
          orange
        </el-checkbox> -->
        <el-checkbox v-for="item in formTheadOptions" :key='item' :label="item">
          {{item}}
        </el-checkbox>
      </el-checkbox-group>
    </div>

    <el-table :key="key" :data="tableData" border fit highlight-current-row style="width: 100%">
      <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
      <el-table-column prop="name" label="fruitName" width="180" align="center"/>
      <el-table-column v-for="fruit in formThead" :key="fruit" :label="fruit" align="center">
        <template slot-scope="scope">
          {{ scope.row[fruit] }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
const defaultFormThead = ['apple']

export default {
  data() {
    return {
      tableData: [
        {
          name: 'fruit-1',
          apple: 'apple-10',
          banana: 'banana-10',
          orange: 'orange-20'
        },
        {
          name: 'fruit-2',
          apple: 'apple-20',
          banana: 'banana-20',
          orange: 'orange-40'
        }
      ],
      key: 1, // table key
      formTheadOptions: ['apple', 'banana', 'orange'],
      checkboxVal: defaultFormThead, // 设置默认值
      formThead: defaultFormThead // 默认表头 
    }
  },
  watch: {
    checkboxVal(valArr) {
      console.log(valArr,'valArr')
      this.formThead = this.formTheadOptions.filter(i => valArr.indexOf(i) >= 0)
      this.key = this.key + 1// 为了保证table 每次都会重渲
    }
  }
}
</script>

