import React from 'react';

const ListGroup = (props) => {
	const { items, textProperty, idProperty, onItemSelect, selectedItem } = props;

	return (
		<ul className='list-group'>
			{items.map((item) => {
				return (
					<li
						key={item[idProperty]}
						className={
							item === selectedItem
								? 'list-group-item active'
								: 'list-group-item'
						}
						onClick={() => onItemSelect(item)}
					>
						{item[textProperty]}
					</li>
				);
			})}
		</ul>
	);
};

ListGroup.defaultProps = {
	idProperty: '_id',
	textProperty: 'name'
};

export default ListGroup;
