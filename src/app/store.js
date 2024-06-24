import { configureStore } from "@reduxjs/toolkit";
import auth from "../features/auth/authSlice";
import event from "../features/events/eventSlice";

export const store = configureStore({
    reducer: {
        auth,
        event,
    },
});
