import React, { PureComponent } from "react";
import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";

/**
 * Componente que tem a responsabilidade de construir um gráfico de rosca monocromático, cuja cor é passada por props
 */
export default class GenericPieChart extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ResponsiveContainer aspect={1.1}>
        <PieChart>
          <Pie
            dataKey="value"
            data={this.props.dados}
            innerRadius={40}
            outerRadius={80}
            fill={`${this.props.cor}`}
          />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    );
  }
}
