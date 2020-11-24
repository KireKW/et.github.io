import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Panel, Group, List, Cell, PanelHeader, PanelHeaderBack , platform, IOS, HorizontalScroll, Div } from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

const osname = platform();

class Friends extends React.Component {
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
		console.log(props.friends)
		return (
			<Panel id={props.id}>
				<PanelHeader
					left={<PanelHeaderBack onClick={props.go} data-to="home">
						{osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
					</PanelHeaderBack>}
				>
					Friends Screen
				</PanelHeader>
				<Group title="Friends List">
					<List>
						<HorizontalScroll>
							<Div>
							{props.friends && props.friends.map((friend) => 
								<Cell
									key={friend.last_name}
									before={<Avatar src={friend.photo_100}/>}
									description={friend.city ? friend.city.title : ''}
								>
									{`${friend.first_name} ${friend.last_name}`}
								</Cell>)}
							</Div>
						</HorizontalScroll>
					</List>
				</Group>
			</Panel>
		);
	}
}

Friends.propTypes = {
	id: PropTypes.string.isRequired,
	getToken: PropTypes.func.isRequired,
	go: PropTypes.func.isRequired,
};

export default Friends;