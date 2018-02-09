import { combineReducers } from 'redux';

import ExcelDataReducer from './excelDataReducer';
import ColumnDataListReducer from './columnDataListReducer';

import RelatedDataSetReducer from './relatedDataSetReducer';

const allReducers = combineReducers({
	excelData: ExcelDataReducer,
	columnDataList: ColumnDataListReducer,
	relatedDataSet: RelatedDataSetReducer
});

export default allReducers;
