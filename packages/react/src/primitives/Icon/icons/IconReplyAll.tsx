import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconReplyAll = (props) => {
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
          d="M7 8V5L0 12L7 19V16L3 12L7 8ZM13 9V5L6 12L13 19V14.9C18 14.9 21.5 16.5 24 20C23 15 20 10 13 9Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
