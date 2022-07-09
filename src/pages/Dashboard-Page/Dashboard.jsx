import { Button, Heading } from "@chakra-ui/react"
import { useNavigate } from "react-router";
import { logOut } from "../../redux/auth";import { useDispatch, useSelector } from "react-redux";

const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logOutD = () => {
        dispatch(logOut());
        navigate("/");
    }
    return(
        <Heading fontSize={'xl'}>
            Welcome to Dashboard
        <Button onClick={logOutD}>Logout</Button>
        </Heading>
    )
}

export default Dashboard;