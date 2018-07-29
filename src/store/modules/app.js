import { getSideStateLocal, setSideStateLocal } from '@/utils/localStorage';


export default {
    state: {
        sideState: !getSideStateLocal()
    },
    mutations: {
        TOGGLE_SIDE(state) {
            if (state.sideState) {
                setSideStateLocal(true)
            } else {
                setSideStateLocal(false)
            }
            state.sideState = !state.sideState
        }
    }
}