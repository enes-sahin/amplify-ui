import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconGavel = (props) => {
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
          d="M1 21H13V23H1V21ZM5.24 8.07L8.07 5.24L22.21 19.38L19.38 22.21L5.24 8.07ZM12.32 1L17.98 6.66L15.15 9.49L9.49 3.83L12.32 1ZM3.83 9.48L9.49 15.14L6.66 17.97L1 12.31L3.83 9.48Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
