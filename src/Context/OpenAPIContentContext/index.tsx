import { Host, LayoutType } from '@wix/ambassador-apis-docs-v2-portal/types';
import React, { createContext, useReducer, useContext, useEffect } from 'react';
// import { usePortal } from '../DocsPortalContext';

type Action = { type: 'setActiveLayoutType'; activeLayoutType: LayoutType };

type Dispatch = (action: Action) => void;

type State = {
  activeLayoutType: LayoutType;
};

const OpenApiContentContext = createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

function openApiContentReducer(state: State, action: Action) {
  switch (action.type) {
    case 'setActiveLayoutType': {
      return { ...state, activeLayoutType: action.activeLayoutType };
    }
  }
}

export interface OpenApiContentProviderProps {
  activeLayoutType?: LayoutType;
  children: React.ReactNode;
}

export function OpenApiContentProvider({
  activeLayoutType = LayoutType.REST,
  children,
}: OpenApiContentProviderProps) {
  const [state, dispatch] = useReducer(openApiContentReducer, {
    activeLayoutType,
  });

  const value = { state, dispatch };

  // const {
  //   state: { docsPortal },
  // } = usePortal();

  const docsPortal = { config: {docsUrl: {host: Host.BO}}};

  useEffect(() => {
    switch (docsPortal.config?.docsUrl?.host) {
      case Host.PUBLIC:
        dispatch({
          type: 'setActiveLayoutType',
          activeLayoutType: LayoutType.REST,
        });
        break;
    }
  }, []);

  return (
    <OpenApiContentContext.Provider value={value}>
      {children}
    </OpenApiContentContext.Provider>
  );
}

export function useOpenApiContent() {
  const context = useContext(OpenApiContentContext);

  if (context === undefined) {
    throw new Error(
      'useOpenApiContent must be used within a OpenApiContentProvider',
    );
  }

  return context;
}
