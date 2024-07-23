import React, { useContext } from "react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { ApplicationContext } from "../Providers/ApplicationProvider";

const SpeedChart = () => {
	const { speedData, colorBlue } = useContext(ApplicationContext);

	const formatXAxis = (tickItem) => {
		return tickItem % 5 === 0 ? tickItem : "";
	};

	return (
		<div style={{ width: "100%", height: 100, marginTop: "10px" }}>
			<ResponsiveContainer>
				<LineChart data={speedData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
					<XAxis
						dataKey="time"
						axisLine={false}
						tickLine={false}
						tick={{ fill: "var(--ColorGrey)", fontSize: 10 }}
						interval={0}
						tickFormatter={formatXAxis}
						orientation="top"
					/>
					<YAxis hide={true} domain={[0, "dataMax + 1"]} />
					<Line
						type="monotone"
						dataKey="speed"
						stroke={colorBlue}
						dot={false}
						strokeWidth={2}
					/>
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
};

export default SpeedChart;
