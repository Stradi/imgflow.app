'use client';

import { changeSubscriptionPlan, unsubscribe } from '@/services/auth';
import { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/AlertDialog';
import { Button } from '../ui/Button';
import { Select, SelectContent, SelectItem, SelectTrigger } from '../ui/Select';
import StarPattern from './StarPattern';

const SCALE_PLAN_CREDITS_TO_PRICE: Record<string, string> = {
  '1,000': '$50',
  '2,500': '$112',
  '5,000': '$225',
  '10,000': '$360',
};

const SCALE_PLAN_CREDITS_TO_VARIANT: Record<string, string> = {
  '1,000': 'scale-1000',
  '2,500': 'scale-2500',
  '5,000': 'scale-5000',
  '10,000': 'scale-10000',
};

const SCALE_PLAN_VARIANT_TO_CREDITS: Record<string, string> = {
  'scale-1000': '1,000',
  'scale-2500': '2,500',
  'scale-5000': '5,000',
  'scale-10000': '10,000',
};

export type TPricingPlansProps = {
  currentPlan: null | string;
};

export default function PricingPlans({ currentPlan }: TPricingPlansProps) {
  const [scalePlanCredits, setScalePlanCredits] = useState('1,000');

  useEffect(() => {
    if (currentPlan) {
      if (currentPlan?.includes('scale')) {
        setScalePlanCredits(SCALE_PLAN_VARIANT_TO_CREDITS[currentPlan]);
      }
    } else {
      setScalePlanCredits('1,000');
    }
  }, [currentPlan]);

  const subscribed = currentPlan !== null;

  return (
    <div>
      <Toaster position="top-center" />
      <table>
        <tbody>
          <tr className="[&>*]:w-1/4 [&>*]:border [&>*]:border-gray-200 border-collapse [&>*]:rounded-lg">
            <PlanHeading
              name="Basic"
              price="$30"
              description="Perfect for personal projects and small businesses."
              showUnsubscribe={subscribed && currentPlan === 'basic-500'}
              showChangePlan={subscribed && currentPlan !== 'basic-500'}
              showGetStarted={!subscribed}
              onUnsubscribe={() => {
                toast
                  .promise(unsubscribe(), {
                    loading: 'Unsubscribing from the Basic plan...',
                    success: 'Successfully unsubscribed from the Basic plan.',
                    error: 'An error occured while unsubscribing from the Basic plan.',
                  })
                  .then(() => {
                    window.location.reload();
                  });
              }}
              onChangePlan={() => {
                toast
                  .promise(changeSubscriptionPlan(currentPlan || '', 'basic-500'), {
                    loading: 'Changing plan to the Basic plan...',
                    success: 'Successfully changed plan to the Basic plan.',
                    error: 'An error occured while changing plan to the Basic plan.',
                  })
                  .then(() => {
                    window.location.reload();
                  });
              }}
              onGetStarted={() => {
                window.location.href = '/dashboard/checkout?variant=basic-500';
              }}
            />
            <PlanHeading
              name="Scale"
              price={SCALE_PLAN_CREDITS_TO_PRICE[scalePlanCredits] || '$50'}
              description="Scale your business with consistency."
              showUnsubscribe={subscribed && currentPlan === SCALE_PLAN_CREDITS_TO_VARIANT[scalePlanCredits]}
              showChangePlan={subscribed && currentPlan !== SCALE_PLAN_CREDITS_TO_VARIANT[scalePlanCredits]}
              showGetStarted={!subscribed}
              onUnsubscribe={() => {
                toast
                  .promise(unsubscribe(), {
                    loading: 'Unsubscribing from the Scale plan...',
                    success: 'Successfully unsubscribed from the Scale plan.',
                    error: 'An error occured while unsubscribing from the Scale plan.',
                  })
                  .then(() => {
                    window.location.reload();
                  });
              }}
              onChangePlan={() => {
                toast
                  .promise(changeSubscriptionPlan(currentPlan || '', SCALE_PLAN_CREDITS_TO_VARIANT[scalePlanCredits]), {
                    loading: 'Changing plan to the Scale plan...',
                    success: 'Successfully changed plan to the Scale plan.',
                    error: 'An error occured while changing plan to the Scale plan.',
                  })
                  .then(() => {
                    window.location.reload();
                  });
              }}
              onGetStarted={() => {
                window.location.href = `/dashboard/checkout?variant=${SCALE_PLAN_CREDITS_TO_VARIANT[scalePlanCredits]}`;
              }}
            />
            <PlanHeading
              name="Business"
              price="$750"
              description="Already have a large business? This is for you."
              showUnsubscribe={subscribed && currentPlan === 'business-50000'}
              showChangePlan={subscribed && currentPlan !== 'business-50000'}
              showGetStarted={!subscribed}
              onUnsubscribe={() => {
                toast
                  .promise(unsubscribe(), {
                    loading: 'Unsubscribing from the Business plan...',
                    success: 'Successfully unsubscribed from the Business plan.',
                    error: 'An error occured while unsubscribing from the Business plan.',
                  })
                  .then(() => {
                    window.location.reload();
                  });
              }}
              onChangePlan={() => {
                toast
                  .promise(changeSubscriptionPlan(currentPlan || '', 'business-50000'), {
                    loading: 'Changing plan to the Business plan...',
                    success: 'Successfully changed plan to the Business plan.',
                    error: 'An error occured while changing plan to the Business plan.',
                  })
                  .then(() => {
                    window.location.reload();
                  });
              }}
              onGetStarted={() => {
                window.location.href = '/dashboard/checkout?variant=business-50000';
              }}
            />
            <PlanHeading name="Enterprise" price="Contact Us" description="Need a custom plan? Contact us." />
          </tr>
          <AnimatedFullWidthRow text="Features" />
          <tr className="[&>*]:text-center [&>*]:p-2 [&>*]:text-sm [&>*]:w-1/4 [&>*]:border [&>*]:border-gray-200 border-collapse [&>*]:rounded-lg">
            <td>
              <b>500</b> Credits
            </td>
            <td>
              <Select
                defaultValue={scalePlanCredits}
                value={scalePlanCredits}
                onValueChange={(e) => setScalePlanCredits(e)}
              >
                <SelectTrigger className="text-sm w-auto mx-auto">
                  <span>
                    <b>{scalePlanCredits}</b> Credits
                  </span>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1,000">
                    <b>1,000</b> Credits
                  </SelectItem>
                  <SelectItem value="2,500">
                    <b>2,500</b> Credits
                  </SelectItem>
                  <SelectItem value="5,000">
                    <b>5,000</b> Credits
                  </SelectItem>
                  <SelectItem value="10,000">
                    <b>10,000</b> Credits
                  </SelectItem>
                </SelectContent>
              </Select>
            </td>
            <td>
              <b>50000</b> Credits
            </td>
            <td>
              <b>Custom</b>
            </td>
          </tr>
          <tr className="[&>*]:text-center [&>*]:p-4 [&>*]:text-sm [&>*]:w-1/4 [&>*]:border [&>*]:border-gray-200 border-collapse [&>*]:rounded-lg">
            <td>
              <b>2</b> Pipelines
            </td>
            <td>
              <b>25</b> Pipelines
            </td>
            <td>
              <b>100</b> Pipelines
            </td>
            <td>
              <b>Custom</b>
            </td>
          </tr>
          <tr className="[&>*]:text-center [&>*]:p-4 [&>*]:text-sm [&>*]:w-1/4 [&>*]:border [&>*]:border-gray-200 border-collapse [&>*]:rounded-lg">
            <td>
              <b>50 MB</b> maximum file size
            </td>
            <td>
              <b>500 MB</b> maximum file size
            </td>
            <td>
              <b>1 GB</b> maximum file size
            </td>
            <td>
              <b>Custom</b>
            </td>
          </tr>
          <tr className="[&>*]:text-center [&>*]:p-4 [&>*]:text-sm [&>*]:w-1/4 [&>*]:border [&>*]:border-gray-200 border-collapse [&>*]:rounded-lg">
            <td>
              <b>5</b> Concurrent conversions
            </td>
            <td>
              <b>25</b> Concurrent conversions
            </td>
            <td>
              <b>100</b> Concurrent conversions
            </td>
            <td>
              <b>Custom</b>
            </td>
          </tr>
          <tr className="[&>*]:text-center [&>*]:p-4 [&>*]:text-sm [&>*]:w-1/4 [&>*]:border [&>*]:border-gray-200 border-collapse [&>*]:rounded-lg">
            <td>
              <b>Low</b> priority conversions
            </td>
            <td>
              <b>Medium</b> priority conversions
            </td>
            <td>
              <b>High</b> priority conversions
            </td>
            <td>
              <b>Highest</b> priority conversions
            </td>
          </tr>
          <AnimatedFullWidthRow text="All Plans Includes Customer Support by Email" />
        </tbody>
      </table>
    </div>
  );
}

type TAnimatedFullWidthRow = {
  text: string;
};

function AnimatedFullWidthRow({ text }: TAnimatedFullWidthRow) {
  const [isHovering, setIsHovering] = useState(false);
  return (
    <tr>
      <td
        colSpan={4}
        className="bg-primary p-4 relative group"
        onMouseEnter={() => {
          setIsHovering(true);
        }}
        onMouseLeave={() => {
          setIsHovering(false);
        }}
      >
        <StarPattern isHovering={isHovering} />
        <p className="z-10 relative text-center text-white text-xl font-medium group-hover:scale-110 transition duration-200">
          {text}
        </p>
      </td>
    </tr>
  );
}

type TPlanHeadingProps = {
  name: string;
  price: string;
  description: string;

  showUnsubscribe?: boolean;
  showChangePlan?: boolean;
  showGetStarted?: boolean;

  onUnsubscribe?: () => void;
  onChangePlan?: () => void;
  onGetStarted?: () => void;
};

function PlanHeading({
  name,
  price,
  description,
  showUnsubscribe,
  showChangePlan,
  showGetStarted,
  onUnsubscribe,
  onChangePlan,
  onGetStarted,
}: TPlanHeadingProps) {
  const isContactUs = price === 'Contact Us';

  return (
    <td className="p-4 space-y-4">
      <h2 className="text-xl font-bold text-center">{name}</h2>
      <p className="flex flex-col text-3xl text-center">
        {isContactUs ? (
          <>
            <span>{price}</span>
            <span className="text-sm text-gray-500">&nbsp;</span>
          </>
        ) : (
          <>
            <span>{price}</span>
            <span className="text-sm text-gray-500">per month</span>
          </>
        )}
      </p>
      <p className="text-center text-black">{description}</p>
      {showUnsubscribe && (
        <AlertDialog>
          <AlertDialogTrigger asChild className="w-full">
            <Button variant="secondary">Unsubscribe</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure you want to unsubscribe?</AlertDialogTitle>
              <AlertDialogDescription>
                After unsubscribing your credits will remain, but you will not get any more monthly credits. You will
                also lose all of your pipelines except the latest one. This action will take effect immediately.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>I&apos;ve Changed my Mind</AlertDialogCancel>
              <AlertDialogAction onClick={onUnsubscribe}>Unsubscribe</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
      {showChangePlan && (
        <AlertDialog>
          <AlertDialogTrigger asChild className="w-full">
            <Button>Change Plan</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure you want to change your plan?</AlertDialogTitle>
              <AlertDialogDescription>
                After changing your plan, you will be prorated for the new plan and your credits will be adjusted.
                Downgrading your plan will not refund any money. This action will take effect immediately.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>I&apos;ve Changed my Mind</AlertDialogCancel>
              <AlertDialogAction onClick={onChangePlan}>Change Plan</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
      {showGetStarted && (
        <Button className="w-full" onClick={onGetStarted}>
          Get Started
        </Button>
      )}
    </td>
  );
}
