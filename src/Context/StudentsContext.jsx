import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
// import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const studentsContext = createContext();

export const StudentsProvider = ({ children }) => {
    const [students, setStudents] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isDataFetched, setIsDataFetched] = useState(false);
    const location = useLocation();
    // const isAuthenticated = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (
            location.pathname == "/admin" ||
            location.pathname == "/admin/attendance"
        ) {
            (async () => {
                try {
                    // if (!isAuthenticated) {
                    //     navigate("/login");
                    //     return;
                    // }
                    if (!isDataFetched) {
                        const res = await axios(
                            import.meta.env.VITE_BE_URL + "/api/students",
                        );
                        console.log(res.data);
                        setStudents(res.data.students);
                        setIsLoading(false);
                        setIsDataFetched(true);
                    }
                } catch (error) {
                    setIsLoading(false);
                    console.error(error);
                }
            })();
        }
    }, [location.pathname]);
    return (
        <studentsContext.Provider
            value={{ students, setStudents, isLoading, setIsDataFetched }}
        >
            {children}
        </studentsContext.Provider>
    );
};

export default studentsContext;
