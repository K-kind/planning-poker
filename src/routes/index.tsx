import { Route, Routes } from "react-router-dom";
import { NewRoom } from "@/features/rooms/routes/NewRoom";
import { NotFound } from "@/routes/NotFound";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<NewRoom />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
};
