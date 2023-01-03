import { Suspense } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { TopPage } from "@/features/rooms/routes/TopPage";
import { RoomPage } from "@/features/rooms/routes/RoomPage";
import { NotFound } from "@/routes/NotFound";
import { MainLayout } from "@/shared/components/MainLayout";
import { SetAuth } from "@/shared/components/SetAuth";
import { PageLoader } from "@/shared/components/PageLoader";
import { TermsPage } from "@/features/static/routes/TermsPage";

const AppWithLayout = () => {
  return (
    <MainLayout>
      <Suspense fallback={<PageLoader />}>
        <SetAuth>
          <Outlet />
        </SetAuth>
      </Suspense>
    </MainLayout>
  );
};

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AppWithLayout />}>
        <Route index element={<TopPage />} />
        <Route path="/rooms/:id" element={<RoomPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};
