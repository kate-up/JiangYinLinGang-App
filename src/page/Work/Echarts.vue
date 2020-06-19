<template>
    <div>
        <div class="yhdet_tit" style=" position: fixed;width: 100%;z-index:1000;">
            <img @click="back()" src="../../assets/img/back_left.png" alt="">
            <div>echarts图</div>
        </div>
        <div style="padding-top:45px;">
            <div id="echart1" class="ech_sty"></div>
            <!-- 报警信息统计 -->
            <div id="echart2" class="ech_sty"></div>
            <div id="echart3" class="ech_sty"></div>
        </div>
    </div>
</template>

<script>
import api from "@/api/api.js";
export default {
  data() {
    return {
      echart2s: "",
      echart3s: [],
      echart3s1: [],
      echart1s: ""
    };
  },
  created() {
    this.echarts2();
  },
  methods: {
    echarts2() {
      var that = this;
      api.findEchartsBJXX().then(function(res) {
        that.echart2s = res.data.data;
        that.drawEchart2();
      });
      that.whp();
      api.findDTSCount().then(function(res) {
        that.echart1s = res.data.data;
        console.log(res);
        that.drawEchart1();
      });
    },
    whp() {
      var that = this;
      api.findwhpjcount().then(function(res) {
        for (var i = 0; i < res.data.length; i++) {
          that.echart3s.push(res.data[i].num);
        }
        console.log(that.echart3s);
        api.findwhpccount().then(function(rs) {
          for (var i = 0; i < rs.data.length; i++) {
            that.echart3s1.push(rs.data[i].num);
          }
          console.log(that.echart3s1);
          that.drawEchart3(that.echart3s, that.echart3s1);
        });
      });
    },
    back() {
      this.$router.go(-1);
    },
    drawEchart1() {
      var that = this;
      var dom = document.getElementById("echart1");
      var echart1 = that.$echarts.init(dom);
      echart1.setOption({
        color: ["#0777ff", "#ff283f"],
        title: {
          text: that.echart1s.year + "本年度隐患排查整改"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          icon: "circle",
          data: ["隐患排查数量", "隐患整改数量"],
          right: "0",
          top: "30"
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },

        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月"]
        },
        yAxis: {
          name: "单位：数量",
          type: "value"
        },
        series: [
          {
            name: "隐患排查数量",
            type: "line",
            stack: "总量",
            data: that.echart1s.pclist
          },
          {
            name: "隐患整改数量",
            type: "line",
            stack: "总量",
            data: that.echart1s.zglist
          }
        ]
      });
    },
    // 报警信息统计
    drawEchart2() {
      var that = this;
      var echart2 = that.$echarts.init(document.getElementById("echart2"));
      echart2.setOption({
        color: ["#0777ff", "#ff283f"],
        title: {
          text: that.echart2s.year + "年报警信息统计"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          icon: "circle",
          data: that.echart2s.values,
          right: "0",
          top: "30"
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },

        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月"]
        },
        yAxis: {
          name: "单位：个",
          type: "value"
        },
        series: [
          {
            name: "储蓄",
            type: "line",
            stack: "总量",
            data: that.echart2s.cgdates
          },
          {
            name: "可燃有毒有害气体",
            type: "line",
            stack: "总量",
            data: that.echart2s.krydqtdates
          }
        ]
      });
    },
    drawEchart3(data1, data2) {
      var that = this;
      var dom = document.getElementById("echart3");
      var echart3 = that.$echarts.init(dom);
      echart3.setOption({
        title: {
          text: "本月危化品进出数量"
        },
        tooltip: {
          trigger: "axis",
          padding: [8, 10],
          backgroundColor: "rgba(0,0,0,0.5)",
          axisPointer: {
            type: "shadow",
            textStyle: {
              color: "#fff"
            }
          }
        },
        legend: {
          data: ["进园", "出园"],
          right: "0",
          top: "30",
          textStyle: {
            color: "#333",
            fontSize: 14,
            fontWeight: 200
          },
          icon: "circle",
          itemWidth: 14,
          itemHeight: 14
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        label: {
          show: true,
          position: "top",
          color: "#333",
          fontSize: 14,
          fontWeight: 700
        },
        xAxis: [
          {
            type: "category",
            offset: 10,
            data: ["易燃", "易爆", "有毒", "腐蚀", "其他"],
            axisLabel: {
              show: true,
              interval: 0,
              textStyle: {
                color: "#333",
                fontSize: 16,
                fontWeight: 200
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "t"
          }
        ],
        series: [
          {
            name: "进园",
            type: "bar",
            data: data1,
            barWidth: 20, //柱子宽度
            barGap: 0, //柱子之间间距
            itemStyle: {
              normal: {
                color: "#2b65f0",
                opacity: 1
              }
            }
          },
          {
            name: "出园",
            type: "bar",
            data: data2,
            barWidth: 22,
            barGap: 0,
            itemStyle: {
              normal: {
                color: "#26c9a8",
                opacity: 1
              }
            }
          }
        ]
      });
    }
  }
};
</script>

<style scope>
.ech_sty {
  width: 100%;
  height: 300px;
  background: #fff;
  margin-bottom: 15px;
}
</style>
