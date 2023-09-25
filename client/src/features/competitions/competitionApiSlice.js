import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const competitionsAdapter = createEntityAdapter({});

const CREATE_COMPETITION_API_ENDPOINT = '/competitions';

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
        url: CREATE_COMPETITION_API_ENDPOINT, // Use the correct endpoint here
        method: 'POST',
        body: newCompetitionData,
      }),
      invalidatesTags: ['Competition'],
    }),
  }),
});

export const {
  useGetCompetitionsQuery,
  useAddNewCompetitionMutation,
} = competitionsApiSlice;

// Define async thunk for creating competitions
export const createCompetition = (competitionData) => async (dispatch) => {
  try {
    // Make a POST request to your API endpoint with the competition data
    const response = await fetch(CREATE_COMPETITION_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(competitionData),
    });

    if (!response.ok) {
      // Handle API error (e.g., validation error) here
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error creating competition');
    }

    // Assuming your API returns the created competition data
    const createdCompetition = await response.json();

    // Dispatch an action to update the Redux store with the created competition
    dispatch(
      useAddNewCompetitionMutation(createdCompetition, {
        invalidateTags: ['Competition'],
      })
    );

    // Return the created competition data
    return createdCompetition;
  } catch (error) {
    // Handle network errors or other errors here
    throw error;
  }
};




  
