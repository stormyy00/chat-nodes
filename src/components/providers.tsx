"use client";

// import {
//   QueryClient,
//   QueryClientProvider,
//   HydrationBoundary,
//   DehydratedState,
// } from "@tanstack/react-query";
// import { useState } from "react";
import { SidebarProvider } from "./ui/sidebar";
// import Sidebar from "./sidebar";
// import Navigation from "./dashboard/navigation";/

type props = {
  children: React.ReactNode;
  //   dehydratedState?: DehydratedState | null;
  sidebar?: boolean;
};

const Provider = ({ children, sidebar }: props) => {
  //   const [queryClient] = useState(
  //     () =>
  //       new QueryClient({
  //         defaultOptions: {
  //           queries: {
  //             refetchOnWindowFocus: false,
  //             retry: 3,
  //             staleTime: 1000 * 60 * 5,
  //           },
  //         },
  //       }),
  //   );
  return (
    <>
      {sidebar ? <SidebarProvider>{children}</SidebarProvider> : { children }}
    </>
  );
};

export default Provider;
