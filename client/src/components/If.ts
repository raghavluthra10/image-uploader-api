import * as React from "react";

export interface IAppProps {
  children: any;
  condition: boolean;
}

export default function App({ children, condition }: IAppProps) {
  condition ? children : null;
}
