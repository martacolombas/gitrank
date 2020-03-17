import React from 'react';
import '../Button/Button';
import { ASSIGN_TO_USER } from '../../ApiClient/Queries';
import { useMutation } from '@apollo/react-hooks';
import Button from '../Button/Button';

function Assign({ userId, prId, className }) {
  const assignId = [];
  assignId.push(userId);
  const [assignToMe, { data }] = useMutation(ASSIGN_TO_USER);
  if (data) {
    console.log('Succesfully assigned to you');
  }

  function handleAssignment(event) {
    event.preventDefault();
    assignToMe({ variables: { pullRequestId: prId, assigneeIds: assignId } });
  }

  return (
    <Button
      icon='user-check'
      title='Assign to me'
      onClick={handleAssignment}
      className={className}
    />
  );
}

export default Assign;
