import React, { useRef, useEffect } from 'react';
import { Chart, LineController, LineElement, CategoryScale, LinearScale, PointElement, Filler } from 'chart.js';

Chart.register(LineController, LineElement, CategoryScale, LinearScale, PointElement, Filler);

interface MyChartProps {
    data: number[];
    labels: string[];
}

const ChartGraphic: React.FC<MyChartProps> = ({ data, labels }) => {
    const chartRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (chartRef && chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
            const gradient = ctx?.createLinearGradient(0, 0, 0, 400);
            gradient?.addColorStop(0, 'rgba(75,192,192,0.4)');
            gradient?.addColorStop(1, 'rgba(75,192,192,0)');

            const chartInstance = new Chart(chartRef.current, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Değerler',
                        data: data,
                        borderColor: 'rgba(75,192,192,1)',
                        backgroundColor: gradient,
                        fill: 'start',
                    }]
                },
                options: {
                    animation: {
                        duration: 1000,
                        easing: 'easeInOutQuad'
                    },
                    scales: {
                        y: {
                            min: 0,
                            max: 100,
                            ticks: {
                                stepSize: 20,
                            }
                        }
                    },
                }
            });

            return () => {
                chartInstance.destroy();
            };

        }
    }, [data, labels]);

    return <canvas ref={chartRef}></canvas>;
}

export default ChartGraphic;
