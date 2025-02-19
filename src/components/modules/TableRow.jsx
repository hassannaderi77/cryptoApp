import chartUp from "../../assets/chart-up.svg";
import chartDown from "../../assets/chart-down.svg";

import styles from "../modules/TableCoins.module.css";
import { marketChart } from "../../services/cryptoApi";

function TableRow({ coin, setChart}) {

  const {
    id,
    name,
    image,
    symbol,
    current_price,
    total_volume,
    price_change_percentage_24h: price_change,
  } = coin;

  const showHandler = async () => {
    try {
      const res = await fetch(marketChart(id));
      const json = await res.json();
      setChart({ ...json , coin:coin });
    } catch (error) {
      setChart(null);
    }
  };

  return (
    <tr>
      <td>
        <div className={styles.symbol} onClick={showHandler}>
          <img src={image} alt="" />
          <span>{symbol.toUpperCase()}</span>
        </div>
      </td>
      <td>{name}</td>
      <td>${current_price.toLocaleString()}</td>
      <td className={price_change > 0 ? styles.success : styles.error}>
        {price_change.toFixed(2)}%
      </td>
      <td>{total_volume.toLocaleString()}</td>
      <td>
        <img src={price_change > 0 ? chartUp : chartDown} alt={name} />
      </td>
    </tr>
  );
}

export default TableRow;
