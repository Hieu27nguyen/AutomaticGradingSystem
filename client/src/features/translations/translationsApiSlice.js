import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../../app/api/apiSlice';

const translationsAdapter = createEntityAdapter({});

const initialState = translationsAdapter.getInitialState();

export const translationsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllLanguages: builder.query({
      query: () => '/translation/languages',
      validateStatus: (response, result) => response.status === 200 && !result.isError,
    }),

    getAllTranslations: builder.query({
      query: () => '/translation',
      validateStatus: (response, result) => response.status === 200 && !result.isError,
      transformResponse: (responseData) => {
        const loadedTranslations = responseData.map((translation) => {
          translation.id = translation._id;
          return translation;
        });
        return translationsAdapter.setAll(initialState, loadedTranslations);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'Translation', id: 'LIST' },
            ...result.ids.map((id) => ({ type: 'Translation', id })),
          ];
        } else return [{ type: 'Translation', id: 'LIST' }];
      },
    }),

    getTranslationsByUsername: builder.query({
      query: (username) => `/translation/username/${username}`,
      validateStatus: (response, result) => response.status === 200 && !result.isError,
      transformResponse: (responseData) => {
        const loadedTranslations = responseData.map((translation) => {
          translation.id = translation._id;
          return translation;
        });
        return translationsAdapter.setAll(initialState, loadedTranslations);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'Translation', id: 'USER_LIST' },
            ...result.ids.map((id) => ({ type: 'Translation', id })),
          ];
        } else return [{ type: 'Translation', id: 'USER_LIST' }];
      },
    }),

    getTranslationById: builder.query({
      query: (id) => `/translation/id/${id}`,
      validateStatus: (response, result) => response.status === 200 && !result.isError,
    }),

    createTranslation: builder.mutation({
      query: (initialTranslationData) => ({
        url: '/translation',
        method: 'POST',
        body: {
          ...initialTranslationData,
        },
      }),
      invalidatesTags: [{ type: 'Translation', id: 'LIST' }, { type: 'Translation', id: 'USER_LIST' }],
    }),
  }),
});

export const {
  useGetAllLanguagesQuery,
  useGetAllTranslationsQuery,
  useGetTranslationsByUsernameQuery,
  useGetTranslationByIdQuery,
  useCreateTranslationMutation,
} = translationsApiSlice;

export const selectAllTranslationsResult = translationsApiSlice.endpoints.getAllTranslations.select();

const selectAllTranslationsData = createSelector(
  selectAllTranslationsResult,
  (translationsResult) => translationsResult.data
);

export const {
  selectAll: selectAllTranslations,
  selectById: selectTranslationById,
  selectIds: selectTranslationIds,
} = translationsAdapter.getSelectors((state) => selectAllTranslationsData(state) ?? initialState);

