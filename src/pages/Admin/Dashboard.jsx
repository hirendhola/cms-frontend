import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [college, setCollege] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const getInfo = await axios.get('http://localhost:3000/api/admin/me', {
          withCredentials: true
        })
        console.log("admin: ", getInfo.data.admin)
        console.log("College: ", getInfo.data.college)
        setUser(getInfo.data.admin);
        setCollege(getInfo.data.college)
        setLoading(false);

      } catch (error) {
        console.error(error);
        navigate('/auth/admin/signin');  // Redirect to login page if not authenticated
      }
    };

    checkAuthStatus();
  }, [navigate]);

  if (loading) return <p>Loading...</p>;

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
          <p>mobileNumber: {user.mobileNumber}</p>
        </div>
      )}
      <br />
      <hr />
      <br />
      <h1>College INFO</h1>
      <br />
      {college && (
        <div>
          <p>collegeName: {college.collegeName}</p>
          <p>collegeCode: {college.collegeCode}</p>
          <p>uniName: {college.uniName}</p>
          {college.departments && (
            college.departments.forEach(department => {
              <p>{department}</p>
            })
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
