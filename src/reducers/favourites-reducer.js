import { FAVORITES_LIST  } from '../actions/favorites-action';


export default function(state = [], action) {

    switch(action.type) {
        case FAVORITES_LIST:
            return state = state.concat(action.payload);

    }
    return state;
}