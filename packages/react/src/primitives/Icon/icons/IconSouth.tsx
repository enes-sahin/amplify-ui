import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconSouth = (props) => {
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
          d="M19 15L17.59 13.59L13 18.17V2H11V18.17L6.41 13.58L5 15L12 22L19 15Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
