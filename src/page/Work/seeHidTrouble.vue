<template>
    <div>
        <div style=" position: fixed;width: 100%;">
            <div class="yhxx_tit">
                <img @click="back()" src="../../assets/img/back_left.png" alt="">
                <div>隐患整改信息</div>
                <cube-button @click="showDatePicker">{{value}}</cube-button>
            </div>
            <div class="tab_div">
                <ul id="yh_tabul">
                    <li :class="state==item.key ? 'focus_bat': ''"  @click="chgTab(index, item.key)" v-for="(item, index) in zgAndWzg" :key="index">{{item.value}}</li>
                </ul>
            </div>
        </div>
        <div id="yhxx_cont" >
            <!-- 未整改 -->
            <div>
                <div v-for="(item, index) in wzgLists" :key="index" style="margin-bottom: 10px;background-color: #fff;padding: 0 20px 15px;">
                    <div class="zg_tit zg_tit_open" @click="isopen(index)">
                        <div class="wzg_lef_tit">{{item.title}}</div>
                        <div class="wzg_rig_tit">
                            <div>{{item.iszg}}</div>
                            <img class="jt_isup" src="../../assets/img/t39.png" alt="">
                        </div>
                    </div>
                    <div class="wzg_list">
                        <div  v-for="(these,index) in item.info" :key="index">
                            <div class="wzg_each_list">
                                <div class="each_zg_tit">{{these.tit}}</div>
                                <div class="each_zg_con">{{these.cont}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 已整改 -->
            <div>
                <div v-for="(item, index) in yzgLists" :key="index" style="margin-bottom: 10px;background-color: #fff;padding: 0 20px 15px;">
                    <div class="zg_tit zg_tit_open" @click="open(index,item.iszg)">
                        <div class="wzg_lef_tit">{{item.title}}</div>
                        <div class="wzg_rig_tit">
                            <div>{{item.iszg}}</div>
                            <img class="jt_isup0" src="../../assets/img/t39.png" alt="">
                        </div>
                    </div>
                    <div class="wzg_list0">
                        <div  v-for="(these,index) in item.info" :key="index">
                            <div class="wzg_each_list">
                                <div class="each_zg_tit">{{these.tit}}</div>
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
      value: "",
      state: 12,
      deg: 0,
      wzgLists: [],
      yzgLists: [],
      zgAndWzg: []
    };
  },
  created() {
    this.value = new Date().getFullYear() + "-" + new Date().getMonth();
    // 默认选中基本信息tab
    this.$nextTick(function() {
      this.chgTab(0, 12);
    });
    this.findYHLIST();
  },
  methods: {
    showDatePicker() {
      if (!this.datePicker) {
        this.datePicker = this.$createDatePicker({
          title: "请选择年月",
          columnCount: 2,
          min: new Date(2000, 1, 1),
          max: new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate()
          ),
          onSelect: this.selectHandle,
          onCancel: this.cancelHandle
        });
      }
      // 展开的弹出窗
      this.datePicker.show();
    },
    // 确定按钮事件
    selectHandle(date, selectedVal, selectedText) {
      this.value = selectedVal.join("-");
    },
    findYHLIST() {
      var that = this;
      api
        .findYHLIST({ compNam: "", yeardate: "", state: that.state })
        .then(function(res) {
          console.log(res);
          that.wzgLists = res.data.data.wzgLists;
          that.yzgLists = res.data.data.wzgLists;
          that.zgAndWzg = res.data.data.zgAndWzg;
        });
    },
    //   切换tab
    chgTab(index, key) {
      var that = this;
      var content = document.getElementById("yhxx_cont").children;
      var tablis = document.getElementById("yh_tabul").children;
      for (var j = 0; j < tablis.length; j++) {
        if (j == index) {
          tablis[index].className = "focus_bat";
          content[j].className = "selecte";
        } else {
          tablis[j].className = "";
          content[j].className = "not_seled";
        }
      }
      for (var i = 0; i < that.zgAndWzg.length; i++) {
        if (key == that.zgAndWzg[i].key) {
          that.state = key;
          that.findYHLIST();
        }
      }
    },
    // 未整改是否展开详情内容
    isopen(index) {
      var that = this;
      var whick = document.getElementsByClassName("wzg_list")[index].style
        .display;
      if (whick == "none") {
        document.getElementsByClassName("jt_isup")[index].style.transform =
          "rotateZ(0deg)";
        document.getElementsByClassName("wzg_list")[index].style.display =
          "block";
      } else {
        document.getElementsByClassName("jt_isup")[index].style.transform =
          "rotateZ(180deg)";
        document.getElementsByClassName("wzg_list")[index].style.display =
          "none";
      }
    },
    // 已整改是否展开详情内容
    open(index) {
      var that = this;
      var whick = document.getElementsByClassName("wzg_list0")[index].style
        .display;
      if (whick == "none") {
        document.getElementsByClassName("jt_isup0")[index].style.transform =
          "rotateZ(0deg)";
        document.getElementsByClassName("wzg_list0")[index].style.display =
          "block";
      } else {
        document.getElementsByClassName("jt_isup0")[index].style.transform =
          "rotateZ(180deg)";
        document.getElementsByClassName("wzg_list0")[index].style.display =
          "none";
      }
    },
    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scope>
.yhxx_tit {
  display: flex;
  justify-content: space-between;
  background: #3982f6;
  height: 45px;
  color: #fff;
  line-height: 45px;
  font-size: 16px;
}
.yhxx_tit img {
  width: 25px;
  height: 25px;
  margin: 10px;
}
.tab_div {
  z-index: 1000;
  position: relative;
  background: #fff;
  transition: all 1s;
}

#yh_tabul {
  display: flex;
  width: 100%;
  color: #999;
  border-bottom: 1px solid #ddd;
  height: 37px;
}
#yh_tabul li {
  width: 50%;
  font-size: 14px;
  text-align: center;
  padding: 10px 17px 0;
}
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
#yhxx_cont {
  padding-top: 83px;
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
.wzg_lef_tit {
}
.wzg_rig_tit {
  display: flex;
  color: #999;
}
.wzg_rig_tit img {
  width: 18px;
  height: 10px;
  margin: 5px;
}
/* .zg_tit_open {
  background: url("../../assets/img/t39.png") center right no-repeat;
  background-size: 15px auto;
} */

.wzg_each_list {
  height: 30px;
  display: flex;
  align-items: center;
  font-size: 14px;
}
.wzg_list > div:nth-child(odd),
.wzg_list0 > div:nth-child(odd) {
  background-color: rgba(57, 130, 246, 0.059);
}

.select {
  background: #3982f6;
  color: #fff;
  border: 1px solid #fff;
  height: 21px;
  border-radius: 3px;
  margin: 12px 5px;
}
.select:focus {
  outline: none;
}
option {
  color: #fff;
}
.cube-btn {
  padding: 6px 1px !important;
  margin: 8px 10px !important;
  color: #fff !important;
  width: 20% !important;
  height: fit-content !important;
  background: transparent !important;
  border: 1px solid #fff !important;
  border-radius: 3px !important;
}
</style>
