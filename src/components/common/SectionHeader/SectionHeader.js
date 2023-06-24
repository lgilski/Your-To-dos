function SectionHeader({ subheader, header, className, ...props }) {
  return (
    <div className={className}>
      <h4 className='subheader'>{subheader}</h4>
      <h3 className='header'>{header}</h3>
    </div>
  );
}

export default SectionHeader;
