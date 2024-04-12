"use client"; //React Context only available in client components

import {
  QueryClient,
  QueryClientProvider as ReactQueryClientProvider,
} from "@tanstack/react-query"; // npm i @tanstack/react-query@4.35.3
import { PropsWithChildren } from "react";

// Contain a cache for storing data that we get from the back end
const queryCleint = new QueryClient();

const QueryClientProvider = ({ children }: PropsWithChildren) => {
  return (
    // This component uses react context to share the queryClient with the component tree
    <ReactQueryClientProvider
      // Pass the queryClient to the component tree
      client={queryCleint}
    >
      {children}
    </ReactQueryClientProvider>
  );
};

export default QueryClientProvider;
