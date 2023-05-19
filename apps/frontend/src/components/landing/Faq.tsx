import { ReactNode } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/Accordion';

export default function Faq() {
  return (
    <div className="space-y-4">
      <p className="text-4xl font-medium text-center">Frequently asked questions</p>
      <div className="grid md:grid-cols-2 gap-4 grid-cols-1">
        <Accordion type="multiple">
          <SingleFaqItem title="What is a Pipeline?" value="what-is-a-pipeline">
            <p>
              A pipeline is a set of steps that are executed in order to process an image. For example, you can have a
              pipeline that takes an image, resizes it, and then outputs the resized image.
            </p>
          </SingleFaqItem>
          <SingleFaqItem title="What is a Credit?" value="what-is-a-credit">
            <p>
              Credit is a unit of measurement that represents the count of images processed. For example, if you have a
              pipeline that outputs only one image, then you will be charged 1 credit for each image processed.
            </p>
            <p>
              If you have a pipeline that outputs 5 images, then you will be charged 5 credits for each image processed.
            </p>
          </SingleFaqItem>
          <SingleFaqItem title="Do I need to subscribe?" value="do-i-need-to-subscribe">
            <p>
              At the moment, yes. We are working on a system that will allow you to buy credits without subscribing to a
              plan.
            </p>
          </SingleFaqItem>
          <SingleFaqItem
            title="What happens to my unused credits at the end of the month?"
            value="what-happens-to-my-unused-credits"
          >
            <p>
              Your unused credits will be carried over to the next month. For example, if you are subscribed to Basic
              Plan (500 Credits/Month) and if you have 10 credits left at the end of the month, the next month you will
              have 510 credits.
            </p>
          </SingleFaqItem>
          <SingleFaqItem title="Can I try ImgFlow before subscribing?" value="can-i-try-imgflow-before-subscribing">
            <p>
              Of course. You can try ImgFlow for free. Once you sign up, you will get 25 credits for free. You can use
              these credits to try ImgFlow.
            </p>
          </SingleFaqItem>
        </Accordion>
        <Accordion type="multiple">
          <SingleFaqItem title="How does ImgFlow work?" value="how-does-imgflow-work">
            <p>
              ImgFlow is a cloud-based image processing service. You can upload your images to ImgFlow and process them
              using pipelines.
            </p>
            <p>
              To use ImgFlow, you need to create a pipeline. A pipeline is a set of steps that are executed in order to
              process an image.
            </p>
            <p>
              After creating a pipeline, you can go to the pipeline&apos;s run page and upload your images. ImgFlow will
              process your images based on the pipeline&apos;s steps and creates a zip file containing the processed
              images.
            </p>
          </SingleFaqItem>
          <SingleFaqItem
            title="What image formats does ImgFlow support?"
            value="what-image-formats-does-imgflow-support"
          >
            <p>ImgFlow supports the following image formats:</p>
            <ul className="list-disc list-inside">
              <li>JPG</li>
              <li>PNG</li>
              <li>WEBP</li>
              <li>SVG (Doesn&apos;t support output)</li>
              <li>GIF</li>
              <li>TIFF</li>
              <li>AVIF</li>
            </ul>
          </SingleFaqItem>
          <SingleFaqItem
            title="Is there a limit to the number of images I can process with ImgFlow?"
            value="is-there-a-limit"
          >
            <p>
              No, there is no limit to the number of images you can process with ImgFlow. However, you are limited by
              the credits you have in your account.
            </p>
            <p>
              For example, if you have 100 credits in your account, you can process 100 images with a pipeline that only
              outputs one image. If you have a pipeline that outputs 5 images, you can process 20 images.
            </p>
          </SingleFaqItem>
          <SingleFaqItem title="Does ImgFlow store my images?" value="does-imgflow-store-my-images">
            <p>
              Yes, ImgFlow stores your processed images. However, you can delete your processed images at any time by
              clicking the delete images button on the job actions.
            </p>
            <p>
              Unless you delete your images, they will be stored on ImgFlow&apos;s servers for 30 days. After 30 days
              your images will be deleted automatically.
            </p>
          </SingleFaqItem>
          <SingleFaqItem title="Are my images safe?" value="are-my-images-safe">
            <p>
              Yes, your images are safe. Once you upload your images all of the images will be given an unique
              identifier. This identifier is used to identify your images. The odds of someone guessing (or
              brute-forcing) the identifier of your image is very low (2¹²² to be exact).
            </p>
            <p>
              Unless you share the processed URL of your image, no one will be able to access your images. Even if you
              share the URL, ImgFlow will not serve your image unless you have the correct token.
            </p>
          </SingleFaqItem>
        </Accordion>
      </div>
    </div>
  );
}

type TSingleFaqItemProps = {
  title: string;
  value: string;
  children: ReactNode;
};

function SingleFaqItem({ title, value, children }: TSingleFaqItemProps) {
  return (
    <AccordionItem value={value} className="text-left">
      <AccordionTrigger className="text-left text-xl font-medium">{title}</AccordionTrigger>
      <AccordionContent className="text-base [&>div]:space-y-4 font-medium text-gray-600">{children}</AccordionContent>
    </AccordionItem>
  );
}
