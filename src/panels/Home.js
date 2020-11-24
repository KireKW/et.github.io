import React from 'react';
import PropTypes from 'prop-types';
import { Panel, Group, HorizontalScroll, Avatar, PanelHeader, Button, Cell, Div } from '@vkontakte/vkui';

const Home = (props) => (
	<Panel id={props.id}>
		<PanelHeader>Maps of Museums Nearby</PanelHeader>


		{
			props.user &&
			<Group title="User Info">
				<Cell
					before={<Avatar src={props.user.photo_100}/>}
					description={props.user.city && props.user.city.title}
				>
					{`${props.user.first_name} ${props.user.last_name}`}
				</Cell>
			</Group>
		}

		<Group>
			<HorizontalScroll>
				<Div>
					<Div>
						<Button size='l' stretched onClick={props.go} data-to='friends'>Friends list</Button>
						<Button size='l' stretched onClick={props.go} data-to='groups'>Groups list</Button>
					</Div>
					<Div>
						<Button size='l' stretched onClick={props.go} data-to='other'>Other -></Button>
					</Div>
				</Div>
			</HorizontalScroll>
		</Group>
	</Panel>
);

Home.propTypes = {
	id: PropTypes.string.isRequired,
	user: PropTypes.shape({
		photo_200: PropTypes.string,
		first_name: PropTypes.string,
		last_name: PropTypes.string,
		city: PropTypes.shape({
			title: PropTypes.string,
		}),
	}),
	geodata: PropTypes.shape({
		lat: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		lng: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	}),
	go: PropTypes.func.isRequired,
};

export default Home;