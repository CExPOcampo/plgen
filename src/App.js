import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as _ from 'lodash';

import Dropzone from 'react-dropzone';

import DownloadLink from "react-download-link";

import { Form, FormGroup, FormControl, ControlLabel, HelpBlock, Row, Col } from 'react-bootstrap';

import TargetColumn from './TargetColumn';

import { FieldGroup } from './FieldGroup';

var XLSX = require('xlsx');


function generatePlGenConfig(appState) {
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

function processExcelFile(plGenConfig, binaryData) {
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

var inputRangeStyle = {
	'width': '10%',
	'minWidth': '50px'
}

//https://stackoverflow.com/questions/29537299/react-how-do-i-update-state-item1-on-setstate-with-jsfiddle
// ^ correct answer by 'TranslucentCloud'

class App extends Component {

	alterState(stateModder) {
		const nextState = _.cloneDeep(this.state);
		stateModder(nextState);
		this.setState(nextState);
	}

	genValReplacer(accessor) {
		return (e) => {
			this.alterState(function(nextState) {
				_.set(nextState, accessor, e.target.value);
			})
		}
	}

	addColumnData() {
		this.alterState((nextState) => {
			nextState['columns'].push({
				column: '',
				picklistName: '',
				parentColumns: '',
				relatedData: []
			});
		});
	}

	addRelatedDataFuncGen(parentIndex) {
		return (e) => {
			this.alterState((nextState) => {
				nextState['columns'][parentIndex]['relatedData'].push({
					name: '',
					relatedColumn: ''
				});
			});
		}

	}

	constructor(props) {
		super(props);
		this.state = {
			results: null,
			filePrevRef: null,
			tabNum: 0,
			rowRangeStart: 0,
			rowRangeEnd: 0,
			columns: []
		};
	}

	render() {

		const downloadLinksToRender = [];
		_.forEach(this.state.results, (result, keyName) => {
			downloadLinksToRender.push(
				<div key={'download' + keyName}>
					<DownloadLink
						filename={`${keyName}}.json`}
						exportFile={() => JSON.stringify(result, null, 2)}
					>
						{`Save ${keyName}.json to disk`}
					</DownloadLink>
				</div>
			);
		});

		return (
			<div className="App">

				<header className="App-header">
					{/*<img src={logo} className="App-logo" alt="logo" />*/}
					<h1 className="App-title">Excel Picklist Generator</h1>
				</header>
				{/*
				<p className="App-intro">
					To get started, edit <code>src/App.js</code> and save to reload.
				</p>
				*/}


				{/*
				<div>
					<form style={{position: 'absolute', left: '5%', width: '50%', background: 'red'}}>
						TargetColumns:
							<input type="text" name="columnLetter" style={{position: 'absolute', left: '0px'}}/>
							<br/>
							<input type="text" name="picklistName" style={{align: 'left'}}/>


							<br/>
							Comma Separated
							<input type="text" name="parentColumns"/>

							Multi
							<input type="text" name="relatedDataColumn"/>
							<input type="text" name="relatedDataName"/>
					</form>
				</div>
				*/}


				<Form horizontal>

					<FieldGroup label="Tab Number" type="number"
						id="tabNum"
						value={this.state.tabNum}
						onChange={(e) => {
							this.alterState((nextState) => {
								nextState.tabNum = e.target.value;
							});
						}}
					/>

					<FormGroup>
						<Col componentClass={ControlLabel} sm={2}>
							Row Range
						</Col>
						<Col sm={10}>
							<FormControl type="number" style={inputRangeStyle} placeholder="1"
								value={this.state.rowRangeStart}
								onChange={(e) => {
									this.alterState((nextState) => {
										nextState.rowRangeStart = e.target.value;
									});
								}}
							/>
							' - '
							<FormControl type="number" style={inputRangeStyle}
								value={this.state.rowRangeEnd}
								onChange={(e) => {
									this.alterState((nextState) => {
										nextState.rowRangeEnd = e.target.value;
									});
								}}
							/>
						</Col>
					</FormGroup>

					<br/>
					<br/>


					<div>
						<TargetColumn
							addColumnData={this.addColumnData.bind(this)}
							columns={this.state.columns}
							onChangeHandlerGen={this.genValReplacer.bind(this)}

							addRelatedDataFuncGen={this.addRelatedDataFuncGen.bind(this)}
						/>
					</div>

				</Form>


				<Dropzone
					multiple={false}
					onDrop={(acceptedFiles, rejectedFiles) => {
						console.log(JSON.stringify(acceptedFiles[0], null, 2));
						console.log(JSON.stringify(rejectedFiles[0], null, 2));

						if(acceptedFiles && acceptedFiles[0]) {
							var file = acceptedFiles[0];
							this.alterState((nextState) => {
								nextState.filePrevRef = file;
							});
						}

					}}
				>
					<p> Drop excel files HERE! </p>
				</Dropzone>


				<button onClick={() => {

					const plGenConfig = generatePlGenConfig(this.state);
					console.log(plGenConfig);

					const file = this.state.filePrevRef;

					const reader = new FileReader();
					reader.onload = () => {
						const fileAsBinaryString = reader.result;
						// do whatever you want with the file content

						const finalResults = processExcelFile(plGenConfig, fileAsBinaryString);
						this.alterState((nextState) => {
							nextState.results = finalResults;
						});

					};
					reader.onabort = () => console.log('file reading was aborted');
					reader.onerror = () => console.log('file reading has failed');
					reader.readAsBinaryString(file);

				}}>
					Process!
				</button>


				<div>
					{downloadLinksToRender}
				</div>

				<br/>
				<button onClick={() => {
					console.log(this.state);
				}}>
					Test
				</button>

			</div>
		);
	}
}

export default App;
