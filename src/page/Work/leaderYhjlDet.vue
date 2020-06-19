<template>
    <div>
        <div style=" position: fixed;width: 100%;">
            <div class="yhdet_tit">
                <img @click="back()" src="../../assets/img/back_left.png" alt="">
                <div>隐患记录详情</div>
            </div>
        </div>

        <div id="yhxx_cont0" >
            <div v-for="(item, index) in yhjlLists" :key="index" style="margin-bottom: 10px;background-color: #fff;padding: 0 20px 15px;">
                <div class="zg_tit zg_tit_open">
                    <div class="wzg_lef_tit">{{item.title}}</div>
                </div>
                <div v-if="item.str" style="font-size:12px;padding-bottom:10px;">{{item.str}}</div>
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
    </div>
</template>

<script>
import api from "@/api/api.js";
export default {
  data() {
    return {
      no: "",
      yhjlLists: []
    };
  },
  created() {
    var that = this;
    this.no = this.$route.query.no;
    api
      .findyhjlleadListsDet({ modifyNo: this.no })
      .then(function(res) {
        that.yhjlLists = res.data.dataList;
        console.log(res);
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
</style>
