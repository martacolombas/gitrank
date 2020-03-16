import React from 'react';
import Select from 'react-select';
import cx from 'classnames';
import './Filter.css';

function Filter({ className, options, ...props }) {
  const classnames = cx('Filter', className);
  return (
    <Select
      defaultValue={[]}
      isMulti
      name='filter'
      options={options}
      className={classnames}
      {...props}
    />
  );
}

export default Filter;
