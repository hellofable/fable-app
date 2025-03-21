import moment from 'moment';
export function dateFormat(time) {


	// return moment(time).toLocaleString();
	return moment(time).format('D MMMM YYYY h:mm A');
}


export function timeAgo(time) {
	return moment(time).fromNow();
}