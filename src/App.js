import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as _ from 'lodash';

import { Button, Form, FormGroup, FormControl, ControlLabel, HelpBlock, Row, Col } from 'react-bootstrap';
import { FieldGroup } from './FieldGroup';

import TargetColumn from './TargetColumn';
import DownloadLinksPanel from './DownloadLinksPanel';

import Dropzone from 'react-dropzone';

import { generatePlGenConfig, processExcelFile } from './picklistTools';


var inputRangeStyle = {
	'display': 'inline',
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

		return (
			<div className="App">

				<header className="App-header">
					{/*<img src={logo} className="App-logo" alt="logo" />*/}
					<h1 className="App-title">Excel Picklist Generator</h1>
				</header>
				<div className="App-intro">
					<h2> Steps </h2>
					<ol>
						<li>Fill out config forms</li>
						<li>Drag & Drop xlsx file</li>
						<li>Click on 'Process!' button</li>
						<li>Save generated files from download links</li>
					</ol>
				</div>



				<div style={{paddingLeft: '5em'}}>

					<h1><hr></hr></h1>
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
							<Col componentClass={ControlLabel} xs={3} md={3} sm={3}>
								Row Range
							</Col>
							<Col xs={6} md={6} sm={6}>
								<FormControl type="number" style={inputRangeStyle} placeholder="1"
									value={this.state.rowRangeStart}
									onChange={(e) => {
										this.alterState((nextState) => {
											nextState.rowRangeStart = e.target.value;
										});
									}}
								/>
								{' - '}
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

						<div>
							<TargetColumn
								addColumnData={this.addColumnData.bind(this)}
								columns={this.state.columns}
								onChangeHandlerGen={this.genValReplacer.bind(this)}

								addRelatedDataFuncGen={this.addRelatedDataFuncGen.bind(this)}
							/>
						</div>

					</Form>
					<br/>
					<h1><hr></hr></h1>


					<div>
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
					</div>

					<br/>

					<div>
						<Button bsStyle="primary" bsSize="large"
							onClick={() => {

								const plGenConfig = generatePlGenConfig(this.state);

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

							}}
						>
							Process!
						</Button>
					</div>

					<br/>

					<DownloadLinksPanel results={this.state.results}/>

					<br/>

				</div>


			</div>
		);
	}
}

export default App;
