export default {
    namespaced: true,
    state: {
        model: "board",
        params: {
            page: 1,
            count: 0,
            docEa: 5,
            field: "created",
            ascend: false,
            and: true
        },
        board: {
            _id: "",
            no: "",
            boardid: "",
            userid: "",
            name: "",
            subject: "",
            content: "",
            created: "",
            updated: ""
        },
        isBusy: false,
    },
    getters: {
        totalPage: state => {
            return parseInt( (state.params.count-1) / state.params.docEa) + 1;
        }
    },
    mutations: {
        setParams(state, payload) {
            state.params = payload;
        },
        setPage(state, payload) {
            state.params.page = payload;
        },
        setCount(state, payload) {
            state.params.count = payload;
        },
        setDocEa(state, payload) {
            state.params.docEa = payload;
        },
        setField(state, payload) {
            state.params.field = payload;
        },
        setAscend(state, payload) {
            state.params.ascend = payload;
        },
        setAnd(state, payload) {
            state.params.and = payload;
        },
        setNo(state, payload) {
            state.board.no = payload;
        },
        setBoardid(state, payload) {
            state.board.boardid = payload;
        },
        setUserid(state, payload) {
            state.board.userid = payload;
        },
        setName(state, payload) {
            state.board.name = payload;
        },
        setSubject(state, payload) {
            state.board.subject = payload;
        },
        setContent(state, payload) {
            state.board.content = payload;
        },
        setCreated(state, payload) {
            state.board.created = payload;
        },
        setUpdated(state, payload) {
            state.board.updated = payload;
        },
        setBoard(state, payload) {
            state.board = payload;
        }
    },
    actions: {
    }
}