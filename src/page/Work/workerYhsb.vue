<template>
    <div>
        <div style=" position: fixed;width: 100%;">
            <div class="yhdet_tit">
                <img @click="back()" src="../../assets/img/back_left.png" alt="">
                <div>隐患上报</div>
            </div>
        </div>
        <div class="upbox">
            <img src="../../assets/img/t32.png" alt="">
        </div>
        <div class="yhsb_oddbg">
            <div class="yhsb_hang">
                <div>企业</div>
                <div style="display:flex;width:fit-content;">
                  <cube-button @click="showPicker">{{whickCony}}</cube-button>
                  <img class="sm_jt" src="../../assets/img/t34.png" />
                </div>
            </div>
            <div class="yhsb_hang">
                <div>检查区域</div>
                <div style="display:flex;width:fit-content;">
                  <cube-button @click="showPicker1">{{whickArea}}</cube-button>
                  <img class="sm_jt" src="../../assets/img/t34.png" />
                </div>
            </div>
            <div class="yhsb_hang">
                <div>隐患级别</div>
                <div>
                    <input type="radio" name="Hazardlevel" value="10" checked>一般隐患
                    <input type="radio" name="Hazardlevel" value="11">重大隐患
                </div>
            </div>
            <div class="pro_des">
                <div class="des_tit">问题描述</div>
                <textarea placeholder="请简述隐患问题" name="" v-model="problem_desc"></textarea>
            </div>
        
        </div>
        <div class="upyh" @click="findYHSB()">提交</div>
    </div>
</template>

<script>
import api from "@/api/api.js";
export default {
  data() {
    return {
      whickCony: "请选择企业",
      whickArea: "请选在检查区域",
      conyList: [
        { text: "公司1", value: "1" },
        { text: "公司2", value: "2" },
        { text: "公司3", value: "3" },
        { text: "公司4", value: "4" },
        { text: "公司5", value: "5" }
      ],
      areaList: [
        { text: "区域1", value: "1" },
        { text: "区域2", value: "2" },
        { text: "区域3", value: "3" },
        { text: "区域4", value: "4" },
        { text: "区域5", value: "5" }
      ],
      photos: "",
      entprno: "",
      areano: "",
      problem_desc: "",
      userid: "",
      dangerslvs: ""
    };
  },
  created() {
    this.userid = this.$root.username;
    this.findAllComp();
  },
  methods: {
    showPicker() {
      var that = this;
      if (!that.picker) {
        that.picker = that.$createPicker({
          title: "请选择企业",
          data: [that.conyList],
          onSelect: that.selectHandle,
          onCancel: that.cancelHandle
        });
      }
      that.picker.show();
    },
    // 确定按钮事件
    selectHandle(selectedVal, selectedIndex, selectedText) {
      this.whickCony = selectedText[0];
    },
    // 取消按钮事件
    cancelHandle() {},
    showPicker1() {
      var that = this;
      if (!that.picker1) {
        that.picker1 = that.$createPicker({
          title: "请选在检查区域",
          data: [that.areaList],
          onSelect: that.selectHandle1,
          onCancel: that.cancelHandle1
        });
      }
      that.picker1.show();
    },
    // 确定按钮事件
    selectHandle1(selectedVal, selectedIndex, selectedText) {
      this.whickArea = selectedText[0];
    },
    // 取消按钮事件
    cancelHandle1() {},
    findAllComp() {
      var that = this;
      api.findAllComp().then(function(res) {
        that.areaList = res.data.data.areas;
        that.conyList = res.data.data.companys;
        that.dangerslvs = res.data.data.dangerslvs;
        console.log(that.areaList);
        console.log(that.conyList);
      });
    },
    findYHSB() {
      var that = this;
      var radio = document.getElementsByName("Hazardlevel");
      var seletvalue = null;
      for (var i = 0; i < radio.length; i++) {
        if (radio[i].checked == true) {
          seletvalue = radio[i].value;
          break;
        }
      }
      api
        .findYHSB({
          seletvalue: seletvalue,
          photos: that.photos,
          entprno: that.whickCony,
          areano: that.whickArea,
          problem_desc: that.problem_desc,
          userid: that.userid
        })
        .then(function(res) {
          console.log(res);
          that.photos = "";
          that.whickCony = "";
          that.whickArea = "";
          that.problem_desc = "";
          that.dangerslvs = "";
        });
    },
    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scope>
.upbox {
  padding: 60px 20px 15px;
  background: #fff;
}
.upbox img {
  width: 100%;
  height: auto;
}
.upyh {
  margin: 30px 35px 15px;
  height: 40px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  font-size: 15px;
  color: #fff;
  font-weight: 700;
  background-color: #abcafb;
  border-radius: 20px;
}
.yhsb_hang {
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  height: 45px;
  align-items: center;
  color: #999;
  font-size: 14px;
}
.yhsb_oddbg {
  margin-top: 10px;
}
.yhsb_oddbg > div:nth-child(odd) {
  background-color: #fff;
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
.sm_jt {
  width: 12px;
  padding: 2px 10px;
  height: 7px;
  margin: auto;
}

.cube-btn {
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
