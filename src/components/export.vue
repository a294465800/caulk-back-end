<style scoped>
.export-item {
  margin: 20px 0;
}
</style>

<template>
  <section class="wrap">
    <!-- 面包屑导航 -->
    <el-breadcrumb class="breadcrumb" separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>导出数据</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 面包屑导航 -->

    <div class="export-list">
      <div class="export-item">
        <el-form :inline="true" :model="reservaForm">
          <el-form-item>
            <el-button type="text">预约列表</el-button>
          </el-form-item>
          <el-form-item label="时间范围">
            <el-date-picker v-model="reservaForm.dateRange" type="datetimerange" :picker-options="pickerOptions" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="left">
          </el-date-picker>
          <el-form-item label="状态">
            <el-select v-model="reservaForm.state" placeholder="选择状态">
              <el-option v-for="state in reservaState" :key="state.id" :label="state.name" :value="state.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="reservaExport">导出</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="export-item">
        <el-form :inline="true" :model="orderForm">
          <el-form-item>
            <el-button type="text">订单成交列表</el-button>
          </el-form-item>
          <el-form-item label="时间范围">
            <el-date-picker v-model="orderForm.dateRange" type="datetimerange" :picker-options="pickerOptions" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="left">
          </el-date-picker>
          <el-form-item label="状态">
            <el-select v-model="orderForm.state" placeholder="选择状态">
              <el-option v-for="state in orderState" :key="state.id" :label="state.name" :value="state.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="orderExport">导出</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="export-item">
        <el-form :inline="true" :model="masterForm">
          <el-form-item>
            <el-button type="text">师傅列表</el-button>
          </el-form-item>
          <el-form-item label="时间范围">
            <el-date-picker v-model="masterForm.dateRange" type="datetimerange" :picker-options="pickerOptions" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="left">
          </el-date-picker>
          <el-form-item label="状态">
            <el-select v-model="masterForm.state" placeholder="选择状态">
              <el-option v-for="state in masterState" :key="state.id" :label="state.name" :value="state.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="masterExport">导出</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      reservaForm: {
        dateRange: "",
        start: "",
        end: "",
        state: ""
      },
      reservaState: [
        {
          id: 1,
          name: "未接单"
        },
        {
          id: 2,
          name: "已受理"
        },
        {
          id: 3,
          name: "已完成"
        }
      ],

      orderForm: {
        dateRange: "",
        start: "",
        end: "",
        state: ""
      },
      orderState: [
        {
          id: 1,
          name: "未付款"
        },
        {
          id: 2,
          name: "待发货"
        },
        {
          id: 3,
          name: "待收货"
        },
        {
          id: 4,
          name: "已完成"
        }
      ],

      masterForm: {
        dateRange: "",
        start: "",
        end: "",
        state: ""
      },
      masterState: [
        {
          id: 1,
          name: "停用"
        },
        {
          id: 2,
          name: "正常使用"
        }
      ]
    };
  },

  methods: {
    dateFormat(fmt) {
      var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        S: this.getMilliseconds() //毫秒
      };
      if (/(y+)/.test(fmt))
        fmt = fmt.replace(
          RegExp.$1,
          (this.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
      for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length == 1
              ? o[k]
              : ("00" + o[k]).substr(("" + o[k]).length)
          );
      return fmt;
    },
    reservaExport() {
      let getData = this.reservaForm;
      if (getData.dateRange !== "") {
        getData.start = this.dateFormat(getData.dateRange[0]);
        getData.end = this.dateFormat(getData.dateRange[1]);
      }
      let url = `${this.$api.host}output?table=reverse&start=${getData.start ||
        ""}&end=${getData.end || ""}&state=${getData.state}`;
      console.log(url);
      window.open(url);
    },

    orderExport() {
      let getData = this.orderForm;
      if (getData.dateRange !== "") {
        getData.start = this.dateFormat(getData.dateRange[0]);
        getData.end = this.dateFormat(getData.dateRange[1]);
      }
      let url = `${this.$api.host}output?table=order&start=${getData.start ||
        ""}&end=${getData.end || ""}&state=${getData.state}`;
      console.log(url);
      window.open(url);
    },
    masterExport() {
      let getData = this.masterForm;
      if (getData.dateRange !== "") {
        getData.start = this.dateFormat(getData.dateRange[0]);
        getData.end = this.dateFormat(getData.dateRange[1]);
      }
      let url = `${this.$api.host}output?table=worker&start=${getData.start ||
        ""}&end=${getData.end || ""}&state=${getData.state}`;
      console.log(url);
      window.open(url);
    }
  }
};
</script>

