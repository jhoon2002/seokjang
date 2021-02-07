module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  /*
  devServer: {
    proxy: {
      "/api" :{
        target: "http://localhost:9000",
        ws: true,
        changeOrigin: true,

        /-*
         * (sockjs) net::ERR_CONNECTION_REFUSED 에러 발생에 따라 아래 추가
         * 출처: https://github.com/vuejs/vue-cli/issues/1472
         *-/
        pathRewrite: {
          '^/app/sockjs-node': ''
        }

      }
    }
  }
  */
}
