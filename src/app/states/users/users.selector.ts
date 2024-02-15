import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";

export const selectUsersState = (state: AppState) => state.users;
export const selectUsers = createSelector(selectUsersState, state => state.users);