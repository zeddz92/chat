import { InMemoryCache } from "@apollo/client";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { render as renderNode } from "@testing-library/react";
import React from "react";
import { UIDReset } from "react-uid";

import { ChatProvider } from "../../src/contexts/ChatContext";

interface Options {
  mocks?: ReadonlyArray<MockedResponse>;
}

export const render = (
  ui: React.ReactElement,
  { mocks = [] }: Options = {}
) => {
  const apolloCache = new InMemoryCache({
    addTypename: false,
  });

  return renderNode(
    <MockedProvider
      mocks={mocks}
      defaultOptions={{ mutate: { errorPolicy: "all" } }}
      addTypename={false}
      cache={apolloCache.restore({})}
    >
      <ChatProvider>
        <UIDReset>{ui}</UIDReset>
      </ChatProvider>
    </MockedProvider>
  );
};
