import { initialize } from 'api-tanstack'
import axiosInstance from './axios-rapini/axios-instance'

export default function Example() {
  const config = initialize(axiosInstance)

  // const { useTasksControllerFindOne } = config.queries;
  // const id = "fake id";
  // const { isLoading, isError, data } = useTasksControllerFindOne(`${id}`);
  // if (isLoading) return <div>Loading...</div>;
  // if (isError) return <div>An error has occurred</div>;
  // return <div>Test {data?.title}</div>

  const { useUsersControllerFindOne } = config.queries
  const id = '1111'
  const { isLoading, isError, data } = useUsersControllerFindOne(`${id}`)
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>An error has occurred</div>
  return <div>Test {data}</div>
}
