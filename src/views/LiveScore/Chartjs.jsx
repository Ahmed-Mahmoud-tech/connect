import React, {useEffect, useState} from 'react';
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from 'chart.js';
import ChartDataLabels from "chartjs-plugin-datalabels";
import {Bar} from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

export const options = {
    responsive: true,
    animation: {duration: 500},
    plugins: {
        legend: {
            display: false,
            position: 'bottom',
        },
        title: {
            display: false,
            text: 'Live Score',
        },
        datalabels: {
            color: "#995524",
            font: {
                size: 14,
                weight: 'bold',
            },
            anchor: 'end',
            align: 'top',
        }
    },
    maintainAspectRatio: false,
    scaleShowValues: true,
    scales: {
        y:{
            max: 10000
        },
    }
};

export function Chartjs(props) {
    const [dataSet, setDataSet] = useState(null);
    const [labels, setLabels] = useState(null);
    const [data, setData] = useState(null);

    useEffect(() => {
        if (props.teams) {
            setLabels(() => {
                let labels = [];
                labels.push('GSK');
                props?.teams?.forEach((item, index) => {
                    if (index === 0) labels.push(item.business_unit_name);
                    if (props.teams[index + 1] && +props.teams[index + 1].business_unit_id !== +item.business_unit_id) {
                        labels.push(item.category_name);
                        labels.push(props.teams[index + 1].business_unit_name);
                    }
                    if (props.teams[index + 1] === undefined) labels.push(item.business_unit_name);
                    labels.push(item.category_name);
                });
                return labels.filter((v, i, a) => a.indexOf(v) === i);
            });
        }
    }, [props]);

    useEffect(() => {
        if (labels) {
            let datasets = [], colors = [];

            let businessUnitsScore = 0;
            props.businessUnits.forEach((item) => businessUnitsScore += +item.score);
            datasets.push(businessUnitsScore);
            colors.push("#ed7338");

            labels.forEach((labelItem, labelIndex) => {
                props.teams.forEach((teamItem, teamIndex) => {
                    if (teamItem.category_name === labelItem) {
                        let scores = Array(labels?.length).fill(0);
                        datasets.push(scores[labelIndex] = teamItem.score ?? 0);
                        colors.push(teamItem.color)
                    }
                });
                props.businessUnits.forEach((businessUnitItem, businessUnitIndex) => {
                    if (businessUnitItem.business_unit_name === labelItem) {
                        let scores = Array(labels?.length).fill(0);
                        datasets.push(scores[labelIndex] = businessUnitItem.score ?? 0);
                        colors.push(businessUnitItem.color)
                    }
                });
            });
            setDataSet(() => {
                return [{data: datasets, backgroundColor: colors, borderRadius: {topRight: 15, topLeft: 15}}]
            });
        }
    }, [labels]);

    useEffect(() => {
        if (dataSet) {
            setData(() => {
                return {
                    labels,
                    datasets: dataSet,
                }
            });
        }
    }, [dataSet]);

    return (
        <div className='canvas-container' style={{height: '83%', width: '93%'}}>
            {data && <Bar options={options} data={data}/>}
        </div>
    );
}