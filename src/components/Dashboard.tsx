import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Package, TrendingUp, AlertTriangle, Calendar } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { dailySalesData, mockProducts, mockSales } from "../lib";

export function Dashboard() {
  const todaySales = mockSales
    .filter((sale) => sale.date === "2024-11-22")
    .reduce((sum, sale) => sum + sale.total, 0);

  const totalProducts = mockProducts.reduce(
    (sum, product) => sum + product.quantity,
    0
  );

  const lowStockProducts = mockProducts.filter(
    (product) => product.quantity < 10
  ).length;

  const expiringProducts = mockProducts.filter((product) => {
    const expiryDate = new Date(product.expiryDate);
    const today = new Date();
    const daysUntilExpiry =
      (expiryDate.getTime() - today.getTime()) / (1000 * 3600 * 24);
    return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
  }).length;

  const stats = [
    {
      title: "Productos en Stock",
      value: totalProducts.toString(),
      icon: Package,
      color: "text-[#2E86C1]",
      bgColor: "bg-blue-50",
    },
    {
      title: "Ventas del Día",
      value: `$${todaySales.toFixed(2)}`,
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Productos por Agotarse",
      value: lowStockProducts.toString(),
      icon: AlertTriangle,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Alertas de Vencimiento",
      value: expiringProducts.toString(),
      icon: Calendar,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Resumen de tu negocio</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className={`${stat.bgColor} p-2 rounded-lg`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl text-gray-900">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ventas de los Últimos 7 Días</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dailySalesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="ventas"
                  stroke="#2E86C1"
                  strokeWidth={3}
                  dot={{ fill: "#2E86C1", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}