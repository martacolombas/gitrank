import React from 'react';
import './PrDetails.css';
import cx from 'classnames';
import { dateDiff, statusDetails } from '../helperFunc';
import Status from '../Status/Status';

function PrDetails({ className, pr }) {
	const classnames = cx('PrDetails', className);
	return (
		<div className={classnames}>
			<div className='PrDetails-date'>
				{pr && `Last updated ${dateDiff(pr.updatedAt)}`}
			</div>
			{<Status reviewers={statusDetails(pr.reviews.nodes)} />}
		</div>
	);
}

export default PrDetails;
