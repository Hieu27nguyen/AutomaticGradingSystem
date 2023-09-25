import { createEntityAdapter, createSelector, createAsyncThunk  } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";
import axios from 'axios';

const competitionsAdapter = createEntityAdapter({});

const initialState = competitionsAdapter.getInitialState();
const CREATE_COMPETITION_API_ENDPOINT = '/competitions';

export const competitionsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch all competitions
    getCompetitions: builder.query({
      query: () => '/competitions', 
      transformResponse: (responseData) => {
        return responseData;
      },
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
    updateCompetition: builder.mutation({
      query: (updatedCompetitionData) => ({
        url: '/competitions', 
        method: 'PUT',
        body: updatedCompetitionData,
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
} = competitionsApiSlice;

// Returns the query result object
export const selectCompetitionsResult = competitionsApiSlice.endpoints.getCompetitions.select();

// Creates a memoized selector
export const selectCompetitionsData = createSelector(
  selectCompetitionsResult,
  (competitionsResult) => competitionsResult.data // normalized state object with ids & entities
);

// Define async thunk for creating competitions
export const createCompetition = createAsyncThunk(
    'competitions/create',
    async (competitionData, thunkAPI) => {
      try {
        // Make a POST request to your API endpoint with the competition data
        const response = await axios.post(CREATE_COMPETITION_API_ENDPOINT, competitionData);
        // Return the response data
        return response.data;
      } catch (error) {
        // Handle any errors here (e.g., network error, validation error)
        throw error;
      }
    }
  );



  
