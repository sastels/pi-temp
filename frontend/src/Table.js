/** @jsx jsx */
import { css, jsx } from '@emotion/core'

const root = css`
  font-family: Arial, Helvetica, sans-serif;
  margin-top: 50px;
`;
const tableStyle = css`
  font-family: arial, sans-serif;
  border-collapse: collapse;
  margin: 0 auto;
`;
const headerStyle = css`
  border: 1px solid #dddddd;
  padding: 8px 20px;
`;
const itemStyle = css`
  border: 1px solid #dddddd;
  text-align: right;
  padding: 8px 20px;
`;

const Table = props => (
  <div className={root}>
    <table css={tableStyle}>
      <caption
        className={css`
          margin: 20px;
        `}
      >
        Recent data
      </caption>
      <tbody>
        <tr>
          <th css={headerStyle}>Time</th>
          <th css={headerStyle}>Temp</th>
          <th css={headerStyle}>Humidity</th>
        </tr>
        {props.data.map(m => (
          <tr key={m.datetime}>
            <td css={itemStyle}>
              {m.datetime.format("YYYY-MM-DD HH:mm:ss")}
            </td>
            <td css={itemStyle}>{m.temperature.toFixed(1)}</td>
            <td css={itemStyle}>{m.humidity.toFixed(1)}%</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Table;
