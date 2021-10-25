import { InMemoryCache } from "@apollo/client";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { render as renderNode } from "@testing-library/react";
import React from "react";
import { UIDReset } from "react-uid";

import { ChatProvider } from "../../src/contexts/ChatContext";
import { typePolicies } from "../../src/graphql/apolloClient";

interface Options {
  mocks?: ReadonlyArray<MockedResponse>;
  cache?: InMemoryCache;
}

export const render = (
  ui: React.ReactElement,
  {
    mocks = [],
    cache = new InMemoryCache({
      addTypename: false,
      typePolicies,
    }),
  }: Options = {}
) => {
  return renderNode(
    <MockedProvider
      mocks={mocks}
      defaultOptions={{ mutate: { errorPolicy: "all" } }}
      addTypename={false}
      cache={cache}
    >
      <ChatProvider>
        <UIDReset>{ui}</UIDReset>
      </ChatProvider>
    </MockedProvider>
  );
};
