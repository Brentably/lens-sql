import { useEffect } from 'react';
import * as echarts from 'echarts';

const Bar = (props: any) => {

    const { id = 'default-line-id', width = '100%', height = '100%', data } = props;
    let series: any = [], xData: any = [], xKey = ''
    const keys = Object.keys(props.data[0])
    keys.map((t) => {
        if (t.includes('count') || t.includes('num') || t.includes('average')) {
            let yData: any = {
                name: t,
                data: [],
                type: 'bar',
                showBackground: false,
                backgroundStyle: {
                    color: 'rgba(180, 180, 180, 0.2)'
                }
            }
            props.data.forEach((tem: any) => {
                yData.data.push(tem[t])
    
            })
            series.push(yData)
        }else{
             props.data.forEach((tem: any) => {
                xData.push(tem[t])
             })
        }
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
            legend: {
                orient: 'horizontal'
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