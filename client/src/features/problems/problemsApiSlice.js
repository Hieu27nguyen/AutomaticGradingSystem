import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const problemsAdapter = createEntityAdapter({})

const initialState = problemsAdapter.getInitialState()

export const problemsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getProblems: builder.query({
            query: () => '/problems',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedProblems = responseData.map(problem => {
                    problem.id = problem._id
                    return problem
                });
                return problemsAdapter.setAll(initialState, loadedProblems)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Problem', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Problem', id }))
                    ]
                } else return [{ type: 'Problem', id: 'LIST' }]
            }
        }),
        addNewProblem: builder.mutation({
            query: initialProblemData => ({
                url: '/problems',
                method: 'POST',
                body: {
                    ...initialProblemData,
                }
            }),
            invalidatesTags: [
                { type: 'Problem', id: "LIST" }
            ]
        }),
        updateProblem: builder.mutation({
            query: initialProblemData => ({
                url: '/problems',
                method: 'PATCH',
                body: {
                    ...initialProblemData,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Problem', id: arg.id }
            ]
        }),
        deleteProblem: builder.mutation({
            query: ({ id }) => ({
                url: `/problems`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Problem', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetProblemsQuery,
    useAddNewProblemMutation,
    useUpdateProblemMutation,
    useDeleteProblemMutation,
} = problemsApiSlice

// returns the query result object
export const selectProblemsResult = problemsApiSlice.endpoints.getProblems.select()

// creates memoized selector
const selectProblemsData = createSelector(
    selectProblemsResult,
    problemsResult => problemsResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllProblems,
    selectById: selectProblemById,
    selectIds: selectProblemIds
    // Pass in a selector that returns the users slice of state
} = problemsAdapter.getSelectors(state => selectProblemsData(state) ?? initialState)