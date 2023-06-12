import Plot from "react-plotly.js";

import styles from "../styles/Main.module.sass"

function Plots({countByStatus}) {
    const data = [{
        values: Object.values(countByStatus),
        labels: Object.keys(countByStatus),
        type: 'pie',
    }];

    const graph = {
        data: data,
        layout: {width: 600, height: 500},
        config: {
            displayModeBar: false
        }
    }

    return (
        <div className={styles.main}>
            <Plot data={graph.data} layout={graph.layout} config={graph.config} />
        </div>
    );
}

export default Plots;