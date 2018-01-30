import { combineReducers } from 'redux';

import ExcelDataReducer from './excelDataReducer';
import ColumnReducer from './columnReducer';

const allReducers = combineReducers({
	excelData: ExcelDataReducer,
	columns: ColumnReducer
});

export default allReducers;
