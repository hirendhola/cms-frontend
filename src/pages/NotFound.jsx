import { useNavigate } from "react-router-dom"

const NotFound = () => {
  const navigate = useNavigate()
  const handleNavigation = (path) => () => navigate(path);

  return (
    <>
      <div className="w-screen h-screen flex flex-col gap-5 justify-center items-center">
        <h1 className="text-3xl font-semibold ">Looks Like You Lost 👀</h1>
        <button onClick={handleNavigation('/')} className="bg-slate-200 p-1 px-2 rounded-md">Go HOME</button>
      </div>
    </>
  )
}

export default NotFound