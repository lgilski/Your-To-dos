/**
 *
 * @param {Object} props
 * @param {'large' | 'medium'} props.type
 */

import clsx from '../../../utils/clsx';

import classes from './SectionHeader.module.css';

function SectionHeader({
  subheader,
  header,
  className,
  type,
  ...props
}: {
  subheader: string;
  header: string;
  type: string;
} & React.HtmlHTMLAttributes<HTMLDivElement>) {
  return (
    <div className={className}>
      <h4 className='subheader'>{subheader}</h4>
      <h3
        className={clsx(
          type === 'large' && 'header',
          type === 'medium' && 'header-large'
        )}
      >
        {header}
      </h3>
    </div>
  );
}

export default SectionHeader;
