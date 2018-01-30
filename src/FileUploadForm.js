import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

export default class TargetColumn extends Component {

	render() {

		const props = this.props;

		return (
			<div>

				<div>
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
				</div>

				<ul>
					{
						props.filePreviewRef ?
							(<li>{props.filePreviewRef.name} - {props.filePreviewRef.size} bytes</li>) :
							(<li></li>)
					}
				</ul>

			</div>
		);
	}
}
