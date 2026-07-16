import React, { useState } from "react";
import "./App.css";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type Category = "all" | "sales" | "traffic" | "signups";

interface DataPoint {
  month: string;
  sales: number;
  traffic: number;
  signups: number;
}

const RAW_DATA: DataPoint[] = [
  { month: "Jan", sales: 4200, traffic: 8100, signups: 320 },
  { month: "Feb", sales: 3800, traffic: 7500, signups: 290 },
  { month: "Mar", sales: 5100, traffic: 9200, signups: 410 },
  { month: "Apr", sales: 4700, traffic: 8800, signups: 375 },
  { month: "May", sales: 5300, traffic: 9700, signups: 460 },
  { month: "Jun", sales: 6100, traffic: 10500, signups: 530 },
  { month: "Jul", sales: 5800, traffic: 10100, signups: 490 },
  { month: "Aug", sales: 6400, traffic: 11200, signups: 560 },
  { month: "Sep", sales: 5900, traffic: 10400, signups: 515 },
  { month: "Oct", sales: 6700, traffic: 11800, signups: 600 },
  { month: "Nov", sales: 7200, traffic: 12500, signups: 650 },
  { month: "Dec", sales: 7900, traffic: 13100, signups: 710 },
];

const MONTHS = RAW_DATA.map((d) => d.month);

function StatCard({
  label,
  value,
  unit,
}: {
  label: string;
  value: number;
  unit?: string;
}) {
  return (
    <article className="stat-card" aria-label={`${label}: ${value}${unit ?? ""}`}>
      <p className="stat-label">{label}</p>
      <p className="stat-value">
        {value.toLocaleString()}
        {unit && <span className="stat-unit">{unit}</span>}
      </p>
    </article>
  );
}

export default function App() {
  const [category, setCategory] = useState<Category>("all");
  const [fromMonth, setFromMonth] = useState<string>("Jan");
  const [toMonth, setToMonth] = useState<string>("Dec");

  const fromIdx = MONTHS.indexOf(fromMonth);
  const toIdx = MONTHS.indexOf(toMonth);
  const safeFrom = Math.min(fromIdx, toIdx);
  const safeTo = Math.max(fromIdx, toIdx);

  const filteredData = RAW_DATA.slice(safeFrom, safeTo + 1);

  const totalSales = filteredData.reduce((s, d) => s + d.sales, 0);
  const totalTraffic = filteredData.reduce((s, d) => s + d.traffic, 0);
  const totalSignups = filteredData.reduce((s, d) => s + d.signups, 0);

  const showSales = category === "all" || category === "sales";
  const showTraffic = category === "all" || category === "traffic";
  const showSignups = category === "all" || category === "signups";

  return (
    <div className="app">
      <header className="app-header">
        <h1>Analytics Dashboard</h1>
        <p className="app-subtitle">Monthly performance overview</p>
      </header>

      <main className="app-main">
        {/* Filters */}
        <section className="filters" aria-label="Dashboard filters">
          <fieldset className="filter-group">
            <legend>Category</legend>
            {(["all", "sales", "traffic", "signups"] as Category[]).map((cat) => (
              <label key={cat} className="radio-label">
                <input
                  type="radio"
                  name="category"
                  value={cat}
                  checked={category === cat}
                  onChange={() => setCategory(cat)}
                />
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </label>
            ))}
          </fieldset>

          <div className="filter-group">
            <label htmlFor="from-month">From</label>
            <select
              id="from-month"
              value={fromMonth}
              onChange={(e) => setFromMonth(e.target.value)}
            >
              {MONTHS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>

            <label htmlFor="to-month">To</label>
            <select
              id="to-month"
              value={toMonth}
              onChange={(e) => setToMonth(e.target.value)}
            >
              {MONTHS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
        </section>

        {/* Stat Cards */}
        <section className="stat-cards" aria-label="Summary statistics">
          {showSales && <StatCard label="Total Sales" value={totalSales} unit="$" />}
          {showTraffic && <StatCard label="Total Traffic" value={totalTraffic} unit=" visits" />}
          {showSignups && <StatCard label="Total Signups" value={totalSignups} />}
        </section>

        {/* Bar Chart */}
        <section className="chart-section" aria-label="Monthly bar chart">
          <h2>Monthly Breakdown (Bar)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={filteredData}
              margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
              aria-label="Bar chart showing monthly sales, traffic, and signups"
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              {showSales && <Bar dataKey="sales" fill="#4f46e5" name="Sales ($)" />}
              {showTraffic && <Bar dataKey="traffic" fill="#06b6d4" name="Traffic" />}
              {showSignups && <Bar dataKey="signups" fill="#10b981" name="Signups" />}
            </BarChart>
          </ResponsiveContainer>
        </section>

        {/* Line Chart */}
        <section className="chart-section" aria-label="Monthly trend line chart">
          <h2>Monthly Trends (Line)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={filteredData}
              margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
              aria-label="Line chart showing monthly trends"
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              {showSales && (
                <Line type="monotone" dataKey="sales" stroke="#4f46e5" name="Sales ($)" dot={false} />
              )}
              {showTraffic && (
                <Line type="monotone" dataKey="traffic" stroke="#06b6d4" name="Traffic" dot={false} />
              )}
              {showSignups && (
                <Line type="monotone" dataKey="signups" stroke="#10b981" name="Signups" dot={false} />
              )}
            </LineChart>
          </ResponsiveContainer>
        </section>
      </main>

      <footer className="app-footer">
        <p>Built with React, TypeScript &amp; Recharts · Accessible by design</p>
      </footer>
    </div>
  );
}