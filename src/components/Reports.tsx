import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { mockSales, mockProducts } from "../lib/mockData";
import { TrendingUp, DollarSign, Package } from "lucide-react";

export function Reports() {
  const [startDate, setStartDate] = useState("2024-11-16");
  const [endDate, setEndDate] = useState("2024-11-22");

  // Calculate most sold products
  const productSales: { [key: string]: { name: string; quantity: number } } =
    {};

  mockSales.forEach((sale) => {
    sale.products.forEach((item) => {
      if (!productSales[item.productId]) {
        productSales[item.productId] = {
          name: item.name,
          quantity: 0,
        };
      }
      productSales[item.productId].quantity += item.quantity;
    });
  });

  const topProducts = Object.values(productSales)
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 5)
    .map((item) => ({
      nombre: item.name,
      cantidad: item.quantity,
    }));

  // Calculate profits
  const totalRevenue = mockSales.reduce((sum, sale) => sum + sale.total, 0);

  const totalCost = mockSales.reduce((sum, sale) => {
    return (
      sum +
      sale.products.reduce((productSum, item) => {
        const product = mockProducts.find((p) => p.id === item.productId);
        return (
          productSum + (product ? product.purchasePrice * item.quantity : 0)
        );
      }, 0)
    );
  }, 0);

  const profit = totalRevenue - totalCost;

  // Sales by category
  const categorySales: { [key: string]: number } = {};

  mockSales.forEach((sale) => {
    sale.products.forEach((item) => {
      const product = mockProducts.find((p) => p.id === item.productId);
      if (product) {
        if (!categorySales[product.category]) {
          categorySales[product.category] = 0;
        }
        categorySales[product.category] += item.price * item.quantity;
      }
    });
  });

  const categoryData = Object.entries(categorySales).map(
    ([name, value]) => ({
      name,
      value: parseFloat(value.toFixed(2)),
    })
  );

  const COLORS = ["#2E86C1", "#27AE60", "#F39C12", "#E74C3C", "#9B59B6"];

  const stats = [
    {
      title: "Ventas Totales",
      value: `$${totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Ganancia Neta",
      value: `$${profit.toFixed(2)}`,
      icon: TrendingUp,
      color: "text-[#2E86C1]",
      bgColor: "bg-blue-50",
    },
    {
      title: "Productos Vendidos",
      value: Object.values(productSales)
        .reduce((sum, item) => sum + item.quantity, 0)
        .toString(),
      icon: Package,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">Reportes</h1>
        <p className="text-gray-600">Análisis de tu negocio</p>
      </div>

      {/* Date filters */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Filtros de Fecha</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 items-end">
            <div className="space-y-2">
              <Label htmlFor="startDate">Fecha Inicio</Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">Fecha Fin</Label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <Button className="bg-[#2E86C1] hover:bg-[#1a5f8f]">
              Aplicar Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Productos Más Vendidos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topProducts}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="nombre"
                    stroke="#6b7280"
                    tick={{ fontSize: 12 }}
                    angle={-45}
                    textAnchor="end"
                    height={100}
                  />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="cantidad" fill="#2E86C1" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ventas por Categoría</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry) => `$${entry.value}`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
