<template>

  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div v-if="!timerActive" class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <h1 class="font-bold">회원가입</h1>
      <!-- <form class="space-y-6"> -->
      <div>
        <label for="email" class="block text-sm font-medium leading-6 text-gray-900">이메일</label>
        <div class="mt-2">
          <input id="email" name="email" type="email" autocomplete="email" required="" v-model="user.userId"
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
      </div>

      <div class="mt-4">
        <label for="password" class="block text-sm font-medium leading-6 text-gray-900">패스워드</label>
        <div class="mt-2">
          <input id="password" name="password" type="password" autocomplete="password" required=""
            v-model="user.password"
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
      </div>

      <div class="mt-4">
        <label for="password2" class="block text-sm font-medium leading-6 text-gray-900">패스워드 확인</label>
        <div class="mt-2">
          <input id="password2" name="password2" type="password" autocomplete="password" required=""
            v-model="user.password2"
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
      </div>

      <div class="mt-4">
        <label for="usnerName" class="block text-sm font-medium leading-6 text-gray-900">이름</label>
        <div class="mt-2">
          <input id="usnerName" name="usnerName" type="text" autocomplete="usnerName" required="" maxlength="10"
            v-model="user.userName"
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
      </div>

      <div class="mt-4">
        <button @click="goLoginPage"
          class="flex w-full justify-center rounded-md bg-stone-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-600">뒤로가기</button>
      </div>

      <div class="mt-4">
        <button @click="signupCheck"
          class="flex w-full justify-center rounded-md bg-red-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500">회원가입</button>
      </div>
      <!-- </form> -->
    </div>

    <div v-if="timerActive" class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm"><!-- <form class="space-y-6"> -->
      <div class="mt-4">
        <label for="email" class="block text-sm font-medium leading-6 text-gray-900">인증번호를 입력해주세요</label>
        <div>
          <h1 class="text-red-600">{{ formattedTime }}</h1>
        </div>
        <div class="mt-2">
          <input id="email" name="email" type="email" autocomplete="email" required="" v-model="user.checkCode"
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
        </div>
      </div>
      <div class="mt-4">
        <button @click="goJoinPage"
          class="flex w-full justify-center rounded-md bg-stone-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-600">뒤로가기</button>
      </div>
      <div class="mt-4">
        <button @click="join"
          class="flex w-full justify-center rounded-md bg-red-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500">인증확인</button>
      </div><!-- </form> -->
    </div>

  </div>

</template>

<script setup>
import { ref, reactive, inject, onMounted, computed } from 'vue';
const router = inject('router');
const axios = inject('$axios');

const user = reactive({
  userId: '',
  password: '',
  password2: '',
  userName: '',
  checkCode : ''
});

const timerActive = ref(false);
const time = ref(300);
let interval;

//타이머 시간표시
const formattedTime = computed(() => {
  const minutes = Math.floor(time.value / 60);
  const seconds = time.value % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
});

//로그인페이지 가기
const goLoginPage = () => {
  router.push("/");
};

//회원가입 버튼 클릭
const signupCheck = async () => {
  try {
    const response = await axios.post('/auth/signupCheck', {
      userId: user.userId
    });

    if(response.data.statusCode == "OK"){
      //이메일 발송
      sendEmail();

      //timer
      toggleTimer();
    }
  } catch (error) {
    alert(error.response.data.message);
    console.error('Error occurred while saving:', error);
  }
};

//이메일 발송
const sendEmail = async () => {
  try {
    const response = await axios.post('/auth/sendEmail', {
      userId: user.userId
    });

    console.log(response);

  } catch (error) {
    console.error('Error occurred while saving:', error);
  }
}

//인증코드 체크후 맞으면 회원가입처리
const join = async () => {
  try {
    const response = await axios.post('/auth/signup', {
       userId: user.userId
      ,password: user.password
      ,userName: user.userName
      ,checkCode: user.checkCode
    });

    console.log(response);
    if(response.data.statusCode == "OK"){
      alert("회원가입이 완료되었습니다.");
      goLoginPage();
    }

  } catch (error) {
    alert(error.response.data.message);
    console.error('Error occurred while saving:', error);
  }
};

//타이머 toggle
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

//인증화면 -> 뒤로가기 버튼 클릭
const goJoinPage = () => {
  time.value = 300;
  clearInterval(interval);
  router.push("/");
};


//화면 load됬을때 토큰이있으면 메인페이지로
onMounted(() => {
  const access_token = localStorage.getItem('accessToken');
  if (access_token != null) {
    router.push("/search");
  }
});

</script>