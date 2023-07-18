import React from 'react';

function Feature({
  icon,
  header,
  text,
}: {
  icon: string;
  header: string;
  text: string;
} & React.HtmlHTMLAttributes<HTMLDivElement>) {
  return (
    <div className='relative max-w-[250px] p-4 text-lg font-medium'>
      <ion-icon name={icon} />
      <h5 className='mt-3 text-2xl font-extrabold text-lime-green-900'>
        {header}
      </h5>
      <p className='mt-3'>{text}</p>
    </div>
  );
}

export default Feature;
