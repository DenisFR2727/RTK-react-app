import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUsers } from "../redux/type";

export const usersApi = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://fake-users-api-cc332c07826a.herokuapp.com/api/v1/",
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUsers: builder.query<IUsers[], void>({
      query: () => "users",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "User" as const, id })),
              { type: "User", id: "LIST" },
            ]
          : [{ type: "User", id: "LIST" }],
    }),
    deleteUser: builder.mutation<void, number>({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    addUser: builder.mutation<IUsers, IUsers>({
      query: (body) => ({
        url: "users",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
  }),
});
export const { useGetUsersQuery, useDeleteUserMutation, useAddUserMutation } =
  usersApi;

// providesTags -- використовується в RTK Query для того, щоб позначити,
// які саме дані кэшуються за допомогою "тегів". Це дає можливість легко
// інвалідовувати (оновлювати) ці дані при виконанні інших запитів, таких як
// mutations або інші queries, які можуть змінювати ці дані.

// providesTags -- тісно працює з іншим параметром — invalidatesTags.
// Коли ви виконуєте мутацію (наприклад, видаляєте користувача через deleteUser),
// ви вказуєте, які саме теги повинні бути інвалідовані (оновлені).
// Таким чином, якщо мутація інвалідовує тег "User", то всі запити,
// які мають цей тег через providesTags, будуть автоматично повторно виконані
// для оновлення кешу.
