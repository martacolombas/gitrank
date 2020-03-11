import React from 'react';
import './PrList.css';
import PrPreview from '../PrPreview/PrPreview';

function PrList({ prs, setPinnedItems }) {
	if (prs) {
		return (
			<div className='PrList'>
				{prs.map(pr => {
					return (
						<PrPreview
							pr={pr}
							key={pr.id}
							setPinnedItems={setPinnedItems}
						/>
					);
				})}
			</div>
		);
	}
}

export default PrList;
