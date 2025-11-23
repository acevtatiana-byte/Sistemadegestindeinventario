import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Separator } from "./ui/separator";
import { Store, Barcode, Users, Bell } from "lucide-react";

export function Settings() {
  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">Ajustes</h1>
        <p className="text-gray-600">Configura tu sistema</p>
      </div>

      <div className="space-y-6">
        {/* Store Profile */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Store className="w-5 h-5" />
              Perfil del Comercio
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="storeName">Nombre del Negocio</Label>
              <Input
                id="storeName"
                defaultValue="Mi Autoservicio"
                placeholder="Ingresa el nombre de tu negocio"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="storeAddress">Dirección</Label>
              <Input
                id="storeAddress"
                defaultValue="Calle Principal #123, Colonia Centro"
                placeholder="Dirección completa"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="storePhone">Teléfono</Label>
                <Input
                  id="storePhone"
                  defaultValue="555-1234"
                  placeholder="Número de teléfono"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="storeEmail">Correo</Label>
                <Input
                  id="storeEmail"
                  type="email"
                  defaultValue="contacto@miautoservicio.com"
                  placeholder="Email de contacto"
                />
              </div>
            </div>

            <div className="pt-4">
              <Button className="bg-[#2E86C1] hover:bg-[#1a5f8f]">
                Guardar Cambios
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Barcode Scanner Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Barcode className="w-5 h-5" />
              Configuración del Lector de Código de Barras
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-900">Activar sonido de escaneo</p>
                <p className="text-gray-500">Reproducir sonido al escanear productos</p>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-900">Auto-agregar a venta</p>
                <p className="text-gray-500">
                  Agregar automáticamente después de escanear
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="scannerPort">Puerto del escáner</Label>
              <Input
                id="scannerPort"
                defaultValue="COM3"
                placeholder="Puerto de conexión"
              />
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notificaciones
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-900">Alertas de stock bajo</p>
                <p className="text-gray-500">
                  Notificar cuando productos estén por agotarse
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-900">Alertas de vencimiento</p>
                <p className="text-gray-500">
                  Notificar productos próximos a vencer
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="lowStockThreshold">
                Umbral de stock bajo (unidades)
              </Label>
              <Input
                id="lowStockThreshold"
                type="number"
                defaultValue="10"
                placeholder="Cantidad mínima"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="expiryWarning">
                Días de anticipación para vencimiento
              </Label>
              <Input
                id="expiryWarning"
                type="number"
                defaultValue="30"
                placeholder="Días de anticipación"
              />
            </div>
          </CardContent>
        </Card>

        {/* User Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Gestión de Usuarios
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Usuario Actual</Label>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-900">Admin Principal</p>
                <p className="text-gray-500">admin@miautoservicio.com</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">Cambiar Contraseña</Label>
              <Input
                id="newPassword"
                type="password"
                placeholder="Nueva contraseña"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirmar contraseña"
              />
            </div>

            <div className="pt-4">
              <Button variant="outline">Actualizar Contraseña</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
