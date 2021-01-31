<template>
  <v-app>
    <v-app-bar app elevation="0">
      <v-app-bar-nav-icon @click="open = !open"></v-app-bar-nav-icon>
      <v-app-bar-title>경로</v-app-bar-title>
    </v-app-bar>
    <v-navigation-drawer app dark :value="open" color="teal">
      <v-sheet color="transparent" class="text-center py-2">
        <v-icon size="40" color="white">mdi-grain</v-icon>
        <h3 style="color: white">KACO 산학협력단</h3>
      </v-sheet>

      <v-divider></v-divider>
      <grobal-menu class="ma-4" :rts="this.$router.options.routes"></grobal-menu>

    </v-navigation-drawer>
    <v-main>

    </v-main>
    <v-footer app>
      <v-container>
        <div class="text-center" style="color: gray">
          <h3>한국예술종합학교 산학협력단</h3>
          <h6><v-icon size="14">mdi-copyright</v-icon> Korea National University of Arts K-Aco</h6>
        </div>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
import GrobalMenu from "@/components/GlobalMenu";
export default {
  name: 'App',
  components: {
    GrobalMenu
  },
  data: () => ({
    open: true,
    admins: [
      ['관리', 'mdi-account-multiple-outline'],
      ['환경설정', 'mdi-cog-outline'],
    ],
    cruds: [
      ['글쓰기', 'mdi-plus-outline'],
      ['글읽기', 'mdi-file-outline'],
      ['수정하기', 'mdi-update'],
      ['삭제하기', 'mdi-delete'],
    ],
  }),
};
</script>
