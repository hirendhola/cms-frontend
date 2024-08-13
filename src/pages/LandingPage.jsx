import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {


  const navigate = useNavigate();
  const handleNavigation = (path) => () => navigate(path);
  

  return (
    <div>
      <div className='w-screen h-screen flex justify-center flex-col'>
        <div className='grid grid-cols-1 gap-5 self-center'>
          <div className='grid grid-cols-2 gap-4'>
            <Button onClick={handleNavigation('/auth/admin/signup')}>Admin-SignUP</Button>
            <Button onClick={handleNavigation('/auth/admin/signin')}>Admin-SignIN</Button>
          </div>
          <div className='grid grid-cols-2 gap-3'>
            <Button onClick={handleNavigation('/auth/hod/signup')}>Hod-SignUP</Button>
            <Button onClick={handleNavigation('/auth/hod/signin')}>Hod-SignIN</Button>
          </div>
          <div className='grid grid-cols-2 gap-3'>
            <Button onClick={handleNavigation('/auth/teacher/signup')}>Teacher-SignUP</Button>
            <Button onClick={handleNavigation('/auth/teacher/signin')}>Teacher-SignIN</Button>
          </div>
          <div className='grid grid-cols-2 gap-3'>
            <Button onClick={handleNavigation('auth/student/signup')}>Student-SignUP</Button>
            <Button onClick={handleNavigation('auth/student/signin')}>Student-SignIN</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage