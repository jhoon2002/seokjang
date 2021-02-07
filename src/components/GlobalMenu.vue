<template>
    <ul class="global-nav">
        <router-link tag="li" v-for="route in rts" v-bind:key="route.key"
                     :to="route.path"
                     :class="{show: route.isShow, on: route.isOn, hasChildren: route.children}">
            <p :icon="route.icon" v-if="!route.invisible" @click="show(route)" v-ripple>
                <i :class="['mdi', route.icon]"></i>
                {{route.name}}
            </p>
            <global-menu :rts="route.children"></global-menu>
        </router-link>
    </ul>
</template>
<script>
    export default {
        name: "GlobalMenu",
        props: ['rts'],
        data: function () {
            return {
            }
        },
        methods: {
            show: function (route) {
                if (!route.children) return;
                route.isShow = !route.isShow;
            }
        },
    }
</script>
<style scoped>
    ul.global-nav, ul.global-nav ol, ul.global-nav li {
        margin: 0;
        padding: 0;
        list-style: none;
    }
    ul.global-nav * {
        line-height: 1;
    }
    ul.global-nav p {
        display: flex;
        cursor: pointer;
        padding-top: 0.4rem;
        padding-bottom: 0.4rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        transition: all 0.2s;
        margin-bottom: 0.5rem;
        padding-left: 0.2rem;
        padding-right: 0.2rem;
    }

    ul.global-nav p + ul {
        opacity: 0;
        max-height: 0;
        overflow: hidden;
        transition: opacity 0.3s, max-height 0.3s ease-out;
        margin-left: 1.2rem;
    }

    ul.global-nav p:hover {
        color: white;
        border-bottom: 1px solid white;
        transition: all 0.2s;
    }

    ul.global-nav li {
        font-size: 1.3rem;
        color: rgba(255, 255, 255, 0.8);
        cursor: pointer;
    }

    ul.global-nav li.router-link-active > p {
        color: rgb(148, 224, 214);
    }

    /*
    router-link-exact-active는
    query string(?page=4&w=k)이 있는 경우
    vue에서 exact이 빠진 router-link-active로 처리하는 관계로
    'on' 이라는 class를 개발하여 사용
    생성로직은 /route/index.js에 구현

    (이후 변경 사항)
    query string은 사용하지 않기로 함
    따라서 router-link-active와 router-link-exact-active를 사용
    종전 방침은 모두 주석 처리

    (이후 변경 사항)
    다시 원복
    */

    ul.global-nav li.on > p {
        color: rgb(238, 255, 0);
        background: none;
    }

    /* ">" 표시 */
    ul.global-nav li.hasChildren > p:after,
    ul.global-nav li.hasChildren.show > p:after,
    /* 체크 표시 */
    ul.global-nav li.router-link-exact-active > p:after,
    ul.global-nav li.on > p:after {
        font-family: "Material Design Icons";
    }

    ul.global-nav li.on > p:after {
        content: "\F012C";
        display: inline-block;
        width: 1rem;
        text-align: center;
        margin-left: 0.4rem;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-size: 1.1rem;
    }

    ul.global-nav li.router-link-exact-active > p {
        color: rgb(238, 255, 0);
        background: none;
    }

    ul.global-nav li.router-link-exact-active > p:after {
        content: "\F012C";
        animation:fade-in 0.5s;
        display: inline-block;
        width: 1rem;
        text-align: center;
        margin-left: 0.4rem;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-size: 1.1rem;
    }

    /* ul.global-nav li.router-link-active > ul, */
    ul.global-nav li.show > ul {
        opacity: 1;
        max-height: 500px;
        transition: opacity 1s, max-height 1s ease-out;
    }

    ul.global-nav li.hasChildren > p:after {
        content: "\F0142";
        display: block;
        width: 1rem;
        text-align: center;
        margin-left: auto;
        transform: rotate(0deg);
        transform-origin:0.6rem 0.6rem;
        transition: transform 0.1s;
        transition-delay: 0.1s;
    }

    ul.global-nav li.hasChildren.show > p:after {
        transform: rotate(90deg);
        transform-origin:0.6rem 0.6rem;
        transition: transform 0.1s;
    }

    ul.global-nav p:hover [class*="mdi-"] {
        transform: rotate(90deg);
        transition: transform 0.3s;
    }
    ul.global-nav p [class*="mdi-"] {
        transform: rotate(0deg);
        transition: transform 0.3s;
        margin-right: 0.5rem;
    }

    /*
    ul.global-nav [class^="icon-"]:hover:before,
    ul.global-nav [class*=" icon-"]:hover:before {
        transform: rotate(90deg);
        transition: transform 0.3s;
    }
    ul.global-nav [class^="icon-"]:before,
    ul.global-nav [class*=" icon-"]:before {
        transform: rotate(0deg);
        transition: transform 0.3s;
        font-family: "fontello";
        font-style: normal;
        font-weight: normal;
        display: inline-block;
        text-decoration: inherit;
        width: 1em;
        margin-right: .4em;
        text-align: center;
        font-variant: normal;
        text-transform: none;
        line-height: 1em;
        margin-left: .2em;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    ul.global-nav .icon-docs:before {
        content: '\e805';
    }
    ul.global-nav .icon-chart:before {
        content: '\e804';
    }
    ul.global-nav .icon-flight:before {
        content: '\e82c';
    }
    ul.global-nav .icon-book:before {
        content: '\e809';
    }
    ul.global-nav .icon-sound:before {
        content: '\e80a';
    }
    ul.global-nav .icon-users:before {
        content: '\e82d';
    }
    */
    @keyframes fade-in {
        from {
            opacity: 0%;
        }

        to {
            opacity: 100%;
        }
    }
</style>