import React from 'react';
import PropTypes from 'prop-types';
import { View, Panel, Group, CellButton, List, Cell, PanelHeader, PanelHeaderBack, ActionSheet, ActionSheetItem, platform, IOS, HorizontalScroll, Div } from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import App from '../App';

const osname = platform();

class Other extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			fetchedUser: null,
			popout: null,
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
						Friends Screen
					</PanelHeader>
					<Group title="Click">
						<CellButton onClick={props.openOne}>Базовый список</CellButton>
						<CellButton onClick='1'>Список с иконками</CellButton>
						<CellButton onClick='2'>Темы</CellButton>
					</Group>
				</Panel>
			
		);
	}
}

Other.propTypes = {
	id: PropTypes.string.isRequired,
	getToken: PropTypes.func.isRequired,
	go: PropTypes.func.isRequired,
};

export default Other;