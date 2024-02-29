var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
export function initialize(axios, config) {
  const requests = makeRequests(
    axios,
    config === null || config === void 0 ? void 0 : config.axios,
  );
  return {
    requests,
    queries: makeQueries(requests),
    mutations: makeMutations(
      requests,
      config === null || config === void 0 ? void 0 : config.mutations,
    ),
  };
}
function useRapiniMutation(mutationFn, config, options) {
  const _a = options !== null && options !== void 0 ? options : {},
    { onSuccess, onError, onSettled } = _a,
    rest = __rest(_a, ["onSuccess", "onError", "onSettled"]);
  const queryClient = useQueryClient();
  const conf =
    config === null || config === void 0 ? void 0 : config(queryClient);
  const mutationOptions = Object.assign(
    {
      onSuccess: (data, variables, context) => {
        var _a;
        (_a = conf === null || conf === void 0 ? void 0 : conf.onSuccess) ===
          null || _a === void 0
          ? void 0
          : _a.call(conf, data, variables, context);
        onSuccess === null || onSuccess === void 0
          ? void 0
          : onSuccess(data, variables, context);
      },
      onError: (error, variables, context) => {
        var _a;
        (_a = conf === null || conf === void 0 ? void 0 : conf.onError) ===
          null || _a === void 0
          ? void 0
          : _a.call(conf, error, variables, context);
        onError === null || onError === void 0
          ? void 0
          : onError(error, variables, context);
      },
      onSettled: (data, error, variables, context) => {
        var _a;
        (_a = conf === null || conf === void 0 ? void 0 : conf.onSettled) ===
          null || _a === void 0
          ? void 0
          : _a.call(conf, data, error, variables, context);
        onSettled === null || onSettled === void 0
          ? void 0
          : onSettled(data, error, variables, context);
      },
    },
    rest,
  );
  return useMutation(Object.assign({ mutationFn }, mutationOptions));
}
function nullIfUndefined(value) {
  return typeof value === "undefined" ? null : value;
}
export const queryKeys = {
  appControllerGetHello: () => ["appControllerGetHello"],
  tasksControllerFindAll: () => ["tasksControllerFindAll"],
  tasksControllerFindOne: (id) => ["tasksControllerFindOne", id],
  usersControllerFindAll: () => ["usersControllerFindAll"],
  usersControllerFindOne: (id) => ["usersControllerFindOne", id],
};
function makeRequests(axios, config) {
  return {
    appControllerGetHello: () =>
      axios
        .request({
          method: "get",
          url: `/`,
        })
        .then((res) => res.data),
    tasksControllerFindAll: () =>
      axios
        .request({
          method: "get",
          url: `/tasks`,
        })
        .then((res) => res.data),
    tasksControllerCreate: (payload) =>
      axios
        .request({
          method: "post",
          url: `/tasks`,
          data: payload,
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => res.data),
    tasksControllerFindOne: (id) =>
      axios
        .request({
          method: "get",
          url: `/tasks/${id}`,
        })
        .then((res) => res.data),
    tasksControllerRemove: (id) =>
      axios
        .request({
          method: "delete",
          url: `/tasks/${id}`,
        })
        .then((res) => res.data),
    tasksControllerUpdate: (payload, id) =>
      axios
        .request({
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
        .request({
          method: "get",
          url: `/users`,
        })
        .then((res) => res.data),
    usersControllerCreate: (payload) =>
      axios
        .request({
          method: "post",
          url: `/users`,
          data: payload,
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => res.data),
    usersControllerFindOne: (id) =>
      axios
        .request({
          method: "get",
          url: `/users/${id}`,
        })
        .then((res) => res.data),
    usersControllerRemove: (id) =>
      axios
        .request({
          method: "delete",
          url: `/users/${id}`,
        })
        .then((res) => res.data),
    usersControllerUpdate: (payload, id) =>
      axios
        .request({
          method: "put",
          url: `/users/${id}`,
          data: payload,
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => res.data),
  };
}
function makeQueries(requests) {
  return {
    useAppControllerGetHello: (options) =>
      useQuery(
        Object.assign(
          {
            queryKey: queryKeys.appControllerGetHello(),
            queryFn: () => requests.appControllerGetHello(),
          },
          options,
        ),
      ),
    useTasksControllerFindAll: (options) =>
      useQuery(
        Object.assign(
          {
            queryKey: queryKeys.tasksControllerFindAll(),
            queryFn: () => requests.tasksControllerFindAll(),
          },
          options,
        ),
      ),
    useTasksControllerFindOne: (id, options) =>
      useQuery(
        Object.assign(
          {
            queryKey: queryKeys.tasksControllerFindOne(id),
            queryFn: () => requests.tasksControllerFindOne(id),
          },
          options,
        ),
      ),
    useUsersControllerFindAll: (options) =>
      useQuery(
        Object.assign(
          {
            queryKey: queryKeys.usersControllerFindAll(),
            queryFn: () => requests.usersControllerFindAll(),
          },
          options,
        ),
      ),
    useUsersControllerFindOne: (id, options) =>
      useQuery(
        Object.assign(
          {
            queryKey: queryKeys.usersControllerFindOne(id),
            queryFn: () => requests.usersControllerFindOne(id),
          },
          options,
        ),
      ),
  };
}
function makeMutations(requests, config) {
  return {
    useTasksControllerCreate: (options) =>
      useRapiniMutation(
        (payload) => requests.tasksControllerCreate(payload),
        config === null || config === void 0
          ? void 0
          : config.useTasksControllerCreate,
        options,
      ),
    useTasksControllerUpdate: (id, options) =>
      useRapiniMutation(
        (payload) => requests.tasksControllerUpdate(payload, id),
        config === null || config === void 0
          ? void 0
          : config.useTasksControllerUpdate,
        options,
      ),
    useTasksControllerRemove: (id, options) =>
      useRapiniMutation(
        () => requests.tasksControllerRemove(id),
        config === null || config === void 0
          ? void 0
          : config.useTasksControllerRemove,
        options,
      ),
    useUsersControllerCreate: (options) =>
      useRapiniMutation(
        (payload) => requests.usersControllerCreate(payload),
        config === null || config === void 0
          ? void 0
          : config.useUsersControllerCreate,
        options,
      ),
    useUsersControllerUpdate: (id, options) =>
      useRapiniMutation(
        (payload) => requests.usersControllerUpdate(payload, id),
        config === null || config === void 0
          ? void 0
          : config.useUsersControllerUpdate,
        options,
      ),
    useUsersControllerRemove: (id, options) =>
      useRapiniMutation(
        () => requests.usersControllerRemove(id),
        config === null || config === void 0
          ? void 0
          : config.useUsersControllerRemove,
        options,
      ),
  };
}
