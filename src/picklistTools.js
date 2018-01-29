import * as _ from 'lodash';
var XLSX = require('xlsx');

export function generatePlGenConfig(appState) {
	const plGenConfig = {
		worksheetTabNum: parseInt(appState.tabNum, 10),
		rowRange: [parseInt(appState.rowRangeStart, 10), parseInt(appState.rowRangeEnd, 10)],
		targetColumns: {}
	}

	const targetColumnsRef = plGenConfig.targetColumns;
	_.forEach(appState.columns, (columnData, index) => {

		targetColumnsRef[columnData.column] = {
			name: columnData.picklistName
		};
		// Parents
		const targetColumnObj = targetColumnsRef[columnData.column];
		if(columnData.parentColumns) {
			targetColumnObj.parentColumns = columnData.parentColumns.split(',');
		}
		// Related Data
		if(!_.isEmpty(columnData.relatedData)) {
			targetColumnObj.relatedData = [];
			const relatedDataArrayRef = targetColumnObj.relatedData;
			_.forEach(columnData.relatedData, (related, index) => {
				relatedDataArrayRef.push({
					name: related.name,
					relatedColumn: related.relatedColumn
				});
			});
		}

	});

	return plGenConfig;
}

export function processExcelFile(plGenConfig, binaryData) {
	var readOpts = {
		type: 'binary'
	};
	var workbook = XLSX.read(binaryData, readOpts);
	var sheetName = workbook.SheetNames[plGenConfig.worksheetTabNum];
	console.log('Processing Worksheet Tab: ', sheetName);
	var worksheet = workbook.Sheets[sheetName];

	var rowRange = plGenConfig.rowRange;
	var targetColumns = plGenConfig.targetColumns;

	var results = {};

	for(var r = rowRange[0]; r <= rowRange[1]; r++) {
		_.forEach(targetColumns, processColumnsInRow);
	}

	function processColumnsInRow(data, columnKey) {
		var currentPicklistName = data.name;

		if(!results[currentPicklistName]) {
			results[currentPicklistName] = [];
		}

		var accessor = columnKey + r;
		var cellValue = getCellValue(worksheet, accessor);

		var parentChain = [];
		// Find parents
		if(!_.isEmpty(data.parentColumns)) {
			_.forEach(data.parentColumns, function(parentColumn) {
				var parentAccessor = parentColumn + r;
				parentChain.push(getCellValue(worksheet, parentAccessor));
			});
		}

		// Find duplicate matches
		var matches = findDuplicateValAndParents(results[currentPicklistName], cellValue, parentChain);
		// If no duplicate matches, go ahead and add it
		if(_.isEmpty(matches)) {
			var finalObj = {
				name: data.name,
				value: cellValue
			};
			// Add parents if any
			if(!_.isEmpty(parentChain)) {
				finalObj.parents = _.clone(parentChain, true);
			}
			// Add related data if any
			if(!_.isEmpty(data.relatedData)) {
				var relatedDataObj = {};
				_.forEach(data.relatedData, function(relatedDataInfo) {
					var relatedDataAccessor = relatedDataInfo.relatedColumn + r;
					var relatedDataValue = getCellValue(worksheet, relatedDataAccessor);
					relatedDataObj[relatedDataInfo.name] = relatedDataValue;
				});
				finalObj.relatedData = _.clone(relatedDataObj, true);
			}
			// Add object to results
			results[currentPicklistName].push(finalObj);
		}
	}

	function getCellValue(worksheet, accessor) {
		return worksheet[accessor].w.trim();
	}

	function findDuplicateValAndParents(resultsArray, val, valParents) {
		return _.filter(resultsArray, function(item) {
			var sameParents = true;
			if(!_.isEmpty(item.parents) && !_.isEmpty(valParents)) {
				sameParents = _.isEmpty(_.difference(item.parents, valParents));
			}
			return item.value === val && sameParents;
		});
	}

	console.log(results);
	return results;

}
