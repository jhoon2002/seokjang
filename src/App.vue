<template>
  <v-app>
    <v-app-bar app elevation="0"
               dense color="white"
    >
      <v-app-bar-nav-icon @click="open = !open"></v-app-bar-nav-icon>
      <v-app-bar-title>
        <section-title></section-title>
      </v-app-bar-title>

    </v-app-bar>
    <v-navigation-drawer app dark :value="open" style="background: rgb(49, 79, 98);">

      <v-sheet v-ripple color="transparent" class="text-center py-2" @click="$router.push('/')" style="cursor: pointer">
        <v-icon size="30" class="grey--text text--lighten-3">mdi-meteor</v-icon>
        <v-sheet color="transparent"
                 class="yellow--text text--lighten-2 text-body-1 font-weight-bold"
        >ADMINISTRATION</v-sheet>
      </v-sheet>

      <v-divider></v-divider>

      <v-sheet color="transparent" class="py-5 px-6">
        <v-sheet rounded="lg" color="blue-grey lighten-1" max-width="4rem" max-height="4rem"  class="text-center">
          <v-icon size="60" color="blue-grey darken-2">mdi-account</v-icon>
        </v-sheet>
      </v-sheet>

      <v-divider></v-divider>

      <global-menu style="width: 12.7rem" class="my-10 ml-6" :rts="routes"></global-menu>

    </v-navigation-drawer>
    <v-main>
      <v-container fluid class="pa-6">
        <v-slide-x-transition>
          <router-view></router-view>
        </v-slide-x-transition>
      </v-container>
    </v-main>
    <v-footer app inset>
      <v-sheet class="text-center text-overline transparent" style="color: gray">
        <v-icon class="text-body-2">mdi-copyright</v-icon>
        Korea National University of Arts K-Aco
      </v-sheet>
    </v-footer>
  </v-app>
</template>

<script>
  import GlobalMenu from "@/components/GlobalMenu.vue";
  import SectionTitle from "@/components/SectionTitle.vue";
  export default {
    name: 'App',
    components: {
      GlobalMenu,
      SectionTitle
    },
    data: function () {
      return {
        routes: this.$router.options.routes, //grobal-menu 컴포넌트를 재귀호촐하기 위해 설정
        open: true
      }
    },
    mounted() {
    },
    created() {
      // 환경 변수 출력
      // console.log("환경변수", process.env)
    }
  };
</script>
<style >
  .v-navigation-drawer__content::-webkit-scrollbar {
    width: 8px;
  }
  .v-navigation-drawer__content::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 0;
    background-clip: padding-box;
    border: 3px solid transparent;
  }
  .v-navigation-drawer__content::-webkit-scrollbar-track {
    background-color: transparent;
  }
  /*  nav {
      overflow-x: hidden;
      overflow-y: auto;

    }
    nav::-webkit-scrollbar {
      width: 8px;
    }
    nav::-webkit-scrollbar-thumb {
      background-color: rgba(255, 255, 255, 0.5);
      border-radius: 0;
      background-clip: padding-box;
      border: 3px solid transparent;
    }
    nav::-webkit-scrollbar-track {
      background-color: transparent;
    }*/
</style>