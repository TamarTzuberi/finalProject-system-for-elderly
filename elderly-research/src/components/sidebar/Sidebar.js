import React from 'react';
// import * as Cookies from 'js-cookie';
// import { closeWebSocket } from '../../services/notifacationService';
// import spaceFiller from '../../resources/space-filler.png';
import './sidebar.css';
// import { usersFields } from '../../constants/collections';
// import {hasCookie, DeleteCookie} from '../CookieManager';

function Sidebar({history, content}) {
	// const onClick = () => {
	// 	closeWebSocket();
	// 	Cookies.remove(usersFields.username);
	// 	Cookies.remove('organizationName');
	// 	Cookies.remove('organizationType');
	// 	if(hasCookie()) {
	// 		DeleteCookie(['accessToken', 'email', 'givenName', 'familyName', 'imageUrl', 'name', 'googleId'])}
	// 	history.push('/login')
	// };

	return (
		<div className="sidebar">
			{content}
		</div>
	);
}

export default Sidebar;