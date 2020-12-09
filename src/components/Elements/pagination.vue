<template>
  <!-- 组件基于element ui 分页完整功能版-->
  <!-- <pagination :total='total' 
      :limit.sync="pageSize"
      :page.sync="currentPage"  rowheights
      @getlist="getlist"></pagination>     使用展示 -->

  <!--  pagination:()=>import('@/components/element/pagination'),  -->
  <div
    class="paging pagination-container"
    :class="{'hidden':hidden}"
    :style="`text-align: ${location};${rowheights==true?`padding: ${width_top} 0;`:''}`"
  >
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      :page-sizes="pageSizes"
      :layout="layout"
      :background="background"
      :disabled="disabled"
      :total="total"
      v-bind="$attrs" :pager-count='pagercount'
      :prev-text="prevtext"
      :next-text="nexttext"
    ></el-pagination>
  </div>
</template>
<script>
import { scrollTo } from "@/utils/scroll-to";
export default {
  props: {
     width_top:{
      type:String,
      default:'20px'
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 30, 40, 50, 100];
      }
    },
    prevtext: {
      type: String,
      default: ""
    }, //替代图标显示的上一页文字
    nexttext: {
      type: String,
      default: ""
    }, //替代图标显示的下一页文字
    total: {
      required: true, //必须参数
      type: Number
    }, //总页数
    page: {
      type: Number,
      default: 1
    }, //每页 ${val} 条`
    limit: {
      type: Number,
      default: 10
    }, //当前页: ${val}`
    location: {
      type: String,
      default: "left"
    }, //分页组件是否居中,默认靠左 //分页组件是否居中 left ||center ||right 
    rowheights: {
      type: Boolean,
      default: false
    }, //组件是否有行高 ,默认为false没有行高，当设置为true有行高
    hidden: {
      type: Boolean,
      default: false
    }, //是否显示组件
    layout: {
      type: String,
      default: "total, sizes, prev, pager, next, jumper" //默认值
    }, //默认完整功能
    autoScroll: {
      type: Boolean,
      default: true
    }, //刷新是否回到头部
    background: {
      type: Boolean,
      default: true
    }, //是否为分页按钮添加背景色
    disabled: {
      type: Boolean,
      default: false
    }, //是否禁用
    pagercount:{
      type:Number,
      default:7//页码按钮的数量，当总页数超过该值时会折叠
    },
  },
  computed: {
    currentPage: {
      get() {
        return this.page;
      },
      set(val) {
        this.$emit("update:page", val);
      }
    },
    pageSize: {
      get() {
        return this.limit;
      },
      set(val) {
        this.$emit("update:limit", val);
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      this.$emit("getlist", { page: this.currentPage, limit: val });
      if (this.autoScroll) {
        scrollTo(0, 800); //scrollTo() 方法可把内容滚动到指定的坐标。
      }
    },
    handleCurrentChange(val) {
      this.$emit("getlist", { page: val, limit: this.pageSize });
      if (this.autoScroll) {
        //判断要不要回到头部
        scrollTo(0, 800);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.paging {
  width: 100%;
}
.pagination-container.hidden {
  display: none;
}
</style>