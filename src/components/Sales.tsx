import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Trash2, Barcode } from "lucide-react";
import { mockProducts } from "../lib";
import { toast } from "sonner@2.0.3";

interface SaleItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export function Sales() {
  const [barcode, setBarcode] = useState("");
  const [saleItems, setSaleItems] = useState<SaleItem[]>([]);

  const handleBarcodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const product = mockProducts.find((p) => p.barcode === barcode);

    if (product) {
      const existingItem = saleItems.find(
        (item) => item.productId === product.id
      );

      if (existingItem) {
        setSaleItems(
          saleItems.map((item) =>
            item.productId === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
      } else {
        setSaleItems([
          ...saleItems,
          {
            productId: product.id,
            name: product.name,
            price: product.salePrice,
            quantity: 1,
          },
        ]);
      }

      toast.success(`${product.name} agregado`);
      setBarcode("");
    } else {
      toast.error("Producto no encontrado");
      setBarcode("");
    }
  };

  const removeItem = (productId: string) => {
    setSaleItems(saleItems.filter((item) => item.productId !== productId));
  };

  const total = saleItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleFinalizeSale = () => {
    if (saleItems.length === 0) {
      toast.error("Agrega productos a la venta");
      return;
    }

    toast.success(`Venta finalizada por $${total.toFixed(2)}`);
    setSaleItems([]);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">Punto de Venta</h1>
        <p className="text-gray-600">Registra ventas rápidamente</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left side - Barcode scanner */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Barcode className="w-5 h-5" />
                Escanear Código de Barras
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleBarcodeSubmit}>
                <Input
                  placeholder="Escanea o digita el código de barras"
                  value={barcode}
                  onChange={(e) => setBarcode(e.target.value)}
                  className="text-lg h-14"
                  autoFocus
                />
              </form>
              <p className="text-gray-500 mt-2">
                Presiona Enter después de ingresar el código
              </p>
            </CardContent>
          </Card>

          {/* Products in sale */}
          <Card>
            <CardHeader>
              <CardTitle>Productos en Venta</CardTitle>
            </CardHeader>
            <CardContent>
              {saleItems.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No hay productos agregados
                </div>
              ) : (
                <div className="space-y-3">
                  {saleItems.map((item) => (
                    <div
                      key={item.productId}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex-1">
                        <p className="text-gray-900">{item.name}</p>
                        <p className="text-gray-500">
                          ${item.price.toFixed(2)} x {item.quantity}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.productId)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right side - Total and actions */}
        <div>
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle>Resumen de Venta</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>IVA (0%)</span>
                  <span>$0.00</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between">
                    <span className="text-gray-900">Total</span>
                    <span className="text-3xl text-[#2E86C1]">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  className="w-full bg-[#2E86C1] hover:bg-[#1a5f8f] h-14 text-lg"
                  onClick={handleFinalizeSale}
                >
                  Finalizar Venta
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setSaleItems([])}
                  disabled={saleItems.length === 0}
                >
                  Cancelar Venta
                </Button>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-900">
                  <span>Total de productos: </span>
                  <span>{saleItems.reduce((sum, item) => sum + item.quantity, 0)}</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}