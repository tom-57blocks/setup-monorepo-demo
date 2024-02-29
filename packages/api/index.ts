import type { AxiosInstance, AxiosRequestConfig } from "axios";
import {
  useQuery,
  useMutation,
  useQueryClient,
  type QueryClient,
  type UseMutationOptions,
  type UseQueryOptions,
  type MutationFunction,
  type UseMutationResult,
  type UseQueryResult,
} from "@tanstack/react-query";
export type CreateTaskDto = {
  title: string;
  description: string;
};
export type TaskDto = {
  id: number;
  title: string;
  description: string;
};
export type UpdateTaskDto = {
  title: string;
  description: string;
};
export type CreateUserDto = {};
export type UpdateUserDto = {};
export type AxiosConfig = {
  paramsSerializer?: AxiosRequestConfig["paramsSerializer"];
};
export type Config = {
  mutations?: MutationConfigs;
  axios?: AxiosConfig;
};
export function initialize(axios: AxiosInstance, config?: Config) {
  const requests = makeRequests(axios, config?.axios);
  return {
    requests,
    queries: makeQueries(requests),
    mutations: makeMutations(requests, config?.mutations),
  };
}
function useRapiniMutation<
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown,
>(
  mutationFn: MutationFunction<TData, TVariables>,
  config?: (
    queryClient: QueryClient,
  ) => Pick<
    UseMutationOptions<TData, TError, TVariables, TContext>,
    "onSuccess" | "onSettled" | "onError"
  >,
  options?: Omit<
    UseMutationOptions<TData, TError, TVariables, TContext>,
    "mutationFn"
  >,
): UseMutationResult<TData, TError, TVariables, TContext> {
  const { onSuccess, onError, onSettled, ...rest } = options ?? {};
  const queryClient = useQueryClient();
  const conf = config?.(queryClient);
  const mutationOptions: typeof options = {
    onSuccess: (data: TData, variables: TVariables, context?: TContext) => {
      conf?.onSuccess?.(data, variables, context);
      onSuccess?.(data, variables, context);
    },
    onError: (error: TError, variables: TVariables, context?: TContext) => {
      conf?.onError?.(error, variables, context);
      onError?.(error, variables, context);
    },
    onSettled: (
      data: TData | undefined,
      error: TError | null,
      variables: TVariables,
      context?: TContext,
    ) => {
      conf?.onSettled?.(data, error, variables, context);
      onSettled?.(data, error, variables, context);
    },
    ...rest,
  };
  return useMutation({ mutationFn, ...mutationOptions });
}
function nullIfUndefined<T>(value: T): NonNullable<T> | null {
  return typeof value === "undefined" ? null : (value as NonNullable<T> | null);
}
export const queryKeys = {
  appControllerGetHello: () => ["appControllerGetHello"] as const,
  tasksControllerFindAll: () => ["tasksControllerFindAll"] as const,
  tasksControllerFindOne: (id: string) =>
    ["tasksControllerFindOne", id] as const,
  usersControllerFindAll: () => ["usersControllerFindAll"] as const,
  usersControllerFindOne: (id: string) =>
    ["usersControllerFindOne", id] as const,
} as const;
export type QueryKeys = typeof queryKeys;
function makeRequests(axios: AxiosInstance, config?: AxiosConfig) {
  return {
    appControllerGetHello: () =>
      axios
        .request<unknown>({
          method: "get",
          url: `/`,
        })
        .then((res) => res.data),
    tasksControllerFindAll: () =>
      axios
        .request<unknown>({
          method: "get",
          url: `/tasks`,
        })
        .then((res) => res.data),
    tasksControllerCreate: (payload: CreateTaskDto) =>
      axios
        .request<unknown>({
          method: "post",
          url: `/tasks`,
          data: payload,
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => res.data),
    tasksControllerFindOne: (id: string) =>
      axios
        .request<TaskDto>({
          method: "get",
          url: `/tasks/${id}`,
        })
        .then((res) => res.data),
    tasksControllerRemove: (id: string) =>
      axios
        .request<unknown>({
          method: "delete",
          url: `/tasks/${id}`,
        })
        .then((res) => res.data),
    tasksControllerUpdate: (payload: UpdateTaskDto, id: string) =>
      axios
        .request<unknown>({
          method: "put",
          url: `/tasks/${id}`,
          data: payload,
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => res.data),
    usersControllerFindAll: () =>
      axios
        .request<unknown>({
          method: "get",
          url: `/users`,
        })
        .then((res) => res.data),
    usersControllerCreate: (payload: CreateUserDto) =>
      axios
        .request<unknown>({
          method: "post",
          url: `/users`,
          data: payload,
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => res.data),
    usersControllerFindOne: (id: string) =>
      axios
        .request<unknown>({
          method: "get",
          url: `/users/${id}`,
        })
        .then((res) => res.data),
    usersControllerRemove: (id: string) =>
      axios
        .request<unknown>({
          method: "delete",
          url: `/users/${id}`,
        })
        .then((res) => res.data),
    usersControllerUpdate: (payload: UpdateUserDto, id: string) =>
      axios
        .request<unknown>({
          method: "put",
          url: `/users/${id}`,
          data: payload,
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => res.data),
  } as const;
}
export type Requests = ReturnType<typeof makeRequests>;
export type Response<T extends keyof Requests> = Awaited<
  ReturnType<Requests[T]>
>;
function makeQueries(requests: Requests) {
  return {
    useAppControllerGetHello: (
      options?: Omit<
        UseQueryOptions<
          Response<"appControllerGetHello">,
          unknown,
          Response<"appControllerGetHello">,
          ReturnType<QueryKeys["appControllerGetHello"]>
        >,
        "queryKey" | "queryFn"
      >,
    ): UseQueryResult<Response<"appControllerGetHello">, unknown> =>
      useQuery({
        queryKey: queryKeys.appControllerGetHello(),
        queryFn: () => requests.appControllerGetHello(),
        ...options,
      }),
    useTasksControllerFindAll: (
      options?: Omit<
        UseQueryOptions<
          Response<"tasksControllerFindAll">,
          unknown,
          Response<"tasksControllerFindAll">,
          ReturnType<QueryKeys["tasksControllerFindAll"]>
        >,
        "queryKey" | "queryFn"
      >,
    ): UseQueryResult<Response<"tasksControllerFindAll">, unknown> =>
      useQuery({
        queryKey: queryKeys.tasksControllerFindAll(),
        queryFn: () => requests.tasksControllerFindAll(),
        ...options,
      }),
    useTasksControllerFindOne: (
      id: string,
      options?: Omit<
        UseQueryOptions<
          Response<"tasksControllerFindOne">,
          unknown,
          Response<"tasksControllerFindOne">,
          ReturnType<QueryKeys["tasksControllerFindOne"]>
        >,
        "queryKey" | "queryFn"
      >,
    ): UseQueryResult<Response<"tasksControllerFindOne">, unknown> =>
      useQuery({
        queryKey: queryKeys.tasksControllerFindOne(id),
        queryFn: () => requests.tasksControllerFindOne(id),
        ...options,
      }),
    useUsersControllerFindAll: (
      options?: Omit<
        UseQueryOptions<
          Response<"usersControllerFindAll">,
          unknown,
          Response<"usersControllerFindAll">,
          ReturnType<QueryKeys["usersControllerFindAll"]>
        >,
        "queryKey" | "queryFn"
      >,
    ): UseQueryResult<Response<"usersControllerFindAll">, unknown> =>
      useQuery({
        queryKey: queryKeys.usersControllerFindAll(),
        queryFn: () => requests.usersControllerFindAll(),
        ...options,
      }),
    useUsersControllerFindOne: (
      id: string,
      options?: Omit<
        UseQueryOptions<
          Response<"usersControllerFindOne">,
          unknown,
          Response<"usersControllerFindOne">,
          ReturnType<QueryKeys["usersControllerFindOne"]>
        >,
        "queryKey" | "queryFn"
      >,
    ): UseQueryResult<Response<"usersControllerFindOne">, unknown> =>
      useQuery({
        queryKey: queryKeys.usersControllerFindOne(id),
        queryFn: () => requests.usersControllerFindOne(id),
        ...options,
      }),
  } as const;
}
type MutationConfigs = {
  useTasksControllerCreate?: (
    queryClient: QueryClient,
  ) => Pick<
    UseMutationOptions<
      Response<"tasksControllerCreate">,
      unknown,
      Parameters<Requests["tasksControllerCreate"]>[0],
      unknown
    >,
    "onSuccess" | "onSettled" | "onError"
  >;
  useTasksControllerUpdate?: (
    queryClient: QueryClient,
  ) => Pick<
    UseMutationOptions<
      Response<"tasksControllerUpdate">,
      unknown,
      Parameters<Requests["tasksControllerUpdate"]>[0],
      unknown
    >,
    "onSuccess" | "onSettled" | "onError"
  >;
  useTasksControllerRemove?: (
    queryClient: QueryClient,
  ) => Pick<
    UseMutationOptions<
      Response<"tasksControllerRemove">,
      unknown,
      unknown,
      unknown
    >,
    "onSuccess" | "onSettled" | "onError"
  >;
  useUsersControllerCreate?: (
    queryClient: QueryClient,
  ) => Pick<
    UseMutationOptions<
      Response<"usersControllerCreate">,
      unknown,
      Parameters<Requests["usersControllerCreate"]>[0],
      unknown
    >,
    "onSuccess" | "onSettled" | "onError"
  >;
  useUsersControllerUpdate?: (
    queryClient: QueryClient,
  ) => Pick<
    UseMutationOptions<
      Response<"usersControllerUpdate">,
      unknown,
      Parameters<Requests["usersControllerUpdate"]>[0],
      unknown
    >,
    "onSuccess" | "onSettled" | "onError"
  >;
  useUsersControllerRemove?: (
    queryClient: QueryClient,
  ) => Pick<
    UseMutationOptions<
      Response<"usersControllerRemove">,
      unknown,
      unknown,
      unknown
    >,
    "onSuccess" | "onSettled" | "onError"
  >;
};
function makeMutations(requests: Requests, config?: Config["mutations"]) {
  return {
    useTasksControllerCreate: (
      options?: Omit<
        UseMutationOptions<
          Response<"tasksControllerCreate">,
          unknown,
          Parameters<Requests["tasksControllerCreate"]>[0],
          unknown
        >,
        "mutationFn"
      >,
    ) =>
      useRapiniMutation<
        Response<"tasksControllerCreate">,
        unknown,
        Parameters<Requests["tasksControllerCreate"]>[0]
      >(
        (payload) => requests.tasksControllerCreate(payload),
        config?.useTasksControllerCreate,
        options,
      ),
    useTasksControllerUpdate: (
      id: string,
      options?: Omit<
        UseMutationOptions<
          Response<"tasksControllerUpdate">,
          unknown,
          Parameters<Requests["tasksControllerUpdate"]>[0],
          unknown
        >,
        "mutationFn"
      >,
    ) =>
      useRapiniMutation<
        Response<"tasksControllerUpdate">,
        unknown,
        Parameters<Requests["tasksControllerUpdate"]>[0]
      >(
        (payload) => requests.tasksControllerUpdate(payload, id),
        config?.useTasksControllerUpdate,
        options,
      ),
    useTasksControllerRemove: (
      id: string,
      options?: Omit<
        UseMutationOptions<
          Response<"tasksControllerRemove">,
          unknown,
          unknown,
          unknown
        >,
        "mutationFn"
      >,
    ) =>
      useRapiniMutation<Response<"tasksControllerRemove">, unknown, unknown>(
        () => requests.tasksControllerRemove(id),
        config?.useTasksControllerRemove,
        options,
      ),
    useUsersControllerCreate: (
      options?: Omit<
        UseMutationOptions<
          Response<"usersControllerCreate">,
          unknown,
          Parameters<Requests["usersControllerCreate"]>[0],
          unknown
        >,
        "mutationFn"
      >,
    ) =>
      useRapiniMutation<
        Response<"usersControllerCreate">,
        unknown,
        Parameters<Requests["usersControllerCreate"]>[0]
      >(
        (payload) => requests.usersControllerCreate(payload),
        config?.useUsersControllerCreate,
        options,
      ),
    useUsersControllerUpdate: (
      id: string,
      options?: Omit<
        UseMutationOptions<
          Response<"usersControllerUpdate">,
          unknown,
          Parameters<Requests["usersControllerUpdate"]>[0],
          unknown
        >,
        "mutationFn"
      >,
    ) =>
      useRapiniMutation<
        Response<"usersControllerUpdate">,
        unknown,
        Parameters<Requests["usersControllerUpdate"]>[0]
      >(
        (payload) => requests.usersControllerUpdate(payload, id),
        config?.useUsersControllerUpdate,
        options,
      ),
    useUsersControllerRemove: (
      id: string,
      options?: Omit<
        UseMutationOptions<
          Response<"usersControllerRemove">,
          unknown,
          unknown,
          unknown
        >,
        "mutationFn"
      >,
    ) =>
      useRapiniMutation<Response<"usersControllerRemove">, unknown, unknown>(
        () => requests.usersControllerRemove(id),
        config?.useUsersControllerRemove,
        options,
      ),
  } as const;
}
