<template>
    <div :style="{height: (screenHeight ) + 'px'}" style="overflow:hidden;">
        <div style=" position: fixed;width: 100%;">
            <div class="yhdet_tit">
                <img @click="back()" src="../../assets/img/back_left.png" alt="">
                <div>应急事件详情</div>
            </div>
        </div>
        <div id="yhxx_cont0" >
            <div>
                <div v-for="(item, index) in wzgLists" :key="index" style="margin-bottom: 10px;background-color: #fff;padding: 0 20px 15px;">
                    <div class="zg_tit zg_tit_open">
                        <div class="wzg_lef_tit">{{item.title}}</div>
                    </div>
                    <div style="font-size:12px;padding-bottom:10px;">{{item.str}}</div>
                    <div class="wzg_list">
                        <div  v-for="(these,index) in item.info" :key="index">
                            <div class="wzg_each_list">
                                <div class="each_yj_tit">{{these.tit}}</div>
                                <div class="each_zg_con">{{these.cont}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="yjqk" style="padding:0 20px;">
            <div class="each_cont">
                <div><img src="../../assets/img/redstar.png" alt=""><span>事故状态</span></div>
                <div class="change_yjsj">
                  <cube-button @click="showPicker4">{{shigu}}</cube-button>
                  <img src="../../assets/img/right_jt.png" />
                </div>
            </div>
            <div class="each_cont">
                <div><img src="../../assets/img/redstar.png" alt=""><span>处置状态</span></div>
                <div class="change_yjsj">
                  <cube-button @click="showPicker5">{{chuzhi}}</cube-button>
                  <img src="../../assets/img/right_jt.png" />
                </div>
            </div>
            <div class="each_cont">
                <div><img src="../../assets/img/redstar.png" alt=""><span>已采取措施</span></div>
            </div>
            <textarea v-model="contemt" placeholder="请简述下已采取措施" name="" id=""  rows="5"></textarea>
            <div class="yj_button" @click="findYJXQSEND()">
                <div class="yjsjdet_yes" style="height:38px;line-height:38px;">提交并通知</div>
            </div>
        </div>
        <!-- <div class="pro_des" style="background: #fff;padding:5px 20px 10px;">
            <div class="des_tit">已采取措施</div>
            <textarea placeholder="请简述下已采取措施" name="" ></textarea>
            <div class="yj_button">
                <div class="yjdet_yes">提交并通知</div>
            </div>
        </div> -->
    </div>
</template>

<script>
import api from "@/api/api.js";
export default {
  data() {
    return {
      contemt: "",
      screenHeight:
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight,
      evno: "",
      takened_steps: "",
      ev_state: "",
      handle_state: "",
      wzgLists: [
        {
          title: "怡达化学股份有限公司发生火灾",
          str: "江苏省江阴市临港经济开发区璜土镇石庄花港东路1号",
          info: [
            { tit: "事件类型", cont: "火灾" },
            { tit: "发生时间", cont: "2019-04-28 12:23" },
            { tit: "事件等级", cont: "一般" },
            {
              tit: "情况描述",
              cont: "阿尔法T402温度高限位报警，当前27.124032℃，阈值为25.0℃"
            },
            { tit: "影响范围", cont: "xxxxxxx" },
            {
              tit: "上报人",
              cont: "张峰"
            },
            { tit: "事件状态", cont: "受理中" }
          ]
        }
      ],
      shigu: "受理中",
      evStates: [
        { text: "编辑", value: "00" },
        { text: "已处置", value: "03" },
        { text: "受理中", value: "01" },
        { text: "终结", value: "99" },
        { text: "处置中", value: "02" }
      ],
      chuzhi: "已处置",
      handlestates: []
    };
  },
  created() {
    this.evno = this.$route.query.evno;
    this.findYJXQ();
  },
  methods: {
    showPicker5() {
      var that = this;
      if (!that.picker5) {
        that.picker5 = that.$createPicker({
          title: "请选择处置状态",
          data: [that.handlestates],
          onSelect: that.selectHandle5,
          onCancel: that.cancelHandle5
        });
      }
      that.picker5.show();
    },
    // 确定按钮事件
    selectHandle5(selectedVal, selectedIndex, selectedText) {
      this.chuzhi = selectedText[0];
    },
    showPicker4() {
      var that = this;
      if (!that.picker4) {
        that.picker4 = that.$createPicker({
          title: "请选择事故状态",
          data: [that.evStates],
          onSelect: that.selectHandle4,
          onCancel: that.cancelHandle4
        });
      }
      that.picker4.show();
    },
    // 确定按钮事件
    selectHandle4(selectedVal, selectedIndex, selectedText) {
      this.shigu = selectedText[0];
    },
    back() {
      this.$router.go(-1);
    },
    // 请求接口  工作 - worker - 应急事件详情
    findYJXQ() {
      var that = this;
      api.findYJXQ({ evno: that.evno }).then(function(res) {
        console.log(res.data.data);
        that.wzgLists = res.data.data.wzgLists;
      });
      // 获取下来框选项值
      api.findSJANDCZSTATE().then(function(res) {
        console.log(res.data.data);
        // that.evstates = res.data.data.evstates;
        that.handlestates = res.data.data.handlestates;
      });
    },
    findYJXQSEND() {
      var that = this;
      api
        .findYJXQSEND({
          evno: that.evno,
          takened_steps: that.shigu,
          // ev_state: that.chuzhi,
          ev_state: "00",
          handle_state: that.handle_state
        })
        .then(function(res) {
          console.log(res);
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
  /* flex-basis: 36%; */
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
  display: flex;
  width: fit-content;
}
.change_yjsj > img {
  width: 13px;
  height: 14px;
  padding: 0px 12px 2px 7px;
  vertical-align: middle;
}

.cube-btn {
  font-size: 14px !important;
  padding: 0px !important;
  color: #999 !important;
  width: fit-content !important;
  max-width: 200px !important;
  height: fit-content !important;
  background: transparent !important;
  background-size: 20% 40% !important;
  background-position: center right !important;
  text-overflow: ellipsis !important; /*让截断的文字显示为点点。还有一个值是clip意截断不显示点点*/
  white-space: nowrap !important; /*让文字不换行*/
  overflow: hidden !important; /*超出要隐藏*/
}
</style>
