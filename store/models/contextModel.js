import {action} from 'easy-peasy';
const contextModel = {
  contexts: [{name: 'home', current: true}, {name: 'office', current: false}],
  contextChange: action(state => {
    // state.todos[state.currentContext] = [];
    const currentContext = state.contexts.findIndex(context => context.current);
    console.log(currentContext);
    if (currentContext === state.contexts.length - 1) {
      state.contexts[0].current = true;
      state.contexts[currentContext].current = false;
    } else {
      state.contexts[currentContext + 1].current = true;
      state.contexts[currentContext].current = false;
    }
  }),
};
export default contextModel;
