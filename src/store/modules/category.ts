import { findAllCategory } from '@/api/category';
import { topCategory } from '@/api/constant';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { CategoryInfo, CategoryResult } from '@/types';

const categoryStore = defineStore(
  'category',
  () => {
    // 如果默认是[]数组，看不见默认的9个分类，等加载完数据才能看到
    // 所以常量数据生成一个默认的顶级数组，不会产生空白
    const list: any = ref(() => topCategory.map((item) => ({ name: item })));

    function setList(category: CategoryInfo) {
      list.value = category;
    }

    async function getList() {
      const { result } = await findAllCategory();
      result.forEach((item: CategoryResult) => {
        item.open = false;
      });
      setList(result);
    }

    function show(item: CategoryResult) {
      const category: CategoryResult = list.value.find(
        (category: CategoryResult) => category.id === item.id
      );
      category.open = true;
    }

    function hide(item: CategoryResult) {
      const category: CategoryResult = list.value.find(
        (category: CategoryResult) => category.id === item.id
      );
      category.open = false;
    }
    return { list, setList, getList, show, hide };
  },
  {
    persist: true
  }
);

export default categoryStore;
