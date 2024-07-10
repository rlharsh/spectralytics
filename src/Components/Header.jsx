import React, { useState } from "react";
import "./css/Header.css";
import { useMediaQuery } from "react-responsive";
import { TbDeviceAnalytics } from "react-icons/tb";
import { Button } from "@chakra-ui/react";
import { CiMenuBurger, CiMenuFries } from "react-icons/ci";
import MenuButton from "./MenuButton";
import Avatar from "./Avatar";

import {
	IoSkullOutline,
	IoBookOutline,
	IoInformationCircleOutline,
	IoSearch,
	IoMapOutline,
	IoFlashlightOutline,
	IoHomeOutline,
	IoAnalyticsOutline,
	IoDesktopSharp,
} from "react-icons/io5";
import { useAuth } from "../Providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const Header = () => {
	const { login, user, logout } = useAuth();

	const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
	const [menuOpen, setMenuOpen] = useState(!isTabletOrMobile);

	const handleMenuButtonClick = () => {
		setMenuOpen((prevState) => !prevState);
	};

	const navigate = useNavigate();

	const handleLinkClick = (link) => {
		navigate({ link });
	};

	const navigationMenu = [
		{
			name: "Home",
			link: "home",
			icon: <IoHomeOutline />,
		},
		{
			name: "Dashboard",
			link: "dashboard",
			icon: <IoAnalyticsOutline />,
		},
		{
			name: "Search",
			link: "search",
			icon: <IoSearch />,
		},
		{
			name: "Journal",
			link: "journal",
			icon: <IoBookOutline />,
		},
		{
			name: "Ghosts",
			link: "ghosts",
			icon: <IoSkullOutline />,
		},
		{
			name: "Equipment",
			link: "equipment",
			icon: <IoFlashlightOutline />,
		},
		{
			name: "Maps",
			link: "maps",
			icon: <IoMapOutline />,
		},
		{
			name: "Console",
			link: "console",
			icon: <IoDesktopSharp />,
		},
		{
			name: "About",
			link: "about",
			icon: <IoInformationCircleOutline />,
		},
	];

	return (
		<header className="header">
			<section className="header__branding">
				<TbDeviceAnalytics />
				<h1>SPECTRALYTICS</h1>
			</section>
			{isTabletOrMobile && (
				<Button
					type="button"
					colorScheme="purple"
					variant="outline"
					onClick={handleMenuButtonClick}
				>
					<p>Menu</p>
				</Button>
			)}
			{(menuOpen || !isTabletOrMobile) && (
				<section className="header__sidebar">
					<nav className="header__navigation">
						{navigationMenu.map((item) => (
							<MenuButton item={item} key={item.name} />
						))}
						<button
							className="highlight margin-top"
							type="button"
							role="button"
							onClick={() => navigate("contract")}
						>
							New Contract
						</button>
					</nav>
				</section>
			)}
			{user ? <Avatar user={user} /> : <button onClick={() => login()}>Login</button>}
		</header>
	);
};

export default Header;
