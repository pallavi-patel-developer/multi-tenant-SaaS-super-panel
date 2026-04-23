export const FEATURES_GROUPS = {
  "Business Basics": [
    { id: 'f_business_name', label: 'Business Info', desc: 'Core identifying name , GST / Tax ID , Address , Contact Details , Currency , Timezone' },
  ],
  "User Management": [
    { id: 'f_user_management', label: 'User Management', desc: 'Add or remove employees , Define roles , Permissions' },
  ],
  "Product / Service": [
    { id: 'f_product_management', label: 'Product Management', desc: 'Product or service title, price, tax, status' },
  ],
  "Billing / Invoice": [
    { id: 'f_billing_management', label: 'Invoice Number', desc: 'payments, status, invoice/bill' },
  ],
  "Reports": [
    { id: 'f_reports_analytics', label: 'Sales Report', desc: 'Periodic sales analytics, financial revenue, taxation records' },
  ],
  "Inventory": [
    { id: 'f_stock_quantity', label: 'Stock Quantity', desc: 'Track available inventory amounts, low stock alert, notification for reordering' },
  ],
  "Room Management": [
    { id: 'f_room_management', label: 'Room Management', desc: 'Room Number, Room Type, Check-in/out Date, Guest ID, Booking Status, Room Availability, Extra Services' }
  ],
  "Manufacturing & Vendor": [
    { id: 'f_manufacturing_dispatch', label: 'Manufacturing & Dispatch', desc: 'Raw Material Inventory, Production Batch, Mfg Date, Quality Check, Dispatch Tracking, Bulk Orders' }
  ],
  "Pharmacy & Clinic": [
    { id: 'f_drug_licensing', label: 'Drug & Licensing', desc: 'Drug License Number, Batch Number, Expiry Date, Prescription Required' }
  ]
};

export const CORE_FEATURES = [
  'f_business_name', 'f_user_management', 'f_product_management', 'f_billing_management', 'f_reports_analytics', 'f_stock_quantity'
];

export const INITIAL_PERMISSIONS = {
  restaurant: [...CORE_FEATURES],
  hotel: [...CORE_FEATURES, 'f_room_management'],
  manufacturing: [...CORE_FEATURES, 'f_manufacturing_dispatch'],
  pharmacy: [...CORE_FEATURES, 'f_drug_licensing'],
  business: [...CORE_FEATURES]
};

// Helper to get a flat map of feature id -> feature object
export const getAllFeaturesMap = () => {
  const map = {};
  Object.values(FEATURES_GROUPS).forEach(group => {
    group.forEach(feature => {
      map[feature.id] = feature;
    });
  });
  return map;
};
