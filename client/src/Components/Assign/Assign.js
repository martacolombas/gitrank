import React from 'react';
import '../Button/Button';
import { ASSIGN_TO_USER } from '../../ApiClient/Queries';
import { useMutation } from '@apollo/react-hooks';
import Button from '../Button/Button';
import cx from 'classnames';

function Assign({ userId, prId, className, isAssigned, currentAssignees }) {
  // if there's previous assigness we keep their id
  let prevAssignees = [];
  if (currentAssignees.length) {
    prevAssignees = [
      ...currentAssignees.map(element => {
        return element.id;
      }),
    ];
  }

  const assignId = [...prevAssignees];

  const [assignToMe, { data }] = useMutation(ASSIGN_TO_USER);
  const classnames = cx('Assign', className);

  function handleAssignment(event) {
    if (!isAssigned) {
      // if the pr is not yet assigned to the user, we add the userId to the previous assignees' ids
      assignId.push(userId);
      event.preventDefault();
      // perform mutation
      assignToMe({ variables: { pullRequestId: prId, assigneeIds: assignId } });
      if (data) {
        console.log('Succesfully assigned to you');
      }
    } else {
      // otherwsise we filter all the ids except the user's and we perform the mutation
      event.preventDefault();
      assignToMe({
        variables: {
          pullRequestId: prId,
          assigneeIds: assignId.filter(element => element !== userId),
        },
      });
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
      className={isAssigned ? `${classnames}--isFavorite` : classnames} // isFavorite needs renaming as the same modifications are applied for the favoriting feature
    />
  );
}

export default Assign;
