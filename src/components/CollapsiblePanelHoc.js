import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';

export default function asCollapsiblePanel(WrappedComponent) {
	return class extends Component {
		render() {

			const props = this.props;
			const {namespace, title, titleName, ...passThroughProps} = props;

			return (<div>
				<Panel id={`${namespace}-${props.index}`} defaultExpanded>
					<Panel.Heading>
						<Panel.Title toggle>
							<h3> {`${title}${titleName}`} </h3>
						</Panel.Title>
					</Panel.Heading>
					<Panel.Collapse>
						<Panel.Body>

							<WrappedComponent {...passThroughProps}/>

						</Panel.Body>
					</Panel.Collapse>
				</Panel>
			</div>);
		}
	}
}
