export function createAction(name) {
    const type = Symbol(name);
    const action = payload => ({ type, payload });
    action.type = type;
    action.toString = () => type;
    return action;
}

export const createReducer = (handlers, initialState) =>
    (state = initialState, { type, payload }) =>
            handlers[type] ? handlers[type](state, payload) : state;
