import Vue from 'vue'
import Router from 'vue-router'
// 登陆
import login from '@/page/Login/login'
// 地图
import areaMap from '@/page/Map/areaMap'
import map from '@/page/Map/map'
import Unitdet from '@/page/Map/unitDet'
import supplies from '@/page/Map/supplies'
import eventDet from '@/page/Map/eventDet'
// 工作
import Worder from '@/page/Work/worker'
import Leader from '@/page/Work/leader'
import event from '@/page/Work/event'
import seeHidTrouble from '@/page/Work/seeHidTrouble'
import leaderYhjl from '@/page/Work/leaderYhjl'
import workerYhsb from '@/page/Work/workerYhsb'
import worderYhxx from '@/page/Work/worderYhxx'
import workerYhxxDet from '@/page/Work/workerYhxxDet'
import workerYjxx from '@/page/Work/workerYjxx'
import workerYjxxDet from '@/page/Work/workerYjxxDet'
import workerYjsj from '@/page/Work/workerYjsj'
import workerYjsjDet from '@/page/Work/workerYjsjDet'
import leaderYhjlDet from '@/page/Work/leaderYhjlDet'
import leaderYjsj from '@/page/Work/leaderYjsj'
import leaderYjsjDet from '@/page/Work/leaderYjsjDet'

import Echarts from '@/page/Work/Echarts'
// 消息
import Message from '@/page/Message/message'
// 我的
import Mine from '@/page/Mine/mine'
import ChangePasswd from '@/page/Mine/changePasswd'

import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: '登录',
      component: login
    },
    {
      path: '/areaMap',
      name: '园区地图',
      component: areaMap
    },
    {
      path: '/map',
      name: '地图',
      component: map
    },
    {
      path: '/unitdet',
      name: '应急单位详情',
      component: Unitdet
    },
    {
      path: '/supplies',
      name: '应急物资详情',
      component: supplies
    },
    {
      path: '/eventdet',
      name: '应急事件详情',
      component: eventDet
    },
    {
      path: '/work/worker',
      name: '员工工作',
      component: Worder
    },
    {
      path: '/work/leader',
      name: '领导工作',
      component: Leader
    },
    {
      path: '/event',
      name: '员工应急事件上报',
      component: event
    },
    {
      path: '/seeHidTrouble',
      name: '员工隐患整改信息查看',
      component: seeHidTrouble
    },
    {
      path: '/leaderYhjl',
      name: '领导查看隐患记录',
      component: leaderYhjl
    },
    {
      path: '/leaderYhjlDet',
      name: '领导查看隐患记录详情',
      component: leaderYhjlDet
    },
    {
      path: '/leaderYjsj',
      name: '领导查看应急事件记录',
      component: leaderYjsj
    },
    {
      path: '/leaderYjsjDet',
      name: '领导查看应急事件记录详情',
      component: leaderYjsjDet
    },
    {
      path: '/workerYhsb',
      name: '员工隐患上报',
      component: workerYhsb
    },
    {
      path: '/worderYhxx',
      name: '员工上报隐患记录',
      component: worderYhxx
    },
    {
      path: '/workerYhxxDet',
      name: '员工上报隐患记录详情',
      component: workerYhxxDet
    },
    {
      path: '/workerYjxx',
      name: '员工预警信息',
      component: workerYjxx
    },
    {
      path: '/workerYjxxDet',
      name: '员工预警信息详情',
      component: workerYjxxDet
    },
    {
      path: '/workerYjsj',
      name: '员工上报应急事件信息',
      component: workerYjsj
    },
    {
      path: '/workerYjsjDet',
      name: '员工上报应急事件信息详情',
      component: workerYjsjDet
    },
    {
      path: '/work/leader/echarts',
      name: '工作',
      component: Echarts
    },
    {
      path: '/message',
      name: '消息',
      component: Message
    },
    {
      path: '/mine',
      name: '我的',
      component: Mine
    },
    {
      path: '/changePasswd',
      name: '修改密码',
      component: ChangePasswd
    }
  ]
})
