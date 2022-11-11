import { Route, Routes } from "react-router-dom";
import { NewRoom } from "@/features/rooms/routes/NewRoom";
import { RoomPage } from "@/features/rooms/routes/RoomPage";
import { NotFound } from "@/routes/NotFound";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<NewRoom />} />
      <Route path="/rooms/:id" element={<RoomPage />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
};
