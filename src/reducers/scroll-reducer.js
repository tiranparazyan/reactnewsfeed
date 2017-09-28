import { HAS_SCROLLED  } from '../actions/scroll-action';


export default function(state = {scrolled:0, currentPage:1}, action) {
    switch(action.type) {
        case HAS_SCROLLED:
            return state = {scrolled: action.payload, currentPage: action.currentPage};

    }
    return state;
}