import React, { ReactChild, useState } from 'react';

const STATUS = {
  HOVEREd: 'hovered',
  NORMAL: 'normal'
};

const Link = ({ page, children }: { page?: string; children: ReactChild }) => {
  const [status, setStatus] = useState(STATUS.NORMAL);

  const onMouseEnter = () => {
    setStatus(STATUS.HOVEREd);
  };

  const onMouseLeave = () => {
    setStatus(STATUS.NORMAL);
  };

  return (
    <a
      href={page || '#'}
      className={status}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </a>
  );
};

export default Link;
