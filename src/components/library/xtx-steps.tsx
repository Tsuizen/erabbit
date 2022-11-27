import { defineComponent } from 'vue';
import './xtx-steps.less';

export default defineComponent({
  name: 'XtxSteps',
  props: {
    active: {
      type: Number,
      default: 1
    }
  },

  setup(props, { slots }) {
    // 获取默认插槽
    const items = slots.default!();
    // 获取所有xtx-steps-item节点
    const dymanicItems: any[] = [];
    items.forEach((item: any) => {
      if (item.type.name === 'XtxStepsItem') {
        dymanicItems.push(item);
      } else {
        item.children.forEach((item: any) => {
          dymanicItems.push(item);
        });
      }
    });
    // 根据动态节点生成
    return () => (
      <div class="xtx-steps">
        {dymanicItems.map((item, i) => {
          return (
            <div class={['xtx-steps-item', i < props.active ? 'active' : '']}>
              <div class="step">
                <span>{i + 1}</span>
              </div>
              <div class="title">{item.props.title}</div>
              <div class="desc">{item.props.desc}</div>
            </div>
          );
        })}
      </div>
    );
  }
});
