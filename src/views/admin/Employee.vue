<template>
    <div>
        <!--
        <div class="text-caption">{{options}}</div>
        <div class="text-caption">{{params}}</div>
        -->
        <v-data-table
                :headers="headers"
                :items="employees"
                :items-per-page="params.docEa"
                :options.sync="options"
                :server-items-length="params.count"
                :loading="isBusy"
                loader-height="1"
                :footer-props="{
                    itemsPerPageOptions: [1,2,5,7,10,15,20,30,40]
                }"
        ></v-data-table>
        <v-pagination
                v-model="options.page"
                :length="totalPage"
                total-visible="10"
                color="cyan"
        ></v-pagination>
    </div>
</template>
<script>
    import { storeNamespace } from "@/api/util";
    import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
    import { mapFields } from "vuex-map-fields";

    export default {
        data () {
            return {
                headers: [
                    {
                        text: '이름',
                        align: 'start',
                        sortable: true,
                        value: 'name',
                    },
                    { text: '사번', value: 'no' },
                    { text: '주민등록번호', value: 'jumin' },
                    { text: '휴대폰', value: 'cellphone' },
                    { text: '이메일', value: 'email' },
                    { text: '은행명', value: 'bank.name' },
                    { text: '계좌번호', value: 'bank.account' },
                    { text: '신분', value: 'status.type' },
                    { text: '소속', value: 'status.part' },
                    { text: '생성일', value: 'created' },
                ],
                options: {},
            }
        },
        computed: {
            ...mapState( storeNamespace(), ["params", "employee", "employees", "isBusy", "STATUS_TYPE"] ),
            ...mapGetters( storeNamespace(), ["totalPage"] ),
            ...mapFields( storeNamespace(), ["params", "employee"] )
        },
        methods: {
            ...mapMutations(storeNamespace(), ["setPage", "setField", "setAscend", "setPageSync", "setDocEa"]),
            ...mapActions(storeNamespace(), ["fetchAsync", "fetchOneAsync", "defaultEmployee"]),
        },
        mounted() {
            this.fetchAsync().then(() => {
            }).catch(() => {
            })
        },
        watch: {
            options: {
                handler (ctx) {
                    //{ "page": 1, "itemsPerPage": 10, "sortBy": [], "sortDesc": [], "groupBy": [], "groupDesc": [], "mustSort": false, "multiSort": false }
                    this.setPage(ctx.page);
                    this.setField(ctx.sortBy[0]);

                    if (ctx.sortDesc[0] === true) {
                        this.setAscend(false);
                    } else if (ctx.sortDesc[0] === false) {
                        this.setAscend(true);
                    } else {
                        this.setAscend(ctx.sortDesc[0]);
                    }

                    this.setDocEa(ctx.itemsPerPage);
                    this.fetchAsync();
                },
                deep: true,
            },
        },
    }
</script>
