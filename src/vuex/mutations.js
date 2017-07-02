import * as types from './mutations-types'
export default {
    [types.SET_LOGIN_STATE](state, boolean){
        state.isLogin = boolean
    },
}