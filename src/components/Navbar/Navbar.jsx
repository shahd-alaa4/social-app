import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../context/UserContext";
import { DarkThemeToggle } from "flowbite-react";
import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar as Nav,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function Navbar() {
  let navigate = useNavigate();
  const { userLogin, setuserLogin } = useContext(userContext);

  function signOut() {
    localStorage.removeItem("userToken");
    setuserLogin(null);
    navigate("/Login");
  }

     function getUserData() {
    return axios.get("https://linked-posts.routemisr.com/users/profile-data", {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    });
  }
  let {data,isLoading,error,isError} = useQuery({
    queryKey: ["userData"],
    queryFn: getUserData,
    select:(data)=>data?.data?.user
  });

  return (
    <>
    
      <Nav className="bg-gray-800 border-gray-800 dark:bg-gray-950">
        <NavbarBrand as={Link}
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse">
          
            <span className="self-center whitespace-nowrap text-xl font-semibold  dark:text-white">
              Social App
            </span>
         
        </NavbarBrand>

        <div className="flex md:order-2 items-center gap-3">

<div className="dark:text-white  flex items-center gap-2">
      <p className="">  dark mode  </p>
        <DarkThemeToggle  className="dark:bg-gray-800 dark:hover:bg-gray-700 bg-gray-700 hover:bg-gray-500   p-1"/>

</div>
          {userLogin !== null ? (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  alt="User settings"
                  img={data?.photo}
                  rounded
                />
              }
            >
              <DropdownHeader>
                <span className="block text-sm ">{data?.name}</span>
                <span className="block truncate text-sm font-medium ">
                  {data?.email}
                </span>
              </DropdownHeader>
              <DropdownItem >
                <Link to="/profile">Profile</Link>
              </DropdownItem>
              <DropdownDivider />
              <DropdownItem onClick={signOut} >Sign out</DropdownItem>
            </Dropdown>
          ) : (
            <ul className="flex flex-row font-medium mt-0 space-x-6 rtl:space-x-reverse text-sm ">
              <li>
                <Link
                  to="/login"
                  className="dark:text-white hover:underline "
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="dark:text-white hover:underline"
                >
                  Register
                </Link>
              </li>
            </ul>
          )}
          <NavbarToggle />
        </div>
      </Nav>
    </>
  );
}
