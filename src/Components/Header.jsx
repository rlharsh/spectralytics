import { useContext, useState } from "react";
import "./css/Header.css";
import { useMediaQuery } from "react-responsive";
import { TbGhost2Filled } from "react-icons/tb";
import { Button } from "@chakra-ui/react";
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
import { AiOutlineCloudServer } from "react-icons/ai";
import { ApplicationContext } from "../Providers/ApplicationProvider";
import ThemeToggleButton from "./ThemeToggleButton";

const Header = () => {
	const { login, user, logout } = useAuth();
	const { setSocketShowing, connectedUsers } = useContext(ApplicationContext);

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
			name: "User Dashboard",
			link: "dashboard",
			icon: <IoAnalyticsOutline />,
		},
		{
			name: "Search Journal",
			link: "search",
			icon: <IoSearch />,
		},
		{
			name: "User Journal",
			link: "journal",
			icon: <IoBookOutline />,
		},
		{
			name: "Ghost Information",
			link: "ghosts",
			icon: <IoSkullOutline />,
		},
		{
			name: "Equipment Information",
			link: "equipment",
			icon: <IoFlashlightOutline />,
		},
		{
			name: "Map Information",
			link: "maps",
			icon: <IoMapOutline />,
		},
		{
			name: "Network Connection",
			link: "network",
			action: () => setSocketShowing((prevValue) => !prevValue),
			icon: <AiOutlineCloudServer />,
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

	const handleItemClick = (item) => {
		if (item?.action) {
			item.action();
		} else if (item?.link) {
			handleLinkClick(item.link);
		}
	};

	return (
		<header className="header">
			<section className="header__branding">
				<TbGhost2Filled />
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
							<MenuButton
								item={item}
								key={item.name}
								click={() => handleItemClick(item)}
							/>
						))}
						<div className="flex-column">
							<button
								className="highlight margin-top"
								type="button"
								role="button"
								onClick={() => navigate("contract")}
							>
								New Contract
							</button>
							<ThemeToggleButton />
						</div>
						<p className="small-accent right-text margin-top-1rem">
							Connected Users: <span className="accent-text">{connectedUsers}</span>
						</p>
					</nav>
				</section>
			)}
			{user ? <Avatar user={user} /> : <button onClick={() => login()}>Login</button>}
		</header>
	);
};

export default Header;
