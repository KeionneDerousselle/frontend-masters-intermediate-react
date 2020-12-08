export default function location(state = 'Seattle, WA', action) {
  return action.type === 'CHANGE_LOCATION' ? action.payload : state
}
