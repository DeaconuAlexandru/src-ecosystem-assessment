export default function SectionTitle({ eyebrow, title, description, actions }) {
  return (
    <div className="section-title">
      <div>
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h3>{title}</h3>
        {description ? <p className="section-description">{description}</p> : null}
      </div>
      {actions ? <div className="section-actions">{actions}</div> : null}
    </div>
  );
}
