interface TConditionalWrapperProps {
  condition: boolean;
  children: JSX.Element;
  wrapper: (children: JSX.Element) => JSX.Element;
}

const ConditionalWrapper = ({ condition, wrapper, children }: TConditionalWrapperProps) => {
  return condition ? wrapper(children) : children;
};

export default ConditionalWrapper;
