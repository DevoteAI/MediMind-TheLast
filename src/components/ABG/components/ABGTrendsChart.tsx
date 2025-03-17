import React, { useMemo, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Brush
} from 'recharts';
import { format } from 'date-fns';
import type { ABGResult } from '../../../store/useABGStore';

interface ABGTrendsChartProps {
  results: ABGResult[];
  patientId: string;
}

interface ChartDataPoint {
  timestamp: number;
  formattedDate: string;
  pH?: number;
  pCO2?: number;
  pO2?: number;
  HCO3?: number;
  BE?: number;
  sO2?: number;
  lactate?: number;
}

interface Parameter {
  key: string;
  label: string;
  color: string;
  range: string;
  unit: string;
  visible: boolean;
}

const extractNumericValue = (text: string, parameter: string): number | undefined => {
  const regex = new RegExp(`${parameter}[:\\s]+([\\d.]+)`, 'i');
  const match = text.match(regex);
  return match ? parseFloat(match[1]) : undefined;
};

export const ABGTrendsChart: React.FC<ABGTrendsChartProps> = ({ results, patientId }) => {
  // Define parameters with their properties
  const [parameters, setParameters] = useState<Parameter[]>([
    { key: 'pH', label: 'pH', color: '#8884d8', range: '7.35-7.45', unit: '', visible: true },
    { key: 'pCO2', label: 'pCO2', color: '#82ca9d', range: '35-45', unit: 'mmHg', visible: true },
    { key: 'pO2', label: 'pO2', color: '#ffc658', range: '80-100', unit: 'mmHg', visible: true },
    { key: 'HCO3', label: 'HCO3', color: '#ff7300', range: '22-26', unit: 'mEq/L', visible: true },
    { key: 'BE', label: 'Base Excess', color: '#00C49F', range: '-2 to +2', unit: 'mEq/L', visible: true },
    { key: 'sO2', label: 'sO2', color: '#ff0000', range: '95-100', unit: '%', visible: true },
    { key: 'lactate', label: 'Lactate', color: '#e91e63', range: '0.5-2.2', unit: 'mmol/L', visible: true }
  ]);

  const toggleParameter = (paramKey: string) => {
    setParameters(prev => prev.map(param => 
      param.key === paramKey ? { ...param, visible: !param.visible } : param
    ));
  };

  const chartData = useMemo(() => {
    // Filter results for the selected patient and sort by date
    const patientResults = results
      .filter(r => r.patient?.id === patientId)
      .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());

    // Extract numeric values from raw analysis text
    return patientResults.map(result => ({
      timestamp: new Date(result.created_at).getTime(),
      formattedDate: format(new Date(result.created_at), 'MMM d, HH:mm'),
      pH: extractNumericValue(result.raw_analysis, 'pH'),
      pCO2: extractNumericValue(result.raw_analysis, 'pCO2'),
      pO2: extractNumericValue(result.raw_analysis, 'pO2'),
      HCO3: extractNumericValue(result.raw_analysis, 'HCO3'),
      BE: extractNumericValue(result.raw_analysis, 'BE'),
      sO2: extractNumericValue(result.raw_analysis, 'sO2'),
      lactate: extractNumericValue(result.raw_analysis, 'lactate')
    }));
  }, [results, patientId]);

  if (chartData.length < 2) {
    return (
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 text-center">
        <p className="text-gray-600 dark:text-gray-400">
          Not enough data points to show trends.
          At least 2 blood gas analyses are required.
        </p>
      </div>
    );
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400 mb-2">{label}</p>
          <div className="space-y-1">
            {payload.map((entry: any) => {
              const param = parameters.find(p => p.key === entry.dataKey);
              if (!param) return null;
              return (
                <div
                  key={entry.dataKey}
                  className="flex items-center gap-2"
                  style={{ color: entry.color }}
                >
                  <span className="font-medium">{param.label}:</span>
                  <span>{entry.value} {param.unit}</span>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = () => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4 mt-6">
      {parameters.map(param => (
        <button
          key={param.key}
          onClick={() => toggleParameter(param.key)}
          className={`bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 text-center transition-all ${
            param.visible ? 'ring-2 ring-primary ring-offset-2 dark:ring-offset-gray-800' : 'opacity-50'
          }`}
        >
          <div
            className="font-medium mb-1"
            style={{ color: param.color }}
          >
            {param.label}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            Normal: {param.range} {param.unit}
          </div>
        </button>
      ))}
    </div>
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 space-y-6">
      <h3 className="text-lg font-semibold mb-4">Blood Gas Parameters Trends</h3>
      
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis
              dataKey="formattedDate"
              tick={{ fill: 'currentColor' }}
              stroke="currentColor"
            />
            <YAxis tick={{ fill: 'currentColor' }} stroke="currentColor" />
            <Tooltip content={<CustomTooltip />} />
            <Brush dataKey="formattedDate" height={30} stroke="#8884d8" />
            
            {parameters.map(param => (
              param.visible && (
                <Line
                  key={param.key}
                  type="monotone"
                  dataKey={param.key}
                  stroke={param.color}
                  name={param.label}
                  strokeWidth={2}
                  dot={{ r: 4, strokeWidth: 2 }}
                  activeDot={{ r: 8 }}
                />
              )
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <CustomLegend />
    </div>
  );
}; 