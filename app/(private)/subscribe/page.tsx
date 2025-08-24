import { Metadata } from 'next';
import SubscribeClient from './client';

export const metadata: Metadata = {
  title: 'Subscribe - Get Pro Access',
  description: 'Upgrade to Pro and unlock unlimited website generation',
};

export default function SubscribePage() {
  return <SubscribeClient />;
}