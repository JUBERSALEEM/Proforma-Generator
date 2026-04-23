/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type GlassUnitType = 'SINGLE' | 'DGU' | 'LAMINATED' | 'DGU_LAMINATED';

export interface GlassPane {
  type: string;
  thickness: number; // in mm
  color: string;
}

export interface Interlayer {
  type: string; // PVB, SentryGlas, etc.
  thickness: number; // in mm
}

export interface GlassItem {
  id: string;
  description: string;
  width: number; // in mm
  height: number; // in mm
  quantity: number;
  unitType: GlassUnitType;
  
  // Single Pane specifics
  pane1?: GlassPane;
  
  // DGU specifics
  spacerWidth?: number; // in mm (e.g., 6, 9, 12, 16)
  spacerType?: string; // Aluminum, Warm edge
  
  // Laminated specifics
  pane2?: GlassPane;
  interlayer?: Interlayer;
  
  // DGU + Laminated (pane1 + interlayer + pane2) as outer, then spacer, then pane3
  pane3?: GlassPane;
  
  unitPrice: number;
}

export interface CustomerInfo {
  name: string;
  address: string;
  email: string;
  phone: string;
}

export interface Invoice {
  invoiceNumber: string;
  date: string;
  customer: CustomerInfo;
  items: GlassItem[];
  taxRate: number;
  currency: string;
}
