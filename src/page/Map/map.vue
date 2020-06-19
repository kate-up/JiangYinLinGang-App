<template>
    <div>
        <!-- 地图 -->
        <div id="tMapDiv" :style="{height: (screenHeight ) + 'px'}"></div>
        <!-- 页面 -->
        <div class="page_info">
          <div class="page_tit">
            <img @click="back()" class="dt_backimg" src="../../assets/img/dt_yj_back.png" alt="">
            <div class="dt_search_div">
              <img class="dt_search_img" src="../../assets/img/dt_search.png" alt="">
              <input class="dt_search" type="text" placeholder="江苏益达化工股份有限公司" />
            </div>
          </div>
        </div>
        <!-- tab切换 -->
        <transition name="fade">
          <div v-if="isTabShow" class="tab_div">
            <div class="tab_indiv">
              <ul id="tabul">
                <li  @click="chgTab(index)" v-for="(item, index) in tabLists" :key="index">{{item}}</li>
              </ul>
            </div>
          </div>
        </transition>
        <!-- 侧边栏按钮 -->
        <div class="sidebar" >
          <img @click="clickTheme()" src="../../assets/img/dt_zhuti.png" alt="">
          <!-- <img @click="clickWhick()" src="../../assets/img/dt_yinji.png" alt=""> -->
        </div>
        <!-- 弹出底部框选择小主题（基本信息/隐患等） -->
        <transition name="fade">
          <div v-if="isSshow" id="whichs">
            <div @click="toYjdw()">
              <img src="../../assets/img/dt_yinji_danwei.png" alt="">
              <div class="focusWhich">应急单位</div>
            </div>
            <div @click="toYjwz()">
              <img src="../../assets/img/dt_yinji_wz.png" alt="">
              <div>应急物资</div>
            </div>
            <div>
              <img src="../../assets/img/dt_yinji_fanhu.png" alt="">
              <div>防护目标</div>
            </div>
            <div @click="toYjsj()">
              <img src="../../assets/img/dt_yinji_shijian.png" alt="">
              <div>应急事件</div>
            </div>
          </div>
        </transition>
        <!-- 弹出底部框选择主题（企业/园区） -->
        <transition name="fade">
          <div id="themes" v-if="showThemes">
            <div>
              <img src="../../assets/img/dt_yinji_danwei.png" alt="">
              <div class="focusWhich">企业</div>
            </div>
            <div @click="toareamap()">
              <img src="../../assets/img/dt_yinji_wz.png" alt="">
              <div>园区</div>
            </div>
          </div>
        </transition>
        <div id="allboxs">
          <!-- 弹出的底部信息框 基本信息-->
          <transition name="fade">
            <div v-if="isJbxx0" class="tobotinfo">
              <!-- 上滑箭头 -->
              <div class="dt_up_img" @click="isOpendet($event)"><img :style="{transform:'rotateZ('+deg+'deg)'}" src="../../assets/img/dt_zdwx1.png" alt=""></div>
              <div id="cont_jbxx" >
                <!-- 公司名称 -->
                <div class="copy_box">
                  <div class="conpy_tit">{{jbxxList.conpy}}<img v-show="jbxxList.isWarn" src="../../assets/img/dt_jb6.png" /></div>
                </div>
                <!-- 企业基本信息 -->
                <ul id="copyinfo">
                  <li v-if="item.info" v-for="(item, index) in jbxxList.jbxxInfo" :key="index">
                    <div>{{item.smtit}}</div>
                    <div>{{item.info}}</div>
                  </li>
                </ul>
                <!-- 企业人员信息 -->
                <div class="copy_info">
                    <div v-if="jbxxList.sbr.name" class="copy_info_tit">上报人</div>
                    <div v-if="jbxxList.sbr.name" class="copy_intr">
                        <div style="display:flex;">
                            <div class="bg_tit">{{ editName(jbxxList.sbr.name) }}</div>
                            <div class="sm_tit">{{jbxxList.sbr.name}}</div>
                        </div>
                        <div class="jbxx_phone"><img src="../../assets/img/dt_jb5.png" />{{jbxxList.sbr.phon}}</div>
                    </div>
                    <div v-if="jbxxList.sggk.name" class="copy_info_tit0">事故概况</div>
                    <div v-if="jbxxList.sbr.name" class="copy_intr">
                        <div style="display:flex;">
                            <div class="bg_tit">{{ editName(jbxxList.sggk.name) }}</div>
                            <div class="sm_tit">{{jbxxList.sggk.name}}</div>
                        </div>
                        <div class="jbxx_phone"><img src="../../assets/img/dt_jb5.png" />{{jbxxList.sggk.phon}}</div>
                    </div>
                </div>
                <!-- 企业地址 -->
                <div style="">
                  <div class="jbxx_qydz">
                    <div class="jbxx_gray_tit">企业地址</div>
                    <div>{{jbxxList.qydz}}</div>
                  </div>
                  <div class="degnji">
                    <div class="degnji0">
                      <div class="jbxx_gray_tit">重大危险源最高等级</div>
                      <div>{{jbxxList.warnLeve}}</div>
                    </div>
                    <div class="degnji1">
                      <div class="jbxx_gray_tit">安全标准化等级</div>
                      <div>{{jbxxList.safeLeve}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </transition>
          <!-- 人员信息 -->
          <transition name="fade">
            <div v-if="isJbxx1" class="tabinfo_ryxx" >
              <div class="dt_up_img" @click="isOpendet($event)"><img src="../../assets/img/dt_zdwx1.png" alt=""></div>
              <div style="padding-bottom: 10px;">
                <div class="ryxx_conpy">{{ryxxList.conpy}}</div>
                <ul class="ryxx_ul">
                  <li class="ryxx_li" v-for="(item, index) in ryxxList.personList" :key="index">
                    <div style="width:20%">{{item.name}}</div>
                    <div style="width:39%">{{item.phone ? item.phone : "15951267167"}}</div>
                    <div style="width:27%">{{item.job}}</div>
                    <div style="width:14%; text-align:right;">
                      <img v-if="item.state" src="../../assets/img/dt_renyuan1.png" alt="">
                      <img v-else src="../../assets/img/dt_renyuan0.png" alt="">
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </transition>
          <!-- 分区信息 -->
          <!-- <transition name="fade">
            <div v-if="isJbxx2" class="tabinfo_wxhxp">
              <div class="dt_up_img" @click="isOpendet()"><img  src="../../assets/img/dt_zdwx1.png" alt=""></div>
              <div id="cont_wxhxp">
                <div class="ryxx_conpy">{{fqxxLists.conpy}}</div>
                <ul class="ul_maxheight" >
                  <li class="zdwxy_li" v-for="(item, index) in fqxxLists.lists" :key="index">
                    <div>{{item.name}}</div>
                    <img :src="item.risk == 0 ? '/static/img/dt_fenqu0.png' : item.risk == 1 ? '/static/img/dt_fenqu1.png' : '/static/img/dt_fenqu2.png'" style="height:18px;" alt="">
                  </li>
                </ul>
              </div>
            </div>
          </transition> -->
          <!-- 危险化学品 -->
          <transition name="fade">
            <div v-if="isJbxx2" class="tabinfo_wxhxp">
              <div class="dt_up_img" @click="isOpendet($event)"><img  src="../../assets/img/dt_zdwx1.png" alt=""></div>
              <div id="cont_wxhxp">
                <div class="ryxx_conpy">{{wxhxpList.conpy}}</div>
                <ul class="ul_maxheight">
                  <li class="zdwxy_li" v-for="(item, index) in wxhxpList.lists" :key="index">
                    <div>{{item.chemicals}}</div>
                    <img v-show="item.isWarn" style="height:18px;" src="../../assets/img/dt_wxhxp0.png" alt="">
                  </li>
                </ul>
              </div>
            </div>
          </transition>
          <!-- 危险化工工艺信息 -->
          <transition name="fade">
            <div v-if="isJbxx3" class="tabinfo_wxhggz">
              <div class="dt_up_img" @click="isOpendet($event)"><img  src="../../assets/img/dt_zdwx1.png" alt=""></div>
              <div id="cont_wxhggy">
                <div class="ryxx_conpy">{{wxhggzList.conpy}}</div>
                <ul class="ul_maxheight">
                  <li class="zdwxy_li" v-for="(item, index) in wxhggzList.lists" :key="index">
                    <div>
                      <div>{{item.process}}</div>
                      <div>{{item.qu}}</div>
                    </div>
                    <div style="width:50%;text-align:right;">
                      <div>{{item.type}}</div>
                      <img v-show="item.isWarn" style="height:18px;" src="../../assets/img/dt_wxhxp0.png" alt="">
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </transition>
          <!-- 重大危险源 -->
          <transition name="fade">
            <div v-if="isJbxx4" class="tabinfo_zdwxy">
              <div class="dt_up_img" @click="isOpendet($event)"><img src="../../assets/img/dt_zdwx1.png" alt=""></div>
              <div id="cont_zdwxy">
                <div class="ryxx_conpy">{{zdwxyList.conpy}}</div>
                <ul class="ul_maxheight">
                  <li class="zdwxy_li" v-for="(item, index) in zdwxyList.lists" :key="index">
                    <div>
                      <p style="line-height: 24px;">{{item.qu}}</p>
                      <p style="color:#aaa;">{{item.guan}}</p>
                    </div>
                    <div>{{item.jibie}}</div>
                  </li>
                </ul>
              </div>
            </div>
          </transition>
          <!-- 特种作业 -->
          <transition name="fade">
            <div v-if="isJbxx5" class="tabinfo_tzzy">
              <div class="dt_up_img" @click="isOpendet($event)"><img src="../../assets/img/dt_zdwx1.png" alt=""></div>
              <div id="cont_tzzy">
                <div class="ryxx_conpy">{{tzzyList.conpy}}</div>
                <ul class="ul_maxheight" style="font-size:13px; transition: all .7s ease-in" >
                  <li class="tzzy_li" v-for="(item, index) in tzzyList.lists" :key="index">
                    <div style="display:flex;justify-content:space-between;">
                      <div class="tzzy_smtit">{{item.workname}}</div>
                      <div class="tzzy_gray_smtit">{{item.name}}</div>
                    </div>
                    <div class="tzzy_gray_smtit">{{item.time}}</div>
                  </li>
                </ul>
              </div>
            </div>
          </transition>
        </div>
        <!-- 底部栏 -->
        <TabBar :idx = 0 />
    </div>
</template>

<script>
import TabBar from "@/components/TabBar";
import api from "@/api/api.js";

export default {
  components: { TabBar },
  data() {
    return {
      isJbxx0: true,
      isJbxx1: false,
      isJbxx2: false,
      isJbxx3: false,
      isJbxx4: false,
      isJbxx5: false,
      isJbxx6: false,
      isTabShow: true,
      isSshow: false,
      showThemes: false,
      screenHeight:
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight,
      conpyId: "", // 上个页面传来的公司id值
      deg: 0,
      tabLists: [
        "基本信息",
        "人员信息",
        // "分区信息",
        "危险化学品",
        "危险化工工艺信息",
        "重大危险源",
        "特种作业"
      ],
      // 基本信息
      jbxxList: {
        conpy: "江苏益达化工股份有限公司",
        isWarn: true,
        jbxxInfo: [
          { smtit: "法定代表人", info: "刘淮" },
          { smtit: "企业类型", info: "化工企业" },
          { smtit: "成立时间", info: "202-04-01" }
        ],
        sbr: { name: "张力", phon: "15951263678" },
        sggk: { name: "刘苏", phon: "18964785124" },
        qydz: "江苏省江阴市西石桥球庄1号",
        warnLeve: "三级",
        safeLeve: "三级"
      },
      // 重大危险源
      zdwxyList: {
        conpy: "江苏益达化工股份有限公司",
        lists: [
          { qu: "环氧丙烷灌区", guan: "储罐区（储罐）", jibie: "二级" },
          { qu: "环氧丙烷灌区", guan: "储罐区（储罐）", jibie: "二级" }
        ]
      },
      // 危险化学品
      wxhxpList: {
        conpy: "江苏益达化工股份有限公司",
        lists: [
          { chemicals: "乙二醇甲醇", isWarn: true },
          { chemicals: "氢氧化钾", isWarn: false }
        ]
      },
      // 危险化工工艺
      wxhggzList: {
        conpy: "江苏益达化工股份有限公司",
        lists: [
          {
            process: "指合成工艺",
            qu: "喜鹊岗作业区",
            type: "温度",
            isWarn: true
          },
          {
            process: "醚合成工艺",
            qu: "喜鹊岗作业区",
            type: "压力",
            isWarn: false
          }
        ]
      },
      // 人员信息
      ryxxList: {
        conpy: "江苏益达化工股份有限公司",
        personList: [
          { name: "刘淮", phone: "15829877389", job: "董事长", state: true },
          { name: "张丹", phone: "15829877389", job: "董事长", state: true },
          {
            name: "陈丽丽",
            phone: "15829877389",
            job: "部门经理",
            state: false
          },
          { name: "刘峰", phone: "15829877389", job: "部门经理", state: false }
        ]
      },
      // 特种作业
      tzzyList: {
        conpy: "江苏益达化工股份有限公司",
        lists: [
          {
            workname: "XXX作业名称",
            name: "动火作业",
            time: "2020-04-03 12:23至2020-04-03 12:30"
          },
          {
            workname: "XXX作业名称",
            name: "受限空间作业",
            time: "2020-04-03 12:23至2020-04-03 12:30"
          }
        ]
      },
      // 分区信息
      // fqxxLists: {
      //   conpy: "江苏益达化工股份有限公司",
      //   lists: [
      //     { name: "空桶库棚", risk: 0 },
      //     { name: "成品罐区2（丙类）", risk: 1 },
      //     { name: "喜鹊工作岗", risk: 2 }
      //   ]
      // }
    };
  },
  created() {
    this.conpyId = this.$route.query.id;
    // 默认选中基本信息tab
    this.$nextTick(function() {
      this.chgTab(0);
    });
    this.findQYJBXX();
  },
  mounted() {
    this.loadMap();
  },
  methods: {
    //编辑姓名
    editName(name) {
      return name.slice(0,1);
    },
    //企业基本信息
    findQYJBXX() {
      var that = this;
      // 危险化学品
      api
        .findWxhxpList({ entprNo: that.conpyId })
        .then(function(res) {
          that.wxhxpList = res.data.data;
        })
        .catch(function(err) {
          console.log(err);
        });
      // 危险化工工艺信息
      api
        .findWxhggzList({ entprNo: that.conpyId })
        .then(function(res) {
          that.wxhggzList = res.data.data;
        })
        .catch(function(err) {
          console.log(err);
        });
      // 人员信息
      api
        .findRYXXLIST({ entprno: that.conpyId })
        .then(function(res) {
          that.ryxxList = res.data.data;
        })
        .catch(function(err) {
          console.log(err);
        });
      // 基本信息
      api.findJBXXLIST({ entprno: that.conpyId }).then(function(res) {
        that.jbxxList = res.data.data;
        console.log(that.jbxxList)
      });
      // 重大危险源
      api.findZDWXYLIST({ entprno: that.conpyId }).then(function(res) {
        that.zdwxyList = res.data.data;
      });
      // 特种作业
      api.findTzzyList({ entprNo: that.conpyId }).then(function(res) {
        that.tzzyList = res.data.data;
      });
    },
    toYjdw() {
      this.$router.push({
        path: "/unitdet"
      });
    },
    toYjwz() {
      this.$router.push({
        path: "/supplies"
      });
    },
    toYjsj() {
      this.$router.push({
        path: "/eventdet"
      });
    },
    toareamap() {
      this.$router.push({
        path: "/areaMap"
      });
    },
    back() {
      this.$router.go(-1);
    },
    // 切换tab
    chgTab(index) {
      var that = this;
      var arrLi = document.getElementById("tabul").children;
      var content = document.getElementById("allboxs").children;
      // for(var i=0; i< arrLi.length; i++) {
      //     cut(arrLi[i])
      // }
      // function cut (obj) {
      // obj.onclick = function () {
      for (var j = 0; j < arrLi.length; j++) {
        if (index == j) {
          arrLi[index].className = "focus_bat";
          // console.log(content)
          // content[j].style.display = "none"
        } else {
          arrLi[index].className = "";
          // content[j].style.display = "block"
        }
        // }
        // }
      }

      var tablis = document.getElementById("tabul").children;
      for (var j = 0; j < tablis.length; j++) {
        if (j == index) {
          tablis[index].className = "focus_bat";
          var tablink = "isJbxx" + index;
        } else {
          tablis[j].className = "";
          var otherlink = "isJbxx" + j;
        }
      }
      if (index == 0) {
        that.isJbxx0 = true;
        that.isJbxx1 = false;
        that.isJbxx2 = false;
        that.isJbxx3 = false;
        that.isJbxx4 = false;
        that.isJbxx5 = false;
        that.isJbxx6 = false;

        that.isSshow = false;
        that.showThemes = false;
      } else if (index == 1) {
        that.isJbxx1 = true;
        that.isJbxx0 = false;
        that.isJbxx2 = false;
        that.isJbxx3 = false;
        that.isJbxx4 = false;
        that.isJbxx5 = false;
        that.isJbxx6 = false;
        that.isSshow = false;
        that.showThemes = false;
      } else if (index == 2) {
        that.isJbxx2 = true;
        that.isJbxx0 = false;
        that.isJbxx1 = false;
        that.isJbxx3 = false;
        that.isJbxx4 = false;
        that.isJbxx5 = false;
        that.isJbxx6 = false;
        that.isSshow = false;
        that.showThemes = false;
      } else if (index == 3) {
        that.isJbxx3 = true;
        that.isJbxx0 = false;
        that.isJbxx1 = false;
        that.isJbxx2 = false;
        that.isJbxx4 = false;
        that.isJbxx5 = false;
        that.isJbxx6 = false;
        that.isSshow = false;
        that.showThemes = false;
      } else if (index == 4) {
        that.isJbxx4 = true;
        that.isJbxx0 = false;
        that.isJbxx1 = false;
        that.isJbxx2 = false;
        that.isJbxx3 = false;
        that.isJbxx5 = false;
        that.isJbxx6 = false;
        that.isSshow = false;
        that.showThemes = false;
      } else if (index == 5) {
        that.isJbxx5 = true;
        that.isJbxx0 = false;
        that.isJbxx1 = false;
        that.isJbxx2 = false;
        that.isJbxx3 = false;
        that.isJbxx4 = false;
        that.isJbxx6 = false;
        that.isSshow = false;
        that.showThemes = false;
      }
      // else if (index == 6) {
      //   that.isJbxx6 = true;
      //   that.isJbxx0 = false;
      //   that.isJbxx1 = false;
      //   that.isJbxx2 = false;
      //   that.isJbxx3 = false;
      //   that.isJbxx4 = false;
      //   that.isJbxx5 = false;
      //   that.isSshow = false;
      //   that.showThemes = false;
      // }
    },
    clickWhick() {
      this.isTabShow = false;
      this.isSshow = true;
      this.showThemes = false;
      this.isJbxx0 = false;
    },
    clickTheme() {
      this.isTabShow = true;
      this.isSshow = false;
      this.$nextTick(function() {
        this.chgTab(0);
        this.isJbxx0 = false;
        this.showThemes = !this.showThemes;
      });
    },
    isOpendet(e) {
      console.log(e.path[1])
      if(e.path[1].nextElementSibling.style.height == "0px") {
        e.path[1].nextElementSibling.style.height = "fit-content"
        e.path[1].firstElementChild.style.transform = "rotate(0deg)"
      }else{
        e.path[1].nextElementSibling.style.height = 0
        e.path[1].nextElementSibling.style.padding = 0
        e.path[1].firstElementChild.style.transform = "rotate(180deg)"
      }
      
      // var rightdown = document.getElementById("cont_jbxx").style.display;
      // if (rightdown == "none") {
      //   $("#cont_jbxx").slideDown();
      //   this.deg = 0;
      // } else {
      //   this.deg = 180;
      //   $("#cont_jbxx").slideUp(500, "swing", function() {});
      // }
    },
    loadMap() {
      var map = new T.Map("tMapDiv");
      map.centerAndZoom(new T.LngLat(120.15919, 31.9204), 12);
    }
  }
};
</script>


<style scope>
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
.page_tit {
  background: #fff;
  display: flex;
  justify-content: space-between;
  padding: 10px 20px 10px 0;
}
.dt_backimg {
  width: 9px;
  height: 16px;
  padding: 5.5px 13px 5.5px 19px;
}
.tab_div {
  z-index: 1000;
  position: relative;
  background: #fff;
  transition: all 2s;
}
.tab_indiv {
  width: 100%;
  overflow: scroll;
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
#tabul {
  display: flex;
  width: fit-content;
}
#tabul li {
  width: max-content;
  font-size: 14px;
  text-align: center;
  padding: 10px 17px;
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
.copy_info_tit, .copy_info_tit0 {
  width: 5%;
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
  width: 45%;
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
#themes {
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
  bottom: 47px;
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
#cont_jbxx,
#cont_zdwxy,
#cont_wxhxp,
#cont_wxhggy,
#cont_tzzy {
  height: fit-content;
  display: block;
  padding-bottom: 15px;
  transition: all 1s;
}
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
.ryxx_ul {
  max-height: 400px;
  overflow-y: scroll;
}
.ryxx_ul li + li {
  border-top: 1px solid #ddd;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.ryxx_conpy {
  width: fit-content;
  font-size: 17px;
  font-weight: bold;
  margin: 0 auto;
  padding-bottom: 10px;
}

.fixedheight {
  height: 100px !important;
}
.ul_maxheight {
  font-size: 13px;
  max-height: 400px;
  overflow-y: scroll;
}
</style>
