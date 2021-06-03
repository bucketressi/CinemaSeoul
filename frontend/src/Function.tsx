export const getDateString = (date : string ) => date.substr(0, 4) + "-" + date.substr(4, 2) + "-" + date.substr(6, 2);
export const getDateStringFromDate = (date : Date) => {
	const year = date.getFullYear();
	let month : string = (date.getMonth()+1).toString();
	if(month.length === 1){
		month = "0" + month;
	}
	let day : string = (date.getDate()).toString();
	if(day.length === 1){
		day = "0" + day;
	}
	return ""+year+month+day;
}
