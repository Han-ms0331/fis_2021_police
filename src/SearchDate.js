import React from 'react';

function SearchDate(props) {
	console.log(props.search_result);
	return (
		<div class='search-date-result'>
			<div class='search-date-aid result'>{props.search_result.aid}</div>
			<div class='search-date-visit_time result'>
				{props.search_result.visit_time}
			</div>
			<div class='search-date-estimate_num result'>
				{props.search_result.estimate_num}
			</div>
			<div class='search-date-c_name result'>{props.search_result.c_name}</div>
			<div class='search-date-c_address result'>
				{props.search_result.c_address}
			</div>
		</div>
	);
}

export default SearchDate;
