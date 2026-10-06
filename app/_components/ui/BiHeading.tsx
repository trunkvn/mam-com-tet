import type { ReactNode } from "react";

/**
 * A big Vietnamese heading with its English translation set underneath in quotes, smaller and
 * lighter. Pass the Vietnamese as children (an <em> inside is picked out in gold); the English is
 * plain text.
 */
export default function BiHeading({
  id,
  en,
  children,
}: {
  id: string;
  en: string;
  children: ReactNode;
}) {
  return (
    <>
      <h2 className="h2" id={id} lang="vi">
        {children}
      </h2>
      <p className="enline" lang="en">
        “{en}”
      </p>
    </>
  );
}
