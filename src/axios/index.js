// import axioss from 'axios'
import store from '@/store/store' //store
import jwtDecode from "vue-jwt-decode";
import routers from '@/routers/index'      //router

import axios from 'axios'

export const instance = axios.create({
    baseURL: process.env.VUE_APP_FRONTEND_URL
})

// Add a request interceptor
instance.interceptors.request.use((config) => {
      const currentURL = window.location.pathname;

    if( !config.url.includes("/auth")){
      // 요청 전에 수행할 작업
      const token = localStorage.getItem('accessToken');
      
      if (token) {
        const currentTime = Math.floor(Date.now() / 1000) // 현재 시간 (단위: 초)
        const jwtTokenExp = store.getters.getUser.exp
        const refreshTokenExp = jwtDecode.decode(localStorage.getItem('refreshToken')).exp;
        
        if (jwtTokenExp < currentTime) {
          // JWT 토큰이 만료된 경우 처리 로직 추가
          console.log('JWT 토큰이 만료되었습니다.')
        }

        if(refreshTokenExp < currentTime){
          console.log('JWT 리프레시 토큰이 만료되었습니다.')
          store.dispatch("logout");
        }

        else {
          // JWT 토큰이 만료되지 않은 경우 헤더에 JWT 토큰 추가
          
          config.headers.Authorization = `Bearer ${token}`
        }
      }else{
        console.log(currentURL);
        routers.push("/userLogin");
      }
    }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor
instance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config
    console.log(error);
    const currentURL = window.location.pathname;

    //login 페이지에서는 refresh token 호출안되게 처리
    if(currentURL != "/" && currentURL != "/join" && currentURL != "/passwordFind"){
      if(error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true
        try {
          // JWT 토큰 재발급 요청
          const response = await axios.post('/auth/refresh', {
            refreshToken: localStorage.getItem('refreshToken')
          })
          const token = response.data.token
          const refreshToken = response.data.refreshToken;

          // const jwtTokenExp = response.data.expires_at
          localStorage.setItem('accessToken', token)
          localStorage.setItem('refreshToken', refreshToken);

          store.commit('setToken', token);
          store.commit('setUser', jwtDecode.decode(token));

          // 재발급된 JWT 토큰을 헤더에 추가하여 원래 요청 다시 보내기
          originalRequest.headers.Authorization = `Bearer ${token}`
          return axios(originalRequest)
        } catch (error) {
          console.log(error);
          // JWT 토큰 재발급 실패 처리 로직 추가
          console.log('JWT 토큰 재발급에 실패하였습니다.')
          return Promise.reject(error)
        }
      }
    }
    return Promise.reject(error)
  }
)