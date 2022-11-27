import { useVModel } from '@vueuse/core';
import { defineComponent, provide } from 'vue';
import './xtx-tabs.less';

export default defineComponent({
  name: 'XtxTabs',
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    }
  },
  emits: ['tab-click'],
  setup(props, { emit, slots }) {
    // 接受v-model的值
    const activeName = useVModel(props, 'modelValue', emit);
    // 点击选项卡触发函数
    const tabClick = (name: string, index: number) => {
      activeName.value = name;
      // 提供一个tab-click自定义事件
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

    return () => (
      <div class="xtx-tabs">
        <nav>
          {dynamicPanels.map((item, i) => {
            return (
              <a
                onClick={() => tabClick(item.props.name, i)}
                class={item.props.name === activeName.value ? 'active' : ''}
              >
                {item.props.label}
              </a>
            );
          })}
        </nav>
        {dynamicPanels}
      </div>
    );
  }
});
