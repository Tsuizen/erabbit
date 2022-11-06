import { defineStore } from 'pinia';
import { ref } from 'vue';

interface ProfileState {
  id: string;
  avatar: string;
  nickname: string;
  account: string;
  mobile: string;
  token: string;
}

const userStore = defineStore(
  'user',
  () => {
    const profile = ref({
      id: '',
      avatar: '',
      nickname: '',
      account: '',
      mobile: '',
      token: ''
    });

    function setUser(user: ProfileState) {
      profile.value = user;
    }

    return { profile, setUser };
  },
  {
    persist: true
  }
);

export default userStore;
