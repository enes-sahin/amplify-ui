import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconFilterFrames = (props) => {
  const { className, ...rest } = props;
  return (
    <View
      as="span"
      width="1em"
      height="1em"
      className={classNames(ComponentClassNames.Icon, className)}
      {...rest}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 4H16L12 0L8 4H4C2.9 4 2 4.9 2 6V20C2 21.1 2.9 22 4 22H20C21.1 22 22 21.1 22 20V6C22 4.9 21.1 4 20 4ZM20 20H4V6H8.52L12.04 2.5L15.52 6H20V20ZM6 18H18V8H6V18ZM8 10H16V16H8V10Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
