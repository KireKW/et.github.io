import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Panel, Group, List, Cell, PanelHeader, PanelHeaderBack, platform, IOS, HorizontalScroll, Div } from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

const osname = platform();

class Groups extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			fetchedUser: null,
			geodata: null,
		};
	}
	componentDidMount() {
		this.props.getToken();
	}
	render() {
		const props = this.props;

		return (
			<Panel id={props.id}>
				<PanelHeader
					left={<PanelHeaderBack onClick={props.go} data-to="home">
						{osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
					</PanelHeaderBack>}
				>
					Group List
				</PanelHeader>
				

				<Group title="Groups List">
					<List>
						<HorizontalScroll>
							<Div>
							{props.groups && props.groups.map((group) => 
								<Cell
									key={group.name}
									before={<Avatar src={group.photo_100}/>}
									description={group.screen_name}
								>
									{`${group.name}`}
								</Cell>)}
							</Div>
						</HorizontalScroll>
					</List>
				</Group>
			</Panel>
		);
	}
}

Groups.propTypes = {
	id: PropTypes.string.isRequired,
	getToken: PropTypes.func.isRequired,
	go: PropTypes.func.isRequired,
};

export default Groups;