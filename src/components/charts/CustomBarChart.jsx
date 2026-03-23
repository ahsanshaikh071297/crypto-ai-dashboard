import {
    ResponsiveContainer,
    BarChart,
    Bar,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Cell,
} from 'recharts';

function CustomBarChart({ data = [], xKey = 'name', barKey = 'change' }) {
    return (
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey={xKey} />
                    <YAxis
                        tickFormatter={(value) => `${value}%`}
                    />
                    <Tooltip
                        formatter={(value) => `${value}%`}
                        contentStyle={{
                            backgroundColor: '#ffffff',
                            borderRadius: '10px',
                            border: '1px solid #e5e7eb',
                        }}
                    />

                    <Bar dataKey={barKey} radius={[8, 8, 0, 0]}>
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={entry[barKey] >= 0 ? '#10b981' : '#ef4444'}
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default CustomBarChart;