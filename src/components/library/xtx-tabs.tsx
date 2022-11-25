import { useVModel } from '@vueuse/core';
import { defineComponent, provide, useSlots } from 'vue';
import styles from './xtx-tabs.module.less';

export default defineComponent({
  name: 'XtxTabs',

  props: {
    modelValue: {
      type: [String, Number]
    }
  },

  setup(props, { emit }) {
    const activeName = useVModel(props, 'modelValue', emit);
    const slots = useSlots();

    const tabClick = (name: string, index: number) => {
      activeName.value = name;
      emit('tab-click', { name, index });
    };
    provide('activeName', activeName);

    const panels = slots.default!();
    const dynamicPanels: any[] = [];

    panels.forEach((item: any) => {
      if (item.type.name === 'xtx-tabs-panel') {
        dynamicPanels.push(item);
      } else {
        item.children.forEach((child: any) => {
          dynamicPanels.push(child);
        });
      }
    });
    const nav = (
      <nav>
        {dynamicPanels.map((item, i) => {
          return (
            <a
              onClick={() => tabClick(item.props.name, i)}
              class={{ active: item.props.name === activeName }}
              href="javascript:;"
            >
              {item.props.label}
            </a>
          );
        })}
      </nav>
    );

    return () => <div class={styles['xtx-tabs']}>{[nav, dynamicPanels]}</div>;
  }
});
