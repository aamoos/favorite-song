<template>

  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div v-if="!timerActive" class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <h1 class="font-bold">비밀번호 찾기</h1>
      <!-- <form class="space-y-6"> -->
      <div>
        <label for="email" class="block text-sm font-medium leading-6 text-gray-900">이메일</label>
        <div class="mt-2">
          <input id="email" name="email" type="email" autocomplete="email" required="" v-model="user.userId"
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          <div class="input-errors text-red-500" v-for="error in v$.userId.$silentErrors" :key="error.$uid">
            <p class="mt-2 text-sm text-red-600 dark:text-red-500">
              <span class="font-medium"></span>{{ error.$message }}
            </p>
          </div>
        </div>
      </div>

      <div class="mt-4">
        <label for="usnerName" class="block text-sm font-medium leading-6 text-gray-900">이름</label>
        <div class="mt-2">
          <input id="usnerName" name="usnerName" type="text" autocomplete="usnerName" required="" maxlength="10"
            v-model="user.userName"
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          <div class="input-errors text-red-500" v-for="error in v$.userName.$silentErrors" :key="error.$uname">
            <p class="mt-2 text-sm text-red-600 dark:text-red-500">
              <span class="font-medium"></span>{{ error.$message }}
            </p>
          </div>
        </div>
      </div>

      <div class="mt-4">
        <button @click="goLoginPage"
          class="flex w-full justify-center rounded-md bg-stone-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-600">뒤로가기</button>
      </div>

      <div class="mt-4">
        <button @click="passwordFindCheck"
          class="flex w-full justify-center rounded-md bg-red-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500">비밀번호
          찾기</button>
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
          <div class="input-errors text-red-500" v-for="error in c$.checkCode.$silentErrors" :key="error.$ccode">
            <p class="mt-2 text-sm text-red-600 dark:text-red-500">
              <span class="font-medium"></span>{{ error.$message }}
            </p>
          </div>
        </div>
      </div>
      <div class="mt-4">
        <button @click="goJoinPage"
          class="flex w-full justify-center rounded-md bg-stone-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-600">뒤로가기</button>
      </div>
      <div class="mt-4">
        <button @click="passwordFind"
          class="flex w-full justify-center rounded-md bg-red-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500">인증확인</button>
      </div><!-- </form> -->
    </div>

  </div>

</template>

<script setup>
import { ref, reactive, inject, onMounted, computed } from 'vue';
import { useVuelidate } from '@vuelidate/core'
import { helpers, required, email } from "@vuelidate/validators";

const router = inject('router');
const axios = inject('$axios');
const showErrorAlert = inject('showErrorAlert');
const showSuccessAlert = inject('showSuccessAlert');

const user = reactive({
  userId: '',
  userName: '',
  checkCode : ''
});

const rules = {
  userId: {
    required: helpers.withMessage('이메일을 입력해주세요.', required),
    email: helpers.withMessage('올바른 이메일을 입력해주세요.', email)
  },
  userName: { required: helpers.withMessage('이름을 입력해주세요.', required) },
}

const checkCodeRules = {
  checkCode: { required: helpers.withMessage('인증번호를 입력해주세요.', required) },
}

const v$ = useVuelidate(rules, user);
const c$ = useVuelidate(checkCodeRules, user);

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

//비밀번호 찾기 버튼 클릭
const passwordFindCheck = async () => {

  await v$.value.$touch();

  if (v$.value.$invalid) {
    return;
  }

  try {
    const response = await axios.post(process.env.VUE_APP_BACKEND_URL+'/auth/passwordFindCheck', {
       userId: user.userId
      ,userName: user.userName
    });

    if(response.data.statusCode == "OK"){
      //이메일 발송
      sendEmail("checkCode");

      //timer
      toggleTimer();
    }
  } catch (error) {
    showErrorAlert(error.response.data.message);
    console.error('Error occurred while saving:', error);
  }
};

//이메일 발송
const sendEmail = async (type) => {
  try {
    const response = await axios.post(process.env.VUE_APP_BACKEND_URL+'/auth/sendEmail', {
       type: type
      ,userId: user.userId
    });

    console.log(response);

  } catch (error) {
    console.error('Error occurred while saving:', error);
  }
}

//인증코드 체크후 맞으면 패스워드 변경처리
const passwordFind = async () => {

  await c$.value.$touch();

  if (c$.value.$invalid) {
    return;
  }

  try {
    const response = await axios.post(process.env.VUE_APP_BACKEND_URL+'/auth/passwordFind', {
       userId: user.userId
      ,checkCode: user.checkCode
    });

    if(response.data.statusCode == "OK"){
      showSuccessAlert("변경된 임시 비밀번호를 메일로 전송하였습니다.");
      router.push("/");
    }

  } catch (error) {
    showErrorAlert(error.response.data.message);
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
        showErrorAlert("인증시간이 지났습니다. 다시 회원가입 해주세요");
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