import React, { PureComponent } from "react";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";

/* Componente que tem a responsabilidade de construir um gráfico de rosca com duas cores, passadas por parâmetro */
export default class GenericTwoColorsPieChart extends PureComponent {
  constructor(props) {
    super(props);
    this.cores = props.cores;
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
            fill={`${this.props.cores[0]}`}
          >
            {this.props.dados.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={this.cores[index % this.cores.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    );
  }
}
