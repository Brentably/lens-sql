import { useEffect } from 'react';
import * as echarts from 'echarts';

const Bar = (props: any) => {

    const { id = 'default-line-id', width = '100%', height = '100%', data } = props;

    useEffect(() => {
        const option = {
            xAxis: {
                type: 'category',
                data: data.xData
            },
            grid:{
                top:30,
                bottom:30,
                left:'5%',
                right:'5%',
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: data.yData,
                    type: 'line'
                }
            ]
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