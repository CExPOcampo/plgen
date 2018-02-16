import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

const exampleImage = require('../images/example.png');

export default class TargetColumn extends Component {

	render() {

		const props = this.props;

		return (
			<div style={{paddingTop: '2em'}}>

				<div>
					<div style={{display: 'inline-block', float: 'left'}}>
						<Dropzone
							multiple={false}
							onDrop={(acceptedFiles, rejectedFiles) => {
								console.log(JSON.stringify(acceptedFiles[0], null, 2));
								console.log(JSON.stringify(rejectedFiles[0], null, 2));

								if(acceptedFiles && acceptedFiles[0]) {
									props.setFilePreviewRef(acceptedFiles[0]);
								}

							}}
						>
							<p> Drop excel files HERE! </p>
						</Dropzone>

						<ul>
							{
								props.filePreviewRef ?
									(<li>{props.filePreviewRef.name} - {props.filePreviewRef.size} bytes</li>) :
									(<li></li>)
							}
						</ul>

					</div>

					<div style={{display: 'inline-block', marginLeft: '5em'}}>
						<img src={exampleImage} alt="excelExample"/>
					</div>

				</div>


			</div>
		);
	}
}
