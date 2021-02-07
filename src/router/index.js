import Vue from 'vue'
import VueRouter from 'vue-router'
import Blank from "@/views/Blank.vue";
import Mock from "@/views/Mock.vue";

Vue.use(VueRouter)

// const Test = () => import("@/views/admin/Test.vue");

const routes = [
      {
        name: "첫화면",
        path: "/",
        component: Blank,
        invisible: true
      },
      {
        name: "게시판관리",
        icon: "mdi-view-headline",
        path: "/admin/board",
        component: Blank,
        isShow: false,
        isOn: false,
        meta: { isDirectory: true },
        children: [
          {
            name: "글쓰기",
            path: "/admin/board/create",
            component: () => import("@/views/admin/board/Create.vue"),
            props: true,
            isShow: false,
            isOn: false,
            meta: { model: "board" }
          },
          {
            name: "자유게시판",
            path: "/admin/board/boardA",
            component: () => import("@/views/admin/Board.vue"),
            props: true,
            isShow: false,
            isOn: false,
            meta: { model: "board" }
          }
        ]
      },
      {
        name: "교직원관리",
        icon: "mdi-card-account-details-outline",
        path: "/admin/user",
        component: Blank,
        isShow: false,
        isOn: false,
        meta: { isDirectory: true },
        children: [
          {
            name: "교직원내역",
            path: "/admin/user/employee",
            component: () => import("@/views/admin/Employee.vue"),
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
        icon: "mdi-account-circle",
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
        icon: "mdi-bus-multiple",
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
        icon: "mdi-book-open-variant",
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
            component: () => import('../views/About.vue'),
            isShow: false,
            isOn: false,
          }
        ]
      }
];
/*
const routes = [
  {
    name: "첫화면",
    icon: "mdi-home",
    path: "/",
    component: Mock,
    invisible: true
  },
  {
  name: "전자문서",
    icon: "mdi-file-document-edit-outline",
  path: "/docu",
  component: Blank,
  isShow: false,
  isOn: false,
  meta: {
    isDirectory: true
  },
  children: [{
    name: "문서작성",
    path: "/docu/write",
    component: Mock,
    meta: {
      title: "문서작성",
    },
    isShow: false,
    isOn: false
  },
    {
      name: "처리할 문서",
      path: "/docu/confirm",
      component: Blank,
      meta: {
        isDirectory: true,
      },
      isShow: false,
      isOn: false,
      children: [{
        name: "결재대기함",
        path: "/docu/confirm/standby",
        component: Mock,
        isShow: false,
        isOn: false,
      },
        {
          name: "발송대기함",
          path: "/docu/confirm/send",
          component: Mock,
          isShow: false,
          isOn: false,
        },
      ],
    },
    {
      name: "처리한 문서",
      path: "/docu/confirmed",
      component: Blank,
      meta: {
        isDirectory: true,
      },
      isShow: false,
      isOn: false,
      children: [{
        name: "완료문서함",
        path: "/docu/confirmed/complete",
        component: Mock,
        isShow: false,
        isOn: false,
      },
        {
          name: "진행문서함",
          path: "/docu/confirmed/progress",
          component: Mock,
          isShow: false,
          isOn: false,
        },
      ],
    },
    {
      name: "공유/공람",
      path: "/docu/share",
      component: Blank,
      meta: {
        isDirectory: true,
      },
      isShow: false,
      isOn: false,
      children: [{
        name: "받은문서",
        path: "/docu/share/receive",
        component: Mock,
        isShow: false,
        isOn: false,
      },
        {
          name: "지정문서",
          path: "/docu/share/assign",
          component: Mock,
          isShow: false,
          isOn: false,
        },
      ],
    },
    {
      name: "문서등록대장",
      path: "/docu/docu-list",
      component: Mock,
      isShow: false,
      isOn: false,
    },
    {
      name: "비전자문서등록",
      path: "/docu/none-elec",
      component: Mock,
      isShow: false,
      isOn: false,
    }
  ]
},
  {
    name: "복무관리",
    icon: "mdi-airplane",
    path: "/work",
    component: Blank,
    isShow: false,
    isOn: false,
    meta: {
      isDirectory: true
    },
    children: [{
      name: "처리할 복무",
      path: "/work/confirm",
      component: Mock,
      isShow: false,
      isOn: false
    },
      {
        name: "시간외근무",
        path: "/work/overtime",
        component: Blank,
        meta: {
          isDirectory: true,
        },
        isShow: false,
        isOn: false,
        children: [{
          name: "사전신청",
          path: "/work/overtime/pre",
          component: Mock,
          isShow: false,
          isOn: false,
        },
          {
            name: "사전신청내역",
            path: "/work/overtime/pre-list",
            component: Mock,
            isShow: false,
            isOn: false,
          },
          {
            name: "출근/퇴근지정",
            path: "/work/overtime/set",
            component: Mock,
            isShow: false,
            isOn: false,
          },
          {
            name: "시간외내역",
            path: "/work/overtime/overtime-list",
            component: Mock,
            isShow: false,
            isOn: false,
          },
        ],
      },
      {
        name: "출장",
        path: "/work/trip",
        component: Blank,
        meta: {
          isDirectory: true,
        },
        isShow: false,
        isOn: false,
        children: [{
          name: "관내출장",
          path: "/work/trip/inside",
          component: Mock,
          isShow: false,
          isOn: false,
        },
          {
            name: "국내출장",
            path: "/work/trip/domestic",
            component: Mock,
            isShow: false,
            isOn: false,
          },
          {
            name: "국외출장",
            path: "/work/trip/foreign",
            component: Mock,
            isShow: false,
            isOn: false,
          },
          {
            name: "출장내역",
            path: "/work/trip/trip-list",
            component: Mock,
            isShow: false,
            isOn: false,
          },
        ],
      },
    ],
  },
  {
    name: "규정/양식",
    icon: "mdi-book-open-variant",
    path: "/law",
    component: Blank,
    isShow: false,
    isOn: false,
    meta: {
      isDirectory: true
    },
    children: [{
      name: "법령/규정/지침",
      path: "/law/rule",
      component: Mock,
      isShow: false,
      isOn: false,
    },
      {
        name: "각종양식",
        path: "/law/form",
        component: Mock,
        isShow: false,
        isOn: false,
      },
    ],
  },
  {
    name: "커뮤니티",
    icon: "mdi-human-male-male",
    path: "/comm",
    component: Blank,
    isShow: false,
    isOn: false,
    meta: {
      isDirectory: true
    },
    children: [{
      name: "공지사항",
      path: "/comm/notice",
      component: Mock,
      isShow: false,
      isOn: false,
    },
      {
        name: "질의답변",
        path: "/comm/qna",
        component: Mock,
        isShow: false,
        isOn: false,
      },
    ],
  },
  {
    name: "인사/급여",
    icon: "mdi-face-recognition",
    path: "/person",
    component: Blank,
    isShow: false,
    isOn: false,
    meta: {
      isDirectory: true
    },
    children: [{
      name: "인사정보",
      path: "/person/info",
      component: Mock,
      isShow: false,
      isOn: false,
    },
      {
        name: "급여내역",
        path: "/person/pay",
        component: Mock,
        isShow: false,
        isOn: false,
      },
    ],
  },
  {
    name: "사용자등록1",
    path: "/regist1",
    component: Mock,
    invisible: true
  },
  {
    name: "사용자등록2",
    path: "/regist2",
    component: Mock,
    invisible: true
  },
  {
    name: "로그인",
    path: "/login",
    component: Mock,
    invisible: true
  },
];
 */
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
