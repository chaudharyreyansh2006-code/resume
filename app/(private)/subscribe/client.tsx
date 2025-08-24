'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check,  ArrowLeft, Crown } from 'lucide-react';
import { useSubscription } from '@/hooks/use-subscription';
import { toast } from 'sonner';
import { CustomSpinner } from '@/components/CustomSpinner';

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
  const { isPro, loading: subscriptionLoading } = useSubscription();
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
      <div className="flex flex-col items-center flex-1 px-4 py-12 gap-6">
        <CustomSpinner className="h-8 w-8" />
      </div>
    );
  }

  if (!paymentPlan) {
    return (
      <div className="flex flex-col items-center flex-1 px-4 pb-12 pt-4 gap-6">
        <div className="text-center font-mono">
          <h1 className="text-base text-design-black mb-4">Payment Plan Not Available</h1>
          <p className="text-sm text-design-gray mb-6">Unable to load payment plans at this time.</p>
          <Button 
            onClick={() => router.push('/upload')} 
            variant="ghost"
            className="font-mono"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Upload
          </Button>
        </div>
      </div>
    );
  }

  const priceInDollars = (paymentPlan.price_cents / 100).toFixed(2);

  return (
    <div className="flex flex-col items-center flex-1 px-4 py-12 gap-6">
      <div className="w-full max-w-[438px] text-center font-mono">
        {/* Back Button */}
        <Button 
          onClick={() => router.push('/upload')} 
          variant="ghost" 
          className="mb-6 font-mono hover:bg-white border border-transparent hover:border-gray-200"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Upload
        </Button>

        {/* Header */}
        <div className="px-2 mb-8">
          <div className="inline-block font-mono gap-2.5 px-2.5 py-1.5 rounded bg-gray-100 text-sm mb-5 text-design-gray">
            <Crown className="h-4 w-4 inline mr-1" />
            Pro Access
          </div>
          <h1 className="text-base text-design-black mb-4">
            Upgrade to Pro and unlock unlimited website generation
          </h1>
        </div>

        {/* Pricing Card */}
        <Card className="border border-gray-200 bg-white p-4 sm:p-8 mb-8">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-base font-bold text-design-black font-mono">
              {paymentPlan.name}
            </CardTitle>
            <CardDescription className="text-sm text-design-gray font-mono">
              {paymentPlan.description}
            </CardDescription>
            <div className="mt-4">
              <span className="text-2xl font-bold text-design-black font-mono">
                ${priceInDollars}
              </span>
              <span className="text-design-gray ml-2 text-sm font-mono">one-time</span>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {/* Features */}
            <div className="space-y-3 text-left">
              <div className="flex items-center">
                <Check className="h-4 w-4 text-green-600 mr-3 flex-shrink-0" />
                <span className="text-sm text-design-black font-mono">Unlimited Edits</span>
              </div>
              <div className="flex items-center">
                <Check className="h-4 w-4 text-green-600 mr-3 flex-shrink-0" />
                <span className="text-sm text-design-black font-mono">Unlimited PDF Uploads</span>
              </div>
              <div className="flex items-center">
                <Check className="h-4 w-4 text-green-600 mr-3 flex-shrink-0" />
                <span className="text-sm text-design-black font-mono">Upto 50k Visits</span>
              </div>
              <div className="flex items-center">
                <Check className="h-4 w-4 text-green-600 mr-3 flex-shrink-0" />
                <span className="text-sm text-design-black font-mono">One Time Yearly Access</span>
              </div>
              <div className="flex items-center">
                <Check className="h-4 w-4 text-green-600 mr-3 flex-shrink-0" />
                <span className="text-sm text-design-black font-mono">No monthly fees</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Purchase Button */}
        <div className="font-mono">
          <Button 
            onClick={handlePurchase}
            disabled={isCreatingPayment}
            className="px-4 py-3 h-auto bg-design-black hover:bg-design-black/95 font-mono w-full"
          >
            {isCreatingPayment ? (
              <>
                <CustomSpinner className="h-5 w-5 mr-2" />
                Processing...
              </>
            ) : (
              <>
                <img
                  src="/sparkle.png"
                  alt="Sparkle Icon"
                  className="h-5 w-5 mr-2"
                />
                Get Pro Access - ${priceInDollars}
              </>
            )}
          </Button>
          
          <p className="text-xs text-design-gray mt-4 font-mono">
            Secure payment powered by DodoPayments
          </p>
        </div>

        {/* Simple FAQ */}
        <div className="mt-12 text-left">
          <h2 className="text-base font-bold text-design-black mb-6 font-mono text-center">Questions?</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-bold text-design-black mb-1 font-mono">Is this really a one-time payment?</h3>
              <p className="text-xs text-design-gray font-mono">
                Yes! Pay once and get one year access. No recurring charges.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-design-black mb-1 font-mono">What happens after I pay?</h3>
              <p className="text-xs text-design-gray font-mono">
                You'll be redirected back to upload where you can immediately start generating websites.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-design-black mb-1 font-mono">Can I get a refund?</h3>
              <p className="text-xs text-design-gray font-mono">
                We offer a 30-day money-back guarantee if you're not satisfied. No questions asked!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}