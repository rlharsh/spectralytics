import React, { useState } from "react";
import { Rnd } from "react-rnd";
import "./css/Console.css";
import useConsoleLogs from "../Helpers/useConsoleLogs";

const Console = () => {
	const [size, setSize] = useState({ width: 500, height: 240 });
	const [position, setPosition] = useState({ x: 150, y: 205 });
	const [previewStyle, setPreviewStyle] = useState({});
	const { consoleLogs } = useConsoleLogs();

	const handleResize = (e, direction, ref, delta) => {
		setPreviewStyle({
			width: ref.style.width,
			height: ref.style.height,
		});
	};

	const handleResizeStop = (e, direction, ref, delta) => {
		setSize({
			width: ref.offsetWidth,
			height: ref.offsetHeight,
		});
		setPreviewStyle({});
	};

	const handleDragStop = (e, d) => {
		setPosition({ x: d.x, y: d.y });
	};

	return (
		<Rnd
			default={{
				x: 150,
				y: 205,
				width: 500,
				height: 240,
			}}
			position={{ x: position.x, y: position.y }}
			size={{ width: size.width, height: size.height }}
			minWidth={500}
			minHeight={240}
			bounds="window"
			onDragStop={handleDragStop}
			onResize={handleResize}
			onResizeStop={handleResizeStop}
			enableResizing={{
				top: true,
				right: true,
				bottom: true,
				left: true,
				topRight: true,
				bottomRight: true,
				bottomLeft: true,
				topLeft: true,
			}}
			style={{
				position: "fixed",
				overflow: "hidden",
			}}
		>
			<div className="console">
				<section className="console__header">Console</section>
				<section className="console__body">
					{consoleLogs.map((console) => (
						<div className="console__message">
							{console.date}
							{console.message}
						</div>
					))}
				</section>
			</div>
		</Rnd>
	);
};

export default Console;
