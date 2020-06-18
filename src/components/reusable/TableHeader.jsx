import React, { Component } from 'react';

class TableHeader extends Component {
	raiseSortEvent = (path) => {
		const { sortColumn, onSort } = this.props;

		if (sortColumn.path === path) {
			sortColumn.order = sortColumn.order === 'asc' ? 'desc' : 'asc';
		} else {
			sortColumn.path = path;
			sortColumn.order = 'asc';
		}

		onSort(sortColumn);
	};

	render() {
		const { colums } = this.props;

		return (
			<thead>
				<tr>
					{colums.map((c) => (
						<th
							key={c.path || c.key}
							onClick={() => this.raiseSortEvent(c.path)}
						>
							{c.label}
						</th>
					))}
				</tr>
			</thead>
		);
	}
}

export default TableHeader;
