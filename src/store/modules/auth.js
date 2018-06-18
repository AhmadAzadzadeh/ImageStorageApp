import qs from "qs";
import { router } from "../../main";
import api from "../../api/imgur";

const state = {
    token: window.localStorage.getItem("imgur_token")
};

const getters = {
    isLoggedIn: state => !!state.token
};

const actions = {
    login: () => {
        api.login();
    },
    finalizeLogin({ commit }, hash) {
        const query = qs.parse(hash.replace("#", ""));
        commit('setToken', query.access_token);
        window.localStorage.setItem("imgur_token", query.access_token);
        // Redirect the user to main page
        router.push("/");
    },
    logout: ({ commit }) => {
        // we should call the mutations with commit method
        commit("setToken", null);
        window.localStorage.removeItem("imgur_token");
    }
};

const mutations = {
    setToken: (state, token) => {
        state.token = token;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};