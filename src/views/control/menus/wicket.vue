<template>
<!-- 基于element ui  弹窗组件+form表单组件-->
<el-dialog class="dialog" :title="title" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
    <el-form :model="ruleForm" :disabled="disabled" status-icon :rules="rules" ref="ruleForm" label-width="160px" class="demo-ruleForm">
        <el-form-item label="菜单名称title" prop="title">
            <el-input v-model="ruleForm.title" autocomplete="off" placeholder="请输入单名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="跳转路由path" prop="path">
            <el-input v-model="ruleForm.path" autocomplete="off" placeholder="请输入跳转路由" clearable></el-input>
        </el-form-item>
        <el-form-item label="组件地址component" prop="component">
            <el-input v-model="ruleForm.component" autocomplete="off" placeholder="请输入组件地址" clearable></el-input>
        </el-form-item>
        <el-form-item label="组件名称name" prop="name">
            <el-input v-model="ruleForm.name" autocomplete="off" placeholder="请输入组件名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="菜单级别rank" prop="rank">
            <el-select v-model="ruleForm.rank" placeholder="请选择菜单级别" clearable autocomplete="off" @change="condition" style="width:100%;">
                <el-option label="一级菜单" :value="1"></el-option>
                <el-option label="二级菜单" :value="2"></el-option>
                <el-option label="三级菜单" :value="3"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="父级菜单parent" prop="parent" v-if="type">
            <el-cascader placeholder="请选择父级菜单" style="width:100%;" v-model="ruleForm.parent" :options="data" clearable :props="{ expandTrigger: 'hover' ,children:'children',label:'title',value:'id'}">
                <template slot-scope="{ node, data }">
                    <span>{{ data.title }}</span>
                    <span>& {{ data.component }}</span>
                    <span v-if="!node.isLeaf">({{ data.children.length }})</span>
                </template>
            </el-cascader>
        </el-form-item>
        <el-form-item label="是否显示hidden" prop="hidden">
            <!-- <el-radio-group v-model="ruleForm.hidden">
          <el-radio-button :label="0">显示</el-radio-button>
          <el-radio-button :label="1">隐藏</el-radio-button>
        </el-radio-group> -->
            <el-radio v-model="ruleForm.hidden" :label="0" border size="medium">显示</el-radio>
            <el-radio v-model="ruleForm.hidden" :label="1" border size="medium">隐藏</el-radio>
        </el-form-item>
        <el-form-item label="菜单排序order" prop="order">
            <el-input v-model.number="ruleForm.order" autocomplete="off" placeholder="请输入菜单排序" clearable></el-input>
        </el-form-item>
        <el-form-item label="组件图标icon" prop="icon">
            <!-- <el-input v-model="ruleForm.icon" autocomplete="off" placeholder="请输入组件图标" clearable></el-input> -->
            <el-input v-model="ruleForm.icon" placeholder="请输入icon图标" :maxlength="30" clearable autocomplete="off">
                <el-button slot="append" icon="el-icon-menu" @click="$refs.iconopen.dialogVisible=true" type="primary" plain></el-button>
            </el-input>
        </el-form-item>
        <!-- <el-form-item >
        <el-button @click="handleClose" >取消</el-button>
        <el-button type="primary" @click="resetForm">提交</el-button>
      </el-form-item> -->
        <div class="item_buttom">
            <el-button @click="handleClose">取消</el-button>
            <el-button type="primary" @click="resetForm">提交</el-button>
        </div>
    </el-form>
    <iconopen ref="iconopen" v-model="ruleForm.icon" :icons='icons' />
</el-dialog>
</template>

<script>
import {
    reminder,
    filename
} from "@/utils/method";
export default {
    props: {
        title: {
            type: String,
            required: true //必须参数
        }, //##表单提示信息:title="title"
        disabled: {
            type: Boolean,
            default: false
        }, //##是否禁用该表单内的所有组件
        tableData: {
            type: Array,
            default: null
        }
    },
    components: {
        iconopen: () => import("@/components/Elements/iconopen")
    },
    data() {
        return {
            dialogVisible: false, //弹窗控件
            ruleForm: {
                title: "",
                path: "",
                component: "",
                name: "",
                hidden: 0,
                icon: "",
                rank: null,
                order: null,
                parent: null
            }, //弹窗的参数，赋值容错
            rules: {
                name: [{
                    required: true,
                    message: "请输入组件名称",
                    trigger: "change"
                }],
                title: [{
                    required: true,
                    message: "请输入菜单名称",
                    trigger: "change"
                }],
                path: [{
                    required: true,
                    message: "请输入路由名称",
                    trigger: "change"
                }],
                component: [{
                    required: true,
                    message: "请输入组件地址",
                    trigger: "change"
                }],
                hidden: [{
                    required: true,
                    message: "请选择是否显示",
                    trigger: "change"
                }],
                parent: [{
                    required: true,
                    message: "请选择父级菜单",
                    trigger: "change"
                }],
                rank: [{
                    required: true,
                    message: "请选择菜单级别",
                    trigger: "change"
                }],
                order: [{
                        required: true,
                        message: "排序不能为空",
                        trigger: "change"
                    },
                    {
                        type: "number",
                        message: "排序必须为数字值",
                        trigger: "change"
                    }
                ]
            }, //正则验证
            type: false,
            data: []
        };
    },
    computed: {

        icons() {
            return filename('@/icons/svg')
        }
    },
    methods: {
        //##提交表单
        resetForm() {
            this.$refs.ruleForm.validate(valid => {
                if (valid) {
                    //通过正则
                    this.$emit("setList", JSON.parse(JSON.stringify(this.ruleForm))); // 避免重置表单组件时影响到提交的数据，深拷贝
                    this.handleClose(); //关闭弹窗重置表单
                } else {
                    //未通过正则
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        //##打开弹窗
        setBezel(row) {
            console.log(row, row ? "打开编辑弹窗" : "打开新建弹窗");
            if (row) this.ruleForm = JSON.parse(JSON.stringify(row)); //给表单赋值 ，深拷贝
            if (row) this.ruleForm.hidden = row.hidden ? 1 : 0;
            this.dialogVisible = true; //打开弹窗
            this.condition();
        },
        //##关闭弹窗，带重置功能
        handleClose(done) {
            // done();//原弹窗关闭方法，不使用
            this.$refs.ruleForm.resetFields(); //重置表单
            this.dialogVisible = false; //关闭弹窗
        },
        condition(key) {
            this.data = [];
            let e = key || this.ruleForm.rank;
            if (e == 1 || !e) {
                this.type = false;
            } else {
                this.type = true;
            }
            if (e == 2) {
                this.tableData.filter(item => {
                    this.data.push({
                        title: item.title,
                        id: item.id,
                        component: item.component
                    });
                });
            } else if (e == 3) {
                this.tableData.filter(item => {
                    let res = {
                        title: item.title,
                        id: item.id,
                        children: [],
                        component: item.component
                    };
                    item.children.filter(tab => {
                        res.children.push({
                            title: tab.title,
                            id: tab.id,
                            component: tab.component
                        });
                    });
                    this.data.push(res);
                });
            } else {
                this.data = [];
            }
            this.typedata();
        },
        typedata() {
            if (!this.ruleForm.parent) return;
            console.log(this.data, "data");
            this.data.filter(item => {
                if (item.id == this.ruleForm.parent) {
                    this.ruleForm.parent = [item.id];
                } else {
                    if (item.children)
                        item.children.filter(tab => {
                            if (tab.id == this.ruleForm.parent) {
                                this.ruleForm.parent = [item.id, tab.id];
                            }
                        });
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.dialog {
    width: 100%;
}

.item_buttom {
    width: 100%;
    display: flex;
    justify-content: space-between;

    button {
        width: 45%;
    }
}
</style>
