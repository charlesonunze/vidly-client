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

	renderSortIcon(column, sortColumn) {
		if (column.label && column.path === sortColumn.path) {
			return <i className={`fa fa-sort-${sortColumn.order}`}></i>;
		}
	}

	render() {
		const { columns, sortColumn } = this.props;

		return (
			<thead>
				<tr>
					{columns.map((column) => (
						<th
							key={column.path || column.key}
							onClick={() => this.raiseSortEvent(column.path)}
						>
							{column.label}
							{this.renderSortIcon(column, sortColumn)}
						</th>
					))}
				</tr>
			</thead>
		);
	}
}

export default TableHeader;
