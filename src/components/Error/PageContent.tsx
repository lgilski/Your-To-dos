import React from 'react';

function PageContent({
  title,
  children,
}: React.HtmlHTMLAttributes<HTMLDivElement>) {
  return (
    <div className='max-w-[1400px] m-auto mt-20 text-5xl text-orange-900 text-center'>
      <h1>{title}</h1>
      {children}
    </div>
  );
}

export default PageContent;
