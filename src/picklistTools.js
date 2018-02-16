import * as _ from 'lodash';
var XLSX = require('xlsx');

export function generatePlGenConfig(appState) {

	const plGenConfig = {
		worksheetTabNum: parseInt(appState.tabNum, 10),
		rowRange: [parseInt(appState.rowRangeStart, 10), parseInt(appState.rowRangeEnd, 10)],
		targetColumns: {}
	}

	const relatedDataSet = appState.relatedDataSet;

	const targetColumnsRef = plGenConfig.targetColumns;
	_.forEach(appState.columnDataList, (columnData, index) => {

		targetColumnsRef[columnData.column] = {
			name: columnData.picklistName
		};
		const targetColumnObj = targetColumnsRef[columnData.column];

		// Parents
		if(columnData.hasParents && columnData.parentColumns) {
			targetColumnObj.parentColumns = _.without(columnData.parentColumns.split(','), '');
		}
		// Related Data
		if(columnData.hasRelatedData && !_.isEmpty(columnData.relatedDataKeys)) {
			targetColumnObj.relatedData = [];
			const relatedDataArrayRef = targetColumnObj.relatedData;
			_.forEach(columnData.relatedDataKeys, (relatedDataKey) => {
				const targetRelatedData = relatedDataSet[relatedDataKey];
				relatedDataArrayRef.push({
					name: targetRelatedData.name,
					relatedColumn: targetRelatedData.relatedColumn
				});
			});
		}
		// Rank
		if(columnData.hasRank && columnData.rank) {
			targetColumnObj.rank = columnData.rank;
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
				var parentValue = getCellValue(worksheet, parentAccessor);
				if(parentValue) {
					parentChain.push(parentValue);
				}
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
			// Add rank if exists
			if(data.rank) {
				var rankAccessor = data.rank + r;
				var rankValue = getCellValue(worksheet, rankAccessor);
				var rankValueInt = parseInt(rankValue, 10);
				if(!isNaN(rankValueInt)) {
					finalObj.rank = rankValueInt;
				}
			}
			// Add object to results
			results[currentPicklistName].push(finalObj);
		}
	}

	function getCellValue(worksheet, accessor) {
		var cellData = worksheet[accessor];
		if(cellData) {
			return cellData.w.trim();
		}
		else {
			return undefined;
		}
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
