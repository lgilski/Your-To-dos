import React from 'react';

import clsx from '../../../utils/clsx';

function SectionHeader({
  subheader,
  header,
  className,
  type,
}: {
  subheader: string;
  header: string;
  type: 'large' | 'medium';
} & React.HtmlHTMLAttributes<HTMLDivElement>) {
  return (
    <div className={className}>
      <h4 className='subheader'>{subheader}</h4>
      <h3
        className={clsx(
          type === 'large' && 'header',
          type === 'medium' && 'headerLarge'
        )}
      >
        {header}
      </h3>
    </div>
  );
}

export default SectionHeader;
