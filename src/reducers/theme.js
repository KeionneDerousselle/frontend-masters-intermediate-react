export default function theme(state = 'darkblue', action) {
  return action.type === 'CHANGE_THEME' ? action.payload : state
}
