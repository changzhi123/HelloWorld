<template>
  <div>
    <div class="form-box">
      <VueForm v-model="formData" :ui-schema="uiSchema" :schema="schema">
      </VueForm>
    </div>
    <el-button @click="open">打印</el-button>
  </div>
</template>

<script >
//  使用
import VueForm from "@lljj/vue-json-schema-form";

export default {
  name: "Demo",
  components: {
    VueForm,
  },
  data() {
    return {
      formData: {},
      schema: {
        type: "object",
        required: [
          "userName", //是否为比填项目
          "age",
        ],
        properties: {
          userName: {
            type: "string",
            title: "用户名",
            default: "Liu.Jun",
          },
          age: {
            type: "number",
            title: "年龄",
            default: 10,
          },
          bio: {
            type: "string",
            title: "签名",
            minLength: 10,
            default: "知道的越多、就知道的越少",
          },
          numberEnum: {
            type: "number",
            title: "Number enum (select)",
            enum: [1, 2, 3],
            enumNames: ["Select - 1", "Select - 2", "Select - 3"],
          },
          numberEnumRadio: {
            type: "number",
            title: "Number enum (radio)",
            enum: [
                1,
                2,
                3
            ],
            enumNames: [
                "Radio - 1",
                "Radio - 2",
                "Radio - 3"
            ]
        },
        },
      },
      uiSchema: {
        bio: {
          "ui:options": {
            placeholder: "请输入你的签名",
            type: "textarea",
            rows: 1,
          },
        },
        userName: {
          "ui:options": {
            placeholder: "请输入昵称",
          },
        },
      },
    };
  },
  methods: {
    open() {
      console.log(this.formData, "formData", this.schema, this.uiSchema);
    },
  },
};
</script>
<style lang="scss" scoped>
.form-box {
  width: 500px;
  min-height: 200px;
  border: solid 1px #ccc;
  box-sizing: border-box;
  padding: 10px;
}
</style>