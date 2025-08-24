'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Loader2, ArrowLeft } from 'lucide-react';
import { useSubscription } from '@/hooks/use-subscription';
import { toast } from 'sonner';

interface PaymentPlan {
  id: string;
  name: string;
  description: string;
  price_cents: number;
  currency: string;
  dodo_product_id: string;
}

export default function SubscribeClient() {
  const router = useRouter();
  const { hasActiveSubscription, isPro, loading: subscriptionLoading } = useSubscription();
  const [paymentPlan, setPaymentPlan] = useState<PaymentPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreatingPayment, setIsCreatingPayment] = useState(false);

  // Redirect if user already has pro subscription
  useEffect(() => {
    if (!subscriptionLoading && isPro) {
      router.push('/upload');
    }
  }, [isPro, subscriptionLoading, router]);

  // Fetch payment plan on component mount
  useEffect(() => {
    const fetchPaymentPlan = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/payment-plans');
        if (!response.ok) {
          throw new Error('Failed to fetch payment plans');
        }
        const data = await response.json();
        if (data.plans && data.plans.length > 0) {
          setPaymentPlan(data.plans[0]); // Get the first (and only) pro plan
        }
      } catch (error) {
        console.error('Error fetching payment plans:', error);
        toast.error('Failed to load payment plans');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPaymentPlan();
  }, []);

  const handlePurchase = async () => {
    if (!paymentPlan) return;

    setIsCreatingPayment(true);
    try {
      const response = await fetch('/api/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_id: paymentPlan.dodo_product_id,
          quantity: 1,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment');
      }

      const data = await response.json();
      if (data.payment_link) {
        // Redirect to DodoPayments checkout
        window.location.href = data.payment_link;
      } else {
        throw new Error('No payment link received');
      }
    } catch (error) {
      console.error('Error creating payment:', error);
      toast.error('Failed to create payment. Please try again.');
    } finally {
      setIsCreatingPayment(false);
    }
  };

  if (subscriptionLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!paymentPlan) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Payment Plan Not Available</h1>
          <p className="text-muted-foreground mb-4">Unable to load payment plans at this time.</p>
          <Button onClick={() => router.push('/upload')} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Upload
          </Button>
        </div>
      </div>
    );
  }

  const priceInDollars = (paymentPlan.price_cents / 100).toFixed(2);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Button 
            onClick={() => router.push('/upload')} 
            variant="ghost" 
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Upload
          </Button>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Upgrade to Pro
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get lifetime access to our website generation tool with a one-time payment
          </p>
        </div>

        {/* Pricing Card */}
        <div className="max-w-md mx-auto">
          <Card className="relative border-2 border-blue-500 shadow-xl">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-blue-500 text-white px-4 py-1 text-sm font-semibold">
                Most Popular
              </Badge>
            </div>
            
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold">{paymentPlan.name}</CardTitle>
              <CardDescription className="text-gray-600">
                {paymentPlan.description}
              </CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold text-gray-900">
                  ${priceInDollars}
                </span>
                <span className="text-gray-600 ml-2">one-time</span>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Features */}
              <div className="space-y-3">
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span>Unlimited website generation</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span>PDF resume upload</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span>Professional website templates</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span>Lifetime access</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span>No monthly fees</span>
                </div>
              </div>
              
              {/* Purchase Button */}
              <Button 
                onClick={handlePurchase}
                disabled={isCreatingPayment}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold"
                size="lg"
              >
                {isCreatingPayment ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  `Get Pro Access - $${priceInDollars}`
                )}
              </Button>
              
              <p className="text-xs text-gray-500 text-center mt-4">
                Secure payment powered by DodoPayments
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* FAQ Section */}
        <div className="mt-16 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Is this really a one-time payment?</h3>
              <p className="text-gray-600">
                Yes! Pay once and get lifetime access to all features. No recurring charges or hidden fees.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What happens after I pay?</h3>
              <p className="text-gray-600">
                You'll be redirected back to the upload page where you can immediately start generating your website.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Can I get a refund?</h3>
              <p className="text-gray-600">
                We offer a 30-day money-back guarantee if you're not satisfied with the service.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}