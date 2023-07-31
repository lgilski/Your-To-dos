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
      <h4 className='mb-2 text-xl font-semibold text-orange-400 uppercase tracking-wide'>
        {subheader}
      </h4>
      <h3
        className={clsx(
          `${
            type === 'large'
              ? 'text-5xl'
              : type === 'medium' && 'text-4xl'
          } text-orange-900 dark:text-white`
        )}
      >
        {header}
      </h3>
    </div>
  );
}

export default SectionHeader;
