import React, { ReactElement, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

export default function DefaultLayout({ children }: Props): ReactElement {
  return <div className="bg-gray-100 min-h-screen">{children}</div>;
}
