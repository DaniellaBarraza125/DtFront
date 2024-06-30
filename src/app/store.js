import { configureStore } from "@reduxjs/toolkit";
import auth from "../features/auth/authSlice";
import event from "../features/events/eventSlice";
import partner from "../features/partner/partnerSlice";

export const store = configureStore({
    reducer: {
        auth,
        event,
        partner,
    },
});
