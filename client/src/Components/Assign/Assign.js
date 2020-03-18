import React from 'react';
import '../Button/Button';
import { ASSIGN_TO_USER } from '../../ApiClient/Queries';
import { useMutation } from '@apollo/react-hooks';
import Button from '../Button/Button';
import cx from 'classnames';

function Assign({ userId, prId, className, isAssigned }) {
  const assignId = [];
  assignId.push(userId);
  const [assignToMe, { data }] = useMutation(ASSIGN_TO_USER);
  const classnames = cx('Assign', className);

  function handleAssignment(event) {
    if (!isAssigned) {
      event.preventDefault();
      assignToMe({ variables: { pullRequestId: prId, assigneeIds: assignId } });
      if (data) {
        console.log('Succesfully assigned to you');
      }
    } else {
      event.preventDefault();
      assignToMe({ variables: { pullRequestId: prId, assigneeIds: [] } });
      if (data) {
        console.log('Succesfully unassigned');
      }
    }
  }

  return (
    <Button
      icon='user-check'
      title='Assign to me'
      onClick={handleAssignment}
      className={isAssigned ? `${classnames}--isFavorite` : classnames}
    />
  );
}

export default Assign;
