import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetCaptainProfileQuery } from '../redux/api/captainAPI'
import { useGetUserProfileQuery } from '../redux/api/userAPI'

const ProtectedRoute = ({
    redirectPath = '/',
    allowedRoles = [],
    loading = <div>Loading...</div>
}) => {
    const location = useLocation();

    const userToken = localStorage.getItem('tokenU');
    const captainToken = localStorage.getItem('tokenC');
    
    const currentRole = userToken ? 'user' : 'captain'
    const token = userToken || captainToken

    const { isAuthenticated: isUserAuthenticated, user, isLoading: isUserLoading } = useSelector((state) => state.user);
    const { isAuthenticated: isCaptainAuthenticated, captain, isLoading: isCaptainLoading } = useSelector((state) => state.captain);

    // const isLoading = isUserLoading || isCaptainLoading;
    // const isAuthenticated = isUserAuthenticated || isCaptainAuthenticated;

    const [getCaptainProfile] = useGetCaptainProfileQuery();
    const {getUserProfile} = useGetUserProfileQuery();

    const fetchData = async () => {
        try{
          const res1 = await getCaptainProfile();
        }catch(err){
            console.log(err)
        }
    }

    

    if (isLoading) {
        return loading;
    }

    if (!isAuthenticated) {
        const searchParams = new URLSearchParams();
        searchParams.set('from', location.pathname);
        return <Navigate to={`${redirectPath}?${searchParams.toString()}`} replace />;
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(currentRole)) {
        return <Navigate to="/unauthorized" replace />;
    }

    useEffect(()=>{

    },[])

    return <Outlet />;
};

export default ProtectedRoute;
