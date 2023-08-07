import FormCreateUser from "@/components/FormCreateUser";

export default function signup() {
  return (
    <main className='flex flex-col items-center justify-center gap-5 p-5'>
      <h1 className='font-bold text-3xl text-sky-500'>Cirar Conta</h1>
      <FormCreateUser />
    </main>
  )
}
