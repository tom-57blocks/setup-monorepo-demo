import './App.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient()

import Example from './Example'

import { Person } from 'ui-package'

export const App: React.FC = () => {
  const persons: Person[] = [
    { name: 'tom', age: 16 },
    { name: 'lucy', age: 17 },
    { name: 'lilei', age: 18 },
  ]

  persons.forEach((ele) => console.log(ele.name + "'s age is" + ele.age))

  return (
    <QueryClientProvider client={queryClient}>
      <div className='app'>
        <p>Hello Dashboard!</p>
      </div>
      <Example />
    </QueryClientProvider>
  )
}
