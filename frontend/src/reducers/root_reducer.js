import { combineReducers } from 'redux';
import session from './session_reducer';
import errors from './errors_reducer';
import ui from './ui_reducer';
import stocks from './alphaAPI_reducer'
import transactions from './transactions_reducer'
import portfolio from './portfolio_reducer'

const RootReducer = combineReducers({
    session,
    errors,
    ui,
    stocks,
    transactions,
    portfolio
});

export default RootReducer;