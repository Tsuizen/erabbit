import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { LocationQueryValue } from 'vue-router';

interface ProfileState {
  id?: string;
  avatar?: string;
  nickname?: string;
  account?: string;
  mobile?: string;
  token?: string;
}

const userStore = defineStore(
  'user',
  () => {
    const profile = ref<ProfileState>({
      id: '',
      avatar: '',
      nickname: '',
      account: '',
      mobile: '',
      token: ''
    });

    const redirectUrl = ref<string | LocationQueryValue[]>('/');

    function setUser(user: ProfileState) {
      profile.value = user;
    }

    function setRedirectUrl(url: string | LocationQueryValue[]) {
      redirectUrl.value = url;
    }

    return { profile, setUser, setRedirectUrl };
  },
  {
    persist: true
  }
);

export default userStore;
