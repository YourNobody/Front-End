const boilerplateTSX = (COMPONENT_NAME, PROPS_NAME) => `import React from 'react';
import { ${PROPS_NAME} } from './${COMPONENT_NAME}.props';
import styles from './${COMPONENT_NAME}.module.css';

export const ${String(COMPONENT_NAME)} = ({ children }: ${PROPS_NAME}): JSX.Element => {
  return (
    <></>
  );
};`;

const boilerplatePropsTSX = (PROPS_NAME) => `import { ReactNode } from "react";
export interface ${PROPS_NAME} {
  children: ReactNode;
}`;

const boilerplateJSX = (COMPONENT_NAME) => `import React from 'react';
import styles from './${COMPONENT_NAME}.module.css';

export const ${String(COMPONENT_NAME)} = ({ children }) => {
  return (
    <></>
  );
};`;

class Boilerplate {
  constructor(fileExt, COMPONENT_NAME, PROPS_NAME) {
    const TS = 'ts';
    const isTS = fileExt === TS

    if (!isTS) {
      this.jsx = () => boilerplateJSX(COMPONENT_NAME);
    }
    if (isTS) {
     this.tsx = () => boilerplateTSX(COMPONENT_NAME, PROPS_NAME);
     this.props = () => boilerplatePropsTSX(PROPS_NAME); 
    }
  }
}

module.exports = Boilerplate;