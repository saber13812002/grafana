import { PlotSeriesConfig } from '../types';
import { ScaleProps, UPlotScaleBuilder } from './UPlotScaleBuilder';
import { SeriesProps, UPlotSeriesBuilder } from './UPlotSeriesBuilder';
import { AxisProps, UPlotAxisBuilder } from './UPlotAxisBuilder';

export class UPlotConfigBuilder {
  private series: UPlotSeriesBuilder[] = [];
  private axes: UPlotAxisBuilder[] = [];
  private scales: UPlotScaleBuilder[] = [];

  addAxis(props: AxisProps) {
    this.axes.push(new UPlotAxisBuilder(props));
  }

  addSeries(props: SeriesProps) {
    this.series.push(new UPlotSeriesBuilder(props));
  }

  addScale(props: ScaleProps) {
    this.scales.push(new UPlotScaleBuilder(props));
  }

  getConfig() {
    const config: PlotSeriesConfig = { series: [{}] };
    config.axes = this.axes.map(a => a.getConfig());
    config.series = [...config.series, ...this.series.map(s => s.getConfig())];
    config.scales = this.scales.reduce((acc, s) => {
      return { ...acc, ...s.getConfig() };
    }, {});

    return config;
  }
}
