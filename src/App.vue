<template>
  <v-app>
    <v-app-bar app elevation="0" flat dense class="rounded-2">
      <v-app-bar-nav-icon @click="open = !open"></v-app-bar-nav-icon>
      <v-app-bar-title>Home > Path</v-app-bar-title>
    </v-app-bar>
    <v-navigation-drawer app dark :value="open" style="background: rgb(49, 79, 98);">

      <v-sheet color="transparent" class="text-center py-2">
        <v-icon size="30" class="grey--text text--lighten-3">mdi-state-machine</v-icon>
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

      <global-menu class="my-10 mx-6" :rts="routes"></global-menu>

    </v-navigation-drawer>
    <v-main>
      <router-view></router-view>
    </v-main>
    <v-footer app inset>
      <v-container>
        <v-sheet class="text-center text-overline transparent" style="color: gray">
          <v-icon class="text-body-2">mdi-copyright</v-icon>
          Korea National University of Arts K-Aco
        </v-sheet>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
  import GlobalMenu from "@/components/GlobalMenu.vue";
  export default {
    name: 'App',
    components: {
      GlobalMenu
    },
    data: function () {
      return {
        routes: this.$router.options.routes, //grobal-menu 컴포넌트를 재귀호촐하기 위해 설정
        open: true
      }
    },
    mounted() {
    }
  };
</script>
