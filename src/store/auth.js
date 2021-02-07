import * as authApi from "@/api/auth";

export default {
    namespaced: true,

    state: { 
        token: null 
    },
    
    mutations: { 
        setToken(state, token) { 
            state.token = token 
        } 
    },

    actions: { 
        async login(context, {userId, password} ) {
            try {
                const response = await authApi.login(userId, password);
                if (response.status === 200) {
                    context.commit('setToken', response.data.token);
                }
            } catch(e) {
                alert("아이디 또는 비밀번호가 올바르지 않습니다.");
            }
        }, 
        loginWithtoutAsync(context, {userId, password}) {
            authApi.login(userId, password).then( (response) => {
                if (response.status === 200) {
                    context.commit('setToken', response.data.token);
                }
            }).catch( () => {
                alert("아이디 또는 비밀번호가 올바르지 않습니다.");
            });
        }
    }
}