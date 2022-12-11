import * as React from "react";

export interface IAppProps {
  // children: React.ReactElement | null | IconType;
  children: any;
  condition: boolean | null;
}

export default function App({ children, condition }: IAppProps): any {
  return condition ? children : null;
}
