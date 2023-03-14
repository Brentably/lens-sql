import { useEffect } from 'react';
import * as echarts from 'echarts';

const Bar = (props: any) => {

    const { id = 'default-line-id', width = '100%', height = '100%', data } = props;
    let series: any = [], xData: any = [], xKey = ''
    const keys = Object.keys(props.data[0])
    keys.map((t) => {
        let yData: any = {
            name: t,
            data: [],
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
                color: 'rgba(180, 180, 180, 0.2)'
            }
        }
        props.data.forEach((tem: any) => {
            if (t.includes('count') || t.includes('num') || t.includes('average')) {
                yData.data.push(tem[t])
            } else {
                xData.push(tem[t])
            }

        })
        series.push(yData)
    })

    useEffect(() => {
        const option = {
            xAxis: {
                type: 'category',
                data: xData
            },
            yAxis: {
                type: 'value'
            },
            grid: {
                top: 30,
                bottom: 30,
                left: 50,
                right: 0,
            },
            tooltip: {
                show: true,
                trigger: 'axis',
            },
            series: series
        };

        const HTMLElement = document.getElementById(id) as HTMLElement;

        const chart = echarts.init(HTMLElement);

        chart.setOption({ ...option });

        window.addEventListener("resize", () => {
            if (chart) {
                chart.resize()
            }
        })

    });

    return (
        <div id={id} style={{ width: width, height: height }}>

        </div>
    );

};

export default Bar;