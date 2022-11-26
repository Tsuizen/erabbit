import { defineComponent, inject } from 'vue';

export default defineComponent({
  name: 'XtxTabsPanel',
  props: {
    label: {
      type: String,
      default: ''
    },
    name: {
      type: [String, Number],
      default: ''
    },
    isActive: {
      type: Boolean
    }
  },

  setup(props, { slots }) {
    const activeName = inject('activeName');
    return () => (
      <div v-show={props.name === activeName}>{slots.default?.()}</div>
    );
  }
});
