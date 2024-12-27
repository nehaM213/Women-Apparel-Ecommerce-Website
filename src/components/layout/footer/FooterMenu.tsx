import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
interface MenuItem {
  label: string;
  link: string;
}
export default function FooterMenu({
  title,
  menuItems,
}: {
  title?: string;
  menuItems: MenuItem[];
}) {
  return (
    <div className="inline-flex flex-col items-start justify-start gap-3">
      {title && (
        <div className="text-base font-bold leading-normal text-heading ">
          {title}
        </div>
      )}

      {menuItems.map((item, index) => (
        <div
          key={uuidv4()}
          className="inline-flex items-center justify-center gap-2"
        >
          <Link
            href={item.link}
            className="text-base font-medium leading-normal text-subheading hover:text-link"
          >
            {item.label}
          </Link>
        </div>
      ))}
    </div>
  );
}
