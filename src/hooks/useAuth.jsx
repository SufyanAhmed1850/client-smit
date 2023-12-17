import Cookies from "js-cookie";

const useAuth = () => {
    return Cookies.get("jwt") ? true : false;
};

export default useAuth;
