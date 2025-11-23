import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Product } from "../lib/mockData";

interface AddProductModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (product: Product) => void;
}

export function AddProductModal({
  open,
  onClose,
  onAdd,
}: AddProductModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    barcode: "",
    purchasePrice: "",
    salePrice: "",
    expiryDate: "",
    quantity: "",
    category: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newProduct: Product = {
      id: Date.now().toString(),
      name: formData.name,
      barcode: formData.barcode,
      purchasePrice: parseFloat(formData.purchasePrice),
      salePrice: parseFloat(formData.salePrice),
      expiryDate: formData.expiryDate,
      quantity: parseInt(formData.quantity),
      category: formData.category,
    };

    onAdd(newProduct);
    setFormData({
      name: "",
      barcode: "",
      purchasePrice: "",
      salePrice: "",
      expiryDate: "",
      quantity: "",
      category: "",
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Agregar Nuevo Producto</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre del Producto</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="barcode">Código de Barras</Label>
            <Input
              id="barcode"
              value={formData.barcode}
              onChange={(e) =>
                setFormData({ ...formData, barcode: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Categoría</Label>
            <Input
              id="category"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              placeholder="Ej: Bebidas, Snacks, Lácteos"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="purchasePrice">Precio Compra</Label>
              <Input
                id="purchasePrice"
                type="number"
                step="0.01"
                value={formData.purchasePrice}
                onChange={(e) =>
                  setFormData({ ...formData, purchasePrice: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="salePrice">Precio Venta</Label>
              <Input
                id="salePrice"
                type="number"
                step="0.01"
                value={formData.salePrice}
                onChange={(e) =>
                  setFormData({ ...formData, salePrice: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quantity">Cantidad Inicial</Label>
              <Input
                id="quantity"
                type="number"
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({ ...formData, quantity: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="expiryDate">Fecha Vencimiento</Label>
              <Input
                id="expiryDate"
                type="date"
                value={formData.expiryDate}
                onChange={(e) =>
                  setFormData({ ...formData, expiryDate: e.target.value })
                }
                required
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-[#2E86C1] hover:bg-[#1a5f8f]">
              Agregar Producto
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
