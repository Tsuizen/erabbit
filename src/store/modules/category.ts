import { findAllCategory } from '@/api/category';
import { topCategory } from '@/api/constant';
import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';
import type { CategoryResult } from '@/types/category';

export function isCategoryResult(
  item: CategoryResult[] | { name: string }[]
): item is CategoryResult[] {
  return (item as CategoryResult[]) !== undefined;
}

const categoryStore = defineStore(
  'category',
  () => {
    // 如果默认是[]数组，看不见默认的9个分类，等加载完数据才能看到
    // 所以常量数据生成一个默认的顶级数组，不会产生空白
    const list: Ref<CategoryResult[]> | Ref<{ name: string }[]> = ref(
      topCategory.map((item) => ({ name: item }))
    );

    function setList(category: CategoryResult[]) {
      if (isCategoryResult(category)) {
        list.value = category;
      }
    }

    async function getList() {
      const { result } = await findAllCategory();
      result.forEach((item: CategoryResult) => {
        item.open = false;
      });
      setList(result);
    }

    function show(item: CategoryResult) {
      if (isCategoryResult(list.value)) {
        const category: CategoryResult | undefined = list.value.find(
          (category: CategoryResult) => category.id === item.id
        );
        if (category) {
          category.open = true;
        }
      }
    }

    function hide(item: CategoryResult) {
      if (isCategoryResult(list.value)) {
        const category: CategoryResult | undefined = list.value.find(
          (category: CategoryResult) => category.id === item.id
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
