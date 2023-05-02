import { TrashIcon } from 'lucide-react';
import { useRef, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import { Button } from './Button';

type TConfirmDeleteButtonProps = {
  onDelete?: () => void;
};

export default function ConfirmDeleteButton({ onDelete }: TConfirmDeleteButtonProps) {
  const [isClickedOnce, setIsClickedOnce] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  function handleClickOutside() {
    setIsClickedOnce(false);
  }

  useOnClickOutside(buttonRef, handleClickOutside);

  return (
    <Button
      ref={buttonRef}
      variant="outline"
      className="hover:bg-red-500 hover:text-white"
      onClick={() => {
        if (isClickedOnce) {
          onDelete?.();
        } else {
          setIsClickedOnce(true);
        }
      }}
    >
      <TrashIcon className="w-4 h-4 mr-2" />
      {isClickedOnce ? 'Confirm?' : 'Delete'}
    </Button>
  );
}
