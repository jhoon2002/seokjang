import Vue from 'vue'
import VueRouter from 'vue-router'
import Blank from "@/views/Blank.vue";
import Mock from "@/views/Mock.vue";

Vue.use(VueRouter)

// const Test = () => import("@/views/admin/Test.vue");

const routes = [
      {
        name: "교직원관리",
        path: "/admin/user",
        component: Blank,
        isShow: false,
        isOn: false,
        meta: { isDirectory: true },
        children: [
          {
            name: "교직원내역",
            path: "/admin/user/employee",
            component: () => import("@/views/Mock"),
            props: true,
            isShow: false,
            isOn: false,
            meta: { model: "employee" }
          },
          {
            name: "권한관리",
            path: "/admin/user/acl",
            component: Mock,
            isShow: false,
            isOn: false
          },
          {
            name: "테스트",
            path: "/admin/user/test",
            component: Mock,
            isShow: false,
            isOn: false
          }
        ]
      },
      {
        name: "인사관리",
        path: "/admin/person",
        component: Blank,
        isShow: false,
        isOn: false,
        meta: {
          isDirectory: true
        },
        children: [
            {
              name: "인사기록카드",
              path: "/admin/person/card",
              component: Mock,
              isShow: false,
              isOn: false,
            },
            {
            name: "증명서",
            path: "/admin/person/certi",
            component: Blank,
            isShow: false,
            isOn: false,
            meta: {
              isDirectory: true
            },
            children: [{
              name: "증명서현황",
              path: "/admin/person/certi/list",
              component: Mock,
              isShow: false,
              isOn: false
            },
              {
                name: "증명서작성",
                path: "/admin/person/certi/wirte",
                component: Mock,
                isShow: false,
                isOn: false
              }
            ]
          },
          {
            name: "급여",
            path: "/admin/person/pay",
            component: Blank,
            isShow: false,
            isOn: false,
            meta: {
              isDirectory: true
            },
            children: [{
              name: "급여현황",
              path: "/admin/person/pay/list",
              component: Mock,
              isShow: false,
              isOn: false
            },
              {
                name: "급여입력",
                path: "/admin/person/pay/write",
                component: Mock,
                isShow: false,
                isOn: false
              }
            ]
          }
        ]
      },
      {
        name: "복무관리",
        path: "/admin/work",
        component: Blank,
        isShow: false,
        isOn: false,
        meta: {
          isDirectory: true
        },
        children: [{
          name: "휴가",
          path: "/admin/work/off",
          component: Blank,
          isShow: false,
          isOn: false,
          meta: {
            isDirectory: true
          },
          children: [{
            name: "휴가설정",
            path: "/admin/work/off/set",
            component: Mock,
            isShow: false,
            isOn: false
          },
            {
              name: "휴가현황",
              path: "/admin/work/off/book-list",
              component: Mock,
              isShow: false,
              isOn: false
            }
          ]
        },
          {
            name: "시간외근무",
            path: "/admin/work/overtime",
            component: Blank,
            isShow: false,
            isOn: false,
            meta: {
              isDirectory: true
            },
            children: [{
              name: "시간외근무설정",
              path: "/admin/work/overtime/set",
              component: Mock,
              isShow: false,
              isOn: false
            },
              {
                name: "시간외근무현황",
                path: "/admin/work/overtime/pre-list",
                component: Mock,
                isShow: false,
                isOn: false
              }
            ]
          },
          {
            name: "출장",
            path: "/admin/work/trip",
            component: Blank,
            isShow: false,
            isOn: false,
            meta: {
              isDirectory: true
            },
            children: [{
              name: "출장현황",
              path: "/admin/work/trip/list",
              component: Mock,
              isShow: false,
              isOn: false
            }]
          }
        ]
      },
      {
        name: "규정/양식관리",
        path: "/admin/law",
        component: Blank,
        isShow: false,
        isOn: false,
        meta: {
          isDirectory: true
        },
        children: [{
          name: "규정",
          path: "/admin/law/rule",
          component: Mock,
          isShow: false,
          isOn: false,
        },
          {
            name: "양식",
            path: "/admin/law/form",
            component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
            isShow: false,
            isOn: false,
          }
        ]
      }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

function showAndOn(to, routes, i) {
  var matchedPath;
  if (to.matched[i]) matchedPath = to.matched[i].path;
  else matchedPath = "~~~";

  for (var route of routes) {
    if (route.path == matchedPath) { //경로 일치
      //if (to.matched[i+1]) { //하위가 더 있는 경우 즉, 디렉터리
      if (route.children) { //하위가 더 있는 경우 즉, 디렉터리
        route.isShow = true;
        showAndOn(to, route.children, i+1); //재귀함수
      } else { //하위에 더 이상 없는 경우 즉, 파일(최종메뉴)
        route.isOn = true;
      }
    } else {
      if (route.children) {
        //   route.isShohw = false;
        showAndOn(to, route.children, i+1); //재귀함수
      }
      route.isOn = false;
    }
  }
}

router.beforeEach((to, from, next) => {
      if (to.meta.isDirectory) {
        next(false);
      } else {
        showAndOn(to, routes, 0);
        next();
      }
    }
);

export default router
