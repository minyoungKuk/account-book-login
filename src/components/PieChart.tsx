import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";
import styled from "styled-components";
import { Post } from "../api/lists.api";

const PieChartWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 400px;
`;

const colors: Record<string, string> = {
  living: "#1abc9c",
  food: "#f39c12",
  transport: "#3498db",
  shopping: "#e74c3c",
  culture: "#9b59b6",
  others: "#7f8c8d",
};

interface renderCustomizedLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
}

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: renderCustomizedLabelProps) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos((-midAngle * Math.PI) / 180);
  const y = cy + radius * Math.sin((-midAngle * Math.PI) / 180);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

interface TestPorps {
  [key: string]: number;
}

const PieChartComponent = ({ data }: { data: Post[] }) => {
  const categoryData = data.reduce<Record<string, number>>((acc, curr) => {
    const category = curr.category;
    if (acc[category]) {
      acc[category] += Number(curr.amount);
    } else {
      acc[category] = Number(curr.amount);
    }
    return acc;
  }, {});

  const chartData = Object.keys(categoryData).map((key: string) => ({
    name: key,
    value: categoryData[key],
    color: colors[key] || colors["others"],
  }));

  return (
    <PieChartWrap>
      <PieChart width={400} height={400}>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={150}
          fill="#8884d8"
          dataKey="value"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </PieChartWrap>
  );
};

export default PieChartComponent;
