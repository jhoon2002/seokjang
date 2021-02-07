<template>
    <ul>
        <li v-for="parentMenu in this.$route.matched"
                v-bind:key="parentMenu.key">{{parentMenu.name}}</li>
    </ul>
</template>
<style scoped>
ul, ol, li {
    /*
    margin: 0;
    padding: 0;
    list-style: none;
    line-height: 1;
    */
}
ul, li, div {
    box-sizing: border-box;
}
div:after {
    content: "";
    display: block;
    clear: both;
}
ul {
    float: left;
}
ul li {
    display: inline-block;
}
ul li:after {
    content: "\F0142";
    font-family: "Material Design Icons";
}
ul li:last-child:after {
    content: "";
}
ul li:first-child,
ul li:nth-child(2) {
    /*
    font-size: 1.3rem;
    margin-bottom: 0.6rem;
    padding: 0.3rem 0.6rem 0.3rem 0.6rem;
    color: white;
    border-radius: 0.4rem;
    */
}
ul li:first-child {
    /*background: linear-gradient(to right bottom, #e53a40, #ec7357);*/
}
ul li:nth-child(2) {
    /*
    background: linear-gradient(to right bottom, #7d804c, #999594);
    margin-left: 0.3rem;
    */
}
ul li:last-child {
    /*
    margin: 0;
    padding: 0;
    color: #666666;
    background: none;
    */
}
</style>