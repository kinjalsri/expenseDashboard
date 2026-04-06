import React from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'

function ExpenseChart({expenses}) {

const getCategoryData = () => {

const categoryMap = {};

expenses?.forEach(exp => {
    const category = exp.category || 'Other';
    categoryMap[category] = 
    (categoryMap[category] || 0) + Math.abs(exp.amount);
})

return Object.keys(categoryMap).map(key => ({
    name: key,
    value: categoryMap[key]
}));

}

const data = getCategoryData();

const COLORS = [
'#f39c12',
'#3498db',
'#27ae60',
'#9b59b6',
'#e74c3c'
];

return (

<div style={{marginTop: '30px'}}>

<h3>Spending Breakdown</h3>

<PieChart width={400} height={300}>
<Pie
data={data}
cx="50%"
cy="50%"
outerRadius={100}
dataKey="value"
label
>
{data.map((entry, index) => (
<Cell 
key={`cell-${index}`} 
fill={COLORS[index % COLORS.length]} 
/>
))}
</Pie>

<Tooltip />
<Legend />

</PieChart>

</div>

)
}

export default ExpenseChart