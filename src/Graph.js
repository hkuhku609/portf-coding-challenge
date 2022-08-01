// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/bar
import { ResponsiveBar } from '@nivo/bar';

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showfetchedDatacase many properties,
// you'll often use just a few of them.
const Graph = ({ resultData }) => {
  const getDate = resultData.map((data) => data.first_brewed.substring(0, 7)); //[2007-09
  const sortDate = getDate.sort();

  let myArray = sortDate.reduce((accumulator, currentValue) => {
    //{2007-09: 1,2009-11: 2, 2009-12: 2,}
    return (
      accumulator[currentValue]
        ? ++accumulator[currentValue]
        : (accumulator[currentValue] = 1),
      accumulator
    );
  }, {});

  let chartArray = [];
  for (let key in myArray) {
    const obj = {};
    obj['date'] = key;
    obj['count'] = myArray[key];
    chartArray.push(obj);
  }
  console.log(chartArray);

  return (
    <ResponsiveBar
      data={chartArray} //[{date: '2005-01', count: 1},
      keys={['count']}
      indexBy="date"
      margin={{ top: 50, right: 20, bottom: 150, left: 60 }}
      padding={0.3}
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
      colors={{ scheme: 'nivo' }}
      // defs={[
      //   {
      //     id: 'dots',
      //     type: 'patternDots',
      //     background: 'inherit',
      //     color: '#38bcb2',
      //     size: 4,
      //     padding: 1,
      //     stagger: true,
      //   },
      //   {
      //     id: 'lines',
      //     type: 'patternLines',
      //     background: 'inherit',
      //     color: '#eed312',
      //     rotation: -45,
      //     lineWidth: 6,
      //     spacing: 10,
      //   },
      // ]}
      // borderColor={{
      //   from: 'color',
      //   modifiers: [['darker', 1.6]],
      // }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: -45,
        legend: 'First Brewed Date',
        legendPosition: 'middle',
        legendOffset: 70,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Beer Number',
        legendPosition: 'middle',
        legendOffset: -40,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: 'color',
        modifiers: [['darker', 1.6]],
      }}
      // legends={[
      //   {
      //     dataFrom: 'keys',
      //     anchor: 'bottom-right',
      //     direction: 'column',
      //     justify: false,
      //     translateX: 120,
      //     translateY: 0,
      //     itemsSpacing: 2,
      //     itemWidth: 100,
      //     itemHeight: 20,
      //     itemDirection: 'left-to-right',
      //     itemOpacity: 0.85,
      //     symbolSize: 20,
      //     effects: [
      //       {
      //         on: 'hover',
      //         style: {
      //           itemOpacity: 1,
      //         },
      //       },
      //     ],
      //   },
      // ]}
    />
  );
};
export default Graph;
