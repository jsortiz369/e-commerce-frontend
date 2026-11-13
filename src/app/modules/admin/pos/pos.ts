import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { PIcon } from '@primeicons/angular/p-icon';

export type SalesChannelType = 'PHYSICAL_STORE' | 'ONLINE';
export type PaymentMethodCode = 'CASH' | 'CARD_POS' | 'TRANSFER_QR' | 'PAYMENT_LINK';

export interface PosProductVariant {
  id: string;
  productId: string;
  name: string;
  variantName: string;
  category: string;
  sku: string;
  barcode: string;
  price: number;
  taxRate: number;
  stock: number;
}

export interface PosTicketLine {
  variant: PosProductVariant;
  quantity: number;
  discount: number;
}

export interface PosCustomer {
  id: string;
  name: string;
  taxId: string;
  email: string;
  defaultAddress?: string;
}

@Component({
  selector: 'app-pos',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, PIcon],
  templateUrl: './pos.html',
})
export class Pos {
  // Canal de venta (sales.SalesChannel)
  readonly salesChannel = signal<SalesChannelType>('PHYSICAL_STORE');

  // Almacén activo (inventories.tb_warehouses)
  readonly selectedWarehouse = signal<string>('WH-CENTRAL');
  readonly warehouses = [
    { code: 'WH-CENTRAL', name: 'Tienda Principal - Caja 01' },
    { code: 'WH-NORTE', name: 'Sucursal Norte - Caja 02' },
    { code: 'WH-BODEGA', name: 'Centro de Distribución Web' },
  ];

  // Búsqueda por Lector de Código de Barras / SKU / Nombre
  readonly barcodeOrSearchInput = signal<string>('');
  readonly selectedCategory = signal<string>('Todos');
  readonly scanFeedback = signal<string | null>(null);

  // Cliente seleccionado (commerce.tb_customers)
  readonly selectedCustomerId = signal<string>('CF');
  readonly shippingAddress = signal<string>('Av. Principal 450, Miraflores - Lima');
  readonly deliveryNotes = signal<string>('');

  readonly customers: PosCustomer[] = [
    {
      id: 'CF',
      name: 'Consumidor Final (Mostrador)',
      taxId: '00000000',
      email: 'mostrador@tienda.com',
    },
    {
      id: 'CUST-01',
      name: 'María Fernanda Gómez',
      taxId: '45892103',
      email: 'm.gomez@correo.com',
      defaultAddress: 'Av. Principal 450, Miraflores - Lima',
    },
    {
      id: 'CUST-02',
      name: 'Carlos Eduardo Rivas',
      taxId: '20554198211',
      email: 'crivas@empresa.pe',
      defaultAddress: 'Jr. Los Pinos 128, San Isidro',
    },
  ];

  // Catálogo de variantes con código de barras, SKU y precios (catalog.tb_product_variants + tb_product_market_prices)
  readonly categories = ['Todos', 'Supermercado', 'Tecnología', 'Hogar', 'Moda'];

  readonly catalogVariants: PosProductVariant[] = [
    {
      id: 'VAR-001',
      productId: 'PROD-01',
      name: 'Café Orgánico Tostado Medio',
      variantName: 'Bolsa 500g',
      category: 'Supermercado',
      sku: 'SUP-CAF-500',
      barcode: '775010000101',
      price: 14.5,
      taxRate: 0.18,
      stock: 42,
    },
    {
      id: 'VAR-002',
      productId: 'PROD-02',
      name: 'Aceite de Oliva Extra Virgen',
      variantName: 'Botella 750ml',
      category: 'Supermercado',
      sku: 'SUP-OLI-750',
      barcode: '775010000102',
      price: 22.0,
      taxRate: 0.18,
      stock: 19,
    },
    {
      id: 'VAR-003',
      productId: 'PROD-03',
      name: 'Chocolate Oscuro 70% Cacao',
      variantName: 'Barra 100g',
      category: 'Supermercado',
      sku: 'SUP-CHO-100',
      barcode: '775010000103',
      price: 5.9,
      taxRate: 0.18,
      stock: 85,
    },
    {
      id: 'VAR-004',
      productId: 'PROD-04',
      name: 'Auriculares Inalámbricos ANC',
      variantName: 'Negro Mate',
      category: 'Tecnología',
      sku: 'TEC-AUR-ANC',
      barcode: '775010000201',
      price: 89.9,
      taxRate: 0.18,
      stock: 12,
    },
    {
      id: 'VAR-005',
      productId: 'PROD-05',
      name: 'Cargador Rápido USB-C 65W',
      variantName: 'Blanco GaN',
      category: 'Tecnología',
      sku: 'TEC-CHG-65W',
      barcode: '775010000202',
      price: 29.5,
      taxRate: 0.18,
      stock: 30,
    },
    {
      id: 'VAR-006',
      productId: 'PROD-06',
      name: 'Termo Acero Inoxidable',
      variantName: '1 Litro - Grafito',
      category: 'Hogar',
      sku: 'HOG-TER-1000',
      barcode: '775010000301',
      price: 24.0,
      taxRate: 0.18,
      stock: 25,
    },
    {
      id: 'VAR-007',
      productId: 'PROD-07',
      name: 'Camiseta Algodón Pima',
      variantName: 'Talla M - Azul Marino',
      category: 'Moda',
      sku: 'MOD-CAM-PIM-M',
      barcode: '775010000401',
      price: 35.0,
      taxRate: 0.18,
      stock: 16,
    },
    {
      id: 'VAR-008',
      productId: 'PROD-08',
      name: 'Pack Agua Mineral Manantial',
      variantName: '6 x 600ml',
      category: 'Supermercado',
      sku: 'SUP-AGU-6PK',
      barcode: '775010000104',
      price: 6.5,
      taxRate: 0.18,
      stock: 64,
    },
  ];

  // Líneas del ticket actual (sales.tb_order_lines)
  readonly ticketLines = signal<PosTicketLine[]>([
    {
      variant: this.catalogVariants[0],
      quantity: 2,
      discount: 0,
    },
    {
      variant: this.catalogVariants[2],
      quantity: 1,
      discount: 0,
    },
  ]);

  // Cupón promocional (promotions.tb_discounts)
  readonly couponCode = signal<string>('');
  readonly appliedDiscountPercent = signal<number>(0);

  // Pago (payments.tb_payment_transactions)
  readonly paymentMethod = signal<PaymentMethodCode>('CASH');
  readonly cashReceived = signal<number | null>(50);
  readonly lastCompletedOrderNumber = signal<string | null>(null);

  readonly selectedCustomer = computed(() => {
    return (
      this.customers.find((c) => c.id === this.selectedCustomerId()) ??
      this.customers[0]
    );
  });

  readonly filteredCatalog = computed(() => {
    const query = this.barcodeOrSearchInput().trim().toLowerCase();
    const category = this.selectedCategory();

    return this.catalogVariants.filter((item) => {
      const matchesCategory = category === 'Todos' || item.category === category;
      if (!query) {
        return matchesCategory;
      }
      const matchesQuery =
        item.name.toLowerCase().includes(query) ||
        item.sku.toLowerCase().includes(query) ||
        item.barcode.includes(query);
      return matchesCategory && matchesQuery;
    });
  });

  readonly totalItemsCount = computed(() =>
    this.ticketLines().reduce((acc, line) => acc + line.quantity, 0),
  );

  readonly subtotalAmount = computed(() =>
    this.ticketLines().reduce(
      (acc, line) => acc + line.variant.price * line.quantity,
      0,
    ),
  );

  readonly discountAmount = computed(() => {
    const lineDiscounts = this.ticketLines().reduce(
      (acc, line) => acc + line.discount,
      0,
    );
    const globalDiscount =
      this.subtotalAmount() * (this.appliedDiscountPercent() / 100);
    return lineDiscounts + globalDiscount;
  });

  readonly taxableBase = computed(() =>
    Math.max(0, this.subtotalAmount() - this.discountAmount()),
  );

  readonly taxAmount = computed(() => this.taxableBase() * 0.18);

  readonly shippingFee = computed(() =>
    this.salesChannel() === 'ONLINE' && this.ticketLines().length > 0 ? 8.0 : 0,
  );

  readonly totalAmount = computed(
    () => this.taxableBase() + this.taxAmount() + this.shippingFee(),
  );

  readonly cashChange = computed(() => {
    const received = this.cashReceived() ?? 0;
    return Math.max(0, received - this.totalAmount());
  });

  setSalesChannel(channel: SalesChannelType): void {
    this.salesChannel.set(channel);
    if (channel === 'ONLINE') {
      if (this.selectedCustomerId() === 'CF') {
        this.selectedCustomerId.set('CUST-01');
      }
      if (this.paymentMethod() === 'CASH') {
        this.paymentMethod.set('PAYMENT_LINK');
      }
    } else {
      if (this.paymentMethod() === 'PAYMENT_LINK') {
        this.paymentMethod.set('CASH');
      }
    }
  }

  onCustomerChange(customerId: string): void {
    this.selectedCustomerId.set(customerId);
    const found = this.customers.find((c) => c.id === customerId);
    if (found?.defaultAddress) {
      this.shippingAddress.set(found.defaultAddress);
    }
  }

  /**
   * Simula el escaneo de pistola de código de barras o ingreso rápido por SKU al presionar Enter.
   */
  onBarcodeEnter(): void {
    const code = this.barcodeOrSearchInput().trim();
    if (!code) {
      return;
    }

    const exactMatch = this.catalogVariants.find(
      (v) =>
        v.barcode === code || v.sku.toLowerCase() === code.toLowerCase(),
    );

    if (exactMatch) {
      this.addVariantToTicket(exactMatch);
      this.barcodeOrSearchInput.set('');
      this.scanFeedback.set(`Escaneado: ${exactMatch.name} (${exactMatch.sku})`);
      setTimeout(() => this.scanFeedback.set(null), 2500);
      return;
    }

    const filtered = this.filteredCatalog();
    if (filtered.length === 1) {
      this.addVariantToTicket(filtered[0]);
      this.barcodeOrSearchInput.set('');
      this.scanFeedback.set(`Agregado: ${filtered[0].name}`);
      setTimeout(() => this.scanFeedback.set(null), 2500);
    }
  }

  addVariantToTicket(variant: PosProductVariant): void {
    this.lastCompletedOrderNumber.set(null);
    const current = this.ticketLines();
    const index = current.findIndex((l) => l.variant.id === variant.id);

    if (index >= 0) {
      const updated = [...current];
      updated[index] = {
        ...updated[index],
        quantity: updated[index].quantity + 1,
      };
      this.ticketLines.set(updated);
    } else {
      this.ticketLines.set([
        ...current,
        { variant, quantity: 1, discount: 0 },
      ]);
    }
  }

  updateQuantity(variantId: string, delta: number): void {
    const updated = this.ticketLines()
      .map((line) =>
        line.variant.id === variantId
          ? { ...line, quantity: line.quantity + delta }
          : line,
      )
      .filter((line) => line.quantity > 0);

    this.ticketLines.set(updated);
  }

  removeLine(variantId: string): void {
    this.ticketLines.set(
      this.ticketLines().filter((l) => l.variant.id !== variantId),
    );
  }

  clearTicket(): void {
    this.ticketLines.set([]);
    this.appliedDiscountPercent.set(0);
    this.couponCode.set('');
    this.lastCompletedOrderNumber.set(null);
  }

  applyCoupon(): void {
    const code = this.couponCode().trim().toUpperCase();
    if (code === 'PROMO10' || code === 'VIP10') {
      this.appliedDiscountPercent.set(10);
    } else if (code === 'SUPER20') {
      this.appliedDiscountPercent.set(20);
    } else {
      this.appliedDiscountPercent.set(0);
    }
  }

  completeSale(): void {
    if (this.ticketLines().length === 0) {
      return;
    }
    const prefix = this.salesChannel() === 'PHYSICAL_STORE' ? 'POS' : 'WEB';
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    this.lastCompletedOrderNumber.set(`${prefix}-${randomNum}`);
    this.ticketLines.set([]);
    this.appliedDiscountPercent.set(0);
    this.couponCode.set('');
  }
}

