import cartStore from '@/store/modules/cart';
import categoryStore from '@/store/modules/category';
import userStore from '@/store/modules/user';

export const useUserStore = () => userStore();
export const useCategoryStore = () => categoryStore();
export const useCartStore = () => cartStore();
