<template>

  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto" src="../assets/app_logo.jpg" alt="Your Company" />
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Favorite Song</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <!-- <form class="space-y-6"> -->
      <div>
        <label for="email" class="block text-sm font-medium leading-6 text-gray-900">이메일</label>
        <div class="mt-2">
          <input id="email" name="email" type="email" autocomplete="email" required="" v-model="user.userId"
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
      </div>

      <div class="mt-4">
        <div class="flex items-center justify-between">
          <label for="password" class="block text-sm font-medium leading-6 text-gray-900">패스워드</label>
          <div class="text-sm">
            <a @click="passwordFind" href="javascript:void(0)"
              class="font-semibold text-indigo-600 hover:text-indigo-500">비밀번호
              찾기</a>
          </div>
        </div>
        <div class="mt-4">
          <input id="password" name="password" type="password" autocomplete="current-password" required=""
            v-model="user.password"
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
      </div>

      <div class="mt-4">
        <button @click="join"
          class="flex w-full justify-center rounded-md bg-red-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500">회원가입</button>
      </div>

      <div class="mt-4">
        <button @click="login"
          class="flex w-full justify-center rounded-md bg-stone-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-600">로그인</button>
      </div>

      <div class="mt-4">
        <button @click="socialLogin('google')"
          class="flex w-full justify-center rounded-md bg-[#4285F4] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#357AE8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4]">구글
          로그인</button>
      </div>

      <div class="mt-4">
        <button @click="socialLogin('naver')"
          class="flex w-full justify-center rounded-md bg-[#03C75A] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#02B34D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#03C75A]">네이버
          로그인</button>
      </div>

      <div class="mt-4">
        <button @click="socialLogin('kakao')"
          class="flex w-full justify-center rounded-md bg-[#FFCD00] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#E6B800] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFCD00]">카카오
          로그인</button>
      </div>

      <div class="mt-4">
        <button @click="test()"
          class="flex w-full justify-center rounded-md bg-[#FFCD00] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#E6B800] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFCD00]">테스트</button>
      </div>
      <!-- </form> -->
    </div>
  </div>
</template>

<script setup>
import { inject, reactive, onMounted } from 'vue';

const jwtDecode = inject('jwtDecode'); 

const router = inject('router');
const store = inject('store');

const user = reactive({
  userId: '',
  password: '',
});

const test = async () => {
  console.log(process.env.VUE_APP_BACKEND_URL);
  console.log(process.env.VUE_APP_FRONTEND_URL);
}

//로그인
const login = async () => {
  try {
    await store.dispatch('login', {
      userId : user.userId,
      password : user.password
    });
    // Redirect to home page after login
    router.push("/search");
  } catch (error) {
    console.log(error.response);
    alert(error.response.data.message);
    console.log(error);
  }
};

//소셜로그인
const socialLogin = (target) => {
  window.location.href = process.env.VUE_APP_BACKEND_URL + '/oauth2/authorize/' + target + '?redirect_uri=' + process.env.VUE_APP_FRONTEND_URL + '/oauth2/redirect';
};


//회원가입
const join = () => {
  router.push("/join");
};

//비밀번호 찾기
const passwordFind = () => {
  router.push("/passwordFind");
}

// onMounted(() => {
//   const access_token = localStorage.getItem('accessToken');
//   if (access_token != null) {
//     router.push("/search");
//   }
// });

onMounted(() => {
  const token = router.currentRoute.value.query.token
  const refreshToken = router.currentRoute.value.query.refreshToken
  alert(token);
  if (token) {
    store.commit('setToken', token);
    store.commit('setUser', jwtDecode.decode(token));

    localStorage.setItem('accessToken', token);
    localStorage.setItem('refreshToken', refreshToken);
    router.push("/search");
  } else {
    router.push("/");
  }
});


</script>