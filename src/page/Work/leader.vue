<template>
    <div style="margin-bottom: 46px;">
      <div class="top_show">
        <div class="gz_title">江阴临港化工园区智慧安监平台</div>
        <img @click="toEcharts()" style="position: absolute;top: 22px;width: 22px;right: 0px;margin: 10px;" src="../../assets/img/gz_pie.png" alt="">
        <div class="gz_lead_top">
          <div>95.0</div>
        </div>
      </div>
      <!-- 常用功能 -->
      <div class="gz_yg_cont">
        <div class="gz_yg_cygn">
          <div>常用功能</div> 
          <!-- <img src="../../assets/img/gz_right_jt.png" alt=""> -->
        </div>
        <div class="yg_cygn">
          <div class="yg_qyzs">
            <div style="padding-top: 6px;">企业总数</div>
            <div>{{result.qynum}}家</div>
          </div>
          <div class="yg_qyzs0">
            <div style="padding-top: 6px;">危险化工工艺</div>
            <div>{{result.wxhggy}}个</div>
          </div>
          <div class="yg_qyzs1">
            <div style="padding-top: 6px;">重大危险源企业</div>
            <div>{{result.zdwxyqy}}家</div>
          </div>
        </div>
      </div>
      <!-- 本月预警信息 -->
      <div class="gz_yg_cont">
        <div class="gz_yg_cygn" @click="toLeaderYjxx()">
          <div>本月预警信息</div> <img src="../../assets/img/gz_right_jt.png" alt="">
        </div>
        <div class="yg_cygn0">
          <div class="yg_cgyj">
            <div>储罐预警</div>
            <div class="">{{result.cgnum}}次</div>
          </div>
          <div class="yg_kryd">
            <div>可燃有毒有害气体</div>
            <div class="">{{result.krydqtnum}}次</div>
          </div>
        </div>
      </div>
      <!-- 上报记录统计 -->
      <div class="gz_yg_cont">
        <div class="gz_yg_cygn">
          <div>上报记录统计</div> 
          <!-- <img src="../../assets/img/gz_right_jt.png" alt=""> -->
        </div>
        <div class="yg_cygn0">
          <div class="yg_yhjl" @click="toYhInfodet()">
            <div>隐患记录</div>
            <div class="">{{result.yhjlnum}}次</div>
          </div>
          <div class="yg_yjsj" @click="toYjsj()">
            <div>应急事件</div>
            <div class="">{{result.yjnum}}次</div>
          </div>
        </div>
      </div>
      <!-- 本月企业隐患整改信息 -->
      <div class="gz_yg_cont" style="margin-bottom:22px;">
        <div class="gz_yg_cygn"  @click="toYhzg()">
          <div>本月企业隐患整改信息</div> <img src="../../assets/img/gz_right_jt.png" alt="">
        </div>
        <div class="yg_yhzg">
          <div class="yg_fxyg">
            <div class="test_bold">发现隐患</div>
            <div class="test_org">{{result.fxyhnum}}个</div>
          </div>
          <div>
            <div class="yg_yzgyh">
              <div class="test_bold weiyi">已整改隐患</div>
              <div class="test_org weiyi">{{result.yzg}}个</div>
            </div>
            <div class="yg_wzgyh">
              <div class="test_bold weiyi">未整改隐患</div>
              <div class="test_org weiyi">{{result.wzg}}个</div>
            </div>
          </div>
        </div>
      </div>
      <table></table>
      <TabBar :idx = 1 />
    </div>
</template>

<script>
import api from "@/api/api.js";
import TabBar from "@/components/TabBar";
export default {
  components: { TabBar },
  data() {
    return {
      result: ""
    };
  },
  created() {
    this.findLeaderIndex();
  },
  methods: {
    findLeaderIndex() {
      var that = this;
      api.findLeaderIndex().then(function(res) {
        that.result = res.data.data;
        console.log(that.result);
      });
    },
    toEcharts() {
      this.$router.push({
        path: "/work/leader/echarts"
      });
    },
    toYhzg() {
      this.$router.push({
        path: "/seeHidTrouble"
      });
    },
    toYhInfodet() {
      this.$router.push({
        path: "/leaderYhjl"
      });
    },
    // 本月预警信息 同worder跳转同一路径
    toLeaderYjxx() {
      this.$router.push({
        path: "/workerYjxx"
      });
    },
    toYjsj() {
      this.$router.push({
        path: "/leaderYjsj"
      });
    }
  }
};
</script>

<style scope>
.top_show {
  background: -webkit-gradient(
    linear,
    0 0,
    100% 100%,
    from(#0c0cb1),
    to(#0a53c2)
  );
  height: 240px;
}
.gz_title {
  color: #fff;
  font-weight: bold;
  font-size: 18px;
  text-align: center;
  padding-top: 30px;
}
.gz_yg_cont {
  background: #fff;
  padding: 10px 12px 1px 12px;
  margin-top: 7px;
}
.gz_yg_cygn {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}
.gz_yg_cygn img {
  width: 8px;
  height: 20px;
}
.yg_cygn,
.yg_cygn0 {
  display: flex;
  justify-content: space-between;
  margin: 15px 0px 11px 0px;
}
.yg_cygn0 {
  margin: 10px 0px 11px 0px;
}
.yg_qyzs,
.yg_qyzs0,
.yg_qyzs1,
.yg_yjsjsb,
.yg_cgyj,
.yg_kryd,
.yg_yhjl,
.yg_yjsj {
  width: 49%;
  background: url("../../assets/img/gz_yg_0.png") no-repeat;
  background-size: 100% 100%;
  height: 64px;
  color: #fff;
  line-height: 40px;
  font-size: 14px;
  text-indent: 17px;
}
.yg_qyzs,
.yg_qyzs0,
.yg_qyzs1 {
  width: 32%;
  text-indent: 10px;
  line-height: 22px;
  /* font-weight: bold; */
  background: url("../../assets/img/gz_lead_0.png") no-repeat;
  background-size: 100% 100%;
}
.yg_qyzs0 {
  background: url("../../assets/img/gz_lead_1.png") no-repeat;
  background-size: 100% 100%;
}
.yg_qyzs1 {
  background: url("../../assets/img/gz_lead_2.png") no-repeat;
  background-size: 100% 100%;
}
.yg_yjsjsb {
  background: url("../../assets/img/gz_yg_1.png") no-repeat;
  background-size: 100% 100%;
}
.yg_cgyj,
.yg_kryd,
.yg_yhjl,
.yg_yjsj {
  background: url("../../assets/img/gz_lead_4.png") no-repeat;
  background-size: 100% 100%;
  height: 89px;
  color: #000;
  line-height: 20px;
}
.yg_kryd {
  background: url("../../assets/img/gz_lead_3.png") no-repeat;
  background-size: 100% 100%;
}
.yg_yhjl {
  background: url("../../assets/img/gz_lead_5.png") no-repeat;
  background-size: 100% 100%;
}
.yg_yjsj {
  background: url("../../assets/img/gz_lead_6.png") no-repeat;
  background-size: 100% 100%;
}
.yg_yhzg {
  display: flex;
  justify-content: space-between;
}
.yg_yhzg > div {
  width: 50%;
  height: 134px;
}
.yg_fxyg {
  background: url("../../assets/img/gz_lead_7.png") no-repeat;
  background-size: 90% 52%;
  background-position: center bottom;
  border-right: 1px solid #eee;
}
.yg_yzgyh {
  background: url("../../assets/img/gz_lead_8.png") no-repeat;
  background-size: 36% 80%;
  background-position: right center;
  border-bottom: 1px solid #eee;
  height: 67px;
}
.yg_wzgyh {
  background: url("../../assets/img/gz_lead_9.png") no-repeat;
  background-size: 36% 80%;
  background-position: right center;
  height: 67px;
}
.test_org {
  color: #ff912c;
}
.test_bold {
  font-weight: bold;
  padding-top: 10px;
}
.weiyi {
  padding-left: 15px;
}
.gz_lead_top {
  width: 100%;
  height: calc(100% - 56px);
  background: url("../../assets/img/main_img@3x.png") no-repeat;
  background-size: 100% 120%;
  background-position: top center;
}
.gz_lead_top > div {
  text-align: center;
  color: #fff;
  position: relative;
  top: 42%;
  padding-right: 10px;
}
</style>
