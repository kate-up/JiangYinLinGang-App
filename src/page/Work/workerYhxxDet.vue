<template>
    <div>
        <div style=" position: fixed;width: 100%;">
            <div class="yhdet_tit">
                <img @click="back()" src="../../assets/img/back_left.png" alt="">
                <div>隐患信息详情</div>
            </div>
        </div>
        <div id="yhxx_cont0" >
            <!-- 未整改 -->
            <div>
                <div v-for="(item, index) in wzgLists" :key="index" style="margin-bottom: 10px;background-color: #fff;padding: 0 20px 15px;">
                    <div class="zg_tit zg_tit_open">
                        <div class="wzg_lef_tit">{{item.title}}</div>
                    </div>
                    <div class="wzg_list">
                        <div  v-for="(these,index) in item.info" :key="index">
                            <div class="wzg_each_list">
                                <div class="each_zg_tit">{{these.tit}}</div>
                                <div class="each_zg_con">{{these.cont}}</div>
                            </div>
                        </div>
                    </div>
                    <img v-if="item.pic" src="../../assets/img/gz_lead_8.png" alt="">
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
      wzgLists: [
        {
          title: "基本信息",
          info: [
            { tit: "检查标题", cont: "江苏益达化学股份有限公司..." },
            { tit: "检查类型", cont: "综合安全检查" },
            { tit: "企业名称", cont: "江苏益达化学股份有限公司" },
            { tit: "检查区域", cont: "车间" }
          ],
          pic: false
        },
        {
          title: "检查信息",
          info: [
            { tit: "检查人员", cont: "张峰" },
            { tit: "检查日期", cont: "2019-04-28" },
            { tit: "检查项目", cont: "xxx检查项目" },
            { tit: "检查结论", cont: "异常" },
            { tit: "检查级别", cont: "一般隐患" },
            { tit: "问题描述", cont: "xxx问题描述" },
            { tit: "整改方式", cont: "整改通知" },
            { tit: "整改人员", cont: "安环部-张杰" }
          ],
          pic: true
        },
        {
          title: "整改信息",
          info: [
            { tit: "整改状态", cont: "已整改..." },
            { tit: "整改完成日期", cont: "2020-04-09" },
            { tit: "整改人", cont: "安环部-张杰" },
            { tit: "整改措施", cont: "xxxx" }
          ],
          pic: false
        }
      ]
    };
  },
  created() {
    var that = this;
    api.findYHXQ({ modify_no: 3 }).then(function(res) {
      console.log(res.data.data.wzgLists);
      that.wzgLists = res.data.data.wzgLists;
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
