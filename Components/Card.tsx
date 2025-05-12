
import React from "react";

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const CardComponent = ({ title, children, className }: CardProps) => {
  return (
    <div
      className={["bg-white rounded-sm  w-[50rem] text-neutral-600", className]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="flex flex-col gap-4 px-6 py-8">
        {title && <h3 className="text-neutral-900">{title}</h3>}
        {children}
      </div>
    </div>
  );
};

export default CardComponent;
