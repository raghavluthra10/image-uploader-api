import * as React from "react";

export interface IAppProps {
  children: React.ReactElement | null;
  condition: boolean;
}

export default function App({
  children,
  condition,
}: IAppProps): React.ReactElement | null {
  return condition ? children : null;
}
