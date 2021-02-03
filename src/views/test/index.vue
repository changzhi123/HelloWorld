<template>
  <div class="dashboard">
    <h1>测试列表</h1>
    <!-- <svg-icon icon-class="admin"></svg-icon>
      <admin v-bind:title='title' v-bind:value='value' ref='admins' @req='req' />
       <el-button @click="value+=1">父组件的按钮value+1</el-button>
        <el-button @click="value-=1">父组件的按钮value-1</el-button>
    <el-button @click="res">调用子组件的方法</el-button>-->
    <!--  -->
    <div class="line"></div>
    <admins v-model="ress"></admins>
    <h1>国际化</h1>
    <el-button @click="rs">{{ $t("message.hello") }}</el-button>
    <div class="line"></div>
    <div class="line"></div>
    <button @click="re">ress</button>
    <!-- 照片合集+放大查看 -->
    <el-image
      style="width: 100px; height: 100px"
      src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
      :preview-src-list="srcList"
    ></el-image>

    <el-button
      size="mini"
      class="filter-item"
      type="primary"
      icon="el-icon-download"
      @click="handleExportTem()"
      >导出</el-button
    >

    <a href="../../assets/logo.png" download>下载</a>
    <button type="button" onclick="alert('欢迎!')">点我!</button>

    <el-tabs v-model="activeName" @tab-click="handleClick" stretch>
      <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
      <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
    </el-tabs>
    <!--  -->
    <div class="buttom-box">
      <el-card class="box-card box_tab">
        <el-button class="button-item" @click="sort_type" type="primary"
          >排序新算法</el-button
        >
      </el-card>
      <el-card class="box-card box_tab" v-for="item in 10" :key="item">
        <el-button
          class="button-item"
          @click="ontype"
          type="primary"
        ></el-button>
      </el-card>
    </div>
    <!--  -->

    <Button>Default</Button>
    <Button type="primary">Primary</Button>
    <Button type="dashed">Dashed</Button>
    <Button type="text">Text</Button>
    <br /><br />
    <Button type="info">Info</Button>
    <Button type="success">Success</Button>
    <Button type="warning">Warning</Button>
    <Button type="error">Error</Button>
    <a-button type="primary"> antd</a-button>
  </div>
</template>

<script>
import admins from "./Admins";
import { messagealert, count_down } from "@/utils/method";
import { mixin } from "./mixin";
export default {
  mixins: [mixin],
  components: {
    admins,
    // admin: () => import("./Admin") //组件异步加载
  },
  data() {
    return {
      activeName: "second",
      title: "vue/cli3.0",
      value: 123,
      ress:
        "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
      //[{name:'123',url:'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'}],
      srcList: [
        "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
        "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
      ],
      obj: { a: 1, b: 2, c: 3 },
    };
  },
  watch: {
    value(val) {
      console.log(val); //当value的值发生改变的时候触发
    },
  },
  mounted() {
    this.setobj()//关于对象的拷贝
    try {
      console.log(0);
    } catch (err) {
      console.log(1);
      console.log(hello);
    } finally {
      console.log(2);
    }  
 //最后结果分别打印出 0 2
  /*
 try{
 a.b.c();
 }catch (e){
 console.log(1);
 console.log(hello);
 }finally {
 console.log(2);
 }
 */
 //最后结果分别打印出 1 2 报错:hello is not defined

    console.time();
    console.timeEnd();
    let r = "advfsgrt";
    console.log(
      r.includes("g"),
      "测试",
      process.env.NODE_ENV,
      Date.now(),
      new Date().getTime()
    );

    console.log(mixin, "mixin混入");
    this.hellworld();

    // this.sort_type()
    this.ddd();
    this.dd();
    Object.keys(this.obj).filter((item) => {
      console.log(item, "0");
    });
    console.log(
      Object.keys(this.obj),
      Object.values(this.obj),
      Object.entries(this.obj),
      "obj"
    );
    this.ttttt().then(() => {
      console.log("你去");
    });
    console.log(this.url, "url");
    console.log((this.obj.c /= 3), "onject");
  },
  methods: {
    setobj(){
        let obj = {
      a: 1,
      b: 2,
      c: 3,
    };
    let obj2 = obj;
    let obj3 = Object.assign(obj);
    let obj4 = {};
    for (let key in obj) {
      obj4[key] = obj[key];
    }
    let obj5 = {
      d: 4,
    };
    Object.assign(obj5, obj); //层级只有一级时有效
    obj.a++;
    const setobj = (data, list) => {
      if (!data) return {}; //data必须为真，不为真结束循环返回{}
      let obj = list || {}; //判断list是否为真，为真合并对象，为假拷贝对象 ，list是被合并的对象
      for (let key in data) {
        if (Array.isArray(data[key])) {
          obj[key] = [...data[key]]; //优先判断是不是数组，是直接拷贝
        } else if (typeof data[key] == "object") {
          obj[key] = setobj(data[key], obj[key]); //对象重复调用函数，进行深度循环
        } else {
          obj[key] = data[key]; //普通值，直接拷贝,函数不用处理直接拷贝
        }
      }
      return obj;
    };
    let obj6 = {
      a: [1, 2, 3],c: function () {console.log("123");}, d: "我",
      b: {y: 3,h: [1, 2, 3], g: function () { console("nide"); },k: { j: 5 },}
    };
    console.log(obj, obj2, obj3, obj4, obj5, "obj", setobj(obj6));
    },
    ontype(key) {},
    handleClick(tab, event) {
      console.log(tab, event);
    },
    async ttttt() {
      // const foo = async () => {}
      // let obj = { async foo() {} }
      // const foo = async function() {}
      // async function foo() {}
      let i = 1;
      const otherAsyncFunc = () => {
        for (let r = 0; r < 1000; r++) {
          i = r;
        }
        return i;
      };
      const result = await otherAsyncFunc();
      console.log(result, "result");
      try {
        await otherAsyncFunc();
      } catch (err) {
        console.error(err);
      }
    },
    handleExportTem() {
      const _this = this;
      //请求参数
      let params = {};
      //请求路径
      this.$axios
        .post("xxxxxxxx", params, { responseType: "blob" })
        .then((res) => {
          console.log(res, "res");
          let content = res.data;
          let blob = new Blob([content]);
          let fileName = "文件名.pdf";
          if ("download" in document.createElement("a")) {
            // 非IE下载
            let elink = document.createElement("a");
            elink.download = fileName;
            elink.style.display = "none";
            elink.href = URL.createObjectURL(blob);
            document.body.appendChild(elink);
            elink.click();
            URL.revokeObjectURL(elink.href); // 释放URL 对象
            document.body.removeChild(elink);
          } else {
            // IE10+下载
            navigator.msSaveBlob(blob, fileName);
          }
          this.$message.success("生成文件成功");
        })
        .catch((err) => {
          console.log(err);
          this.$message.error("服务器出现问题,请稍后再试");
        });

      //location.href 进行文件下载，在当前窗口进行文件下载
      // let url2 = "/file/exportDetail.do?id=" + 123;
      // window.location.href = url2;
      //window.open进行文件下载，默认会跳转到新窗口进行文件下载
      // let url3 = "/file/exportDetail.do?id=" + 123;
      // window.open(url3);
    },
    dd() {
      const req_data = new Date().getTime() + 12 * 1000;
      const item = setInterval(() => {
        const res_item = parseInt(count_down(req_data) / 1000);
        console.log(res_item, "倒计时");
        if (res_item <= 0) {
          window.clearInterval(item);
          return;
        }
      }, 1000); //反复执行函数本身
    },
    sort_type() {
      //素组排序
      const arr = [1, 8, 9, 5, 6, "s", "a"];
      const arr2 = [
        { id: 1, name: "dasd " },
        { id: 9, name: "dasd " },
        { id: 8, name: "dasd " },
        { id: 2, name: "dasd " },
      ];
      const compare = (key1, key2) => {
        const val1 = key1.id;
        const val2 = key2.id;
        if (val1 < val2) {
          return -1;
        } else if (val1 > val2) {
          return 1;
        } else {
          return 0;
        }
      };
      console.log(
        arr.sort(),
        arr2.sort(compare),
        "简单的数组对象排序",
        "a" < "b",
        "--------------------"
      );
      const arr3 = [
          { id: 1, name: "dasd " },
          { id: 9, name: "dasd " },
          { id: 8, name: "dasd " },
          { id: 2, name: "dasd " },
        ],
        nun3 = [1, 8, 9, 5, 6, "s", "a"];
      const sortmap = (key) => {
        return (a, b) => {
          let a_item = a[key] || a,
            b_item = b[key] || b;
          return a_item - b_item;
        };
      };
      console.log(
        arr3.sort(sortmap("id")),
        nun3.sort(sortmap()).join(","),
        nun3.sort(sortmap()).reverse().join(","),
        "新排序算法sort-------------"
      );
      //
      const arr4 = [
          { id: 1, name: "dasd " },
          { id: 9, name: "dasd " },
          { id: 8, name: "dasd " },
          { id: 2, name: "dasd " },
        ],
        nun4 = [1, 8, 9, 5, 6, "s", "a"];

      for (let i = 0; i < nun4.length; i++) {
        for (let v = 0; v < nun4.length - 1; v++) {
          let item = nun4[v];
          if (nun4[v] > nun4[v + 1]) {
            nun4[v] = nun4[v + 1];
            nun4[v + 1] = item;
          }
        }
        console.log(nun4.join(","), "nun4---");
      }
      console.log("===============---");
      //
      const arr5 = [1, 8, 9, 5, 6, "s", "a"],
        nun5 = [1, 8, 9, 5, 6, "s", "a"];
      for (let i = 0; i < nun5.length; i++) {
        let item,
          index = i;
        for (let v = i + 1; v < nun5.length; v++) {
          if (nun5[index] > nun5[v]) {
            index = v;
          }
        }
        item = nun5[i];
        nun5[i] = nun5[index];
        nun5[index] = item;
        console.log(nun5.join(","), "nun5----");
      }
      console.log("===============---");
      //
      arr5.filter((item, index) => {
        let value,
          key = index;
        arr5.filter((v, ind) => {
          if (ind < key + 1) return;
          if (arr5[key] > arr5[ind]) {
            key = ind;
          }
        });
        value = arr5[index];
        arr5[index] = arr5[key];
        arr5[key] = value;
        console.log(arr5.join(","), "arr5---");
      });
      console.log("----------");
      const datas = [1, 13, 24, 11, 11, 14, 1, 2];
      const data_map = (data) => {
        let obj = {},
          datatype = [];
        for (let i = 0; i < data.length; i++) {
          console.log(!obj[data[i]], "iten");
          if (!obj[data[i]]) {
            obj[data[i]] = true;
            datatype.push(data[i]);
          }
        }
        console.log(obj, "obj");
        return datatype;
      };
      console.log(data_map(datas), new Set(datas), "素组去重==");
      const boxsort = (arr) => {
        for (let i = 0; i < arr.length; i++) {
          for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] > arr[j]) {
              let tem = arr[i];
              arr[i] = arr[j];
              arr[j] = tem;
            }
          }
        }
        return arr;
      };

      console.log(
        boxsort(datas),
        "排序冒泡----------toLowerCase() 方法用于把字符串转换为小写。includes() 检测数组是否包含 某值"
      );
      const str = "afjghdfraaaasdenas"; //charAt() 方法可返回指定位置的字符
      const onstr = (obj) => {
        if (obj.length == 1) return obj;
        let objlen = {};
        for (let i = 0; i < obj.length; i++) {
          console.log(i, obj[i], obj.charAt(i), "索引");
          if (!objlen[str[i]]) {
            objlen[str[i]] = 1; //当第一次不存在给其复制1
          } else {
            objlen[str[i]] += 1; //重复存在一次+1
          }
        }
        console.log(objlen, "objlen");
        let maxch = "",
          maxva = 1;
        for (let k in objlen) {
          console.log(k, objlen[k], "for in");
          if (objlen[k] >= maxva) {
            maxch = k;
            maxva = objlen[k];
          }
        }
        return { maxch, maxva };
      };
      console.log(onstr(str), str.length, "计算一个字符串中出现最多的字符");

      const ws = new WebSocket("wss://echo.websocket.org");
      ws.onopen = function (evt) {
        console.log("Connection open ... 发送消息WebSocket", evt);
        ws.send("Hello WebSockets!");
      };
      ws.onerror = function () {
        console.log("建立链接失败，可以尝试重新建立WebSocket");
      };
      ws.onmessage = function (evt) {
        console.log("WebSocket接受数据Received Message: " + evt.data, evt);
        ws.close();
      };

      ws.onclose = function (evt) {
        console.log("Connection closed.关闭链接WebSocket", evt);
      };

      //
    },
    ddd() {
      //cookie

      document.cookie = "username=John Doe"; //保存
      const x = document.cookie.split(";"); //读取
      const getCookie = (name) => {
        let cookieValue = null;
        if (document.cookie && document.cookie !== "") {
          const cookies = document.cookie.split(";");
          for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // 判断这个cookie的参数名是不是我们想要的
            if (cookie.substring(0, name.length + 1) === name + "=") {
              cookieValue = decodeURIComponent(
                cookie.substring(name.length + 1)
              );
              break;
            }
          }
        }
        return cookieValue;
      };

      console.log(x, getCookie("username"), "cookie的使用");
    },
    rs() {
      //val,type,title,place

      messagealert();
    },
    re() {
      console.log(this.ress, "res");
    },

    res() {
      //通过ref调用子组件print()方法并传递参数
      this.$refs.admins.print(this.value);
    },
    req(e) {
      //被子组件调用
      this.value += 100;
      console.log(e, "子组件传递过来参数");
    },
  },
};
</script>
<style lang="scss" scoped>
.dashboard {
  width: 100%;
}
.line {
  margin-top: 30px;
}
@import "./style.scss";
</style>