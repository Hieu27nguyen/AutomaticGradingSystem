import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const announcementAdapter = createEntityAdapter({})

const initialState = announcementAdapter.getInitialState()

export const annnouncementsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAnnouncements: builder.query({
            query: () => '/announcements',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedAnnouncements = responseData.map(announcement => {
                    announcement.id = announcement._id
                    return announcement
                });
                return announcementAdapter.setAll(initialState, loadedAnnouncements)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Announcement', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Announcement', id }))
                    ]
                } else return [{ type: 'Announcement', id: 'LIST' }]
            },
        }),

        addNewAnnouncement: builder.mutation({
            query: initialAnnouncementData => ({
                url: '/announcements',
                method: 'POST',
                body: {
                    ...initialAnnouncementData,
                }
            }),
            invalidatesTags: [
                { type: 'Announcement', id: "LIST" }
            ]
        }),
        updateAnnouncement: builder.mutation({
            query: initialAnnouncementData => ({
                url: '/announcements',
                method: 'PATCH',
                body: {
                    ...initialAnnouncementData,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Announcement', id: arg.id }
            ]
        }),
        deleteAnnouncement: builder.mutation({
            query: ({ id }) => ({
                url: `/announcements`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Announcement', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetAnnouncementsQuery,
    useAddNewAnnouncementMutation,
    useUpdateAnnouncementMutation,
    useDeleteAnnouncementMutation,
} = annnouncementsApiSlice

// returns the query result object
export const selectAnnouncementsResult = annnouncementsApiSlice.endpoints.getAnnouncements.select()

// creates memoized selector
const selectAnnouncementsData = createSelector(
    selectAnnouncementsResult,
    announcementsResult => announcementsResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllAnnouncements,
    selectById: selectAnnouncementById,
    selectIds: selectAnnouncementIds
    // Pass in a selector that returns the users slice of state
} = announcementAdapter.getSelectors(state => selectAnnouncementsData(state) ?? initialState)

