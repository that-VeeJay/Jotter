import { useEffect, useState } from "react";
import { Link, useForm } from "@inertiajs/react";
import {
    Avatar,
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
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
import userProfile from "../assets/userProfile.jpg";

export default function NavLayout({
    children,
    isAuthenticated,
    user,
    showFooter = true,
}) {
    const { post } = useForm();

    function submit(e) {
        e.preventDefault();
        post("/logout");
    }

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
        <NavbarContent className="hidden gap-3 sm:flex">
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

                <NavbarContent className="pr-3 sm:hidden" justify="center">
                    <NavbarBrand>
                        <JotterLogo isDarkMode={isDarkMode} />
                        <p className="font-bold dark:text-white">JOTTER</p>
                    </NavbarBrand>
                </NavbarContent>

                <NavbarContent
                    className="hidden gap-4 sm:flex"
                    justify="center"
                >
                    <Link href="/">
                        <NavbarBrand>
                            <JotterLogo isDarkMode={isDarkMode} />
                            <p className="pr-5 text-xl font-semibold text-inherit dark:text-white">
                                JOTTER
                            </p>
                        </NavbarBrand>
                    </Link>

                    <RenderNavbarLinks />
                </NavbarContent>

                <NavbarContent justify="end">
                    {/* Write Button */}
                    {isAuthenticated ? (
                        <NavbarItem className="mt-2">
                            <Button
                                as={Link}
                                href="/post/create"
                                className="group relative mb-2 me-2 hidden items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-pink-500 to-orange-400 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-pink-200 group-hover:from-pink-500 group-hover:to-orange-400 dark:text-white dark:focus:ring-pink-800 md:inline-flex"
                            >
                                <span className="relative rounded-md bg-white px-4 py-2 group-hover:bg-opacity-0 dark:bg-gray-900">
                                    Create
                                </span>
                            </Button>
                        </NavbarItem>
                    ) : (
                        ""
                    )}

                    {/* Profile || Login / Sign Up */}
                    {!isAuthenticated ? (
                        <>
                            <NavbarItem className="hidden text-black dark:text-white md:flex">
                                <Link href="/login">Login</Link>
                            </NavbarItem>
                            <NavbarItem>
                                <Button
                                    as={Link}
                                    color="danger"
                                    href="/register"
                                    variant="flat"
                                    className="hidden md:flex"
                                >
                                    Sign Up
                                </Button>
                            </NavbarItem>
                        </>
                    ) : (
                        <>
                            <Dropdown placement="bottom-end">
                                <DropdownTrigger>
                                    <Avatar
                                        isBordered
                                        as="button"
                                        className="hidden transition-transform md:inline-flex"
                                        color="danger"
                                        name={user.name}
                                        size="sm"
                                        src={`/profiles/${user.profile_picture}`}
                                    />
                                </DropdownTrigger>
                                <DropdownMenu
                                    aria-label="Profile Actions"
                                    variant="flat"
                                >
                                    <DropdownItem
                                        key="profile"
                                        className="h-14 gap-2"
                                    >
                                        <p className="font-semibold">
                                            Signed in as
                                        </p>
                                        <p className="font-semibold">
                                            {user.email}
                                        </p>
                                    </DropdownItem>
                                    <DropdownItem
                                        key="profile"
                                        as={Link}
                                        href="/profile"
                                    >
                                        Profile
                                    </DropdownItem>
                                    <DropdownItem key="settings">
                                        Settings
                                    </DropdownItem>
                                    <DropdownItem key="help_and_feedback">
                                        Help & Feedback
                                    </DropdownItem>
                                    <DropdownItem key="logout" color="">
                                        <form onSubmit={submit}>
                                            <Button
                                                type="submit"
                                                href="/logout"
                                                className="w-full bg-red-200 text-red-500"
                                            >
                                                Log out
                                            </Button>
                                        </form>
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </>
                    )}
                    {/* Dark Mode Toggle */}
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
                    isDarkMode ? "bg-background text-foreground dark" : ""
                }`}
            >
                {children}
            </main>

            {showFooter ? (
                <footer
                    className={`${
                        isDarkMode ? "bg-background text-foreground dark" : ""
                    }`}
                >
                    <div className="container mx-auto px-10 pb-16 pt-36">
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

                        <hr className="my-10 dark:border-gray-700" />
                        <div className="text-center">
                            <p>© 2023 VEE JAY. All Rights Reserved.</p>
                        </div>
                    </div>
                </footer>
            ) : (
                ""
            )}
        </>
    );
}
