export interface NotificationType {
  id: number;
  name: string;
  type: number;
  user_id: number;
  product_id: number;
  is_read: boolean;
  created_at: Date;
}
