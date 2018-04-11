import React, { Component } from 'react';
import { Button, Panel } from 'react-bootstrap';

// Wraps a component in a Collapsible Panel (includes toggleable close/open state)
export default class CollapsiblePanel extends Component {

	constructor(props) {
		super(props);

		this.state = {
			open: true
		}
	}
	render() {

		const props = this.props;
		const {namespace, title, titleName} = props;

		return (<div>
			<Panel id={`${namespace}-${props.index}`}
				style={{'marginRight': '5em'}}
				expanded={this.state.open}
				onToggle={() => this.setState({open: !this.state.open})}>
				<Panel.Heading>
					<Panel.Title toggle>

						<h3>
							{this.state.open ?
								<Button type="button"><span className="glyphicon glyphicon-chevron-down"/></Button> :
								<Button type="button"><span className="glyphicon glyphicon-chevron-right"/></Button>
							}
							{` ${title}${titleName}`}
						</h3>

					</Panel.Title>

				</Panel.Heading>
				<Panel.Collapse>
					<Panel.Body>

						{props.render()}

					</Panel.Body>
				</Panel.Collapse>
			</Panel>
		</div>);
	}

}
