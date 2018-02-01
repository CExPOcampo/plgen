import React, { Component } from 'react';
import DownloadLink from "react-download-link";
import * as _ from 'lodash';

export default class DownloadLinksPanel extends Component {

	render() {

		const downloadLinksToRender = [];
		_.forEach(this.props.results, (result, keyName) => {
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
			<div>
				{downloadLinksToRender}
			</div>
		);
	}
}
