import { findAllCategory } from '@/api/category';
import { topCategory } from '@/api/constant';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Category } from '@/types/category';

export function isCategoryResult(
  item: Category[] | { name: string }[]
): item is Category[] {
  return (item as Category[]) !== undefined;
}

const categoryStore = defineStore(
  'category',
  () => {
    // 如果默认是[]数组，看不见默认的9个分类，等加载完数据才能看到
    // 所以常量数据生成一个默认的顶级数组，不会产生空白
    const list = ref<Category[] | { name: string }[]>(
      topCategory.map((item) => ({ name: item }))
    );

    function setList(category: Category[]) {
      if (isCategoryResult(category)) {
        list.value = category;
      }
    }

    async function getList() {
      const { result } = await findAllCategory();
      result.forEach((item: Category) => {
        item.open = false;
      });
      setList(result);
    }

    function show(item: Category) {
      if (isCategoryResult(list.value)) {
        const category: Category | undefined = list.value.find(
          (category: Category) => category.id === item.id
        );
        if (category) {
          category.open = true;
        }
      }
    }

    function hide(item: Category) {
      if (isCategoryResult(list.value)) {
        const category: Category | undefined = list.value.find(
          (category: Category) => category.id === item.id
        );
        if (category) {
          category.open = false;
        }
      }
    }
    return { list, setList, getList, show, hide };
  },
  {
    persist: true
  }
);

export default categoryStore;
