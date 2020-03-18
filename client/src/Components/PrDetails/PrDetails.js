import React from 'react';
import './PrDetails.css';
import cx from 'classnames';
import { dateDiff, reviewersDetails } from '../../helperFunc';
import Status from '../Status/Status';

function PrDetails({ className, pr }) {
  const classnames = cx('PrDetails', className);
  return (
    <div className={classnames}>
      <Status
        reviewers={reviewersDetails(pr.reviews.nodes)}
        assignees={pr.assignees.nodes}
      />
      <div className='PrDetails-date'>
        {pr && `Updated ${dateDiff(pr.updatedAt)}`}
      </div>
    </div>
  );
}

export default PrDetails;
