import "./src/styles/global.css";

import React from "react";

// Mock provider component that does nothing but maintains the component tree
const MockProvider = ({ children }) => <>{children}</>;

// During SSR, we provide mock providers to maintain component structure
export const wrapRootElement = ({ element }) => {
  // During SSR, the null-loaded modules will be undefined
  // We'll provide mock providers that just pass through children
  return (
    <MockProvider>
      <MockProvider>
        <MockProvider>{element}</MockProvider>
      </MockProvider>
    </MockProvider>
  );
};
