import { FETCH_NEWS  } from '../actions/index';



export default function(state = [], action) {

    switch(action.type) {
        case FETCH_NEWS:
            action.payload.data.response.results.map((value) => {
                let isCopy = false;

                state.map((nestedValue) => {
                    if(value.id === nestedValue.id) {
                        isCopy = true;
                    }
                })
                if(!isCopy) {
                    state.push(value)
                }
            })
            return state

    }
    return state;
}