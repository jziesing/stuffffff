import { RECEIVE_TRADE, RECEIVE_ALL_TRADES } from '../actions/transaction_actions';

const TransactionsReducer = (state = {}, action) => {
    Object.freeze(state);
    let nextState = Object.assign({}, state);
// debugger
    switch (action.type) {
        case RECEIVE_ALL_TRADES:
            return action.transactions
        case RECEIVE_TRADE:
            Object.assign(nextState, {[action.transaction.ticker]: action.transaction});
            return nextState;
        default:
            return state;
    }
};

export default TransactionsReducer;