import {useNavigate} from "react-router";
import {useEffect} from "react";

function Error() {
    //Check if user is logged in by searching JWT token in localstorage
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
        }
    }, []);

    return(
        <>

        </>
    )
}

export default Error;