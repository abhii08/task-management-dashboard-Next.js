import React from "react";

interface CardProps {
  title: string;
  children?: React.ReactNode;
}

interface CardHeaderProps {
  children?: React.ReactNode;
}

interface CardTitleProps {
  children?: React.ReactNode;
}

interface CardContentProps {
  children?: React.ReactNode;
}

export function Card({ title, children }: CardProps): JSX.Element {
  return (
    <div className="border p-6 bg-white rounded-xl bg-[#ededed]">
      <h1 className="text-xl border-b pb-2">{title}</h1>
      <div className="mt-4">{children}</div>
    </div>
  );
}

export function CardHeader({ children }: CardHeaderProps) {
  return <div className="border-b pb-2 mb-4">{children}</div>;
}

export function CardTitle({ children }: CardTitleProps) {
  return <h2 className="text-lg font-bold">{children}</h2>;
}

export function CardContent({ children }: CardContentProps) {
  return <div>{children}</div>;
}
