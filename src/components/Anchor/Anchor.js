import {Link as UtrechtLink} from '@utrecht/component-library-react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

export const ANCHOR_MODIFIERS = ['hover', 'active', 'inherit', 'muted', 'indent'];

const Anchor = ({children, href, modifiers = [], ...extraProps}) => {
  // extend with our own modifiers
  const className = classNames(
    'utrecht-link--openforms', // always apply our own modifier
    ...modifiers.map(mod => `utrecht-link--openforms-${mod}`)
  );
  return (
    <UtrechtLink className={className} href={href || undefined} {...extraProps}>
      {children}
    </UtrechtLink>
  );
};

Anchor.propTypes = {
  href: PropTypes.string,
  modifiers: PropTypes.arrayOf(PropTypes.oneOf(ANCHOR_MODIFIERS)),
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  onClick: PropTypes.func,
};

export default Anchor;
