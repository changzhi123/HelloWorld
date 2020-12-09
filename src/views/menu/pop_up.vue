<template>
  <div class>
    <h1>pop_up弹窗</h1>
    <el-button @click="$refs.popups.setBezel();">打开弹窗</el-button>
    <popup title="提示" ref="popups" :replacement='replacement' :ruleForm="ruleForm" :rules="rules" @setList="setList">
      <el-form-item label="姓名" prop="name">
        <el-input v-model.trim="ruleForm.name" autocomplete="off" placeholder="请输入" clearable></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input v-model.trim="ruleForm.address" autocomplete="off" placeholder="请输入" clearable></el-input>
      </el-form-item>
      <el-form-item label="时间" prop="date">
        <el-input v-model.trim="ruleForm.date" autocomplete="off" placeholder="请输入" clearable></el-input>
      </el-form-item>
      <el-form-item label="选择">
        <el-cascader
          v-model="ruleForm.value"
          :options="options"
          :props="{ expandTrigger: 'hover',multiple: true, checkStrictly: true }"
          style="width:100%"
          clearable
          placeholder="请选择推送项目"
          :show-all-levels="false"
          filterable
        ></el-cascader>
      </el-form-item>
      <div class="item_buttom">
        <el-button @click="$refs.popups.handleClose();">取消</el-button>
        <el-button type="primary" @click="$refs.popups.resetForm();">提交</el-button>
      </div>
    </popup>
  </div>
</template>
<script>
import popup from "@/components/Elements/pop_up";
export default {
  components: {
    popup
  }, //组件
  data() {
    return {
      ruleForm: { date: "", name: "", address: "", value: null }, //弹窗的参数
      rules: {
        name: [{ required: true, message: "请输入", trigger: "change" }],
        address: [{ required: true, message: "请确认", trigger: "change" }],
        date: [{ required: true, message: "请输入", trigger: "change" }]
      }, //正则验证
      options: [
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则",
              children: [
                {
                  value: "yizhi",
                  label: "一致"
                },
                {
                  value: "fankui",
                  label: "反馈"
                },
                {
                  value: "xiaolv",
                  label: "效率"
                },
                {
                  value: "kekong",
                  label: "可控"
                }
              ]
            },
            {
              value: "daohang",
              label: "导航",
              children: [
                {
                  value: "cexiangdaohang",
                  label: "侧向导航"
                },
                {
                  value: "dingbudaohang",
                  label: "顶部导航"
                }
              ]
            }
          ]
        },
        {
          value: "zujian",
          label: "组件",
          children: [
            {
              value: "basic",
              label: "Basic",
              children: [
                {
                  value: "layout",
                  label: "Layout 布局"
                },
                {
                  value: "color",
                  label: "Color 色彩"
                },
                {
                  value: "typography",
                  label: "Typography 字体"
                },
                {
                  value: "icon",
                  label: "Icon 图标"
                },
                {
                  value: "button",
                  label: "Button 按钮"
                }
              ]
            },
            {
              value: "form",
              label: "Form",
              children: [
                {
                  value: "radio",
                  label: "Radio 单选框"
                },
                {
                  value: "checkbox",
                  label: "Checkbox 多选框"
                },
                {
                  value: "input",
                  label: "Input 输入框"
                },
                {
                  value: "input-number",
                  label: "InputNumber 计数器"
                },
                {
                  value: "select",
                  label: "Select 选择器"
                },
                {
                  value: "cascader",
                  label: "Cascader 级联选择器"
                },
                {
                  value: "switch",
                  label: "Switch 开关"
                },
                {
                  value: "slider",
                  label: "Slider 滑块"
                },
                {
                  value: "time-picker",
                  label: "TimePicker 时间选择器"
                },
                {
                  value: "date-picker",
                  label: "DatePicker 日期选择器"
                },
                {
                  value: "datetime-picker",
                  label: "DateTimePicker 日期时间选择器"
                },
                {
                  value: "upload",
                  label: "Upload 上传"
                },
                {
                  value: "rate",
                  label: "Rate 评分"
                },
                {
                  value: "form",
                  label: "Form 表单"
                }
              ]
            },
            {
              value: "data",
              label: "Data",
              children: [
                {
                  value: "table",
                  label: "Table 表格"
                },
                {
                  value: "tag",
                  label: "Tag 标签"
                },
                {
                  value: "progress",
                  label: "Progress 进度条"
                },
                {
                  value: "tree",
                  label: "Tree 树形控件"
                },
                {
                  value: "pagination",
                  label: "Pagination 分页"
                },
                {
                  value: "badge",
                  label: "Badge 标记"
                }
              ]
            },
            {
              value: "notice",
              label: "Notice",
              children: [
                {
                  value: "alert",
                  label: "Alert 警告"
                },
                {
                  value: "loading",
                  label: "Loading 加载"
                },
                {
                  value: "message",
                  label: "Message 消息提示"
                },
                {
                  value: "message-box",
                  label: "MessageBox 弹框"
                },
                {
                  value: "notification",
                  label: "Notification 通知"
                }
              ]
            },
            {
              value: "navigation",
              label: "Navigation",
              children: [
                {
                  value: "menu",
                  label: "NavMenu 导航菜单"
                },
                {
                  value: "tabs",
                  label: "Tabs 标签页"
                },
                {
                  value: "breadcrumb",
                  label: "Breadcrumb 面包屑"
                },
                {
                  value: "dropdown",
                  label: "Dropdown 下拉菜单"
                },
                {
                  value: "steps",
                  label: "Steps 步骤条"
                }
              ]
            },
            {
              value: "others",
              label: "Others",
              children: [
                {
                  value: "dialog",
                  label: "Dialog 对话框"
                },
                {
                  value: "tooltip",
                  label: "Tooltip 文字提示"
                },
                {
                  value: "popover",
                  label: "Popover 弹出框"
                },
                {
                  value: "card",
                  label: "Card 卡片"
                },
                {
                  value: "carousel",
                  label: "Carousel 走马灯"
                },
                {
                  value: "collapse",
                  label: "Collapse 折叠面板"
                }
              ]
            }
          ]
        },
        {
          value: "ziyuan",
          label: "资源",
          children: [
            {
              value: "axure",
              label: "Axure Components"
            },
            {
              value: "sketch",
              label: "Sketch Templates"
            },
            {
              value: "jiaohu",
              label: "组件交互文档"
            }
          ]
        }
      ],
      replacement:[{key:'value',val:null}]
    }; //数据
  },
  mounted() {}, //挂载
  methods: {
    setList(row) {
      console.log(row, "接收到的表单");
    }
  } //方法
};
</script>
<style lang="scss" scoped>
.item_buttom {
  width: 100%;
  display: flex;
  justify-content: space-between;
  button {
    width: 45%;
  }
}
</style>
