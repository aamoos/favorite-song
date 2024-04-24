import axios from 'axios';
import jwtDecode from "vue-jwt-decode";

const state = {
  token: null,
  user: null,
  isLoggedIn: false
};

const getters = {
  isLoggedIn: (state) => state.token,
  getUser: (state) => state.user,
};

const actions = {
  async login({ commit }, credentials) {
    console.log(credentials);
    const response = await axios.post('/auth/authenticate', credentials);
    const token = response.data.token;
    const refreshToken = response.data.refreshToken;
    //jwt token 로컬스토리지에 저장
    localStorage.setItem('accessToken', token);
    localStorage.setItem('refreshToken', refreshToken);

    commit('setToken', token);
    commit('setUser', jwtDecode.decode(token));
  },

  logout({ commit }) {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    commit('setToken', null);
    commit('setUser', null);
    
  },

  checkAuthentication({ commit }) {
    const token = localStorage.getItem('accessToken');
    if (token) {
      commit('setToken', token);
      commit('setUser', jwtDecode.decode(token));
    }
  }
};

const mutations = {
  setToken(state, token) {
    state.token = token;
    //token값 없으면 login false 있으면 true
    if(token == null) state.isLoggedIn = false;
    else state.isLoggedIn = true;
  },

  setUser(state, user) {
    state.user = user;
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
};