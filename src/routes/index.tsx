import { Suspense } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { Loader } from "@mantine/core";
import { NewRoom } from "@/features/rooms/routes/NewRoom";
import { RoomPage } from "@/features/rooms/routes/RoomPage";
import { NotFound } from "@/routes/NotFound";
import { MainLayout } from "@/shared/components/MainLayout";

const AppWithLayout = () => {
  return (
    <MainLayout>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </MainLayout>
  );
};

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AppWithLayout />}>
        <Route index element={<NewRoom />} />
        <Route path="/rooms/:id" element={<RoomPage />} />
        <Route path="/*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};
