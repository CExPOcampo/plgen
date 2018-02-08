import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as _ from 'lodash';

import { Button, Form, FormGroup, FormControl, ControlLabel, HelpBlock, Row, Col } from 'react-bootstrap';
import { FieldGroup } from './components/FieldGroup';

import DownloadLinksPanel from './components/DownloadLinksPanel';
import FileUploadForm from './components/FileUploadForm';

import { generatePlGenConfig, processExcelFile } from './picklistTools';

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';

import * as excelDataActionCreators from './actions/excelDataActions';

import ColumnDataList from './components/ColumnDataList';

var inputRangeStyle = {
	'display': 'inline',
	'width': '10%',
	'minWidth': '50px'
}

//https://stackoverflow.com/questions/29537299/react-how-do-i-update-state-item1-on-setstate-with-jsfiddle
// ^ correct answer by 'TranslucentCloud'

class AppContainer extends Component {

	alterState(stateModder) {
		const nextState = _.cloneDeep(this.state);
		stateModder(nextState);
		this.setState(nextState);
	}

	numStringIsGrtrOrEql(numString, limit) {
		if(numString) {
			const num = parseInt(numString, 10);
			if(!isNaN(num)) {
				return num >= limit;
			}
		}
		return false;
	}

	constructor(props) {
		super(props);
		this.state = {
			results: null
			// Moved to redux store
			// filePrevRef: null,
			// tabNum: 0,
			// rowRangeStart: 0,
			// rowRangeEnd: 0,
			// columns: []
			, tabNumIsValid: true,
			rowRangeStartIsValid: false,
			rowRangeEndIsValid: false
		};

		// Do function bindings here (not when passing as props)
		// https://stackoverflow.com/questions/38349421/react-dropzone-image-preview-not-showing
		// https://maarten.mulders.tk/blog/2017/07/no-bind-or-arrow-in-jsx-props-why-how.html
		// https://stackoverflow.com/questions/40773220/jsx-props-should-not-use-bind

	}

	render() {

		const props = this.props;

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
					<h1>Config</h1>
					<br/>
					<Form horizontal>

						<FieldGroup label="Tab Number" type="number" min={0}
							id="tabNum"
							value={props.excelData.tabNum}
							validationState={(this.state.tabNumIsValid) ? null : 'error'}
							onChange={(e) => {
								this.alterState((nextState) => nextState.tabNumIsValid = this.numStringIsGrtrOrEql(e.target.value, 0));
								props.setTabNum(e.target.value);
							}}
						/>

						<FormGroup validationState={
							(this.state.rowRangeStartIsValid && this.state.rowRangeEndIsValid) ? null : 'error'
						}>
							<Col componentClass={ControlLabel} xs={3} md={3} sm={3}>
								Row Range
							</Col>
							<Col xs={6} md={6} sm={6}>
								<FormControl type="number" min={2} style={inputRangeStyle}
									value={this.state.rowRangeStart}
									onChange={(e) => {
										this.alterState((nextState) => nextState.rowRangeStartIsValid = this.numStringIsGrtrOrEql(e.target.value, 2));
										props.setRowRangeStart(e.target.value);
									}}
								/>
								{' - '}
								<FormControl type="number" min={2} style={inputRangeStyle}
									value={this.state.rowRangeEnd}
									onChange={(e) => {
										this.alterState((nextState) => nextState.rowRangeEndIsValid = this.numStringIsGrtrOrEql(e.target.value, 2));
										props.setRowRangeEnd(e.target.value);
									}}
								/>
							</Col>
						</FormGroup>

						<br/>

						<ColumnDataList/>


					</Form>
					<br/>
					<h1><hr></hr></h1>


					<FileUploadForm
						filePreviewRef={props.excelData.filePrevRef}
						setFilePreviewRef={props.setFilePreviewRef}
					/>

					<br/>

					<div>
						<Button bsStyle="primary" bsSize="large"
							onClick={() => {

								const plGenConfig = generatePlGenConfig(
									Object.assign({}, props.excelData, {
										columnDataList: props.columnDataList,
										relatedDataSet: props.relatedDataSet
									})
								);

								console.log(plGenConfig);

								const file = props.excelData.filePrevRef;

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

function mapStateToProps(state){
	return {
		excelData: state.excelData,
		columnDataList: state.columnDataList,
		relatedDataSet: state.relatedDataSet
	}
}

function mapDispatchToProps(dispatch){
	// Bind 'dispatch' to multiple action creators
	// https://github.com/reactjs/redux/issues/363
	return bindActionCreators(
		Object.assign({},
			excelDataActionCreators
		),
		dispatch
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);

//export default App;
