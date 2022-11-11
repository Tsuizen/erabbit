<template>
  <div class="xtx-bread-item">
    <RouterLink v-if="to" :to="to"><slot /></RouterLink>
    <span v-else><slot /></span>
  </div>
</template>

<script lang="ts">
export default { name: 'XtxBreadItem' };
</script>

<script setup lang="ts">
interface Props {
  to: string;
}

withDefaults(defineProps<Props>(), {
  to: ''
});
</script>
