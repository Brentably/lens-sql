import { useEffect } from 'react';
import * as echarts from 'echarts';

const Line = (props) => {

    const { id = 'default-line-id', width = '100%', height = '100%', data } = props;
    let xParams = ['day', 'date', 'week', 'month','timestamp'];
    let yParams = ['mirrors','posts','comments','likes']
    let series:any = [], xData:any = [], xKey = ''
    const keys = Object.keys(props.data[0])
    keys.map((t) => {
        if (xParams.includes(t)) {
            xKey = t
        }else{
            if(t.includes('count') || t.includes('num') || t.includes('average') || yParams.includes(t)){
                let yData:any = {
                    name:t,
                    data:[],
                    type: 'line'
                }
                props.data.forEach((tem: any) => {
                    yData.data.push(tem[t])
                })
                series.push(yData)
            }
        }
    })
    if(!xKey) return (<></>)
    if(xKey === 'timestamp'){
        let data = props.data.sort((a, b) => a.timestamp.localeCompare(b.timestamp));
        data.forEach((t: any) => {
            xData.push(t[xKey].slice(0,10))
        })
    }else{
        props.data.forEach((t: any) => {
            xData.push(t[xKey])
        })
    }

    useEffect(() => {
        const option = {
            xAxis: {
                type: 'category',
                data: xData
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
            yAxis: {
                type: 'value'
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

export default Line;