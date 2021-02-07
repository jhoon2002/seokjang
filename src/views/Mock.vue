<template>
    <div class="content">
        <div>{{this.$route.matched[this.$route.matched.length-1].name}}</div>
        <v-sheet style="height: 45rem" outlined rounded="lg" class="blue lighten-5 pa-2">
            내용을 넣으세요.
        </v-sheet>
    </div>
</template>