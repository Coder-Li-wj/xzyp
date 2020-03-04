function broadcast(componentName, eventName, params) {
    //遍历所有子组件
    this.$children.forEach(child => {
        const name = child.$options.name;
        // 判断子组件的名字是否等于传入的组件名称
        if (name === componentName) {
          // 如果子组件的名字等于传入的组件名称就调用 $emit 触发事件
            child.$emit.apply(child, [eventName].concat(params));
        } else {
            // todo 如果 params 是空数组，接收到的会是 undefined
            broadcast.apply(child, [componentName, eventName].concat([params]));
        }
    });
}
export default {
    methods: {
        dispatch(componentName, eventName, params) {
          // 获取基于当前组件的父组件实例，这里对父组件实例和根组件实例做了兼容处理
            let parent = this.$parent || this.$root;
          // 通过父组件的 $option 属性获取组件的名称
            let name = parent.$options.name;

          // 当相对当前组件的父组件实例存在，而且当父组件的名称不存在或者父组件的名称不等于传入的组件名称时，执行循环
            while (parent && (!name || name !== componentName)) {
              // 记录父组件的父组件
                parent = parent.$parent;
              // 当父组件的父组件存在时，获取祖父组件的名称
                if (parent) {
                    name = parent.$options.name;
                }

            }
            // 当循环结束是，parent 的值就是最终匹配的组件实例
            if (parent) {
              // 当 parent 值存在时调用 $emit 方法
              // 传入 parent 实例、事件名称与 params 参数组成的数组
              // 触发传入事件名称 eventName 同名的事件
                parent.$emit.apply(parent, [eventName].concat(params));
            }
        },
        broadcast(componentName, eventName, params) {
            broadcast.call(this, componentName, eventName, params);
        }
    }
};
