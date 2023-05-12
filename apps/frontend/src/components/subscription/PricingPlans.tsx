'use client';

import Link from 'next/link';
import { useState } from 'react';
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

export default function PricingPlans() {
  const [scalePlanCredits, setScalePlanCredits] = useState('1,000');

  return (
    <div>
      <table>
        <tbody>
          <tr className="[&>*]:w-1/4 [&>*]:border [&>*]:border-gray-200 border-collapse [&>*]:rounded-lg">
            <PlanHeading
              name="Basic"
              price="$30"
              description="Perfect for personal projects and small businesses."
              href="/dashboard/checkout?variant=basic-500"
            />
            <PlanHeading
              name="Scale"
              price={SCALE_PLAN_CREDITS_TO_PRICE[scalePlanCredits] || '$50'}
              description="Scale your business with consistency."
              href={`/dashboard/checkout?variant=${SCALE_PLAN_CREDITS_TO_VARIANT[scalePlanCredits]}`}
            />
            <PlanHeading
              name="Bussiness"
              price="$750"
              description="Already have a large business? This is for you."
              href="/dashboard/checkout?variant=business-50000"
            />
            <PlanHeading
              name="Enterprise"
              price="Contact Us"
              description="Need a custom plan? Contact us."
              href="mailto:batinevirgen@gmail.com"
            />
          </tr>
          <AnimatedFullWidthRow text="Features" />
          <tr className="[&>*]:text-center [&>*]:p-2 [&>*]:text-sm [&>*]:w-1/4 [&>*]:border [&>*]:border-gray-200 border-collapse [&>*]:rounded-lg">
            <td>
              <b>500</b> Credits
            </td>
            <td>
              <Select defaultValue="1,000" value={scalePlanCredits} onValueChange={(e) => setScalePlanCredits(e)}>
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
  href: string;
};

function PlanHeading({ name, price, description, href }: TPlanHeadingProps) {
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
      <br></br>
      <Link href={href} passHref>
        <Button className="w-full">{isContactUs ? 'Contact Us' : 'Get Started'}</Button>
      </Link>
    </td>
  );
}
