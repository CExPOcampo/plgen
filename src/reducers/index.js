import { combineReducers } from 'redux';

import ExcelDataReducer from './excelDataReducer';
import ColumnDataListReducer from './columnDataListReducer';

import RelatedDataListReducer from './relatedDataListReducer';

const allReducers = combineReducers({
	excelData: ExcelDataReducer,
	columnDataList: ColumnDataListReducer,
	relatedDataList: RelatedDataListReducer
});

export default allReducers;
