import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconMoneyOffCsred = (props) => {
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
          d="M12.5001 6.9C14.2801 6.9 14.9401 7.75 15.0001 9H17.2101C17.1401 7.28 16.0901 5.7 14.0001 5.19V3H11.0001V5.16C10.6101 5.24 10.2501 5.37 9.90006 5.52L11.4101 7.03C11.7301 6.95 12.1001 6.9 12.5001 6.9ZM5.47006 3.92L4.06006 5.33L7.50006 8.77C7.50006 10.85 9.06006 11.99 11.4101 12.68L14.9201 16.19C14.5801 16.68 13.8701 17.1 12.5001 17.1C10.4401 17.1 9.63006 16.18 9.52006 15H7.32006C7.44006 17.19 9.08006 18.42 11.0001 18.83V21H14.0001V18.85C14.9601 18.67 15.8301 18.3 16.4601 17.73L18.6801 19.95L20.0901 18.54L5.47006 3.92Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
