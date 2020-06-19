<template>
  <div>
    <div class="yhdet_tit">
        <img @click="back()" src="../../assets/img/back_left.png" alt="">
        <div>应急事件</div>
    </div>
    <div style="background:#fff;">
      <div class="each_cont">
        <div><img src="../../assets/img/redstar.png" alt=""><span>信息标题</span></div>
        <input type="text" placeholder="请输入信息标题">
      </div>
      <div class="each_cont">
        <div><img src="../../assets/img/noneimg.png" alt=""><span>企业</span></div>
        <div class="change_yjsj">
          <cube-button @click="showPicker0">{{whickCon}}</cube-button>
          <img src="../../assets/img/right_jt.png" />
        </div>
      </div>
      <div class="each_cont">
        <div><img src="../../assets/img/redstar.png" alt=""><span>发生时间</span></div>
        <div class="change_yjsj">
          <cube-button @click="showPicker1">{{whickTime}}</cube-button>
          <img src="../../assets/img/right_jt.png" />
        </div>
      </div>
      <div class="each_cont">
        <div><img src="../../assets/img/redstar.png" alt=""><span>事件地点</span></div>
        <input type="text" placeholder="请输入事件地点">
      </div>
      <div class="each_cont">
        <div><img src="../../assets/img/redstar.png" alt=""><span>事件等级</span></div>
        <div class="change_yjsj">
          <cube-button @click="showPicker2">{{whickLevel}}</cube-button>
          <img src="../../assets/img/right_jt.png" />
        </div>
      </div>
      <div class="each_cont">
        <div><img src="../../assets/img/redstar.png" alt=""><span>事件类型</span></div>
        <div class="change_yjsj">
          <cube-button @click="showPicker3">{{whickType}}</cube-button>
          <img src="../../assets/img/right_jt.png" />
        </div>
      </div>
    </div>
    <div class="yjqk">
      <div class="yjqk_tit">应急情况</div>
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
        <div><img src="../../assets/img/redstar.png" alt=""><span>情况描述</span></div>
      </div>
      <textarea placeholder="请简述情况" name="" id=""  rows="5"></textarea>
    </div>
    <div class="upload_but" @click="tijiao()">提及并通知</div>
  </div>
</template>

<script>
import api from "@/api/api.js";
export default {
  data() {
    return {
      whickCon: "请选择企业",
      conyList: [
        { text: "公司1", value: "1" },
        { text: "公司2", value: "2" },
        { text: "公司3", value: "3" },
        { text: "公司4", value: "4" },
        { text: "公司5", value: "5" }
      ],
      whickTime: "请选择发生时间",
      timeList: [
        { text: "公司1", value: "1" },
        { text: "公司2", value: "2" },
        { text: "公司3", value: "3" }
      ],
      whickLevel: "请选择事件等级",
      evlevels: [],
      whickType: "请选择事件类型",
      etypes: [],
      shigu: "受理中",
      evStates: [],
      chuzhi: "已处置",
      handlestates: [],
      xxbt: "", // 信息标题
      conp: "", //企业
      fs_time: "", //发生时间
      sjdd: "", //事件地点
      sjdj: "", //事件等级
      sjlx: "", //事件类型
      sgzt: "", //事故状态
      czzt: "", //处置状态
      qkms: "" //情况描述
    };
  },
  created() {
    var that = this;
    api.findYJSJSBSelect().then(function(res) {
      console.log(res.data.data);
      var result = res.data.data;
      that.conyList = result.companys;
      that.evlevels = result.evlevels;
      that.etypes = result.etypes;
      that.evStates = result.evStates;
      that.handlestates = result.handlestates;
    });
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    tijiao() {
      var that = this;
      api
        .findYJSJSB({
          xxbt: "xxxx",
          conp: that.whickCon,
          fs_time: that.whickTime,
          sjdd: "ssss",
          sjdj: that.whickLevel,
          sjlx: that.whickType,
          sgzt: that.shigu,
          czzt: that.chuzhi,
          qkms: "siydofuo"
        })
        .then(function(res) {
          console.log(res);
        });
    },
    showPicker0() {
      var that = this;
      if (!that.picker0) {
        that.picker0 = that.$createPicker({
          title: "请选择企业",
          data: [that.conyList],
          onSelect: that.selectHandle0,
          onCancel: that.cancelHandle0
        });
      }
      that.picker0.show();
    },
    // 确定按钮事件
    selectHandle0(selectedVal, selectedIndex, selectedText) {
      this.whickCon = selectedText[0];
    },
    showPicker1() {
      if (!this.datePicker) {
        this.datePicker = this.$createDatePicker({
          title: "请选择时间",
          // columnCount: 2,
          min: new Date(2000, 1, 1),
          max: new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate()
          ),
          onSelect: this.selectHandle1,
          onCancel: this.cancelHandle1
        });
      }
      // 展开的弹出窗
      this.datePicker.show();
    },
    // 确定按钮事件
    selectHandle1(date, selectedVal, selectedText) {
      this.whickTime = selectedVal.join("-");
    },
    showPicker2() {
      var that = this;
      if (!that.picker2) {
        that.picker2 = that.$createPicker({
          title: "请选择事件等级",
          data: [that.evlevels],
          onSelect: that.selectHandle2,
          onCancel: that.cancelHandle2
        });
      }
      that.picker2.show();
    },
    // 确定按钮事件
    selectHandle2(selectedVal, selectedIndex, selectedText) {
      this.whickLevel = selectedText[0];
    },
    showPicker3() {
      var that = this;
      if (!that.picker3) {
        that.picker3 = that.$createPicker({
          title: "请选择事件类型",
          data: [that.etypes],
          onSelect: that.selectHandle3,
          onCancel: that.cancelHandle3
        });
      }
      that.picker3.show();
    },
    // 确定按钮事件
    selectHandle3(selectedVal, selectedIndex, selectedText) {
      this.whickType = selectedText[0];
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
    }
  }
};
</script>

<style>
.yjqk {
  margin-top: 10px;
  background: #fff;
}
.yjqk_tit {
  background: #ecf1f9;
  color: #2076ff;
  border-left: 3px solid #2076ff;
  padding-left: 19px;
  font-size: 14px;
  padding: 7px 0 7px 14px;
}
textarea {
  width: calc(100% - 42px);
  padding: 10px 20px;
  color: #777;
  border-top: none !important;
  outline: none;
  border-style: none;
}
textarea:focus {
  outline: none;
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
