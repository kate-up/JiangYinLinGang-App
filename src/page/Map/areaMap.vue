<template>
    <div>
        <!-- 地图 -->
        <div id="tMapDiv" :style="{height: (screenHeight ) + 'px'}"></div>
        <!-- 页面 -->
        <div class="page_info" style="background: #fff;padding: 10px 0px 10px 0;">
            <div class="dt_search_div" style="margin:auto">
                <img class="dt_search_img" src="../../assets/img/dt_search.png" alt="">
                <input class="dt_search" type="text" placeholder="江苏益达化工股份有限公司" />
            </div>
        </div>
        <!-- 侧边栏按钮 -->
        <div class="sidebar" >
          <img @click="clickTheme()" src="../../assets/img/dt_zhuti.png" alt="">
          <img @click="clickWhick()" src="../../assets/img/dt_yinji.png" alt="">
        </div>
        
        <!-- 弹出底部框选择主题（企业/园区） -->
        <transition name="fade">
          <div id="themes" v-show="showThemes">
            <div @click="toQiye()">
              <img src="../../assets/img/dt_yinji_danwei.png" alt="">
              <div>企业</div>
            </div>
            <div >
              <img src="../../assets/img/dt_yinji_wz.png" alt="">
              <div class="focusWhich">园区</div>
            </div>
          </div>
        </transition>
        <!-- 弹出底部框选择小主题（基本信息/隐患等） -->
        <transition name="fade">
          <div id="whichs" v-if="isSshow">
            <div id="qiye" class="focusWhich" @click="isshowFhmb()">
              <img src="../../assets/img/dt_yinji_danwei.png" alt="">
              <div>企业</div>
            </div>
            <div id="qiye1" @click="toYjwz()">
              <img src="../../assets/img/dt_yinji_wz.png" alt="">
              <div>应急物资</div>
            </div>
            <div id="qiye2" @click="toYjdw()">
              <img src="../../assets/img/dt_yinji_fanhu.png" alt="">
              <div>应急单位</div>
            </div>
            <div id="qiye3" @click="toYjsj()">
              <img src="../../assets/img/dt_yinji_shijian.png" alt="">
              <div>应急事件</div>
            </div>
          </div>
        </transition>
        <!-- 展示应急单位详情 -->
        <transition name="fade">
          <div id="yjdw_fade">
            <div id="fhmb0"  v-if="showFhmb">
              
                <!-- <div style="font-size: 16px;color:#333;padding-top:10px;">江阴市第三实验小学</div> -->
                <!-- <div>江苏省无锡市石庄镇新街77号</div> -->
                <!-- <div style="padding-bottom:10px;">联系人及电话：张力（0510）86669632</div> -->

              <div id="cont_wxhxp">
                <div class="dt_up_img" @click="isOpendet()"><img src="../../assets/img/dt_zdwx1.png" alt=""></div>
                <div class="ryxx_conpy0" style="">{{yjdwLists.conpy}}</div>
                <ul class="ul_maxheight" >
                  <li class="zdwxy_li" v-for="(item, index) in yjdwLists.lists" :key="index">
                    <div>{{item.name}}</div>
                    <div>{{item.risk}}</div>
                    <!-- <img :src="item.risk == 0 ? '/static/img/dt_fenqu0.png' : item.risk == 1 ? '/static/img/dt_fenqu1.png' : '/static/img/dt_fenqu2.png'" style="height:18px;" alt=""> -->
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </transition>
        <!-- 展示应急事件详情 -->
        <transition name="fade">
          <div id="yjdw_fade">
            <div id="cont_wxhxp" v-if="showYjsj">
              <div class="dt_up_img" @click="isOpendet()"><img src="../../assets/img/dt_zdwx1.png" alt=""></div>
              <div class="ryxx_conpy">{{yjsjLists.conpy}}</div>
              <ul class="ul_maxheight" >
                <li class="zdwxy_li" v-for="(item, index) in yjsjLists.lists" :key="index">
                  <div>{{item.name}}</div>
                  <div>{{item.risk}}</div>
                  <!-- <img :src="item.risk == 0 ? '/static/img/dt_fenqu0.png' : item.risk == 1 ? '/static/img/dt_fenqu1.png' : '/static/img/dt_fenqu2.png'" style="height:18px;" alt=""> -->
                </li>
              </ul>
            </div>
          </div>
        </transition>
        <!-- 底部栏 -->
        <TabBar :idx = 0 />
    </div>
</template>

<script>
import TabBar from "@/components/TabBar";
import api from "@/api/api.js";

var map, markerclick;
var app = null;
var AllMarkers = "";
var yjdwMarkers = "";
var yjwzMarkers = "";
var yjsjMarkers = "";

export default {
  components: { TabBar },
  data() {
    return {
      yjdwLists: {
        conpy: "璜土医院",
        lists: [
          { name: "单位类型", risk: "医院" },
          { name: "防护等级", risk: "二级" },
          { name: "主管部门", risk: "" },
          { name: "负责人", risk: "银波器" },
          { name: "负责人电话", risk: "（0519）6651025" },
          { name: "地址", risk: "璜土镇万安路93号" }
        ]
      },
      yjsjLists: {
        conpy: "应急事件测试",
        lists: [
          { name: "事件地点", risk: "应急事件测试2" },
          { name: "发生时间", risk: "	2020-05-05" },
          { name: "事件类型:", risk: "山体滑坡" },
          { name: "事件等级", risk: "一般" },
          { name: "上报人", risk: "	" },
          { name: "上报时间", risk: "	2020-05-05" },
          { name: "联系电话", risk: "15954265874" }
        ]
      },
      marks: "",
      result: "",
      yjdwMark: "",
      yjwzMark: "",
      yjsjMark: "",
      deg: 0,
      isSshow: false,
      showThemes: false,
      showFhmb: false,
      showYjsj: false,
      screenHeight:
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight
    };
  },
  created() {
    app = this;
  },
  mounted() {
    // 初始化添加地图图层
    loadMap();
  },
  methods: {
    loadEntprBoundary() {
      var that = this;
      // 企业建筑点标记
      api
        .geo()
        .then(function(res) {
          that.marks = res.data;
          console.log(that.marks);
          api
            .loadEntprBoundary()
            .then(function(res) {
              that.result = res.data;
              console.log(that.result);
              drawPolygon();
              that.toAllQy();
            })
            .catch(function(err) {
              console.log(err);
            });
        })
        .catch(function(err) {
          console.log(err);
        });
      // 应急单位
      api.findYJDWList().then(function(res) {
        console.log(res.data);
        that.yjdwMark = res.data;
      });
    },
    // 公司点标记跳转
    MapClick(content, e) {
      this.$router.push({
        path: "/map",
        query: {
          id: content
        }
      });
    },
    // 应急物资标记跳转
    MapClick1(content, e) {
      console.log(e);
      this.$router.push({
        path: "/supplies",
        query: {
          id: content
        }
      });
    },
    // 应急单位标记跳转
    MapClick2(content, e) {
      this.showFhmb = true;
      this.isSshow = false;
      this.showThemes = false;
      this.showYjsj = false;
      // console.log(content);
      // console.log(e);
      // this.$router.push({
      //   path: "/unitdet",
      //   query: {
      //     id: content
      //   }
      // });
    },
    // 应急事件标记跳转
    MapClick3(content, e) {
      this.showYjsj = true;
      this.showFhmb = false;
      this.isSshow = false;
      this.showThemes = false;
      console.log(content);
      console.log(e);
      // this.$router.push({
      //   path: "/eventdet",
      //   query: {
      //     id: content
      //   }
      // });
    },
    toQiye() {
      this.$router.push({
        path: "/map"
      });
    },
    // 展示 企业 点标记
    toAllQy() {
      // 企业建筑点标记
      if (yjdwMarkers.length != 0) {
        for (var i = 0; i < yjdwMarkers.length; i++) {
          map.removeOverLay(yjdwMarkers[i]);
        }
      }
      if (yjwzMarkers.length != 0) {
        for (var i = 0; i < yjwzMarkers.length; i++) {
          map.removeOverLay(yjwzMarkers[i]);
        }
      }
      if (yjsjMarkers.length != 0) {
        for (var i = 0; i < yjsjMarkers.length; i++) {
          map.removeOverLay(yjsjMarkers[i]);
        }
      }
      AllMarkers = new Array();
      for (var a = 0; a < app.marks.features.length; a++) {
        var arrList = app.marks.features[a].geometry.coordinates;
        var content = app.marks.features[a].properties.id;
        var marker = new T.Marker(new T.LngLat(arrList[0], arrList[1])); // 创建标注
        map.addOverLay(marker);
        AllMarkers.push(marker);
        addMapClick(content, marker);
      }
    },
    // 展示 应急单位 点标记
    toYjdw() {
      document.getElementById("qiye2").style.color = "#4e84f2"
      document.getElementById("qiye").style.color = "#000"
      document.getElementById("qiye1").style.color = "#000"
      document.getElementById("qiye3").style.color = "#000"
      var that = this;
      if (AllMarkers.length != 0) {
        for (var i = 0; i < AllMarkers.length; i++) {
          map.removeOverLay(AllMarkers[i]);
        }
      }
      if (yjwzMarkers.length != 0) {
        for (var i = 0; i < yjwzMarkers.length; i++) {
          map.removeOverLay(yjwzMarkers[i]);
        }
      }
      if (yjsjMarkers.length != 0) {
        for (var i = 0; i < yjsjMarkers.length; i++) {
          map.removeOverLay(yjsjMarkers[i]);
        }
      }
      yjdwMarkers = new Array();
      for (var b = 0; b < that.yjdwMark.length; b++) {
        var arrList1 = that.yjdwMark[b].geometry.coordinates;
        var content1 = that.yjdwMark[b].properties.id;
        var marker1 = new T.Marker(new T.LngLat(arrList1[0], arrList1[1])); // 创建标注
        map.addOverLay(marker1);
        yjdwMarkers.push(marker1);
        addMapClick2(content1, marker1);
      }
      // this.$router.push({
      //   path: "/unitdet"
      // });
    },
    // 展示 应急物资 点标记
    toYjwz() {
      document.getElementById("qiye1").style.color = "#4e84f2"
      document.getElementById("qiye").style.color = "#000"
      document.getElementById("qiye2").style.color = "#000"
      document.getElementById("qiye3").style.color = "#000"
      var that = this;
      if (AllMarkers.length != 0) {
        for (var i = 0; i < AllMarkers.length; i++) {
          map.removeOverLay(AllMarkers[i]);
        }
      }
      if (yjdwMarkers.length != 0) {
        for (var i = 0; i < yjdwMarkers.length; i++) {
          map.removeOverLay(yjdwMarkers[i]);
        }
      }
      if (yjsjMarkers.length != 0) {
        for (var i = 0; i < yjsjMarkers.length; i++) {
          map.removeOverLay(yjsjMarkers[i]);
        }
      }
      yjwzMarkers = new Array();
      api.suppliesgeo().then(function(res) {
        that.yjwzMark = res.data.features;
        console.log(that.yjwzMark);
        for (var b = 0; b < that.yjwzMark.length; b++) {
          var res1 = that.yjwzMark[b].properties;
          var arrList1 = that.yjwzMark[b].geometry.coordinates;
          var content1 = that.yjwzMark[b].properties.id;
          var marker1 = new T.Marker(new T.LngLat(arrList1[0], arrList1[1])); // 创建标注
          map.addOverLay(marker1);
          yjwzMarkers.push(marker1);
          addMapClick1(content1, marker1);
        }
      });
      // this.$router.push({
      //   path: "/supplies"
      // });
    },
    // 应急事件 点击事件
    toYjsj() {
      document.getElementById("qiye3").style.color = "#4e84f2"
      document.getElementById("qiye").style.color = "#000"
      document.getElementById("qiye1").style.color = "#000"
      document.getElementById("qiye2").style.color = "#000"
      var that = this;
      if (AllMarkers.length != 0) {
        for (var i = 0; i < AllMarkers.length; i++) {
          map.removeOverLay(AllMarkers[i]);
        }
      }
      if (yjdwMarkers.length != 0) {
        for (var i = 0; i < yjdwMarkers.length; i++) {
          map.removeOverLay(yjdwMarkers[i]);
        }
      }
      if (yjwzMarkers.length != 0) {
        for (var i = 0; i < yjwzMarkers.length; i++) {
          map.removeOverLay(yjwzMarkers[i]);
        }
      }
      yjsjMarkers = new Array();
      api.ssmEventsgeo().then(function(res) {
        that.yjsjMark = res.data.features;
        console.log(that.yjsjMark);
        for (var b = 0; b < that.yjsjMark.length; b++) {
          var arrList1 = that.yjsjMark[b].geometry.coordinates;
          var content1 = that.yjsjMark[b].properties.id;
          var marker1 = new T.Marker(new T.LngLat(arrList1[0], arrList1[1])); // 创建标注
          map.addOverLay(marker1);
          yjsjMarkers.push(marker1);
          console.log();
          addMapClick3(content1, marker1);
        }
      });
      // this.$router.push({
      //   path: "/eventdet"
      // });
    },
    // 展示企业/园区选择
    clickTheme() {
      this.showThemes = !this.showThemes;
      // this.showThemes = true;
      this.showFhmb = false;
      this.isSshow = false;
      this.showYjsj = false;
    },
    // 展示预警信息选择
    clickWhick() {
      this.isSshow = !this.isSshow;
      // this.isSshow = true;
      this.showFhmb = false;
      this.showThemes = false;
      this.showYjsj = false;
    },
    // 企业 弹出框
    isshowFhmb() {
      document.getElementById("qiye").style.color = "#4e84f2"
      document.getElementById("qiye1").style.color = "#000"
      document.getElementById("qiye2").style.color = "#000"
      document.getElementById("qiye3").style.color = "#000"
      this.loadEntprBoundary();
    },
    isOpendet() {
      api.keyProtectgeo().then(function(res) {
        console.log(res.data);
      });
      var rightdown = document.getElementById("cont_jbxx").style.display;
      if (rightdown == "none") {
        $("#cont_jbxx").slideDown();
        this.deg = 0;
      } else {
        this.deg = 180;
        $("#cont_jbxx").slideUp(500, "swing", function() {});
      }
    }
  }
};

function loadMap() {
  map = new T.Map("tMapDiv");
  map.centerAndZoom(new T.LngLat(120.05919, 31.9404), 12);
  app.loadEntprBoundary();
}

// 加载企业边界
function drawPolygon() {
  for (var i = 0; i < app.result.features.length; i++) {
    var listarr = app.result.features[i].geometry.coordinates;
    var points = [];
    for (var j = 0; j < listarr[0].length; j++) {
      points.push(new T.LngLat(listarr[0][j][0], listarr[0][j][1]));
    }
    var polygon = new T.Polygon(points, {
      color: "blue",
      weight: 1.5,
      opacity: 0.5,
      fillColor: "#FFFFFF",
      fillOpacity: 0.5
    });
    //向地图上添加面
    map.addOverLay(polygon);
  }
}

// 企业点 marker点击事件1
function addMapClick(content, marker) {
  removeMapClick();
  marker.addEventListener("click", function(e) {
    app.MapClick(content, e);
  });
}
// 应急物资 marker点击事件2
function addMapClick1(content1, marker1, arrList1) {
  removeMapClick();
  marker1.addEventListener("click", function(e) {
    app.MapClick1(content1, e, arrList1);
  });
}
// 应急单位marker点击事件2
function addMapClick2(content1, marker1) {
  removeMapClick();
  marker1.addEventListener("click", function(e) {
    app.MapClick2(content1, e);
  });
}
// 应急事件 marker点击事件2
function addMapClick3(content1, marker1) {
  removeMapClick();
  marker1.addEventListener("click", function(e) {
    app.MapClick3(content1, e);
  });
}
// 清除marker点击事件
function removeMapClick() {
  map.removeEventListener("click", function(e) {
    // app.MapClick(content, e);
  });
}
</script>


<style scope>
#cont_wxhxp {
  height: fit-content;
  display: block;
  padding-bottom: 15px;
  transition: all 1s;
}
#tMapDiv {
  width: 100%;
  position: absolute;
}
.tdt-bottom .tdt-left {
  display: none;
  visibility: hidden;
}
.page_info {
  position: relative;
  z-index: 1000;
}

.dt_search {
  background: #f6f6f6;
  color: #aaa;
  width: 100%;
}
.dt_search:-moz-placeholder {
  color: #aaa;
}
.dt_search::-webkit-input-placeholder {
  color: #aaa;
}
.dt_search_div {
  width: 62%;
  display: flex;
  background: #f6f6f6;
  border-radius: 13.5px;
  padding: 6px 20px 6px 60px;
}
.dt_search_img {
  width: 15px;
  height: 15px;
  margin-right: 6px;
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
  margin: 10px auto 0;
}
.sidebar {
  position: absolute;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  width: 35px;
  left: 85%;
  top: 110px;
}
.sidebar img {
  width: 35px;
  height: 35px;
  margin: 5px;
  cursor: pointer;
}
#copyinfo {
  display: flex;
  justify-content: space-between;
}
#copyinfo li {
  width: 33%;
  text-align: center;
  margin: 13px 0;
}
#copyinfo li div:first-child,
.jbxx_gray_tit {
  color: #9d9d9d;
  padding-bottom: 8px;
}
#copyinfo li:first-child div:last-child {
  color: #4e84f2;
}
#copyinfo li + li {
  border-left: 1px solid #ddd;
}
.copy_info {
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
}
.copy_info_tit,
.copy_info_tit0 {
  color: #4ed3dc;
  background: #ecfafb;
  writing-mode: tb-rl;
  padding: 15px 3px;
  margin-right: 6px;
  font-size: 13px;
  text-align: center;
}
.copy_info_tit0 {
  color: #5293ff;
  background: #f4f8ff;
  margin: 0 6px;
}
.copy_intr {
  padding: 0 13px;
  background: #f9f9f9;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
}
.bg_tit {
  color: #fff;
  background: #8fbaff;
  padding: 5px 8px;
  border-radius: 5px;
  font-size: 14px;
}
.sm_tit {
  color: #4b8ffd;
  line-height: 32px;
  padding-left: 13px;
  font-size: 15px;
}
.jbxx_phone {
  color: #8c8c8c;
  font-size: 13px;
}
.jbxx_phone img {
  margin-right: 8px;
  width: 15px;
  vertical-align: middle;
}
.jbxx_qydz {
  border-bottom: 1px solid #ccc;
  margin: 10px 15px;
  line-height: 26px;
  padding: 5px 0;
}
.degnji {
  display: flex;
  justify-content: space-between;
  padding: 0 15px;
}
.degnji0 {
  border-right: 1px solid #ddd;
  width: 50%;
}
.degnji1 {
  width: 50%;
  padding-left: 15px;
}
#whichs,
#themes,
#yjdw_fade {
  position: absolute;
  z-index: 1000;
  bottom: 50px;
  width: 100%;
  background: #fff;
  display: flex;
  justify-content: space-between;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  transition: all 2s;
}
#fhmb0 {
  flex-direction: column;
  width: 100%;
}
#fhmb0 div {
  font-size: 14px;
  color: #999;
  line-height: 28px;
}
#whichs > div,
#themes > div {
  width: 25%;
  text-align: center;
  padding: 20px 0;
  font-size: 14px;
}
#whichs > div img,
#themes img {
  width: 30px;
}
#yjdw_fade > div {
  width: 100%;
}
.focusWhich {
  color: #4e84f2;
}
.tobotinfo,
.tabinfo_zdwxy,
.tabinfo_wxhxp,
.tabinfo_wxhggz,
.tabinfo_tzzy,
.tabinfo_ryxx {
  height: fit-content;
  position: absolute;
  z-index: 1000;
  background: #fff;
  width: 95%;
  margin-left: 2.5%;
  bottom: 50px;
  border-radius: 10px;
  /* padding-bottom: 10px; */
  font-size: 13px;
}
#themes > div {
  width: 50%;
}
.dt_up_img {
  text-align: center;
  padding: 10px;
}
.dt_up_img img {
  width: 22px;
}
/* #cont_jbxx,
#cont_zdwxy,
#cont_wxhxp,
#cont_wxhggy,
#cont_tzzy {
  height: fit-content;
  display: block;
  padding-bottom: 15px;
  transition: all 1s;
} */
.copy_box {
  font-weight: bold;
  font-size: 18px;
  text-align: center;
}
.conpy_tit {
  width: fit-content;
  display: flex;
  margin: auto;
  font-size: 16px;
}
.conpy_tit img {
  height: 22px;
  margin: auto 10px;
}
.zdwxy_li {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
  margin: 0 15px;
}
.tzzy_li {
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
  margin: 0 15px;
}
.tzzy_smtit {
  font-weight: bold;
  font-size: 15px;
  line-height: 30px;
}
.tzzy_gray_smtit {
  color: #555;
  font-size: 14px;
  line-height: 27px;
}
.ryxx_li {
  display: flex;
  justify-content: space-between;
  margin: 0 15px;
  padding: 8px 0;
  font-size: 14px;
}
.ryxx_li img {
  height: 18px;
}
.ryxx_ul li + li {
  border-top: 1px solid #ddd;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.ryxx_conpy {
  width: fit-content;
  font-size: 17px;
  font-weight: bold;
  padding-bottom: 10px;
  margin: 0;
  padding-top: 15px;
  text-align: center;
}
.ryxx_conpy0 {
  width: fit-content;
  font-size: 17px;
  font-weight: bold;
  padding-bottom: 10px;
  margin: 0;
  padding-top: 15px;
  text-indent: 2rem;
  font-weight: bold;
  text-align: center;
}

.fixedheight {
  height: 100px !important;
}
.ul_maxheight {
  font-size: 13px;
  max-height: 400px;
  overflow-y: scroll;
}
.dt_up_img {
  text-align: center;
  padding: 10px;
}
.dt_up_img img {
  width: 22px;
}
</style>
