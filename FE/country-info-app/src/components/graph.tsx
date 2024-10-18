import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { PopulationData } from '@/interfaces/country';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Population Over Time',
        },
    },
    scales: {
        y: {
            beginAtZero: true,
        },
    },
};

export function PopulationChart({ populationData }: { populationData: PopulationData[] }) {
    const labels = populationData.map((data) => data.year.toString());
    const data = {
        labels,
        datasets: [
            {
                label: 'Population',
                data: populationData.map((data) => data.value),
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
            },
        ],
    };

    return (
        <div style={{ width: '100%', height: '500px' }}>
            <Line options={options} data={data} width={400} height={400} />;
        </div>
    )
}