import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const competitionsAdapter = createEntityAdapter({});

const initialState = competitionsAdapter.getInitialState();

export const competitionsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch all competitions
    getCompetitions: builder.query({
      query: () => '/competitions',
      providesTags: ['Competition'],
    }),

    // Add a new competition
    addNewCompetition: builder.mutation({
      query: (newCompetitionData) => ({
        url: '/competitions',
        method: 'POST',
        body: newCompetitionData,
      }),
      invalidatesTags: ['Competition'],
    }),

    // Update an existing competition
    // Update the first element in the database
    updateCompetition: builder.mutation({
      query: (updatedCompetitionData) => ({
        url: '/competitions',
        method: 'PATCH',
        body: updatedCompetitionData,
      }),
      invalidatesTags: ['Competition'],
    }),

    // Delete a competition by id
    // Currently not using this but leave here for further implementation
    deleteCompetition: builder.mutation({
      query: ({ id }) => ({
        url: `/competitions/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Competition', id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetCompetitionsQuery,
  useAddNewCompetitionMutation,
  useUpdateCompetitionMutation,
  useDeleteCompetitionMutation,
} = competitionsApiSlice;

export const selectCompetitionsResult = competitionsApiSlice.endpoints.getCompetitions.select();

const selectCompetitionsData = createSelector(
  selectCompetitionsResult,
  (competitionsResult) => competitionsResult.data
);

export const {
  selectAll: selectAllCompetitions,
  selectById: selectCompetitionById,
  selectIds: selectCompetitionIds,
} = competitionsAdapter.getSelectors((state) =>
  selectCompetitionsData(state) ?? initialState
);

export const createCompetition = (competitionData) => async (dispatch) => {
  try {
    const response = await fetch('/competitions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(competitionData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error creating competition');
    }

    const createdCompetition = await response.json();

    dispatch(
      useAddNewCompetitionMutation(createdCompetition, {
        invalidateTags: ['Competition'],
      })
    );

    return createdCompetition;
  } catch (error) {
    throw error;
  }
};
