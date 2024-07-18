import React, { useState, useRef, useEffect } from "react";
import { BiChevronDown } from "react-icons/bi";

const CustomCombobox = ({ options, onSelect, placeholder = "Select an option" }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedOption, setSelectedOption] = useState(null);
	const [searchTerm, setSearchTerm] = useState("");
	const dropdownRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const filteredOptions = options.filter((option) =>
		option.mapName.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const handleSelect = (option) => {
		setSelectedOption(option);
		setIsOpen(false);
		setSearchTerm("");
		onSelect(option);
	};

	return (
		<div className="relative w-64" ref={dropdownRef}>
			<div
				className="bg-[var(--ColorContainer)] border border-[var(--ColorOutline)] rounded-md p-2 flex justify-between items-center cursor-pointer"
				onClick={() => setIsOpen(!isOpen)}
			>
				<input
					type="text"
					className="bg-transparent outline-none text-[var(--ColorText)] w-full"
					placeholder={selectedOption ? selectedOption.label : placeholder}
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					onClick={(e) => e.stopPropagation()}
				/>
				<BiChevronDown className="text-[var(--ColorText)]" size={20} />
			</div>
			{isOpen && (
				<ul className="absolute w-full mt-1 bg-[var(--ColorContainer)] border border-[var(--ColorOutline)] rounded-md shadow-lg max-h-60 overflow-auto z-10">
					{filteredOptions.map((option) => (
						<li
							key={option.value}
							className="p-2 hover:bg-[var(--ColorAccentedContainer)] cursor-pointer text-[var(--ColorText)]"
							onClick={() => handleSelect(option)}
						>
							{option.label}
						</li>
					))}
					{filteredOptions.length === 0 && (
						<li className="p-2 text-[var(--ColorGrey)]">No options found</li>
					)}
				</ul>
			)}
		</div>
	);
};

export default CustomCombobox;
