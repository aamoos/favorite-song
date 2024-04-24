<template>

  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div v-if="!timerActive" class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <!-- <form class="space-y-6"> -->
      <div>
        <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
        <div class="mt-2">
          <input id="email" name="email" type="email" autocomplete="email" required="" v-model="user.userId"
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
          <div class="text-sm">
            <a class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot
              password?</a>
          </div>
        </div>
        <div class="mt-2">
          <input id="password" name="password" type="password" autocomplete="current-password" required=""
            v-model="user.password"
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
      </div>

      <div>
        <label for="usnerName" class="block text-sm font-medium leading-6 text-gray-900">이름</label>
        <div class="mt-2">
          <input id="usnerName" name="usnerName" type="text" autocomplete="usnerName" required="" maxlength="10"
            v-model="user.userName"
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
      </div>

      <br>
      <div>
        <button @click="goLoginPage"
          class="flex w-full justify-center rounded-md bg-stone-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-600">뒤로가기</button>
      </div>
      <br>

      <div>
        <button @click="toggleTimer"
          class="flex w-full justify-center rounded-md bg-red-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500">회원가입</button>
      </div>
      <br>
      <!-- </form> -->
    </div>

    <div v-if="timerActive" class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm"><!-- <form class="space-y-6"> -->
      <div><label for="email" class="block text-sm font-medium leading-6 text-gray-900">인증번호를 입력해주세요</label>
        <div>
          <h1 class="text-red-600">{{ formattedTime }}</h1>
        </div>
        <div class="mt-2"><input id="email" name="email" type="email" autocomplete="email" required=""
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
        </div>
      </div>
      <br>
      <div>
        <button @click="goJoinPage"
          class="flex w-full justify-center rounded-md bg-stone-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-600">뒤로가기</button>
      </div>
      <br>
      <div><button
          class="flex w-full justify-center rounded-md bg-red-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500">인증확인</button>
      </div><br><!-- </form> -->
    </div>

  </div>

</template>

<script setup>
import { ref, reactive, inject, onMounted, computed } from 'vue';
const router = inject('router');

const user = reactive({
  userId: '',
  password: '',
  userName: ''
});

const timerActive = ref(false);
const time = ref(300);
let interval;

const formattedTime = computed(() => {
  const minutes = Math.floor(time.value / 60);
  const seconds = time.value % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
});

const goLoginPage = () => {
  router.push("/");
};

const toggleTimer = () => {
  timerActive.value = !timerActive.value;
  if (timerActive.value) {
    interval = setInterval(() => {
    if (time.value > 0) {
      time.value--;
      if (time.value === 0) {
        clearInterval(interval);
        alert("인증시간이 지났습니다. 다시 회원가입 해주세요");
        timerActive.value = false;
      }
    }
  }, 1000);
  }
};

const goJoinPage = () => {
  time.value = 300;
  clearInterval(interval);
  timerActive.value = !timerActive.value;
};

onMounted(() => {
  const access_token = localStorage.getItem('accessToken');
  if (access_token != null) {
    router.push("/search");
  }
});

</script>