import classes from './Feature.module.css';

function Feature({
  icon,
  header,
  text,
  children,
}: {
  icon: string;
  header: string;
  text: string;
} & React.HtmlHTMLAttributes<HTMLDivElement>) {
  return (
    <div className={classes['features-element']}>
      <ion-icon name={icon} />
      {/* {children} */}
      <h5 className={classes['features-element-header']}>{header}</h5>
      <p className={classes['features-element-text']}>{text}</p>
    </div>
  );
}

export default Feature;
