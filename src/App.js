import React from 'react';
import connect from '@vkontakte/vkui-connect';
import { View, ActionSheet, platform, IOS, ActionSheetItem } from '@vkontakte/vkui';
import { ROUTES } from './config';

import '@vkontakte/vkui/dist/vkui.css';


import Home from './panels/Home';
import Friends from './panels/Friends';
import Groups from './panels/Groups';
import Other from './panels/Other';

const osname = platform();
const location = window.location.hash.substr(1);
// const client = require('../../VK_BOTS/test/a.js').client



class App extends React.Component {
	
	constructor(props) {
		super(props);

		this.state = {
			activePanel: ~ROUTES.indexOf(location) ? location : 'home',
			fetchedUser: null,
		};
	}

	componentDidMount() {
		connect.subscribe((e) => {
			if (e.detail.hasOwnProperty('type')) {
				switch (e.detail.type) {
					case 'VKWebAppGetUserInfoResult':
						console.log(e.detail.data)
						this.setState({ fetchedUser: e.detail.data });
						break;
					case 'VKWebAppAccessTokenReceived':
						this.setState({
							token: e.detail.data.access_token
						});
						this.getFriends();
						this.getGroups();

						break;
					case 'VKWebAppCallAPIMethodResult':
						debugger;
						if (e.detail.data.request_id === '34bc') {
							this.setState({ friends: e.detail.data.response.items });
						}  else if(e.detail.data.request_id === '36bc'){
							this.setState({ groups: e.detail.data.response });
							
						}
						break;
					default:
						break;
				}
			}
		});
		connect.send('VKWebAppGetUserInfo', {});
	}

	getTokenFriends = () => {
		connect.send("VKWebAppGetAuthToken", {"app_id": 7195025, "scope": "friends"});
	}
	getTokenGroups = () => {
		connect.send("VKWebAppGetAuthToken", {"app_id": 7195025, "scope": "groups"});
	}

	getFriends() {
		connect.send("VKWebAppCallAPIMethod", {
			'method': "friends.get",
			'request_id': '34bc',
			'params': {
				'fields': 'city,domain,photo_100',
				'count': 25,
				'order': 'mobile',
				'access_token': this.state.token,
				'v': '5.87',
			}
		});
	}

	get All () {
		return this;
	}

	// async getGroupsID() {
	// 	await connect.send("VKWebAppCallAPIMethod", {
	// 		'method': "groups.get",
	// 		'request_id': '35bc',
	// 		'params': {
	// 			'filter': 'admin',
	// 			'count': 25,
	// 			'access_token': this.state.token,
	// 			'v': '5.87',
	// 		}
	// 	});
	// }
	async getGroups() {	
		await connect.send("VKWebAppCallAPIMethod", {
			'method': "groups.get",
			'request_id': '35bc',
			'params': {
				'filter': 'admin',
				'count': 25,
				'access_token': this.state.token,
				'v': '5.87',
			}
		});
		await connect.subscribe((r) => {
			if (r.detail.hasOwnProperty('type')) {
				switch (r.detail.type) {
					case 'VKWebAppCallAPIMethodResult':
						debugger;
						if(r.detail.data.request_id === '35bc') {
							connect.send("VKWebAppCallAPIMethod", {
								'method': "groups.getById",
								'request_id': '36bc',
								'params': {
									'group_ids': r.detail.data.response.items.join(", "),
									'access_token': this.state.token,
									'fields': 'description',
									'v': '5.87',
								}
							});							
						}
						break;
					default:
						break;
				}
			}
		});
	}

	setLocation = (route) => {
		if (route !== 'home') {
			connect.send('VKWebAppSetLocation', { location: route });
		} else {
			connect.send('VKWebAppSetLocation', { location: '' });
		}
	}

	go = (e) => {
		const route = e.currentTarget.dataset.to;
		this.setState({ activePanel: route })
		this.setLocation(route)
	};

	render() {
		
		return (
			<View popout={this.state.popout} activePanel={this.state.activePanel}>
				<Home id="home" user={this.state.fetchedUser} geodata={this.state.geodata}  go={this.go} />
				<Friends id="friends" data={this.state.data} friends={this.state.friends} getToken={this.getTokenFriends} token={this.state.token} go={this.go} />
				<Groups id="groups" data={this.state.data} groups={this.state.groups} getToken={this.getTokenGroups} token={this.state.token} go={this.go} />
				<Other id="other" data={this.state.data} openOne={this.openBase} getToken={this.getTokenGroups} go={this.go} />
				
			</View>
		);
	}
}

export default App;
