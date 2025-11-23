import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { Plus, Search } from "lucide-react";
import { AddProductModal } from "./AddProductModal";
import { mockProducts, Product } from "../lib";

export function Inventory() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddProduct = (product: Product) => {
    setProducts([...products, product]);
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.barcode.includes(searchTerm)
  );

  const getStockBadge = (quantity: number) => {
    if (quantity === 0) {
      return <Badge className="bg-red-500">Agotado</Badge>;
    } else if (quantity < 10) {
      return <Badge className="bg-orange-500">Bajo</Badge>;
    } else {
      return <Badge className="bg-green-500">Normal</Badge>;
    }
  };

  const getExpiryBadge = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const today = new Date();
    const daysUntilExpiry =
      (expiry.getTime() - today.getTime()) / (1000 * 3600 * 24);

    if (daysUntilExpiry < 0) {
      return <Badge className="bg-red-500">Vencido</Badge>;
    } else if (daysUntilExpiry <= 7) {
      return <Badge className="bg-red-500">Vence pronto</Badge>;
    } else if (daysUntilExpiry <= 30) {
      return <Badge className="bg-orange-500">Por vencer</Badge>;
    }
    return null;
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-gray-900 mb-2">Inventario</h1>
          <p className="text-gray-600">Gestiona tus productos</p>
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#2E86C1] hover:bg-[#1a5f8f]"
        >
          <Plus className="w-4 h-4 mr-2" />
          Agregar Producto
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Buscar por nombre o código de barras..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Código de Barras</TableHead>
              <TableHead>Nombre del Producto</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Cantidad</TableHead>
              <TableHead>Fecha de Vencimiento</TableHead>
              <TableHead>Precio Compra</TableHead>
              <TableHead>Precio Venta</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.barcode}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {product.quantity}
                    {getStockBadge(product.quantity)}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {new Date(product.expiryDate).toLocaleDateString("es-MX")}
                    {getExpiryBadge(product.expiryDate)}
                  </div>
                </TableCell>
                <TableCell>${product.purchasePrice.toFixed(2)}</TableCell>
                <TableCell>${product.salePrice.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AddProductModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddProduct}
      />
    </div>
  );
}