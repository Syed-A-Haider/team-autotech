import clsx from 'clsx';
import type { WhyChooseUsItem } from './WhyChooseUsSection';
import styles from './WhyChooseUsSection.module.css';

interface WhyChooseUsCardProps {
  item: WhyChooseUsItem;
}

// One badge in the strip. Shows icon + title normally.
// On hover/focus it grows and reveals the description text.
export default function WhyChooseUsCard({ item }: WhyChooseUsCardProps) {
  const { icon: Icon, title, description, iconAlign } = item;

  return (
    <div
      tabIndex={0}
      className={clsx(
        styles.item,
        iconAlign === 'left' ? styles.alignLeft : styles.alignRight,
      )}
    >
      <div className={styles.wedge} aria-hidden="true" />
      <Icon aria-hidden="true" className={styles.icon} />
      <div className={styles.textGroup}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
}
