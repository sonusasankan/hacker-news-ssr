
import { FETCH_NEWS } from '../actions';

export default ( state = [], action ) => {
    switch ( action.type ) {
        case FETCH_NEWS:
            return action.payload.data.hits;
        default:
            return state;
         
    }
}