<template>
    <div :style="{height: (screenHeight ) + 'px'}" style="overflow:hidden;background:#fff;">
        <div style=" position: fixed;width: 100%;">
            <div class="yhdet_tit">
                <img @click="back()" src="../../assets/img/back_left.png" alt="">
                <div>应急事件详情</div>
            </div>
        </div>
        <div id="yhxx_cont0" >
            <div>
                <div style="margin-bottom: 10px;background-color: #fff;padding: 0 20px 15px;">
                    <div class="zg_tit zg_tit_open">
                        <div class="wzg_lef_tit">{{wzgLists.title}}</div>
                    </div>
                    <div style="font-size:12px;padding-bottom:10px;">{{wzgLists.str}}</div>
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
          title: "怡达化学股份有限公司发生火灾",
          str: "江苏省江阴市临港经济开发区璜土镇石庄花港东路1号",
          wzgLists: [
            { tit: "事件类型：", cont: "火灾" },
            { tit: "发生时间：", cont: "2019-04-28 12:23" },
            { tit: "事件等级：", cont: "一般" },
            {
              tit: "情况描述：",
              cont: "xxxxxxxxxxxxxxxx"
            },
            { tit: "影响范围：", cont: "xxxxxxx" },
            {
              tit: "上报人：",
              cont: "张峰"
            },
            { tit: "事件状态：", cont: "受理中" },
            { tit: "处置状态：", cont: "已处置" },
            { tit: "已采取措施：", cont: "xxxxxxxxxxxxx采取措施" }
          ]
        }
      ]
    };
  },
  created() {
    var that = this;
    api
      .findYjsjListsDet({ evNo: 1 })
      .then(function(res) {
        that.wzgLists = res.data.info;
        console.log(res.data.info);
      })
      .catch(function(err) {
        console.log(err);
      });
  },
  methods: {
    back() {
      this.$router.go(-1);
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
.yjsjdet_yes {
  width: 80%;
  font-size: 14px;
  text-align: center;
  height: 30px;
  line-height: 30px;
  border-radius: 10px;
  background: #4e84f2;
  color: #fff;
  border: 1px solid #4e84f2;
  margin-bottom: 30px;
}

.yjqk {
  margin-top: 10px;
  background: #fff;
}

.change_yjsj {
  color: #000;
}
.change_yjsj > img {
  width: 13px;
  height: 14px;
  padding: 0px 12px 2px 7px;
  vertical-align: middle;
}
</style>
