import { combineReducers } from 'redux';

import ExcelDataReducer from './excelDataReducer';
import ColumnReducer from './columnReducer';
import { reducer as formReducer } from 'redux-form';

const allReducers = combineReducers({
	excelData: ExcelDataReducer,
	columns: ColumnReducer,
	form: formReducer
});

export default allReducers;
