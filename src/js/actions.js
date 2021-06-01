export const chooseTZ = (state, { target: { value } }) => ({
  ...state,
  chosenTZ: [...state.chosenTZ, value],
});
export const preventPropagation = (action) => (state, event) =>
  [state, [(dispatch) => (event.stopPropagation(), dispatch(action))]];
export const logInput = (state, { target: { value } }) => ({
  ...state,
  currentCG: value,
});
export const toggleCreator = (state) => ({
  ...state,
  isCreating: !state.isCreating,
});
export const addSwap = (state) => ({
  ...state,
  guardSwaps: [...state.guardSwaps, {}],
});
export const updateAmount = (state, { target: { value } }) => ({
  ...state,
  currentAmount: value,
});
export const updateLevel = (state, { target: { value } }) => ({
  ...state,
  currentLevel: value,
});

export const removeCG = (idx) => (state) => ({
  ...state,
  guardSwaps:
    state.guardSwaps.length == 1 ? [] : [...state.guardSwaps.splice(idx, 1)],
});
export const removeTZ = (idx) => (state) => ({
  ...state,
  chosenTZ:
    state.chosenTZ.length == 1 ? [] : [...state.chosenTZ.splice(idx, 1)],
});

export const addCG = (state) => ({
  ...state,
  isCreating: !state.isCreating,
  guardSwaps: [
    ...state.guardSwaps,
    ...(state.currentCG && [
      {
        level: state.currentLevel,
        amount: state.currentAmount,
        date: new Date(state.currentCG),
      },
    ]),
  ],
});
