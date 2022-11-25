<template>
  <div class="xtx-tabs-panel" v-show="activeName">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue';

const props = defineProps<{
  label: string;
  name: string | number;
}>();

const activeName = inject('activeName');
</script>
