<template>
    <div :style="{height: (screenHeight ) + 'px'}" style="overflow:hidden;">
        <div style=" position: fixed;width: 100%;">
            <div class="yhdet_tit">
                <img @click="back()" src="../../assets/img/back_left.png" alt="">
                <div>预警信息详情</div>
            </div>
        </div>
        <div id="yhxx_cont0" >
            <div>
                <div style="margin-bottom: 10px;background-color: #fff;padding: 0 20px 15px;">
                    <div class="zg_tit zg_tit_open">
                        <div class="wzg_lef_tit">{{wzgLists.title}}</div>
                    </div>
                    <div class="wzg_list">
                        <div  v-for="(these,index) in wzgLists.wzgLists" :key="index">
                            <div class="wzg_each_list">
                                <div class="each_yj_tit">{{these.tit}}</div>
                                <div class="each_zg_con">{{these.cont}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="pro_des" style="background: #fff;padding:5px 20px 10px;">
            <div class="des_tit">处理说明</div>
            <textarea placeholder="请简述隐患问题" name="" v-model="armclcont"></textarea>
            <div class="yj_button">
                <div class="yj_no">忽略</div>
                <div class="yj_yes" @click="findYJTJ()">提交</div>
            </div>
        </div>
    </div>
</template>

<script>
import api from "@/api/api.js";
export default {
  data() {
    return {
      screenHeight:
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight,
      wzgLists: [
        {
          title: "基本信息",
          wzgLists: [
            { tit: "报警时间：", cont: "2019-04-28 12:23" },
            { tit: "报警分类：", cont: "可燃有毒有害气体" },
            { tit: "报警名称：", cont: "浓度高限位报警" },
            { tit: "企业名称：", cont: "江苏益达化学股份有限公司" },
            { tit: "安全负责人及联系电话：", cont: "张峰 15687459651" },
            {
              tit: "报警信息：",
              cont: "阿尔法T402温度高限位报警，当前27.124032℃，阈值为25.0℃"
            },
            { tit: "报警值：", cont: "0.366" },
            { tit: "高报：", cont: "0.3" },
            { tit: "高高报：", cont: "0.4" },
            { tit: "低报：", cont: "0.2" },
            { tit: "低低报：", cont: "0.1" }
          ]
        }
      ],
      armclcont: "",
      armNo: ""
    };
  },
  created() {
    this.armNo = this.$route.query.armNo;
    this.findWzgListsDet();
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    findWzgListsDet() {
      var that = this;
      api
        .findWzgListsDet({ armNo: that.armNo })
        .then(function(res) {
          console.log(res);
          that.wzgLists = res.data.data;
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    // 提交预警信息处理说明
    findYJTJ() {
      var that = this;
      api
        .findYJTJ({ armno: that.armNo, armclcont: that.armclcont })
        .then(function(res) {
          console.log(res.data);
        });
    }
  }
};
</script>

<style scope>
.focus_bat {
  color: #4e84f2;
}
.focus_bat::after {
  content: "";
  width: 35px;
  height: 3px;
  background: #4e84f2;
  border-radius: 1.5px;
  display: block;
  margin: 5px auto 0;
}
#yhxx_cont0 {
  padding-top: 45px;
}
.selecte {
  display: block;
}
.not_seled {
  display: none;
}
.zg_tit {
  height: 38px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
  color: #333;
}
.wzg_each_list {
  height: 30px;
  display: flex;
  align-items: center;
  font-size: 14px;
}
.wzg_list > div:nth-child(odd) {
  background-color: rgba(57, 130, 246, 0.059);
}
.each_yj_tit {
  color: #999;
  padding-right: 10px;
}

.pro_des {
  padding: 0 20px;
}
.des_tit {
  color: #3d4060;
  font-weight: 700;
  font-size: 14px;
  margin: 10px 0;
}
textarea {
  border: 1px solid #dedede;
  padding: 8px 8px;
  width: calc(100% - 20px);
  height: 65px;
  outline: none;
  background: #fff;
  font-size: 13px;
}
.yj_button {
  padding: 40px 0 20px;
  width: 100%;
  display: flex;
  justify-content: space-around;
}
.yj_no,
.yj_yes {
  width: 40%;
  border: 1px solid #666;
  color: #333;
  font-size: 14px;
  text-align: center;
  height: 30px;
  line-height: 30px;
  border-radius: 10px;
  background: #fff;
}
.yj_yes {
  background: #4e84f2;
  color: #fff;
  border: 1px solid #4e84f2;
}
</style>
