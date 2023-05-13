import { CheckCircle2Icon } from 'lucide-react';
import CTAButton from './CTAButton';

export default function Pricing() {
  return (
    <div id="pricing" className="bg-gradient-to-br from-[#0C2400] to-black rounded-[64px] text-white/75">
      <div className="flex flex-col p-8 gap-2">
        <p className="text-4xl font-bold text-white pl-4">Pricing</p>
        <SinglePlan
          title="Basic"
          price={30}
          features={[
            '500 Credits per month',
            '2 Pipelines',
            'Max. 50 Mb file uploads',
            '5 Concurrent conversions',
            'Low priority',
            'Email support',
          ]}
        />
        <SinglePlan
          title="Scale"
          price={50}
          features={[
            '1,000 Credits per month',
            '25 Pipelines',
            'Max. 500 Mb file uploads',
            '25 Concurrent conversions',
            'Medium priority',
            'Email support',
          ]}
        />
        <SinglePlan
          title="Business"
          price={750}
          features={[
            '50,000 Credits per month',
            '100 Pipelines',
            'Max. 1 Gb file uploads',
            '100 Concurrent conversions',
            'High priority',
            'Email support',
          ]}
        />
      </div>
    </div>
  );
}

type TSinglePlanProps = {
  title: string;
  price: number;
  features: string[];
};

function SinglePlan({ title, price, features }: TSinglePlanProps) {
  return (
    <div className="group scale-[0.975] p-8 bg-white/10 rounded-[48px] backdrop-blur-md hover:rounded-[24px] hover:scale-100 transition-[border-radius,background-color,transform] duration-200 hover:bg-white/[0.15]">
      <header className="flex justify-between items-center group-hover:text-white transition-[color] duration-200">
        <p className="text-3xl font-medium">{title}</p>
        <div className="flex gap-8 items-center">
          <div className="flex flex-col text-center">
            <p className="text-4xl font-bold">${price}</p>
            <p className="text-sm font-medium">per month</p>
          </div>
          <div className="text-black">
            <CTAButton />
          </div>
        </div>
      </header>
      <ul className="grid grid-cols-2 gap-2 opacity-75 group-hover:opacity-100 transition-[opacity,color] duration-200 group-hover:text-white-95">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            <CheckCircle2Icon className="w-6 h-6 text-green-400/75" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}
