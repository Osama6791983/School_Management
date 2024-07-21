import React, { useState } from "react";
import { BsArrowLeftShort, BsChevronDown } from 'react-icons/bs';
import { RiDashboardFill } from "react-icons/ri";
import { FaUserGraduate, FaBook } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import logo from '../images/1.jpg';

import { useAuth } from "../Login/AuthProvider";

const Dashboard = () => {
    const [open, setOpen] = useState(true);
    const [subMenuOpenIndex, setSubMenuOpenIndex] = useState(null);

    const { logout } = useAuth();
    const navigate = useNavigate(); // Hook to programmatically navigate

    const Menus = [
        {
            id: 1,
            title: 'Dashboard',
            icon: <RiDashboardFill />,
            href: "/Dashboard"
        },
        {
            id: 2,
            title: 'Student',
            icon: <FaUserGraduate />,
            submenu: true,
            submenuOpen: subMenuOpenIndex === 1,
            submenuItems: [
                { title: "Add Student", href: "/students/addstudent" },
                { title: "Manage Student", href: "/students/editstudent" }
            ]
        },
        {
            id: 3,
            title: 'Program',
            icon: <FaBook />,
            submenu: true,
            submenuOpen: subMenuOpenIndex === 2,
            submenuItems: [
                { title: "Add Programs", href: "/programs/addprogram" },
                { title: "Program Summary", href: "/programs/programsummary" }
            ]
        },
        {
            id: 4,
            title: 'Logout',
            icon: <FiLogOut />,
            onClick: () => {
                logout();
                navigate('/login');  // Navigate to login page after logout
            }
        }
    ];

    const toggleSubMenu = (index) => {
        if (index === subMenuOpenIndex) {
            setSubMenuOpenIndex(null);
        } else {
            setSubMenuOpenIndex(index);
        }
    };

    return (
        <>
            <div className={`bg-dark-purple lg:h-screen md:h-screen sm:h-[1150px] p-5 pt-8 ${open ? "lg:w-72" : "w-20"} ${open ? "sm:w-64" : "w-20"} duration-300 relative`}>
                <BsArrowLeftShort className={`bg-white text-dark-purple text-3xl rounded-full absolute -right-3 top-9 border border-dark-purple cursor-pointer ${!open && "rotate-180"}`} onClick={() => setOpen(!open)} />

                <div className="inline-flex">
                   
                    <img src={logo} className={`bg-amber-300 text-4xl rounded mr-2 w-12 h-12 cursor-pointern block float-left ${open && "rotate-[360deg]"}`} alt="logo" />
                    <h1 className={`text-white origin-left font-medium text-2xl ${!open && "scale-0"}`}>CUI Console</h1>
                </div>

                <ul className="pt-2">
                    {Menus.map((menu, index) => (
                        <React.Fragment key={index}>
                            <li className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-2" onClick={() => {
                                if (menu.onClick) {
                                    menu.onClick();
                                } else {
                                    toggleSubMenu(index);
                                }
                            }}>
                                <span className="text-2xl block float-left">
                                    {menu.icon}
                                </span>
                                {menu.href ? (
                                    <Link to={menu.href} className={`text-base font-medium flex-1 duration-200 ${!open && "hidden"}`}>{menu.title}</Link>
                                ) : (
                                    <span className={`text-base font-medium flex-1 duration-200 ${!open && "hidden"}`}>{menu.title}</span>
                                )}
                                {menu.submenu && (
                                    <BsChevronDown className={`${menu.submenuOpen && "rotate-180"}`} />
                                )}
                            </li>
                            {menu.submenu && menu.submenuOpen && (
                                <ul>
                                    {menu.submenuItems.map((submenuItem, subIndex) => (
                                        <li key={subIndex} className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 px-5 hover:bg-light-white rounded-md">
                                            <Link to={submenuItem.href}>
                                                {submenuItem.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </React.Fragment>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default Dashboard;
