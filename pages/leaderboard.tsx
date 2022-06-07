import type { NextPage } from 'next'

import Layout from '../components/Layout'

const people = [
  {
    address: '0x4648349384394djs',
    count: 24,
    mostPopularDrink:
      'Mule',
  },
  {
    address: '0x4648349384394djs',
    count: 22,
    mostPopularDrink:
      'Old Fashioned',
  },
  {
    address: '0x4648349384394djs',
    count: 18,
    mostPopularDrink:
      'Margarita',
  }
]

const Leaderboard: NextPage = () => {
  return (
    <Layout>
        <div className="flex flex-col justify-around mx-12 mt-5">
            <div className="font-semibold mb-4">
                Leaderboard
            </div>
            <ul role="list" className="divide-y divide-gray-200">
            {people.map((person) => (
                <li key={person.address} className="py-4 flex items-center">
                  <div className="">
                      <p className="text-sm font-medium text-gray-500">Address</p>
                      <p className="text-lg text-cyan-900">{person.address.substring(0, 4) + '...' + person.address.substring(person.address.length - 4)}</p>
                  </div>
                  <div>
                      
                  </div>
                  <div className="ml-24">
                      <p className="text-sm font-medium text-gray-500">Total Drinks Recieved</p>
                      <p className="text-lg text-cyan-900">{person.count}</p>
                  </div>
                  <div className="ml-24">
                      <p className="text-sm font-medium text-gray-500">Most Popular Drink</p>
                      <p className="text-lg text-cyan-900">{person.mostPopularDrink}</p>
                  </div>
                </li>

            ))}
            </ul>
        </div>
    </Layout>
  )
}

export default Leaderboard