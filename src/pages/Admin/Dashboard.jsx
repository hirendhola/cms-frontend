import { useAuth } from '@/hooks/Admin/useAuth';
import CreateDepartment from '@/components/Admin/CreateDepartment';
import Loading from '@/components/Loading';
import { useEffect } from 'react';

const Dashboard = () => {
  const { loading, user, college, refreshData } = useAuth();

  useEffect(() => {
    if (user) {
      console.log("User data:", user);
    }
    if (college) {
      console.log("College data:", college);
    }
  }, [user, college]);

  if (loading) {
    return <Loading loading={loading} />;
  }

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <br />
      <hr />
      <br />
      <h1>PERSONAL INFO</h1>
      <br />
      {user && (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Mobile Number: {user.mobileNumber}</p>
        </div>
      )}
      <br />
      <hr />
      <br />
      <h1>College INFO</h1>
      <br />
      {college && (
        <div>
          <p>College Name: {college.collegeName}</p>
          <p>College Code: {college.collegeCode || ' '}</p>
          <p>University Name: {college.uniName}</p>
          <br />
          <p>Departments: </p>
          {college.departments && college.departments.length > 0 && (
            college.departments.map((department, index) => (
              <div key={index} className='border-slate-300 border-[1px] w-fit p-1 rounded-sm'>
                <p>name: {department.name}</p>
                <p>code: {department.code}</p>
              </div>
            ))
          )}
        </div>
      )}

      <CreateDepartment college={college} onDepartmentCreated={refreshData} />
    </div>
  );
};

export default Dashboard;