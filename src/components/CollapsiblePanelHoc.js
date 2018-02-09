import React, { Component } from 'react';
import { Button, Panel } from 'react-bootstrap';

export default function asCollapsiblePanel(WrappedComponent) {
	return class extends Component {
		constructor(props) {
			super(props);

			this.state = {
				open: true
			}
		}
		render() {

			const props = this.props;
			const {namespace, title, titleName, ...passThroughProps} = props;

			return (<div>
				<Panel id={`${namespace}-${props.index}`} expanded={this.state.open} onToggle={() => this.setState({open: !this.state.open})}>
					<Panel.Heading>
						<Panel.Title toggle>

							<h3>
								{this.state.open ?
									<Button type="button" className="glyphicon glyphicon-chevron-down"/> :
									<Button type="button" className="glyphicon glyphicon-chevron-right"/>
								}
								{` ${title}${titleName}`}
							</h3>

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
