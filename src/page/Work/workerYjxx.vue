<template>
    <div>
        <div style=" position: fixed;width: 100%;">
            <div class="yhdet_tit">
                <img @click="back()" src="../../assets/img/back_left.png" alt="">
                <div>预警信息</div>
            </div>
            <div class="yhxx_selet">
                <select name="" id="">
                    <option :value="item.key" v-for="(item, index) in ifcl" :key="index">{{item.value}}</option>
                </select>
                <input type="text" placeholder="请输入企业名称关键字">
                <cube-button @click="showDatePicker">{{value}}</cube-button>
            </div>
        </div>
        <div class="yhxx_content">
            <div @click="toYjxxDet(item.arm_No)" v-for="(item, index) in wzgLists" :key="index" style="margin-bottom: 10px;background-color: #fff;padding: 0 20px 15px;">
                <div class="zg_tit">
                    <div>{{item.title}}</div>
                    <div class="wzg_rig_tit">
                        <div style="color: #3982f6">{{item.iszg}}</div>
                    </div>
                </div>
                <div class="wzg_list">
                    <div class="wzg_each_list" style="color:#999;">报警分类：{{item.bjinfo}}</div>
                    <div style="font-size: 14px;line-height: 18px;padding: 10px 0;color: #666;">{{item.desc}}</div>
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
      wzgLists: [],
      ifcl: []
    };
  },
  created() {
    var that = this;
    that.value = new Date().getFullYear() + "-" + new Date().getMonth();
    api
      .findBYYJXX({ compNam: "", yeardate: "", state: "" })
      .then(function(res) {
        that.wzgLists = res.data.data.wzgLists;
        that.ifcl = res.data.data.ifcl;
      })
      .catch(function(err) {
        console.log(err);
      });
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
    // 取消按钮事件
    cancelHandle() {},
    back() {
      this.$router.go(-1);
    },
    toYjxxDet(index) {
      this.$router.push({
        path: "/workerYjxxDet",
        query: {
          armNo: index
        }
      });
    }
  }
};
</script>

<style scope>
.yhxx_selet {
  height: 20px;
  background: #fff;
  padding: 10px 0;
  display: flex;
  justify-content: space-around;
}
.yhxx_content {
  padding-top: 85px;
}

.zg_tit {
  height: 38px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
  color: #333;
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
.wzg_list > div:nth-child(odd) {
  background-color: rgba(57, 130, 246, 0.059);
}
.wzg_each_list {
  height: 30px;
  display: flex;
  align-items: center;
  font-size: 14px;
}
.cube-btn {
  padding: 3px 18px 3px 3px !important;
  color: #000 !important;
  width: 20% !important;
  height: fit-content !important;
  background: url("../../assets/img/t34.png") no-repeat !important;
  background-size: 20% 40% !important;
  background-position: center right !important;
}
</style>
