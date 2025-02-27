import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconFlashAuto = (props) => {
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
          d="M3 2V14H6V23L13 11H9L13 2H3ZM19 2H17L13.8 11H15.7L16.4 9H19.6L20.3 11H22.2L19 2ZM16.85 7.65L18 4L19.15 7.65H16.85V7.65Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
