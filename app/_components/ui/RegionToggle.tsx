import styles from "./RegionToggle.module.css";

type Option<T extends string> = { id: T; label: string };

/**
 * Segmented pill for switching region. Colours come from `--toggle-fg` / `--toggle-bg`
 * (gold on dark by default), so it can sit on a cream section too.
 */
export default function RegionToggle<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: Option<T>[];
  value: T;
  onChange: (id: T) => void;
}) {
  return (
    <div className={styles.toggle} role="group" aria-label={label}>
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          aria-pressed={o.id === value}
          onClick={() => onChange(o.id)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
