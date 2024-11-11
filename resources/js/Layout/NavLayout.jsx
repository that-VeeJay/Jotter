import { useEffect, useState } from "react";
import { Link } from "@inertiajs/react";
import {
    Button,
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenu,
    NavbarMenuItem,
    NavbarMenuToggle,
    Switch,
} from "@nextui-org/react";

import { SunIcon } from "../Icons/SunIcon";
import { MoonIcon } from "../Icons/MoonIcon";
import { JotterLogo } from "../Icons/JotterLogo";

export default function NavLayout({ children }) {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            setIsDarkMode(savedTheme === "dark");
        }
    }, []);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
        const newTheme = isDarkMode ? "light" : "dark";
        localStorage.setItem("theme", newTheme);
    };

    const navLinks = [
        { label: "Home", href: "#", isActive: false },
        { label: "Creator", href: "#", isActive: true },
        { label: "Community", href: "#", isActive: false },
    ];

    const menuItems = [
        "Profile",
        "Dashboard",
        "Activity",
        "Analytics",
        "System",
        "Deployments",
        "My Settings",
        "Team Settings",
        "Help & Feedback",
        "Log Out",
    ];

    const RenderNavbarLinks = () => (
        <NavbarContent className="hidden sm:flex gap-3">
            {navLinks.map((link) => (
                <NavbarItem
                    key={link.label}
                    isActive={link.isActive}
                    className="dark:text-white"
                >
                    <Link
                        color={link.isActive ? "danger" : "foreground"}
                        href={link.href}
                    >
                        {link.label}
                    </Link>
                </NavbarItem>
            ))}
        </NavbarContent>
    );

    return (
        <>
            <Navbar
                disableAnimation
                isBordered
                className={`fixed ${isDarkMode ? "dark" : "light"}`}
            >
                <NavbarContent className="sm:hidden" justify="start">
                    <NavbarMenuToggle />
                </NavbarContent>

                <NavbarContent className="sm:hidden pr-3" justify="center">
                    <NavbarBrand>
                        <JotterLogo isDarkMode={isDarkMode} />
                        <p className="font-bold dark:text-white">JOTTER</p>
                    </NavbarBrand>
                </NavbarContent>

                <NavbarContent
                    className="hidden sm:flex gap-4"
                    justify="center"
                >
                    <Link href="/">
                        <NavbarBrand>
                            <JotterLogo isDarkMode={isDarkMode} />
                            <p className="font-semibold text-inherit text-xl dark:text-white pr-5">
                                JOTTER
                            </p>
                        </NavbarBrand>
                    </Link>

                    <RenderNavbarLinks />
                </NavbarContent>

                <NavbarContent justify="end">
                    <NavbarItem className="hidden md:flex text-black dark:text-white">
                        <Link href="/login">Login</Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Button
                            as={Link}
                            color="danger"
                            href="/sign-up"
                            variant="flat"
                            className="hidden md:flex "
                        >
                            Sign Up
                        </Button>
                    </NavbarItem>

                    <NavbarItem>
                        <Switch
                            checked={isDarkMode}
                            onChange={(e) => toggleTheme(e.target.checked)}
                            size="sm"
                            color="danger"
                            thumbIcon={({ isSelected, className }) =>
                                isSelected ? (
                                    <SunIcon className={className} />
                                ) : (
                                    <MoonIcon className={className} />
                                )
                            }
                        />
                    </NavbarItem>
                </NavbarContent>

                <NavbarMenu>
                    {menuItems.map((item, index) => (
                        <NavbarMenuItem key={`${item}-${index}`}>
                            <Link
                                className="w-full"
                                color={
                                    index === 2
                                        ? "warning"
                                        : index === menuItems.length - 1
                                        ? "danger"
                                        : "foreground"
                                }
                                href="#"
                                size="lg"
                            >
                                {item}
                            </Link>
                        </NavbarMenuItem>
                    ))}
                </NavbarMenu>
            </Navbar>

            <main
                className={`${
                    isDarkMode ? "dark text-foreground bg-background" : ""
                }`}
            >
                {children}
            </main>

            <footer
                className={`${
                    isDarkMode ? "dark text-foreground bg-background" : ""
                }`}
            >
                <div className="container mx-auto px-10 pt-36 pb-16">
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        <div className="flex items-center gap-2">
                            <JotterLogo isDarkMode={isDarkMode} />
                            <span className="text-2xl font-semibold">
                                JOTTER
                            </span>
                        </div>

                        <div className="space-x-10 font-medium lg:text-right">
                            <Link
                                href="#"
                                className="text-gray-500 hover:underline"
                            >
                                About
                            </Link>
                            <Link
                                href="#"
                                className="text-gray-500 hover:underline"
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                href="#"
                                className="text-gray-500 hover:underline"
                            >
                                Contact
                            </Link>
                        </div>
                    </div>

                    <hr className="dark:border-gray-700 my-10" />
                    <div className="text-center">
                        <p>© 2023 VEE JAY. All Rights Reserved.</p>
                    </div>
                </div>
            </footer>
        </>
    );
}
