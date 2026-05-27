import React from 'react';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from 'recharts';


// TOOLTIP
const CustomChartTooltip = ({
  active,
  payload,
  label
}) => {

  if (

    active &&
    payload &&
    payload.length

  ) {

    return (

      <div className="px-4 py-2.5 rounded-lg bg-brand-dark/95 border border-white/10 backdrop-blur-md shadow-glass-lg font-sans text-xs">

        {label && (

          <p className="font-semibold text-white mb-1.5">

            {label}

          </p>
        )}

        {payload.map(

          (entry, index) => (

            <div

              key={index}

              className="flex items-center gap-2 text-gray-300"
            >

              <span
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor:
                    entry.color || entry.fill
                }}
              />

              <span>
                {entry.name}
              </span>

              <span className="font-bold text-white ml-auto">

                {entry.value}

              </span>

            </div>
          )
        )}

      </div>
    );
  }

  return null;
};


// ISSUE TREND CHART
export const IssueTrendChart = ({
  data = []
}) => {

  const chartData =
    Array.isArray(data)
      ? data
      : [];

  return (

    <div className="w-full h-[300px]">

      <ResponsiveContainer
        width="99%"
        height="100%"
      >

        <AreaChart

          data={chartData}

          margin={{
            top: 10,
            right: 10,
            left: -25,
            bottom: 0
          }}
        >

          <defs>

            <linearGradient
              id="createdGrad"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >

              <stop
                offset="5%"
                stopColor="#8b5cf6"
                stopOpacity={0.4}
              />

              <stop
                offset="95%"
                stopColor="#8b5cf6"
                stopOpacity={0}
              />

            </linearGradient>

            <linearGradient
              id="resolvedGrad"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >

              <stop
                offset="5%"
                stopColor="#06b6d4"
                stopOpacity={0.4}
              />

              <stop
                offset="95%"
                stopColor="#06b6d4"
                stopOpacity={0}
              />

            </linearGradient>

          </defs>

          <XAxis
            dataKey="name"
            stroke="#4b5563"
            fontSize={11}
            tickLine={false}
            axisLine={false}
          />

          <YAxis
            stroke="#4b5563"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            allowDecimals={false}
          />

          <Tooltip
            content={<CustomChartTooltip />}
          />

          <Area
            type="monotone"
            dataKey="Created"
            stroke="#8b5cf6"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#createdGrad)"
            name="Issues Created"
          />

          <Area
            type="monotone"
            dataKey="Resolved"
            stroke="#06b6d4"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#resolvedGrad)"
            name="Issues Resolved"
          />

        </AreaChart>

      </ResponsiveContainer>

    </div>
  );
};


// WORKLOAD CHART
export const WorkloadChart = ({
  data = []
}) => {

  const chartData =
    Array.isArray(data)
      ? data
      : [];

  const COLORS = [

    '#8b5cf6',

    '#06b6d4',

    '#ec4899',

    '#f59e0b',

    '#6b7280',

    '#10b981',

    '#ef4444'
  ];

  const total =
    chartData.reduce(

      (acc, curr) =>

        acc + (curr.value || 0),

      0
    );

  return (

    <div className="w-full h-[250px] flex items-center justify-center relative">

      <ResponsiveContainer
        width="99%"
        height="100%"
      >

        <PieChart>

          <Tooltip
            content={<CustomChartTooltip />}
          />

          <Pie

            data={chartData}

            cx="50%"

            cy="50%"

            innerRadius={60}

            outerRadius={85}

            paddingAngle={4}

            dataKey="value"
          >

            {chartData.map(

              (entry, index) => (

                <Cell

                  key={`cell-${index}`}

                  fill={
                    COLORS[
                      index % COLORS.length
                    ]
                  }
                />
              )
            )}

          </Pie>

        </PieChart>

      </ResponsiveContainer>

      {/* CENTER */}
      <div className="absolute text-center flex flex-col pointer-events-none">

        <span className="text-[10px] uppercase font-mono tracking-wider text-gray-500 font-semibold">

          Active

        </span>

        <span className="text-2xl font-bold font-display text-white">

          {total}

        </span>

        <span className="text-[9px] text-gray-400 font-medium">

          Allocations

        </span>

      </div>

    </div>
  );
};


// PRIORITY CHART
export const PriorityDistributionChart = ({
  data = []
}) => {

  const chartData =
    Array.isArray(data)
      ? data
      : [];

  return (

    <div className="w-full h-[250px]">

      <ResponsiveContainer
        width="99%"
        height="100%"
      >

        <BarChart

          data={chartData}

          margin={{
            top: 10,
            right: 10,
            left: -25,
            bottom: 0
          }}
        >

          <XAxis

            dataKey="name"

            stroke="#4b5563"

            fontSize={11}

            tickLine={false}

            axisLine={false}
          />

          <YAxis

            stroke="#4b5563"

            fontSize={11}

            tickLine={false}

            axisLine={false}

            allowDecimals={false}
          />

          <Tooltip

            content={<CustomChartTooltip />}

            cursor={{
              fill:
                'rgba(255,255,255,0.02)'
            }}
          />

          <Bar

            dataKey="count"

            radius={[6, 6, 0, 0]}

            name="Issues Volume"
          >

            {chartData.map(

              (entry, index) => (

                <Cell

                  key={`cell-${index}`}

                  fill={
                    entry.fill ||
                    '#3b82f6'
                  }
                />
              )
            )}

          </Bar>

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
};