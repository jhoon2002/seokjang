import * as util from "@/api/util";
import { getField, updateField } from 'vuex-map-fields';
import * as db from "@/api/db";
// const _ = require("lodash");

export default {
    namespaced: true,
    state: {
        model: "employee",
        params: {
            page: 1,
            "page.sync": 1,
            count: 0,
            docEa: 5,
            //navEa: 10,
            field: "created",
            ascend: false,
            and: true
        },
        employee: {
            _id: "",
            name: "",
            no: "",
            jumin: "",
            cellphone: "",
            email: "",
            status: {
                type: "",
                part: ""
            },
            bank: {
                name: "",
                account: "",
                owner: ""
            },
            created: "",
            updated: ""
        },
        employees: [],
        isBusy: false,
        STATUS_TYPE: {
            "": { value: "", text: "신분" },
            "PROFESSOR": { value: "PROFESSOR", text: "전임교원" },
            "LECTURER": { value: "LECTURER", text: "비전임교원" },
            "ASSISTANT": { value: "ASSISTANT", text: "조교" },
            "EMPLOYEE": { value: "EMPLOYEE", text: "학교직원" },
            "CIVIL": { value: "CIVIL", text: "공무원" },
            "CORPORATION": { value: "CORPORATION", text: "법인직원" },
            "UNDERGRADUATE": { value: "UNDERGRADUATE", text: "재학생(예술사)" },
            "GRADUATE": { value: "GRADUATE", text: "재학생(예술전문사)" },
            "ALUMNUS": { value: "ALUMNUS", text: "졸업생" },
            "OUTSIDER": { value: "OUTSIDER", text: "외부인" }
        }
    },
    getters: {
        getField,
        //paging에 필요한 getters
        totalPage: state => { //총 페이지수
            return parseInt( (state.params.count-1) / state.params.docEa) + 1;
        },
        /* navEa 삭제로 현재 미사용
        begin: state => { //내비 시작 페이지
            return parseInt(((state.params.page-1) / state.params.navEa)) * state.params.navEa + 1;
        },
        end: (state, getters) => { //내비 끝 페이지
            let end = getters.begin + state.params.navEa - 1;
            if (getters.totalPage < end) {
                end = getters.totalPage;
            }
            return end;
        },

         */
        isPrev: (state, getters) => { //이전 화살표
            if (getters.begin > 1) return true;
            else return false;
        },
        isNext: (state, getters) => { //이후 화살표
            if (getters.end < getters.totalPage) return true;
            else return false;
        },
        navList: (state, getters) => {
            let list = [];
            for (let i = getters.begin; i <= getters.end; i++) list.push(i);
            return list;
        },
        httpParams: (state) => {
            let obj = Object.assign({}, state.params, state.employee);
            // let obj = _.cloneDeep(state.params);
            return util.ignoreEmpty(obj);
        },
        /* 현재 미사용
        countSearchText: (state) => {
            return util.countTextInSearchedParams(state.params);
        },
        */
        isSearchText: (state) => {
            return util.isTextInSearchedParams(state.params);
        },
        /* params의 index 필드 삭제로 미사용
        fieldsForSearch: (state) => {
            return util.sortSearchedParams(state.params, "index"); //params을 정렬하여 돌려줌, 각 store에 따라 적절한 방식 선택할 수 있음
        }
        */
    },
    mutations: {
        updateField,
        setParams(state, payload) {
            state.params = payload;
        },
        setPage(state, payload) {
            state.params.page = payload;
        },
        setPageSync: (state, payLoad) => {
            state.params["page.sync"] = payLoad;
        },
        setCount(state, payload) {
            state.params.count = payload;
        },
        setDocEa(state, payload) {
            state.params.docEa = payload;
        },
        /* navEa 삭제로 현재 미사용
        setNavEa(state, payload) {
            state.params.navEa = payload;
        },
        */
        setField(state, payload) {
            state.params.field = payload;
        },
        setAscend(state, payload) {
            state.params.ascend = payload;
        },
        setAnd(state, payload) {
            state.params.and = payload;
        },
        setName(state, payload) {
            state.employee.name = payload;
        },
        setNo(state, payload) {
            state.employee.no = payload;
        },
        setJumin(state, payload) {
            state.employee.jumin = payload;
        },
        setCellphone(state, payload) {
            state.employee.cellphone = payload;
        },
        setEmail(state, payload) {
            state.employee.email = payload;
        },
        setStatusType(state, payload) {
            state.employee.status.type = payload;
        },
        setStatusPart(state, payload) {
            state.employee.status.part = payload;
        },
        setBankName(state, payload) {
            state.employee.bank.name = payload;
        },
        setBankAccount(state, payload) {
            state.employee.bank.account = payload;
        },
        setBankOwner(state, payload) {
            state.employee.bank.owner = payload;
        },
        setEmployees: (state, payload) => {
            state.employees = payload;
        },
        setEmployee: (state, payLoad) => {
            state.employee = payLoad;
        },
        setIsBusy: (state, payLoad) => {
            state.isBusy = payLoad;
        }
    },
    /* 이하 수정 요망 */
    actions: {
        defaultParams: ( { commit } ) => {
            commit("setPage", 1);
            commit("setDocEa", 1);
            commit("setField", "created");
            commit("setAscend", false);
            commit("setAnd", true);
        },
        defaultEmployee: ( { commit, state } ) => {
            commit( "setEmployee", util.defaultAll(state.employee, "") );
        },
        /*
        defaultSearchedParams: ( { commit, state } ) => {
            for ( let key in state.params) {
                if (state.params[key].search) {
                    commit( "set" + util.toCamelWithDot(key), state.params[key].default);
                }
            }
        },
        defaultParam: ( {commit, state}, field ) => {
            commit( "set" + util.toCamelWithDot(field), state.params[field].default );
        },
        defaultAscend: ( {commit, state} ) => {
            commit( "setField", state.params.field.default );
        },
        */
        fetch: ( {commit, state, getters} ) => {
            commit("setIsBusy", true);
            let params = getters.httpParams;
            db.fetchCount(state.model, params).then(response => {
                if (response.status === 200) {
                    commit("setCount", response.data);
                }
            }).catch(() => {
                commit("setCount", null);
            });

            db.fetchData(state.model, params).then(response => {
                if (response.status === 200) {
                    commit("setIsBusy", false);
                    commit("setEmployees", response.data);
                }
            }).catch(() => {
                commit("setIsBusy", false);
                commit("setEmployees", null);
            });
        },
        /*
        async fetchAsync( {commit, state, getters} ) {
            commit("setIsBusy", true);
            let params = getters.httpParams;
            try {
                const response = await db.fetchCount(state.model, params);
                if (response.status === 200) {
                    commit("setCount", response.data);
                }
            } catch {
                commit("setCount", null);
            }

            try {
                const response = await db.fetchData(state.model, params);
                commit("setIsBusy", false);
                if (response.status === 200) {
                    commit("setEmployees", response.data);
                    commit("setPageSync", state.params.page);
                }
            } catch {
                commit("setIsBusy", false);
                commit("setEmployees", null);
            }
        },
         */
        async fetchAsync( {commit, state, getters} ) {
            commit("setIsBusy", true);
            let params = getters.httpParams;
            try {
                const response1 = await db.fetchCount(state.model, params);
                const response2 = await db.fetchData(state.model, params);
                if (response1.status === 200 && response2.status === 200) {
                    commit("setCount", response1.data);
                    commit("setEmployees", response2.data);
                    commit("setPageSync", state.params.page);
                }
                commit("setIsBusy", false);
            } catch {
                commit("setCount", null);
                commit("setIsBusy", false);
                commit("setEmployees", null);
            }
        },
        async fetchAsync2( {commit, state, getters} ) {
            commit("setIsBusy", true);
            let params = getters.httpParams;
            try {
                const response1 = await db.fetchCount(state.model, params);
                if (response1.status === 200) {
                    commit("setCount", response1.data);
                }
            } catch {
                commit("setCount", null);
            }
        },
        fetchOne: ( {commit, state}, id ) => {
            db.fetchOne(state.model, id).then(response => {
                if (response.status === 200) {
                    commit("setEmployee", response.data);
                }
            }).catch(() => {
                commit("setEmployee", null);
            });
            /*
            이 함수를 아래처럼 수정하고, 호출하는 곳에서 this.fetchOne(id).then ~~~~ .catch ~~~를 호출하여,
            'then' 내에서 동기적 실행 가능, 이경우 아래 async fetchOneAsync와 쓰임새 동일

            return db.fetchOne(state.model, id).then(response => {
                if (response.status === 200) {
                    commit("setemployee", response.data);
                }
            });

             */
        },
        async fetchOneAsync( {commit, state}, id ) {
            try {
                const response = await db.fetchOne(state.model, id);
                if (response.status === 200) {
                    commit("setEmployee", response.data);
                }
            } catch {
                commit("setEmployee", null);
            }
        },
        /*
        async create( { state } ) {
            try {
                const response = await db.create(state.model, state.employee);
                if (response.satus === 201) {
                    //ok
                }
            } catch {

            }
        }
        */
    }
}