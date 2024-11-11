import { useEffect, useState } from "react";

import {
    Button,
    Link,
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
                <NavbarItem key={link.label} isActive={link.isActive}>
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
                        <JotterLogo />
                        <p className="font-bold text-inherit">JOTTER</p>
                    </NavbarBrand>
                </NavbarContent>

                <NavbarContent
                    className="hidden sm:flex gap-4"
                    justify="center"
                >
                    <NavbarBrand>
                        <JotterLogo />
                        <p className="font-bold text-inherit">JOTTER</p>
                    </NavbarBrand>

                    <RenderNavbarLinks />
                </NavbarContent>

                <NavbarContent justify="end">
                    <NavbarItem className="hidden lg:flex">
                        <Link href="#">Login</Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Button
                            as={Link}
                            color="danger"
                            href="#"
                            variant="flat"
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
        </>
    );
}
