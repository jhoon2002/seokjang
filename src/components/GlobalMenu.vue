<template>
    <ul id="global-nav">
        <router-link tag="li" v-for="route in rts" v-bind:key="route.key"
                     :to="route.path"
                     :class="{show: route.isShow, on: route.isOn, hasChildren: route.children}">
            <p :class="route.icon" v-if="!route.invisible" @click="show(route)">
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
    #global-nav, #global-nav ol, #global-nav li {
        margin: 0;
        padding: 0;
        list-style: none;
    }
    #global-nav * {
        line-height: 1;
    }
    #global-nav p {
        display: flex;
        cursor: pointer;
        padding-top: 0.4rem;
        padding-bottom: 0.4rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        transition: all 0.2s;
        margin-bottom: 0.5rem;
    }

    #global-nav p + ul {
        opacity: 0;
        max-height: 0;
        overflow: hidden;
        transition: opacity 0.3s, max-height 0.3s ease-out;
        margin-left: 1.2rem;
    }

    #global-nav p:hover {
        color: white;
        border-bottom: 1px solid white;
        transition: all 0.2s;
    }

    #global-nav li {
        font-size: 1.3rem;
        color: rgba(255, 255, 255, 0.8);
        cursor: pointer;
    }

    #global-nav li.router-link-active > p {
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

    #global-nav li.on > p {
        color: rgb(238, 255, 0);
        background: none;
    }

    #global-nav li.on > p:after {
        /*
        content: '\e816';
        font-family: "fontello";
        */
        content: "\F012C";
        font-family: "Material Design Icons";
        display: inline-block;
        width: 1rem;
        text-align: center;
        margin-left: 0.4rem;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-size: 1.1rem;
    }

    #global-nav li.router-link-exact-active > p {
        color: rgb(238, 255, 0);
        background: none;
    }

    #global-nav li.router-link-exact-active > p:after {
        /*
        content: '\e816';
        font-family: "fontello";
        */
        content: "\F012C";
        font-family: "Material Design Icons";
        animation:fade-in 0.5s;
        display: inline-block;
        width: 1rem;
        text-align: center;
        margin-left: 0.4rem;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-size: 1.1rem;
    }

    /* #global-nav li.router-link-active > ul, */
    #global-nav li.show > ul {
        opacity: 1;
        max-height: 500px;
        transition: opacity 1s, max-height 1s ease-out;
    }

    #global-nav li.hasChildren > p:after {
        /*
        content: "\e80c";
        font-family: "fontello";
        */
        content: "\F0142";
        font: normal normal normal 24px/1 "Material Design Icons";
        display: block;
        width: 1rem;
        text-align: center;
        margin-left: auto;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        transform: rotate(0deg);
        transform-origin:0.7rem 0.7rem;
        transition: transform 0.1s;
        transition-delay: 0.1s;
    }

    #global-nav li.hasChildren.show > p:after {
        transform: rotate(90deg);
        transform-origin:0.7rem 0.7rem;
        transition: transform 0.1s;
    }

    #global-nav [class^="icon-"]:hover:before,
    #global-nav [class*=" icon-"]:hover:before {
        transform: rotate(90deg);
        transition: transform 0.3s;
    }
    #global-nav [class^="icon-"]:before,
    #global-nav [class*=" icon-"]:before {
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
        /* opacity: .8; */
        /* For safety - reset parent styles, that can break glyph codes*/
        font-variant: normal;
        text-transform: none;
        /* fix buttons height, for twitter bootstrap */
        line-height: 1em;
        /* Animation center compensation - margins should be symmetric */
        /* remove if not needed */
        margin-left: .2em;
        /* you can be more comfortable with increased icons size */
        /* font-size: 120%; */
        /* Font smoothing. That was taken from TWBS */
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        /* Uncomment for 3D effect */
        /* text-shadow: 1px 1px 1px rgba(127, 127, 127, 0.3); */
    }
    #global-nav .icon-docs:before {
        content: '\e805';
    }
    #global-nav .icon-chart:before {
        content: '\e804';
    }
    #global-nav .icon-flight:before {
        content: '\e82c';
    }
    #global-nav .icon-book:before {
        content: '\e809';
    }
    #global-nav .icon-sound:before {
        content: '\e80a';
    }
    #global-nav .icon-users:before {
        content: '\e82d';
    }
    @keyframes fade-in {
        from {
            opacity: 0%;
        }

        to {
            opacity: 100%;
        }
    }
</style>
