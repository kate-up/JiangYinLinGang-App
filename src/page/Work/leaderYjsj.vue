<template>
    <div>
        <div style=" position: fixed;width: 100%;">
            <div class="yhdet_tit">
                <img @click="back()" src="../../assets/img/back_left.png" alt="">
                <div>应急事件记录</div>
            </div>
            <div class="yhxx_selet">
                <select name="" id="">
                    <option :value="item.key" v-for="(item, index) in ifcz" :key="index">{{item.value}}</option>
                </select>
                <input type="text" placeholder="请输入企业名称关键字">
                <cube-button @click="showDatePicker">{{value}}</cube-button>
            </div>
        </div>
        <div class="yhxx_content">
            <div @click="toYjsjdet(index)" v-for="(item, index) in wzgLists" :key="index" style="margin-bottom: 10px;background-color: #fff;padding: 0 20px 15px;">
                <div class="zg_tit">
                    <div>{{item.title}}</div>
                    <div class="wzg_rig_tit">
                        <div style="color: #3982f6">{{item.iszg}}</div>
                    </div>
                </div>
                <div class="wzg_list">
                    <div class="wzg_each_list">
                        <div class="each_zg_tit">上报人员：{{item.bjinfo}}</div>
                    </div>
                    <div style="font-size: 14px;line-height: 18px;padding: 10px 0;color: #666;">发生时间：{{item.desc}}</div>
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
      ifcz: [],
      wzgLists: [
        {
          iszg: "未处置",
          title: "江苏益达化学股份有限公司",
          bjinfo: "马玲",
          desc: "2019-04-26"
        },
        {
          iszg: "已处置",
          title: "江苏益达化学股份有限公司",
          bjinfo: "胡家福",
          desc: "2019-04-26"
        }
      ]
    };
  },
  created() {
    var that = this;
    that.value = new Date().getFullYear() + "-" + new Date().getMonth();
    api.findYJSJLIST().then(function(res) {
      console.log(res);
      that.wzgLists = res.data.data.wzgLists;
      that.ifcz = res.data.data.ifcz;
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
    back() {
      this.$router.go(-1);
    },
    toYjsjdet(index) {
      this.$router.push({
        path: "/leaderYjsjDet"
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
</style>
