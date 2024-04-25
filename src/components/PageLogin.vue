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
            <a href="javascript:void(0)" class="font-semibold text-indigo-600 hover:text-indigo-500">비밀번호
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
          class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">구글
          로그인</button>
      </div>
      <!-- </form> -->
    </div>
  </div>
</template>

<script setup>
import { inject, reactive, onMounted } from 'vue';
 
const router = inject('router');
const store = inject('store');

const user = reactive({
  userId: '',
  password: '',
});

//로그인
const login = async () => {
  try {
    await store.dispatch('login', {
      userId : user.userId,
      password : user.password
    });
    // Redirect to home page after login
    router.push("/search");
  } catch (err) {
    console.log(err);
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

onMounted(() => {
  const access_token = localStorage.getItem('accessToken');
  if (access_token != null) {
    router.push("/search");
  }
});


</script>