import { findAllCategory } from '@/api/category';
import { topCategory } from '@/api/constants';
import type { Category } from '@/types/category';
import { defineStore } from 'pinia';
import { ref } from 'vue';

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

    const setList = (category: Category[]) => {
      if (isCategoryResult(category)) {
        list.value = category;
      }
    };

    const show = (item: Category) => {
      if (isCategoryResult(list.value)) {
        const category: Category | undefined = list.value.find(
          (category: Category) => category.id === item.id
        );
        if (category) {
          category.open = true;
        }
      }
    };

    const hide = (item: Category) => {
      if (isCategoryResult(list.value)) {
        const category: Category | undefined = list.value.find(
          (category: Category) => category.id === item.id
        );
        if (category) {
          category.open = false;
        }
      }
    };

    const getList = async () => {
      const { result } = await findAllCategory();
      result.forEach((item: Category) => {
        item.open = false;
      });
      setList(result);
    };

    return { list, setList, getList, show, hide };
  },
  {
    persist: true
  }
);

export default categoryStore;
