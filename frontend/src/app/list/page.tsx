import CardList from '@/components/CardList';

export default function list() {
  return (
    <main className='flex flex-col items-center justify-center gap-5 p-5'>
      <h1 className='font-bold text-3xl text-sky-500'>TaskListed</h1>
      <CardList />
    </main>
  )
}
