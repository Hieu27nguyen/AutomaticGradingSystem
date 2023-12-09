import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const scoreboardAdapter = createEntityAdapter({});

const initialState = scoreboardAdapter.getInitialState();

export const scoreboardApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getScoreboard: builder.query({
      query: () => '/scoreboard',
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (responseData) => {
        const loadedScoreboard = responseData.map(score => {
          score.id = score._id;
          return score;
        });
        return scoreboardAdapter.setAll(initialState, loadedScoreboard);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'Scoreboard', id: 'LIST' },
            ...result.ids.map(id => ({ type: 'Scoreboard', id }))
          ];
        } else return [{ type: 'Scoreboard', id: 'LIST' }];
      }
    }),
  }),
});

export const { useGetScoreboardQuery } = scoreboardApiSlice;

// returns the query result object
export const selectScoreboardResult = scoreboardApiSlice.endpoints.getScoreboard.select();

// creates memoized selector
const selectScoreboardData = createSelector(
  selectScoreboardResult,
  scoreboardResult => scoreboardResult.data // normalized state object with ids & entities
);

// getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllScoreboard,
  selectById: selectScoreboardById,
  selectIds: selectScoreboardIds,
} = scoreboardAdapter.getSelectors(state => selectScoreboardData(state) ?? initialState);




