/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Glass Industry Standard Format Codes (WPF-Inspired)
 */

export const FORMAT_CODES = {
  // Dimension Formats
  DIMENSION: '{0}mm × {1}mm',
  AREA: '{0:N2} m²',
  WEIGHT: '{0:N1} kg',
  CURRENCY: '${0:N2}',
  
  // SPECIFICATION CODES (Auto-generated based on unit properties)
  SINGLE: 'S-{thickness}{color_code}',
  DGU: 'D-{p1_thick}-{spacer}-{p2_thick}',
  LAMINATED: 'L-{p1_thick}.{p2_thick}-{interlayer}',
  DGU_LAM: 'DL-{p1_thick}.{p2_thick}-{spacer}-{p3_thick}',
};

export function formatValue(template: string, ...args: any[]): string {
  return template.replace(/{(\d+)(?::([^}]+))?}/g, (match, index, format) => {
    const val = args[index];
    if (val === undefined) return match;
    
    if (format === 'N2') return Number(val).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    if (format === 'N1') return Number(val).toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 });
    
    return val;
  });
}

export function generateGlassCode(item: any): string {
  const { unitType, pane1, pane2, pane3, spacerWidth, interlayer } = item;
  
  switch (unitType) {
    case 'SINGLE':
      return `S-${pane1.thickness}${pane1.color.substring(0, 1).toUpperCase()}`;
    case 'DGU':
      return `D-${pane1.thickness}-${spacerWidth}-${pane2.thickness}`;
    case 'LAMINATED':
      return `L-${pane1.thickness}.${pane2.thickness}-${interlayer.type.substring(0, 3).toUpperCase()}`;
    default:
      return 'GEN-UNIT';
  }
}
