import { NextApiRequest } from "next";

export enum LemonEventType {
  SubCreated = "subscription_created",
  SubUpdated = "subscription_updated",
  SubPaymentSuccess = "subscription_payment_success",
  OrderCreated = "order_created",
  OrderRefunded = "order_refunded",
}

export type CustomLemonSqueezyCheckoutData = {
  user_id: string;
};

export type LemonMeta = {
  test_mode: boolean;
  event_name: LemonEventType;
  custom_data: CustomLemonSqueezyCheckoutData;
};

export type SubscriptionCreatedUpdatedCommon = {
  type: string;
  id: string;
  attributes: {
    store_id: number;
    customer_id: number;
    order_id: number;
    order_item_id: number;
    product_id: number;
    variant_id: number;
    product_name: string;
    variant_name: string;
    user_name: string;
    user_email: string;
    status: string;
    status_formatted: string;
    card_brand: string;
    card_last_four: string;
    pause: null | LemonsqueezySubscriptionPause;
    cancelled: boolean;
    trial_ends_at: null | Date;
    billing_anchor: number;
    urls: Record<string, string>;
    renews_at: string;
    ends_at: null | Date;
    created_at: string;
    updated_at: string;
    test_mode: boolean;
  };
  relationships?: {
    store: Record<string, unknown>;
    customer: Record<string, unknown>;
    order: Record<string, unknown>;
    "order-item": Record<string, unknown>;
    product: Record<string, unknown>;
    variant: Record<string, unknown>;
    "subscription-invoices": Record<string, string>;
  };
  links?: {
    self: string;
  };
};

type SubscriptionCreated = Omit<
  SubscriptionCreatedUpdatedCommon,
  "type" | "relationships" | "links"
> & {
  type: string;
  relationships: SubscriptionCreatedUpdatedCommon["relationships"];
  links: SubscriptionCreatedUpdatedCommon["links"];
};

type SubscriptionUpdated = Omit<
  SubscriptionCreatedUpdatedCommon,
  "type" | "relationships" | "links"
> & {
  type: "subscriptions";
};

export type SubscriptionPaymentSuccess = {
  type: "subscription-invoices";
  id: string;
  attributes: {
    store_id: number;
    subscription_id: number;
    billing_reason: string;
    card_brand: string;
    card_last_four: string;
    currency: string;
    currency_rate: string;
    subtotal: number;
    discount_total: number;
    tax: number;
    total: number;
    subtotal_usd: number;
    discount_total_usd: number;
    tax_usd: number;
    total_usd: number;
    status: string;
    status_formatted: string;
    refunded: boolean;
    refunded_at: string | null;
    subtotal_formatted: string;
    discount_total_formatted: string;
    tax_formatted: string;
    total_formatted: string;
    urls: Record<string, unknown>;
    created_at: string;
    updated_at: string;
    test_mode: boolean;
  };
  relationships: {
    store: {
      data: {
        type: "stores";
        id: string;
      };
    };
    subscription: {
      data: {
        type: "subscriptions";
        id: string;
      };
    };
  };
  links: {
    self: string;
  };
};

export type SubscriptionCreatedEvent = {
  meta: LemonMeta;
  data: SubscriptionCreated;
};

export type SubscriptionUpdatedEvent = {
  meta: LemonMeta;
  data: SubscriptionUpdated;
};

export type SubscriptionPaymentSuccessEvent = {
  meta: LemonMeta;
  data: SubscriptionPaymentSuccess;
};

export type LemonEvent =
  | SubscriptionCreatedEvent
  | SubscriptionUpdatedEvent
  | SubscriptionPaymentSuccessEvent;

export interface ResBody extends NextApiRequest {
  body: LemonEvent;
}
