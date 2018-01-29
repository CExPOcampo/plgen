import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as _ from 'lodash';

import Dropzone from 'react-dropzone';

import DownloadLink from "react-download-link";

import { Form, FormGroup, FormControl, ControlLabel, HelpBlock, Row, Col } from 'react-bootstrap';

import TargetColumn from './TargetColumn';

var XLSX = require('xlsx');

const plGenConfig = {
	worksheetTabNum: 16,
	rowRange: [2, 841],
	targetColumns: {
		'A': {
			name: 'cities'
		},
		'D': {
			name: 'locations',
			parentColumns: ['A'],
			relatedData: [
				{
					name: 'zip',
					relatedColumn: 'E'
				},
				{
					name: 'lowerLevelRollup',
					relatedColumn: 'F'
				},
				{
					name: 'higherLevelRollup',
					relatedColumn: 'G'
				},
				{
					name: 'region',
					relatedColumn: 'H'
				},
				{
					name: 'division',
					relatedColumn: 'I'
				}
			]
		}
	},
	outputDir: './picklistGenerated/'
};

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

var results;

var inputRangeStyle = {
	'width': '10%',
	'minWidth': '50px'
}

class App extends Component {
	render() {
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

					<FormGroup controlId="tabNumber">
						<Col componentClass={ControlLabel} sm={2}>
							Tab Number
						</Col>
						<Col sm={10}>
							<FormControl type="number" placeholder="1"/>
						</Col>
					</FormGroup>

					<FormGroup>
						<Col componentClass={ControlLabel} sm={2}>
							Row Range
						</Col>
						<Col sm={10}>
							<FormControl type="number" style={inputRangeStyle} placeholder="1"/> - <FormControl type="number" style={inputRangeStyle}/>
						</Col>
					</FormGroup>

					<br/>
					<br/>


					<div>
						<TargetColumn/>
					</div>

				</Form>


				<Dropzone
					onDrop={(acceptedFiles, rejectedFiles) => {
						console.log(JSON.stringify(acceptedFiles[0], null, 2));
						console.log(JSON.stringify(rejectedFiles[0], null, 2));

						var file = acceptedFiles[0];
						const reader = new FileReader();
						reader.onload = () => {
							const fileAsBinaryString = reader.result;
							// do whatever you want with the file content

							results = processExcelFile(plGenConfig, fileAsBinaryString);

						};
						reader.onabort = () => console.log('file reading was aborted');
						reader.onerror = () => console.log('file reading has failed');
						reader.readAsBinaryString(file);


					}}
				>
					<p> Drop excel files here </p>
				</Dropzone>

				<DownloadLink
					filename="test.json"
					exportFile={() => JSON.stringify(results, null, 2)}
				>
						Save to disk
				</DownloadLink>

			</div>
		);
	}
}

export default App;
