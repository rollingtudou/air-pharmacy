export interface Drone {
  _id: string;
  droneId: string;
  status: 'available' | 'busy' | 'maintenance' | 'charging' | 'offline';
  currentLocation: {
    coordinates: [number, number];
  };
  batteryLevel: number;
  currentOrder?: string;
}

export interface DroneStatus {
  droneId: string;
  location: [number, number];
  status: string;
  batteryLevel: number;
  progress?: number;
  estimatedArrival?: string;
}

export interface InventoryAlert {
  id: string;
  name: string;
  category: 'emergency' | 'prescription' | 'otc';
  currentStock: number;
  criticalStock: number;
  expiryDate: string;
  isEmergencyMed: boolean;
}

export interface DeliveryPath {
  waypoints: [number, number][];
  distance: number;
  estimatedTime: number;
  checkpoints: {
    name: string;
    time: string;
    passed: boolean;
  }[];
} 